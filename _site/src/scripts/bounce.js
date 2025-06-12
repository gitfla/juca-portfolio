document.addEventListener("DOMContentLoaded", function () {
    const dvd = document.getElementById("dvd-logo");

    let posX = 100;
    let posY = 100;
    let velX = 2;
    let velY = 2;

    const move = () => {
        const screenW = window.innerWidth;
        const screenH = window.innerHeight;
        const rect = dvd.getBoundingClientRect();

        if (posX + rect.width >= screenW || posX <= 0) velX *= -1;
        if (posY + rect.height >= screenH || posY <= 0) velY *= -1;

        posX += velX;
        posY += velY;

        dvd.style.left = `${posX}px`;
        dvd.style.top = `${posY}px`;

        requestAnimationFrame(move);
    };

    move();
});