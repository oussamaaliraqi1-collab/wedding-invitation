const intro = document.getElementById("intro");
const envelope = document.getElementById("envelope");
const invitation = document.getElementById("invitation");

const music = document.getElementById("music");
const musicButton = document.getElementById("musicButton");

const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

let musicPlaying = false;
let fireworksStarted = false;


/* =================================
   CANVAS
================================= */

function resizeCanvas() {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);


/* =================================
   OPEN INVITATION
================================= */

envelope.addEventListener("click", () => {

    if (envelope.classList.contains("open")) return;

    envelope.classList.add("open");

    // Give the envelope animation time
    setTimeout(() => {

        intro.classList.add("hide");

        invitation.classList.add("show");

        startMusic();

        setTimeout(() => {
            startFireworks();
        }, 1800);

    }, 1000);

});


/* =================================
   MUSIC
================================= */

function startMusic() {

    /*
        يبدأ من الثانية 1:05
    */

    music.currentTime = 65;

    music.play()
        .then(() => {

            musicPlaying = true;

            musicButton.innerHTML = "♫";

        })
        .catch(error => {

            console.log(
                "Browser prevented autoplay:",
                error
            );

        });

}


musicButton.addEventListener("click", () => {

    if (musicPlaying) {

        music.pause();

        musicPlaying = false;

        musicButton.innerHTML = "🔇";

    } else {

        music.play();

        musicPlaying = true;

        musicButton.innerHTML = "♫";

    }

});


/* =================================
   FIREWORK SYSTEM
================================= */

let particles = [];
let rockets = [];


class Particle {

    constructor(x, y, color) {

        this.x = x;
        this.y = y;

        const angle =
            Math.random() * Math.PI * 2;

        const speed =
            Math.random() * 5 + 1.5;

        this.vx =
            Math.cos(angle) * speed;

        this.vy =
            Math.sin(angle) * speed;

        this.alpha = 1;

        this.decay =
            Math.random() * 0.018 + 0.012;

        this.gravity = 0.045;

        this.size =
            Math.random() * 2 + 1;

        this.color = color;

    }


    update() {

        this.x += this.vx;

        this.y += this.vy;

        this.vy += this.gravity;

        this.vx *= 0.985;

        this.vy *= 0.985;

        this.alpha -= this.decay;

    }


    draw() {

        ctx.save();

        ctx.globalAlpha = this.alpha;

        ctx.fillStyle = this.color;

        ctx.shadowBlur = 12;

        ctx.shadowColor = this.color;

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        ctx.fill();

        ctx.restore();

    }

}


class Rocket {

    constructor() {

        this.x =
            Math.random() * canvas.width;

        this.y =
            canvas.height + 10;

        this.targetY =
            Math.random() *
            canvas.height *
            .45 +
            canvas.height * .15;

        this.speed =
            Math.random() * 6 + 8;

        this.exploded = false;

    }


    update() {

        this.y -= this.speed;

        if (this.y <= this.targetY) {

            this.explode();

            this.exploded = true;

        }

    }


    explode() {

        const colors = [
            "#d7ad55",
            "#f5d98b",
            "#fff3c4",
            "#ffffff"
        ];

        const color =
            colors[
                Math.floor(
                    Math.random() *
                    colors.length
                )
            ];

        for (
            let i = 0;
            i < 90;
            i++
        ) {

            particles.push(
                new Particle(
                    this.x,
                    this.y,
                    color
                )
            );

        }

    }


    draw() {

        ctx.save();

        ctx.fillStyle = "#f5d98b";

        ctx.shadowBlur = 10;

        ctx.shadowColor = "#f5d98b";

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            2,
            0,
            Math.PI * 2
        );

        ctx.fill();

        ctx.restore();

    }

}


/* =================================
   FIREWORK LOOP
================================= */

function animateFireworks() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    // Rockets

    rockets.forEach(
        rocket => {

            rocket.update();

            if (!rocket.exploded) {
                rocket.draw();
            }

        }
    );


    rockets =
        rockets.filter(
            rocket => !rocket.exploded
        );


    // Particles

    particles.forEach(
        particle => {

            particle.update();

            particle.draw();

        }
    );


    particles =
        particles.filter(
            particle =>
                particle.alpha > 0
        );


    requestAnimationFrame(
        animateFireworks
    );

}


function launchFirework() {

    rockets.push(
        new Rocket()
    );

}


function startFireworks() {

    if (fireworksStarted) return;

    fireworksStarted = true;

    animateFireworks();


    // First fireworks

    setTimeout(
        launchFirework,
        200
    );

    setTimeout(
        launchFirework,
        700
    );

    setTimeout(
        launchFirework,
        1300
    );


    // Continue celebration

    setInterval(() => {

        launchFirework();

        if (Math.random() > .45) {

            setTimeout(
                launchFirework,
                300
            );

        }

    }, 1800);

}
