// JavaScript code for a smoother dynamic typing effect

function typeWriter(text, elementId, speed) {
    let i = 0;
    function type() {
        if (i < text.length) {
            let charSpan = document.createElement("span");
            charSpan.textContent = text.charAt(i);
            charSpan.style.opacity = "0";
            charSpan.style.transition = "opacity 0.3s";
            document.getElementById(elementId).appendChild(charSpan);
            
            // Gradually increase opacity to create a fade-in effect
            setTimeout(() => charSpan.style.opacity = "1", 100);

            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

document.addEventListener("DOMContentLoaded", function() {
    typeWriter("Hi there, ", "line1", 80); // Slower speed for smoothness
    setTimeout(() => typeWriter("I'm Ethan Bober.", "line2", 80), 1200); // Start after a delay
});


document.getElementById('goQuakers').addEventListener('click', function() {
    const quakersRect = this.getBoundingClientRect();
    for (let i = 0; i < 200; i++) {
        let confetti = document.createElement('div');
        confetti.className = 'confetti ' + (Math.random() > 0.5 ? 'red' : 'blue');
        confetti.style.left = (quakersRect.left + quakersRect.width / 2) + 'px'; // Start from the center
        confetti.style.top = quakersRect.top + window.scrollY + 'px';
        confetti.style.animationDuration = (3 + Math.random() * 2) + 's'; // Randomize duration

        // Calculate random velocities for X and Y
        let xVelocity = 10 * (Math.random() - 0.5);
        let yVelocity = -15 + Math.random() * -5; // Negative to move upwards

        confetti.setAttribute('data-x-velocity', xVelocity);
        confetti.setAttribute('data-y-velocity', yVelocity);

        document.body.appendChild(confetti);
        
        // Animate the confetti
        setTimeout(() => animateConfetti(confetti), 10);

        // Remove confetti after animation
        setTimeout(() => confetti.remove(), 3000);
    }
});

function animateConfetti(confetti) {
    let xVelocity = parseFloat(confetti.getAttribute('data-x-velocity'));
    let yVelocity = parseFloat(confetti.getAttribute('data-y-velocity'));
    let rotation = Math.random() * 360;

    function update() {
        xVelocity *= 0.99; // Slow down X velocity
        yVelocity *= 0.99; // Slow down Y velocity
        yVelocity += 0.2; // Simulate gravity

        confetti.style.left = (parseFloat(confetti.style.left) + xVelocity) + 'px';
        confetti.style.top = (parseFloat(confetti.style.top) + yVelocity) + 'px';
        confetti.style.transform = 'rotate(' + rotation + 'deg)';

        if (parseInt(confetti.style.top) < window.innerHeight) {
            requestAnimationFrame(update);
        }
    }

    update();
}
