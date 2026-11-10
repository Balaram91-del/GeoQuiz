const body = document.querySelector("body");
const themeBtn = document.getElementById("theme-btn");
const themeIcon = document.getElementById("theme-icon");

if (localStorage.getItem("isDarkTheme") === "true") {
  body.classList.add("dark-theme");
  themeIcon.classList.replace("ri-sun-fill", "ri-moon-fill");
}

// function for theme button 
themeBtn.onclick = function () {
  body.classList.toggle("dark-theme");

  if (body.classList.contains("dark-theme")) {
    localStorage.setItem("isDarkTheme", true);
    themeIcon.classList.replace("ri-sun-fill", "ri-moon-fill");
  } else {
    themeIcon.classList.replace("ri-moon-fill", "ri-sun-fill");
    localStorage.setItem("isDarkTheme", false);
  }
}