// JavaScript code for dynamic typing effect

function typeWriter(text, elementId, speed) {
    let i = 0;
    function type() {
        if (i < text.length) {
            document.getElementById(elementId).innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

document.addEventListener("DOMContentLoaded", function() {
    typeWriter("👋 Hi there, ", "line1", 50); // Speed can be adjusted
    setTimeout(() => typeWriter("I'm Ethan Bober.", "line2", 50), 700); // Start after a delay
});
