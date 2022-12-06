"use strict";

// ----------------------------------------------------------------------------------------
// ---- Naming
const percentageBtn = document.querySelector(".percentageBtn");
const clearBtn = document.querySelector(".clearBtn");
const backspaceBtn = document.querySelector(".backspaceBtn");
const divisionBtn = document.querySelector(".divisionBtn");
const multiplicationBtn = document.querySelector(".multiplicationBtn");
const minusBtn = document.querySelector(".minusBtn");
const plusBtn = document.querySelector(".plusBtn");
const changeSignBtn = document.querySelector(".changeSignBtn");
const dotBtn = document.querySelector(".dotBtn");
const equalsBtn = document.querySelector(".equalsBtn");
const zeroBtn = document.querySelector(".zeroBtn");
const oneBtn = document.querySelector(".oneBtn");
const twoBtn = document.querySelector(".twoBtn");
const threeBtn = document.querySelector(".threeBtn");
const fourBtn = document.querySelector(".fourBtn");
const fiveBtn = document.querySelector(".fiveBtn");
const sixBtn = document.querySelector(".sixBtn");
const sevenBtn = document.querySelector(".sevenBtn");
const eightBtn = document.querySelector(".eightBtn");
const nineBtn = document.querySelector(".nineBtn");
const displayCalculation = document.querySelector(".displayCalculation");
const displayResult = document.querySelector(".displayResult");
const body = document.querySelector("body");
const toggle = document.querySelector(".toggle");
const sunIcon = document.querySelector(".toggle .bxs-sun");
const moonIcon = document.querySelector(".toggle .bx-moon");
const text = document.querySelectorAll(".text");

displayCalculation.textContent = "";
displayResult.textContent = "";
let equalsState = 0;

// ----------------------------------------------------------------------------------------
// ---- Click Events
// Numbers
document.addEventListener("click", function (e) {
  let clickName = e.srcElement.textContent;

  if (
    clickName === "0" ||
    clickName === "1" ||
    clickName === "2" ||
    clickName === "3" ||
    clickName === "4" ||
    clickName === "5" ||
    clickName === "6" ||
    clickName === "7" ||
    clickName === "8" ||
    clickName === "9" ||
    clickName === "."
  ) {
    displayCalculation.textContent = displayCalculation.textContent + clickName;
  }
});

//Operators
plusBtn.addEventListener("click", function () {
  if (equalsState === 0) {
    displayCalculation.textContent = displayCalculation.textContent + " + ";
  } else {
    displayCalculation.textContent = displayResult.textContent + " + ";
  }
});

minusBtn.addEventListener("click", function () {
  if (equalsState === 0) {
    displayCalculation.textContent = displayCalculation.textContent + " - ";
  } else {
    displayCalculation.textContent = displayResult.textContent + " - ";
  }
});

multiplicationBtn.addEventListener("click", function () {
  if (equalsState === 0) {
    displayCalculation.textContent = displayCalculation.textContent + " * ";
  } else {
    displayCalculation.textContent = displayResult.textContent + " * ";
  }
});

divisionBtn.addEventListener("click", function () {
  if (equalsState === 0) {
    displayCalculation.textContent = displayCalculation.textContent + " / ";
  } else {
    displayCalculation.textContent = displayResult.textContent + " / ";
  }
});

//
const equalsOperation = function () {
  if (equalsState === 0) {
    equalsState = 1;
    displayCalculation.textContent = displayCalculation.textContent + " = ";

    displayResult.textContent = eval(
      displayCalculation.textContent
        .split(" ")
        .map((el) => {
          if (el === "%") {
            return (el = "/ 100");
          } else {
            return (el = el);
          }
        })
        .filter((el) => el !== "=")
        .join(" ")
    );
  } else if (equalsState === 1) {
    displayCalculation.textContent = [displayResult.textContent]
      .concat(displayCalculation.textContent.split(" ").splice(1))
      .join(" ");

    displayResult.textContent = eval(
      displayCalculation.textContent
        .split(" ")
        .filter((el) => el !== "=")
        .join(" ")
    );
  } else {
    displayResult.textContent = eval(
      displayCalculation.textContent
        .split("")
        .filter((el) => el !== "=")
        .filter((el) => el !== " ")
        .map((el) => {
          if (el === "-") {
            return (el = el + " ");
          } else {
            return (el = el);
          }
        })
        .join("")
    );
  }
};

const backspaceOperation = function () {
  displayCalculation.textContent = displayCalculation.textContent
    .split("")
    .filter((el) => el !== " ")
    .slice(0, -1)
    .map((el) => {
      if (el === "-" || el === "+" || el === "*" || el === "/" || el == "=") {
        return (el = " " + el + " ");
      } else {
        return (el = el);
      }
    })
    .join("");
};
//

equalsBtn.addEventListener("click", function () {
  equalsOperation();
});

changeSignBtn.addEventListener("click", function () {
  if (equalsState === 0) {
    displayCalculation.textContent = `- ${displayCalculation.textContent}`;
  } else {
    equalsState = 2;
    displayCalculation.textContent = `- ${displayCalculation.textContent
      .split(" ")
      .filter((el) => el !== "=")
      .join(" ")}`;
  }
});

percentageBtn.addEventListener("click", function () {
  displayCalculation.textContent = displayCalculation.textContent + " % ";
  equalsOperation();
});

clearBtn.addEventListener("click", function () {
  displayCalculation.textContent = "";
  displayResult.textContent = "";
  equalsState = 0;
});

backspaceBtn.addEventListener("click", function () {
  backspaceOperation();
});

// ---- Keybord Events
document.addEventListener("keydown", (event) => {
  let keyName = event.key;
  if (
    keyName === "0" ||
    keyName === "1" ||
    keyName === "2" ||
    keyName === "3" ||
    keyName === "4" ||
    keyName === "5" ||
    keyName === "6" ||
    keyName === "7" ||
    keyName === "8" ||
    keyName === "9" ||
    keyName === "."
  ) {
    displayCalculation.textContent = displayCalculation.textContent + keyName;
  } else if (keyName === "%") {
    displayCalculation.textContent =
      displayCalculation.textContent + " " + keyName;
    equalsOperation();
  } else if (
    keyName === "+" ||
    keyName === "-" ||
    keyName === "*" ||
    keyName === "/"
  ) {
    if (equalsState === 0) {
      displayCalculation.textContent =
        displayCalculation.textContent + " " + keyName + " ";
    } else {
      displayCalculation.textContent =
        displayResult.textContent + " " + keyName + " ";
    }
  } else if (keyName === "=" || keyName === "Enter") {
    equalsOperation();
  } else if (keyName === "Backspace") {
    backspaceOperation();
  } else if (keyName === "Delete") {
    displayCalculation.textContent = "";
    displayResult.textContent = "";
    equalsState = 0;
  }
});

// ----------------------------------------------------------------------------------------
// ---- Light/Dark Mode
// The theme changer is built based on a video on a YT Channel (CODE WITH HOSSEIN)
toggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  text.forEach((el) => {
    el.classList.toggle("whiteText");
  });
  sunIcon.className =
    sunIcon.className == "bx bxs-sun" ? "bx bx-sun" : "bx bxs-sun";
  moonIcon.className =
    moonIcon.className == "bx bxs-moon" ? "bx bx-moon" : "bx bxs-moon";
});
