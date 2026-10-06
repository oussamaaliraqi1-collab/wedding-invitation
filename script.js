const eventDate =
  new Date("2027-02-02T16:00:00").getTime();


function updateCountdown() {

  const now =
    new Date().getTime();

  const difference =
    eventDate - now;


  const days =
    Math.floor(
      difference /
      (1000 * 60 * 60 * 24)
    );


  const hours =
    Math.floor(
      (difference /
      (1000 * 60 * 60)) % 24
    );


  const minutes =
    Math.floor(
      (difference /
      (1000 * 60)) % 60
    );


  const seconds =
    Math.floor(
      (difference / 1000) % 60
    );


  document.getElementById("days")
    .textContent = days;

  document.getElementById("hours")
    .textContent = hours;

  document.getElementById("minutes")
    .textContent = minutes;

  document.getElementById("seconds")
    .textContent = seconds;

}


setInterval(
  updateCountdown,
  1000
);

updateCountdown();



/* MUSIC */

const musicButton =
  document.getElementById(
    "musicButton"
  );

const weddingMusic =
  document.getElementById(
    "weddingMusic"
  );


let musicPlaying = false;


musicButton.addEventListener(
  "click",
  function() {

    if (musicPlaying) {

      weddingMusic.pause();

      musicButton.textContent =
        "🎵";

      musicPlaying = false;

    } else {

      weddingMusic.play();

      musicButton.textContent =
        "⏸";

      musicPlaying = true;

    }

  }
);



/* GALLERY */

const galleryImages =
  document.querySelectorAll(
    ".gallery img"
  );

const imageViewer =
  document.getElementById(
    "imageViewer"
  );

const bigImage =
  document.getElementById(
    "bigImage"
  );

const closeViewer =
  document.getElementById(
    "closeViewer"
  );


galleryImages.forEach(
  function(image) {

    image.addEventListener(
      "click",
      function() {

        bigImage.src =
          image.src;

        imageViewer.style.display =
          "flex";

      }
    );

  }
);


closeViewer.addEventListener(
  "click",
  function() {

    imageViewer.style.display =
      "none";

  }
);
