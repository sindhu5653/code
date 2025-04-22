const questions=[
    {
        question:"Which is largest animal in the world?",
        answers:[
            { text:"Shark", correct:false },
            { text:"Blue Whale", correct:true },
            { text:"Elephant", correct:false },
            { text:"Giraffe", correct:false } 
        ]
    },
    {
        question:"What is the largest planet in our solar system?",
        answers:[
            { text:"Neptune", correct:false },
            { text:"Earth", correct:false },
            { text:"Jupiter", correct:true },
            { text:"Saturn", correct:false }  
        ]
    },
    {
    question:"What is the national flower of the United States?",
        answers:[
            { text:"Daisy", correct:false },
            { text:"Lily", correct:false },
            { text:"Sunflower", correct:false },
            { text:"Rose", correct:true }  
        ]
    },
    {
    question:"Which is smallest continent in the world?",
    answers:[
        { text:"Australia", correct:true },
        { text:"Asia", correct:false },
        { text:"Arctic", correct:false },
        { text:"Africa", correct:false } 
    ]
    }
];

let questionElement = document.getElementById("question");
let answerButtons = document.getElementById("answer-buttons");
let nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);  
    });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    console.log(selectedBtn,'after clicked');
    
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You Scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
});


startQuiz();





