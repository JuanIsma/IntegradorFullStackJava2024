

let slideIndex = 1; // Empezamos en el primer elemento real
let isTransitioning = false; // Para evitar que se ejecute la transición múltiples veces

function moveSlide(n) {
    if (isTransitioning) return;
    isTransitioning = true;

    const carousel = document.querySelector('.carousel');
    const slides = document.querySelectorAll('.carousel img');
    const slideWidth = slides[0].offsetWidth; // Ancho de cada imagen

    slideIndex += n;

    carousel.style.transition = 'transform 0.5s ease';

    // Calcular el desplazamiento
    const offset = -slideIndex * slideWidth;
    carousel.style.transform = `translateX(${offset}px)`;

    // Cuando termina la transición
    carousel.addEventListener('transitionend', () => {
        // Si llegamos al final, volver al primer elemento real
        if (slideIndex >= slides.length - 1) {
            slideIndex = 1;
            carousel.style.transition = 'none'; // Desactivar la transición para un cambio instantáneo
            carousel.style.transform = `translateX(${-slideIndex * slideWidth}px)`;
        }
        // Si llegamos al principio, volver al último elemento real
        else if (slideIndex <= 0) {
            slideIndex = slides.length - 2;
            carousel.style.transition = 'none'; // Desactivar la transición para un cambio instantáneo
            carousel.style.transform = `translateX(${-slideIndex * slideWidth}px)`;
        }

        isTransitioning = false; // Permitir que se ejecute otra transición
    });
}

// Desplazar automáticamente cada cierto tiempo
setInterval(() => {
    moveSlide(1);
}, 3000); // Cambiar cada 3 segundos (ajustar según sea necesario)





 
