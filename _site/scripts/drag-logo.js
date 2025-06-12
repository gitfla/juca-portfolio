const logo = document.getElementById("dvd-logo");

let x = 100;
let y = 100;
let dx = 2;
let dy = 2;
const logoWidth = 100;  // adjust to your logo size
const logoHeight = 100; // adjust to your logo size

// Try to load saved position and direction from localStorage
const saved = localStorage.getItem("logoState");
if (saved) {
    const state = JSON.parse(saved);
    x = state.x;
    y = state.y;
    dx = state.dx;
    dy = state.dy;
}

let dragging = false;

function bounce() {
    if (dragging) {
        requestAnimationFrame(bounce);
        return;
    }

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    x += dx;
    y += dy;

    // Clamp inside viewport (important if window resized smaller)
    x = Math.min(Math.max(0, x), screenWidth - logoWidth);
    y = Math.min(Math.max(0, y), screenHeight - logoHeight);

    // Bounce off edges
    if (x <= 0 || x + logoWidth >= screenWidth) dx = -dx;
    if (y <= 0 || y + logoHeight >= screenHeight) dy = -dy;

    logo.style.left = x + "px";
    logo.style.top = y + "px";

    // Save position and direction
    localStorage.setItem(
        "logoState",
        JSON.stringify({ x, y, dx, dy })
    );

    requestAnimationFrame(bounce);
}

// Mouse move handler when dragging
function onMouseMove(e) {
    x = e.clientX - logoWidth / 2;
    y = e.clientY - logoHeight / 2;

    // Clamp to viewport
    x = Math.min(Math.max(0, x), window.innerWidth - logoWidth);
    y = Math.min(Math.max(0, y), window.innerHeight - logoHeight);

    logo.style.left = x + "px";
    logo.style.top = y + "px";
}

// Toggle dragging on logo click
logo.addEventListener("click", () => {
    dragging = !dragging;

    if (dragging) {
        dx = -dx;
        dy = -dy;
        // Enter dragging mode
        logo.style.cursor = "none";
        document.body.style.cursor = "auto";
        document.addEventListener("mousemove", onMouseMove);
    } else {
        // Exit dragging mode
        logo.style.cursor = "pointer";
        document.body.style.cursor = "auto";
        document.removeEventListener("mousemove", onMouseMove);

        // Save position after drag ends
        localStorage.setItem(
            "logoState",
            JSON.stringify({ x, y, dx, dy })
        );
    }
});

// Initialize style for absolute positioning
logo.style.position = "fixed";
logo.style.width = logoWidth + "px";
logo.style.height = logoHeight + "px";
logo.style.left = x + "px";
logo.style.top = y + "px";
logo.style.cursor = "pointer";

bounce();