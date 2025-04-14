// FULL FETCH DATA
document.addEventListener("DOMContentLoaded", function () {
  fetch("../!getMainItems/nav.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("nav-container").innerHTML = data;

      setupDarkMode();
      setupDropdown();
    })
    .catch((error) => console.error("Error loading nav:", error));

  fetch("../!getMainItems/profileCard.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("profileCard-container").innerHTML = data;

      setupCopyEmailButton();
    })
    .catch((error) => console.error("Error loading profile card:", error));

  fetch("../!getMainItems/footer.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("footer-container").innerHTML = data;
      setupFooterDate();
    })
    .catch((error) => console.error("Error loading footer:", error));
});

// DARK MODE FUNCTION
function setupDarkMode() {
  const toggleButton = document.getElementById("toggleMode");
  const moonIcon = document.getElementById("moonIcon");
  const sunIcon = document.getElementById("sunIcon");
  const body = document.body;

  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("darkModeToggled");
    moonIcon.classList.remove("hiddenIcon");
    sunIcon.classList.add("hiddenIcon");
  }

  if (toggleButton) {
    toggleButton.addEventListener("click", function () {
      body.classList.toggle("darkModeToggled");

      moonIcon.classList.toggle("hiddenIcon");
      sunIcon.classList.toggle("hiddenIcon");

      if (body.classList.contains("darkModeToggled")) {
        localStorage.setItem("theme", "dark");
      } else {
        localStorage.setItem("theme", "light");
      }
    });
  }

  window.addEventListener("DOMContentLoaded", () => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (!localStorage.getItem("theme")) {
      if (prefersDark) {
        document.body.classList.add("darkModeToggled");
      }
    }

    setupDarkMode();
  });
}

// NAV DROPDOWN FUNCTION
function setupDropdown() {
  const showNav = document.getElementById("showNavSmallScreen");
  const closeNav = document.getElementById("closeNavSmallScreen");
  const navDropdown = document.querySelector(".nav_dropdown");
  const container = document.querySelector(".container");
  const body = document.body;

  if (showNav && closeNav && navDropdown) {
    showNav.addEventListener("click", function () {
      navDropdown.classList.remove("hideDropdown");
      container.classList.add("hideAllContents");
      body.style.overflow = "hidden";
    });

    function closeNavigation() {
      navDropdown.classList.add("hideDropdown");
      container.classList.remove("hideAllContents");
      body.style.overflow = "";
    }

    closeNav.addEventListener("click", closeNavigation);
    navDropdown.addEventListener("click", closeNavigation);
  }
}

// COPY EMAIL
function setupCopyEmailButton() {
  const copyEmailLink = document.getElementById("email");

  if (copyEmailLink) {
    copyEmailLink.addEventListener("click", function () {
      const email = "emir.webdevs@gmail.com";

      navigator.clipboard
        .writeText(email)
        .then(function () {
          alert("Email copied to clipboard!");
          console.log("Email copied to clipboard!");
        })
        .catch(function (error) {
          console.error("Failed to copy email: ", error);
        });
    });
  } else {
    console.error("Element with id 'email' not found!");
  }
}

// FOOTER
const date = new Date();
const year = date.getFullYear();
const month = date.toLocaleString("en-US", { month: "long" });
const day = date.getDate();

function getDayWithSuffix(day) {
  if (day >= 11 && day <= 13) return `${day}th`;
  const lastDigit = day % 10;
  if (lastDigit === 1) return `${day}st`;
  if (lastDigit === 2) return `${day}nd`;
  if (lastDigit === 3) return `${day}rd`;
  return `${day}th`;
}

// FOOTER
function setupFooterDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.toLocaleString("en-US", { month: "long" });
  const day = date.getDate();

  function getDayWithSuffix(day) {
    if (day >= 11 && day <= 13) return `${day}th`;
    const lastDigit = day % 10;
    if (lastDigit === 1) return `${day}st`;
    if (lastDigit === 2) return `${day}nd`;
    if (lastDigit === 3) return `${day}rd`;
    return `${day}th`;
  }

  const fullDate = ` ${year}, ${month} ${getDayWithSuffix(day)}`;
  const dateSpan = document.getElementById("year-month");

  if (dateSpan) {
    dateSpan.textContent = fullDate;
  }
}
