const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const finishButton = document.getElementById("finish-btn");
const questionContainerElement = document.getElementById("question-container");
let shuffledQuestions, currentQuestionIndex;
const questionElement = document.getElementById("question");
const answerButtonElement = document.getElementById("answer-buttons");
const counter = document.getElementById("counter");
const choiceA = document.getElementById("a");
const choiceB = document.getElementById("b");
const choiceC = document.getElementById("c");
const choiceD = document.getElementById("d");
const progress = document.getElementById("progress");
const scoreContainer = document.getElementById("scoreContainer");


startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    setNextQuestion();
})

function startGame() {
    startButton.classList.add("hide");
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove("hide");
    setNextQuestion()
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);

}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtonElement.appendChild(button);
        
    });
}

function resetState() {
    nextButton.classList.add("hide");
    while (answerButtonElement.firstChild) {
        answerButtonElement.removeChild(answerButtonElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove("hide")
    } else {
        finishButton.innerText = "Finish";
        finishButton.classList.remove("hide");
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct == true){
        initialScore = initialScore + 1;
        console.log(initialScore);
    } else {
        console.log("wrong");
    }
}

function clearStatusClass (element) {
    answerButtonElement.classList.remove("correct");
    answerButtonElement.classList.remove("wrong");
}


let questions = [
    {
        question:"Where is the correct place to insert a JavaScript?",
        [Text: "Both the <head> and the <body> section are correct", correct: true],
        [Text:"The <body> section", correct: false],
        {Text:"The <head> section", correct: false},
        {Text:"The <footer> section", correct: false},
    },
    {
        question:"Inside which HTML element do we put the JavaScript?",
        choiceA:"<scripting>",
        choiceB:"<script>",
        choiceC:"<js>",
        choiceD:"<javascript>",
        correct:"B",
    },
    {
        question: "How do you write Hello World in an alert box?",
        choiceA:"alert(Hello World);",
        choiceB:"alertBox(Hello World);",
        choiceC:"msgBox(Hello World);",
        choiceD:"msg(Hello World);",
        correct:"A",
    }

]