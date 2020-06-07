const questionText = document.getElementById("question-text");
const questionIndex = Math.round(Math.random() * 10/4);
const optionBox = document.querySelector(".option-box");

const myApp = [
    {
        question: "Name the smallest type of tree in the world.",
        options: ["Cork tree","Bonsai tree","Hazel","Black walnut"],
        answer: 1,
    }, {
        question: "Webpages are written in?",
        options: ["FTP","HTML","HTTP","URL"],
        answer: 1,
    }, {
        question: "C is?",
        options: ["A third generation of high level langauge","A machine langauge","An assembly langauge","All of above"],
        answer: 0,
    }
]

function load() {
//console.log("test");
 questionText.innerHTML = myApp[questionIndex].question;
 createOptions();
}

function createOptions() {
    for (let i = 0; i < myApp[questionIndex].options.length; i++) {
        // console.log(myApp[questionIndex].options[i]);
        const option = document.createElement("div");
        option.innerHTML = myApp[questionIndex].options[i];
        option.classList.add("option");
        option.id = i;
        option.setAttribute("onclick","check(this)");
        optionBox.appendChild(option);
    }
}

function check(ele) {
    // console.log(ele.id);
    const id=ele.id;
    if (id == myApp[questionIndex].answer) {
        // console.log("correct");
        ele.classList.add("correct");
    } else {
        // console.log("wrong");
        ele.classList.add("wrong");
    }

    disableOptions();
}

function disableOptions() {
    for (let i = 0; i < optionBox.children.length; i++) {
        optionBox.children[i].classList.add("already-answered");
    }
}

window.onload=()=>{
    load();
}