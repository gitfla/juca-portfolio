document.addEventListener("DOMContentLoaded", () => {
    const logo = document.getElementById("dvd-logo");
    if (!logo) return;

    let x = parseInt(localStorage.getItem("logoX")) || 100;
    let y = parseInt(localStorage.getItem("logoY")) || 100;
    let dx = parseFloat(localStorage.getItem("logoDX")) || 2;
    let dy = parseFloat(localStorage.getItem("logoDY")) || 2;

    function moveLogo() {
        const logoWidth = logo.offsetWidth;
        const logoHeight = logo.offsetHeight;

        if (x + logoWidth >= window.innerWidth || x <= 0) dx *= -1;
        if (y + logoHeight >= window.innerHeight || y <= 0) dy *= -1;

        x += dx;
        y += dy;

        logo.style.left = x + "px";
        logo.style.top = y + "px";

        // Save all values
        localStorage.setItem("logoX", x);
        localStorage.setItem("logoY", y);
        localStorage.setItem("logoDX", dx);
        localStorage.setItem("logoDY", dy);

        requestAnimationFrame(moveLogo);
    }

    logo.style.left = x + "px";
    logo.style.top = y + "px";
    requestAnimationFrame(moveLogo);
});