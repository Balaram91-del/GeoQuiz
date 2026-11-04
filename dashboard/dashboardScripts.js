const body = document.querySelector("body");
const themeBtn = document.getElementById("theme-btn");
const themeIcon = document.getElementById("theme-icon");

// function for theme button
themeBtn.onclick = function () {
  body.classList.toggle("dark-theme");

  if (body.classList.contains("dark-theme")) {
    themeIcon.classList.replace("ri-sun-fill", "ri-moon-fill");
  } else {
    themeIcon.classList.replace("ri-moon-fill", "ri-sun-fill");
  }
};
