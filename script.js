document.addEventListener('DOMContentLoaded', function() {
    const generateBtn = document.getElementById('generateBtn');
    const lessonText = document.getElementById('lessonText');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const resultsContainer = document.getElementById('resultsContainer');
    const copyAllBtn = document.getElementById('copyAllBtn');
    const downloadPdfBtn = document.getElementById('downloadPdfBtn');
    const resetBtn = document.getElementById('resetBtn');
    
    // Function to generate sample questions based on input text
    function generateQuestions(text) {
        // This is a simplified version - in a real app you would call an AI API
        const questions = {
            mcqs: [
                {
                    question: "What is the main topic of the provided text?",
                    options: ["History", "Science", "Literature", "Mathematics"],
                    answer: 1
                },
                {
                    question: "Which of these concepts was mentioned in the text?",
                    options: ["Photosynthesis", "Trigonometry", "World War II", "Shakespeare"],
                    answer: 0
                }
            ],
            shortAnswers: [
                "Summarize the main idea of the text in 2-3 sentences.",
                "What are two key points mentioned in the text?"
            ],
            longAnswers: [
                "Explain in detail the concepts presented in the text.",
                "Discuss how the ideas in the text relate to what you've learned previously."
            ]
        };
        
        // If certain keywords are detected, customize questions
        if (text.toLowerCase().includes("math")) {
            questions.mcqs[0].question = "Which mathematical concept was discussed?";
            questions.mcqs[0].options = ["Algebra", "Geometry", "Calculus", "Statistics"];
        }
        else if (text.toLowerCase().includes("science")) {
            questions.mcqs[0].question = "Which scientific principle was mentioned?";
            questions.mcqs[0].options = ["Gravity", "Evolution", "Electricity", "Cells"];
        }
        
        return questions;
    }
    
    // Generate questions button click handler
    generateBtn.addEventListener('click', function() {
        const text = lessonText.value.trim();
        
        if (text === '') {
            alert('Please paste some lesson text first!');
            return;
        }
        
        // Show loading spinner
        loadingSpinner.style.display = 'block';
        resultsContainer.style.display = 'none';
        
        // Simulate processing delay
        setTimeout(function() {
            const questions = generateQuestions(text);
            
            // Clear previous questions
            document.getElementById('mcqQuestions').innerHTML = '';
            document.getElementById('shortQuestions').innerHTML = '';
            document.getElementById('longQuestions').innerHTML = '';
            
            // Add MCQs
            questions.mcqs.forEach((q, i) => {
                const mcqItem = document.createElement('div');
                mcqItem.className = 'question-item';
                
                let optionsHtml = '';
                q.options.forEach((opt, j) => {
                    optionsHtml += `
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="q${i+1}" id="q${i+1}opt${j+1}">
                            <label class="form-check-label" for="q${i+1}opt${j+1}">${opt}</label>
                        </div>
                    `;
                });
                
                mcqItem.innerHTML = `
                    <p class="fw-bold">${i+1}. ${q.question}</p>
                    ${optionsHtml}
                `;
                
                document.getElementById('mcqQuestions').appendChild(mcqItem);
            });
            
            // Add Short Answer questions
            questions.shortAnswers.forEach((q, i) => {
                const shortItem = document.createElement('div');
                shortItem.className = 'question-item';
                shortItem.innerHTML = `<p class="fw-bold">${i+1}. ${q}</p>`;
                document.getElementById('shortQuestions').appendChild(shortItem);
            });
            
            // Add Long Answer questions
            questions.longAnswers.forEach((q, i) => {
                const longItem = document.createElement('div');
                longItem.className = 'question-item';
                longItem.innerHTML = `<p class="fw-bold">${i+1}. ${q}</p>`;
                document.getElementById('longQuestions').appendChild(longItem);
            });
            
            // Hide loading spinner and show results
            loadingSpinner.style.display = 'none';
            resultsContainer.style.display = 'block';
            
            // Scroll to results
            resultsContainer.scrollIntoView({ behavior: 'smooth' });
        }, 1500); // 1.5 second delay to simulate processing
    });
    
    // Copy All Questions button
    copyAllBtn.addEventListener('click', function() {
        const mcqContent = document.getElementById('mcqQuestions').innerText;
        const shortContent = document.getElementById('shortQuestions').innerText;
        const longContent = document.getElementById('longQuestions').innerText;
        
        const allContent = `Multiple Choice Questions:\n${mcqContent}\n\nShort Answer Questions:\n${shortContent}\n\nLong Answer Questions:\n${longContent}`;
        
        navigator.clipboard.writeText(allContent).then(() => {
            alert('All questions copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy: ', err);
            alert('Failed to copy questions. Please try again.');
        });
    });
    
    // Download as PDF button
    downloadPdfBtn.addEventListener('click', function() {
        const element = document.getElementById('resultsContainer');
        const opt = {
            margin: 10,
            filename: 'EduQGen-Questions.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        
        // Create PDF
        html2pdf().set(opt).from(element).save();
    });
    
    // Reset button
    resetBtn.addEventListener('click', function() {
        lessonText.value = '';
        resultsContainer.style.display = 'none';
        loadingSpinner.style.display = 'none';
        lessonText.focus();
    });
});