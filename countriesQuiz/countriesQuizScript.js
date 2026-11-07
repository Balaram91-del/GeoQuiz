const body = document.querySelector("body");

const themeBtn = document.getElementById("theme-btn");
const themeIcon = document.getElementById("theme-icon");

const quizStartBtn = document.getElementById("quiz-start-btn");
const quizEndBtn = document.getElementById("quiz-end-btn");


const introSection = document.getElementById("intro-section");
const quizSection = document.getElementById("quiz-section");
const resultSection = document.getElementById("result-section");

const resultMissedCountries = document.getElementById("countries-missed");
const resultEnteredCountries = document.getElementById("countries-entered");
const resultHeader = document.getElementById("result-section-header");

const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");

const countryInputBox = document.getElementById("country-input-box");
const countryList = document.getElementById("country-list");
const countryEntryBtn = document.getElementById("country-entry-btn");
const scoreCard = document.getElementById("score-card");
const warningMessage = document.getElementById("warning-message");

const originalCountries = new Set();
const alreadyEnteredCountries = new Set();

let score = 0;

// function for theme button
themeBtn.onclick = function () {
  body.classList.toggle("dark-theme");

  if (body.classList.contains("dark-theme")) {
    themeIcon.classList.replace("ri-sun-fill", "ri-moon-fill");
  } else {
    themeIcon.classList.replace("ri-moon-fill", "ri-sun-fill");
  }
};

//function for quiz start
quizStartBtn.onclick = function () {
  introSection.style.display = "none";
  quizSection.style.display = "flex";
  timer();
  loadCountries();
};

function timer() {
  let minutesLeft = 14;
  let secondsLeft = 59;

  const interval = setInterval(function () {
    if (secondsLeft === 0) {
      if (minutesLeft === 0) {
        clearInterval(interval);
        endQuiz();
        return;
      }

      secondsLeft = 59;
      minutesLeft -= 1;
    } else {
      secondsLeft -= 1;
    }

    seconds.textContent = secondsLeft;
    minutes.textContent = minutesLeft;
  }, 1000);
}

async function loadCountries() {
  const res = await fetch('https://countries.dev/countries');
  const countries = await res.json();
  for (let country of countries) {
    originalCountries.add(country.name.toLowerCase());
  }

  console.log(originalCountries);
}

countryEntryBtn.onclick = quizEnterFunction;
countryInputBox.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    quizEnterFunction();
  }
});

function quizEnterFunction() {
  let enteredCountry = countryInputBox.value.toLowerCase();
  if (originalCountries.has(enteredCountry)) {
    if (alreadyEnteredCountries.has(enteredCountry)) {
      warningMessage.textContent = "you have already entered the country";
    } else {
      const country = document.createElement("p");
      country.textContent = enteredCountry;
      countryList.prepend(country);
      score++;
      alreadyEnteredCountries.add(enteredCountry);
      warningMessage.textContent = "";
    }

    countryInputBox.value = "";
  } else {
    warningMessage.textContent = "Not a real country.";
  }

  scoreCard.textContent = `${score}/250`;
}

quizEndBtn.onclick = endQuiz;

// quiz end function
function endQuiz() {
  quizSection.style.display = "none";
  resultSection.style.display = "flex";
  resultHeader.textContent = `Hooray!, you scored ${score}/250`;

  for (let c of originalCountries) {
    const country = document.createElement("p");
    country.textContent = c;
    if (alreadyEnteredCountries.has(c)) {
      resultEnteredCountries.appendChild(country);
    } else {
      resultMissedCountries.appendChild(country);
    }
  }
}
