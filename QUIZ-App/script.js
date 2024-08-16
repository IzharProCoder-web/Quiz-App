"use strict";
const questionElement = document.querySelector(".questions");
const answerElements = document.querySelectorAll(".answer-para");
const answerSection = document.querySelector(".answer-section");
const nextButton = document.getElementById("nextButton");
const changeQuestionNumber = document.querySelector(".header-paragraph");
const countDown = document.querySelector(".time");
const body = document.querySelector("body");
const volumeButton = document.querySelector(".volume-btn");
const mySound = document.getElementById("mySound");
const mySound2 = document.getElementById("mySound2");
const result = document.querySelector(".result");
const resultPage = document.querySelector(".result-page");
const allContent = document.querySelector(".all-content");
const div2 = document.querySelector(".div-2");
const showRightAnswerCount = document.querySelector(".show-right-answer-count");

const questions = [
  {
    question: "Inside which HTML element do we put the JavaScript?",
    answers: [
      "&lt;js&gt; ",
      "&lt;scripting&gt;",
      "&lt;javascript&gt;",
      "&lt;script&gt;",
    ],
    correct: 3,
  },
  {
    question:
      "What is the correct syntax for referring to an external script called 'xxx.js'?",
    answers: [
      "&lt;script name='xxx.js'&gt;",
      "&lt;script src='xxx.js'&gt;",
      "&lt;script href='xxx.js'&gt;",
      "&lt;script file='xxx.js'&gt;",
    ],
    correct: 1,
  },
  {
    question: "How do you write 'Hello World' in an alert box?",
    answers: [
      "alertBox('Hello World');",
      "msgBox('Hello World');",
      "alert('Hello World');",
      "msg('Hello World');",
    ],
    correct: 2,
  },
  {
    question: "How do you create a function in JavaScript?",
    answers: [
      "function myFunction()",
      "function:myFunction()",
      "function = myFunction()",
      "createFunction myFunction()",
    ],
    correct: 0,
  },
  {
    question: "How do you call a function named 'myFunction'?",
    answers: [
      "call myFunction()",
      "call function myFunction()",
      "myFunction()",
      "myFunction",
    ],
    correct: 2,
  },
  {
    question: "How to write an IF statement in JavaScript?",
    answers: ["if i = 5 then", "if i == 5 then", "if (i == 5)", "if i = 5"],
    correct: 2,
  },
  {
    question:
      "How to write an IF statement for executing some code if 'i' is NOT equal to 5?",
    answers: ["if (i != 5)", "if i <> 5", "if (i <> 5)", "if i =! 5 then"],
    correct: 0,
  },
  {
    question: "How does a WHILE loop start?",
    answers: [
      "while (i <= 10; i++)",
      "while (i <= 10)",
      "while i = 1 to 10",
      "while (i++ <= 10)",
    ],
    correct: 1,
  },
  {
    question: "How does a FOR loop start?",
    answers: [
      "for i = 1 to 5",
      "for (i = 0; i <= 5)",
      "for (i <= 5; i++)",
      "for (i = 0; i <= 5; i++)",
    ],
    correct: 3,
  },
  {
    question: "How can you add a comment in JavaScript?",
    answers: [
      "'This is a comment",
      "//This is a comment",
      "<!--This is a comment-->",
      "*This is a comment*",
    ],
    correct: 1,
  },

  {
    question: "How to insert a comment that has more than one line?",
    answers: [
      "<!--This comment has more than one line-->",
      "//This comment has more than one line//",
      "/*This comment has more than one line*/",
      "*This comment has more than one line*",
    ],
    correct: 2,
  },
  {
    question: "What is the correct way to write a JavaScript array?",
    answers: [
      "var colors = 1 = ('red'), 2 = ('green'), 3 = ('blue')",
      "var colors = (1:'red', 2:'green', 3:'blue')",
      "var colors = ['red', 'green', 'blue']",
      "var colors = 'red', 'green', 'blue'",
    ],
    correct: 2,
  },
  {
    question: "How do you round the number 7.25, to the nearest integer?",
    answers: [
      "Math.round(7.25)",
      "Math.rnd(7.25)",
      "Math.roundUp(7.25)",
      "round(7.25)",
    ],
    correct: 0,
  },
  {
    question: "How do you find the number with the highest value of x and y?",
    answers: ["Math.max(x, y)", "Math.ceil(x, y)", "top(x, y)", "ceil(x, y)"],
    correct: 0,
  },
  {
    question:
      "What is the correct JavaScript syntax for opening a new window called 'w2'?",
    answers: [
      "w2 = window.new('http://www.example.com');",
      "w2 = window.open('http://www.example.com');",
      "w2 = window.create('http://www.example.com');",
      "w2 = window.popup('http://www.example.com');",
    ],
    correct: 1,
  },
  {
    question:
      "How do you write a conditional statement for executing some code if 'x' is equal to 5?",
    answers: ["if x == 5 then", "if (x == 5)", "if x = 5 then", "if (x = 5)"],
    correct: 1,
  },
  {
    question: "How can you detect the client's browser name?",
    answers: [
      "navigator.appName",
      "browser.name",
      "client.navName",
      "window.browserName",
    ],
    correct: 0,
  },
  {
    question: "Which event occurs when the user clicks on an HTML element?",
    answers: ["onchange", "onmouseover", "onmouseclick", "onclick"],
    correct: 3,
  },
  {
    question: "How do you declare a JavaScript variable?",
    answers: [
      "variable carName;",
      "v carName;",
      "var carName;",
      "let var carName;",
    ],
    correct: 2,
  },
  {
    question: "Which operator is used to assign a value to a variable?",
    answers: ["*", "-", "=", "+"],
    correct: 2,
  },
];

let currentQuestionIndex = 0;
let score = 0;
let rightAnswerCount = 0;
let wrongAnswerCount = 0;
let hasAnswered = false;
const initialTime = 30;
let timeLeft = initialTime;
let countdownInterval;

function updateQuestionNumber() {
  changeQuestionNumber.innerHTML = `${currentQuestionIndex + 1}/${
    questions.length
  }`;
}

function changeQuestion() {
  if (currentQuestionIndex <= questions.length) {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerHTML = currentQuestion.question;
    answerElements.forEach((answerElement, index) => {
      answerElement.innerHTML = currentQuestion.answers[index];
      answerElement.classList.remove("right-answer", "wrong-answer");
      answerElement.style.borderColor = ""; // Reset border color
      answerElement.style.pointerEvents = "auto";
    });

    hasAnswered = false;
    updateQuestionNumber();
    resetTimer();
  }
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
}

function updateCountdown() {
  if (timeLeft > 0) {
    timeLeft--;
    countDown.textContent = formatTime(timeLeft);
    updateBackgroundColor();
  } else {
    clearInterval(countdownInterval);
    skipQuestion();
  }
}

function resetTimer() {
  clearInterval(countdownInterval);
  timeLeft = initialTime;
  countDown.textContent = formatTime(timeLeft);
  countdownInterval = setInterval(updateCountdown, 1000);
}

countdownInterval = setInterval(updateCountdown, 1000);

function skipQuestion() {
  // currentQuestionIndex + 2 - 1;
  if (currentQuestionIndex < questions.length) {
    changeQuestion();
    resetTimer();
  }
}

function updateBackgroundColor() {
  if (timeLeft <= 5) {
    body.style.backgroundColor = "#F5F5F57A";
    countDown.style.backgroundColor = "#C50C006E";
    nextButton.style.color = "#C50000";
  } else if (timeLeft <= 15) {
    body.style.backgroundColor = "#E4E5C7";
    countDown.style.backgroundColor = "#C5B1006E";
    nextButton.style.color = "#C58800";
  } else {
    body.style.backgroundColor = "#CCE2C2";
    countDown.style.backgroundColor = "#02A4096E";
    nextButton.style.color = "#01AB08";
  }
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (!hasAnswered) {
    // skipQuestion();
  } else if (currentQuestionIndex < questions.length) {
    changeQuestion();
    resetTimer();
  } else {
    console.log(`Quiz end`);
    currentQuestionIndex = 0;
    changeQuestion();
    rightAnswerCount = 0;
    wrongAnswerCount = 0;
    resultPage.classList.remove("show");
    allContent.classList.add("show");
  }
});

answerElements.forEach((answerElement, index) => {
  answerElement.addEventListener("click", () => {
    if (hasAnswered) return;
    hasAnswered = true;
    const correctAnswerIndex = questions[currentQuestionIndex].correct;
    if (index === correctAnswerIndex) {
      answerElement.classList.add("right-answer");
      answerElement.style.borderColor = "green";
      rightAnswerCount++;
      showRightAnswerCount.innerHTML = `You Scored  ${rightAnswerCount} / ${questions.length}`;

      if (rightAnswerCount === 20) {
        div2.style.width = "100%";
      } else if (rightAnswerCount >= 17) {
        div2.style.width = "85%";
      } else if (rightAnswerCount >= 15) {
        div2.style.width = "70%";
      } else if (rightAnswerCount >= 10) {
        div2.style.width = "40%";
      } else if (rightAnswerCount >= 5) {
        div2.style.width = "20%";
      } else if (rightAnswerCount >= 1) {
        div2.style.width = "10%";
      } else {
        div2.style.width = "0";
      }
    } else {
      answerElement.classList.add("wrong-answer");
      answerElement.style.borderColor = "red";
      wrongAnswerCount++;
    }

    console.log(
      `Right Answers: ${rightAnswerCount}, Wrong Answers: ${wrongAnswerCount}`
    );
  });
});
updateQuestionNumber();
changeQuestion();
