
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");


let questions = [
    {
        question : "What does HTML stand for?",
        choiceA : "HyperText Markup Language",
        choiceB : "HyperText Makeup Language",
        choiceC : "Hyderabad Tele-Mattress Lmt.",
	choiceD : "Hindustan Tele-Mattress Lmt.",
        correct : "A"
    },{
        question : "What does CSS stand for?",
        choiceA : "Control Style Sheet",
        choiceB : "Cascading Style Sheets",
        choiceC : "Cascading Syntax Style",
	choiceD : "Cascading Sheet Style",
        correct : "B"
    },{
        question : "What does JS stand for?",
        choiceA : "Jungle Soilder",
        choiceB : "Java Source",
        choiceC : "Java Script",
	choiceD : "Jungle Script",
        correct : "C"
    },{
        question : "What does BU stand for?",
        choiceA : "Beauty Unlimited",
        choiceB : "Bad University",
        choiceC : "Back University",
	choiceD : "Beyond Union Pvt.Lmt.",
        correct : "D"
    }
];


const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 15;
const gaugeWidth = 500; 
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;


function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); 
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count <= questionTime){
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "mediumseagreen";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#ff4d4d";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    quiz.style.display = "none";
    
    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);
    scoreDiv.innerHTML += "<p> You gave "+ scorePerCent +"% of the right answers</p>";
}





















