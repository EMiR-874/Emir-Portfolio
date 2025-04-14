//LOADING ANIMATION
let videoEnded = false;
let pageLoaded = false;

function fadeOutLoader() {
  const loader = document.getElementById("loader");
  document.body.classList.remove("no-scroll");

  loader.classList.add("fade-out");

  setTimeout(() => {
    loader.style.display = "none";
  }, 500);
}

function checkReady() {
  if (videoEnded && pageLoaded) {
    fadeOutLoader();
  }
}

if (!sessionStorage.getItem("loaderShown")) {
  sessionStorage.setItem("loaderShown", "true");

  window.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("no-scroll");

    const video = document.getElementById("loader-video");
    const videoSource = document.getElementById("video-source");

    const body = document.body;
    const savedTheme = localStorage.getItem("theme");
    const isDark = savedTheme === "dark" || body.classList.contains("darkModeToggled");

    videoSource.src = isDark
      ? "/!Emir-Portfolio-Loading-Animation_dark.mp4"
      : "/!Emir-Portfolio-Loading-Animation_light.mp4";

    video.load();

    video.oncanplay = () => {
      video.play().catch((err) => {
        console.warn("Autoplay blocked:", err);
      });
    };

    video.onended = () => {
      videoEnded = true;
      checkReady();
    };
  });

  window.addEventListener("load", () => {
    pageLoaded = true;
    checkReady();
  });
} else {
  document.getElementById("loader").style.display = "none";
  document.body.classList.remove("no-scroll");
}
//
//
//
//FULLSCREAN IMAGE
const showImageButtons = document.querySelectorAll(".showImage");
const fullscreenImages = document.querySelectorAll(".f_imgae");
const closeButtons = document.querySelectorAll(".closeImageIcon");

function disableScroll() {
  document.body.style.overflow = "hidden";
}

function enableScroll() {
  document.body.style.overflow = "";
}

showImageButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    fullscreenImages[index].classList.remove("hiddenFullscreanImage");
    disableScroll();
  });
});

closeButtons.forEach((closeButton, index) => {
  closeButton.addEventListener("click", () => {
    fullscreenImages[index].classList.add("hiddenFullscreanImage");
    enableScroll();
  });
});

fullscreenImages.forEach((imageContainer) => {
  imageContainer.addEventListener("click", (event) => {
    if (event.target === imageContainer) {
      imageContainer.classList.add("hiddenFullscreanImage");
      enableScroll();
    }
  });
});
