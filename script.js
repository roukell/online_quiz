const questionText = document.getElementById("question-text");
const optionBox = document.querySelector(".option-box");
const currentQuestionNum = document.querySelector(".current-question-num");
const answerDescription = document.querySelector(".answer-description");
const nextQuestionBtn = document.querySelector(".next-question-btn");
const correctAnswers = document.querySelector(".correct-answers");
const seeResultBtn = document.querySelector(".see-result-btn");
const remainingTime = document.querySelector(".remaining-time");
const timeUpText = document.querySelector(".time-up-text");
const quizHomeBox = document.querySelector(".quiz-home-box");
const quizBox = document.querySelector(".quiz-box");
const quizOverBox = document.querySelector(".quiz-over-box");
const startAgainQuizBtn = document.querySelector(".start-again-quiz-btn");
const goHomeBtn = document.querySelector(".go-home-btn");
const startQuizBtn = document.querySelector(".start-quiz-btn");
const nameText = document.getElementById("myForm");
const finalMsg = document.querySelector(".finalMsg");

let attempt = 0;
let questionIndex = 0;
let score = 0;
let number = 0;
let myArray = [];
let interval;

const myApp = [{
    question: "What is the browser's internal representation of your web page?",
    options: ["Document Object Model", "Domain Object Model", "Document Observation Model", "Domestic Object Model"],
    answer: 0,
    description: "Document Object Model (DOM) is the browser's internal representation of your web page.",
}, {
    question: "Web pages are written in?",
    options: ["FTP", "HTML", "HTTP", "URL"],
    answer: 1,
    description: "Web pages are written in HTML.",
}, {
    question: "You can get the value of an element's attributes using ...... method.",
    options: ["setAttribute method", "getElementById method", "getAttribute method", "All of above"],
    answer: 2,
    description: "You can get the value of an element's attributes using getAttribute method",
}, {
    question: "What property holds the text content, as well as all nested HTML content, of an element?",
    options: ["innerContent", "innerHTML", "innerWidth", "innerHeight"],
    answer: 1,
    description: "The answer is innerHTML.",
}, {
    question: "The document.getElementById method grabs an element from the DOM using its ......?",
    options: ["Class name", "Attribute", "Id", "Object"],
    answer: 2,
    description: "The answer is Id.",
}, {
    question: "You can set the value of an element's attributes using ...... method?",
    options: ["setAttribute method", "getElementById method", "getAttribute method", "All of above"],
    answer: 0,
    description: "You can set the value of an element's attributes using setAttribute method",
}, {
    question: "You can use the window object's ....... property to set an event handler, or callback, function for the load event.",
    options: ["onload", "load", "addEventListener", "querySelector"],
    answer: 0,
    description: "The onload property allows us to set an event handler or callback function for the load event.",
}, {
    question: "A ........ is a function expression that has no name.",
    options: ["anonymous function", "function declaration", "function name", "function reference"],
    answer: 0,
    description: "Anonymous function is a function expression that has no name.",
}, {
    question: "...... are functions defined inside another function.",
    options: ["Internal functions", "Multiple functions", "Function home", "Nested functions"],
    answer: 3,
    description: "Nested functions are functions defined inside antoehr function.",
}, {
    question: "The ...... object is always at the top of the DOM tree.",
    options: ["head", "body", "HTML", "document"],
    answer: 3,
    description: "Document is always at the tope of the DOM tree.",
}]


function load() {
    //console.log("test");
    number++;
    questionText.innerHTML = myApp[questionIndex].question;
    createOptions();
    scoreBoard();
    currentQuestionNum.innerHTML = number + " / " + myApp.length;
}

function createOptions() {
    optionBox.innerHTML = "";
    for (let i = 0; i < myApp[questionIndex].options.length; i++) {
        // console.log(myApp[questionIndex].options[i]);
        const option = document.createElement("div");
        option.innerHTML = myApp[questionIndex].options[i];
        option.classList.add("option");
        option.id = i;
        option.setAttribute("onclick", "check(this)");
        optionBox.appendChild(option);
    }
}

function generateRandomQuestion() {
    let randomNumber = Math.floor(Math.random() * (myApp.length));
    let hitDuplicate = 0;
    if (myArray.length == 0) {
        questionIndex = randomNumber;
    } else {
        for (let i = 0; i < myArray.length; i++) {
            if (randomNumber == myArray[i]) {
                hitDuplicate = 1;
                // console.log("found duplicate")
            }
        }
        if (hitDuplicate == 1) {
            generateRandomQuestion();
            return;
        } else {
            questionIndex = randomNumber;
        }
    }

    myArray.push(randomNumber);
    // console.log(myArray);
    load();

}

function check(ele) {
    // console.log(ele.id);
    const id = ele.id;
    if (id == myApp[questionIndex].answer) {
        // console.log("correct");
        ele.classList.add("correct");
        score++;
        scoreBoard();
    } else {
        // console.log("wrong");
        ele.classList.add("wrong");
        // show correct answer when clicked answer is wrong;
        for (let i = 0; i < optionBox.children.length; i++) {
            if (optionBox.children[i].id == myApp[questionIndex].answer) {
                optionBox.children[i].classList.add("show-correct");
            }
        }
    }
    attempt++;
    disableOptions();
    showAnswerDescription();
    showNextQuestionBtn();
    stopTimer();

    if (number / (myApp.length) == 1) {
        // console.log("over");
        quizOver();
    }
}

function timeIsUp() {
    showTimeUpText();
    for (let i = 0; i < optionBox.children.length; i++) {
        if (optionBox.children[i].id == myApp[questionIndex].answer) {
            optionBox.children[i].classList.add("show-correct");
        }
    }
    disableOptions();
    showAnswerDescription();
    showNextQuestionBtn();

}

function startTimer() {
    let timeLimit = 16;
    remainingTime.classList.remove("less-time");
    interval = setInterval(() => {
        timeLimit--;
        if (timeLimit < 10) {
            timeLimit = "0" + timeLimit;
        }
        if (timeLimit < 6) {
            remainingTime.classList.add("less-time");
        }

        remainingTime.innerHTML = timeLimit;
        if (timeLimit == 0) {
            clearInterval(interval);
            timeIsUp();
        }
    }, 1000)
}

function stopTimer() {
    clearInterval(interval);
}

function disableOptions() {
    for (let i = 0; i < optionBox.children.length; i++) {
        optionBox.children[i].classList.add("already-answered");
    }
}

function showAnswerDescription() {
    // answer description will only show if it is definied
    if (typeof myApp[questionIndex].description !== "undefined") {
        answerDescription.classList.add("show");
        answerDescription.innerHTML = myApp[questionIndex].description;
    }
}

function hideAnswerDescription() {
    answerDescription.classList.remove("show");
    answerDescription.innerHTML = "";
}

function showNextQuestionBtn() {
    nextQuestionBtn.classList.add("show");
}

function hideNextQuestionBtn() {
    nextQuestionBtn.classList.remove("show");
}

function showTimeUpText() {
    timeUpText.classList.add("show");
}

function hideTimeUpText() {
    timeUpText.classList.remove("show");
}

function scoreBoard() {
    correctAnswers.innerHTML = score;
}

nextQuestionBtn.addEventListener("click", nextQuestion);

function nextQuestion() {
    // questionIndex++;
    generateRandomQuestion();
    // load();
    hideNextQuestionBtn();
    hideAnswerDescription();
    hideTimeUpText();
    startTimer();
}

function quizResult() {
    document.querySelector(".total-questions").innerHTML = myApp.length;
    document.querySelector(".total-attempt").innerHTML = attempt;
    document.querySelector(".total-correct").innerHTML = score;
    document.querySelector(".total-wrong").innerHTML = attempt - score;
    const percentage = (score / (myApp.length)) * 100;
    document.querySelector(".percentage").innerHTML = Math.floor(percentage) + "%";
}

let namesAndScores = JSON.parse(localStorage.getItem("namesAndScores"));

    if (namesAndScores === null) {
        namesAndScores = [
                {"name": "Melody",
                "score": "100%"}
        ]
    };


// when click or submit, store data into local storage and append user name and score
nameText.addEventListener("submit", (e) => {
    e.preventDefault();
    let name = nameText.elements[0];
    let userName = name.value.trim();
    const percentage = (score / (myApp.length)) * 100 + "%";
    let entry = {
        "name": userName,
        "score": percentage
    };
    namesAndScores.push(entry);
    localStorage.setItem("namesAndScores", JSON.stringify(namesAndScores));

    let li = document.createElement("li");
    li.textContent = userName + "'s score is " + percentage;
    record.appendChild(li);
    
})

// get data from localStorage and append list
function createRecord() {
    const record = document.querySelector("#record");
    for (let i = 0; i < namesAndScores.length; i++) {
            let name = namesAndScores[i].name;
            let score = namesAndScores[i].score;
            // console.log(name);
            // console.log(score);

            let li = document.createElement("li");
            li.textContent = name + "'s score is " + score;
            record.appendChild(li);
    }
}

createRecord();


function resetQuiz() {
    attempt = 0;
    // questionIndex = 0;
    score = 0;
    number = 0;
    myArray = [];
}

function quizOver() {
    nextQuestionBtn.classList.remove("show");
    seeResultBtn.classList.add("show");
}

seeResultBtn.addEventListener("click", () => {
    // quizBox.style.display = "none";
    quizBox.classList.remove("show");
    seeResultBtn.classList.remove("show");
    quizOverBox.classList.add("show");
    quizResult();
})

startAgainQuizBtn.addEventListener("click", () => {
    quizBox.classList.add("show");
    quizOverBox.classList.remove("show");
    resetQuiz();
    nextQuestion();
})

goHomeBtn.addEventListener("click", () => {
    quizOverBox.classList.remove("show");
    quizHomeBox.classList.add("show");
    resetQuiz();
})

startQuizBtn.addEventListener("click", () => {
    quizBox.classList.add("show");
    quizHomeBox.classList.remove("show");
    startTimer();
    generateRandomQuestion();
})

// // window.onload = () => {
//     // load();
//     startTimer();
//     generateRandomQuestion();
// }