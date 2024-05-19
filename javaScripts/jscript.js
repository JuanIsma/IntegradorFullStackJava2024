

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

 


//==========================================================================================================================


 
// Función para truncar el texto a un máximo de caracteres
function mostrarTextoHasta(texto, maxCaracteres) {
	if (texto.length <= maxCaracteres) {
	  return texto;
	}
	return texto.substring(0, maxCaracteres) + '...';
  }






  
 
let pagina = 1;
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

btnSiguiente.addEventListener('click', () => {
	if(pagina < 1000){
		pagina += 1;
		cargarPeliculasPopulares();
	}
});

btnAnterior.addEventListener('click', () => {
	if(pagina > 1){
		pagina -= 1;
		cargarPeliculasPopulares();
	}
});

// Cargar películas populares con paginación
//  <h4 class="titulo2">${pelicula.overview}</h4>
const cargarPeliculasPopulares = async () => {
	try {
		const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=192e0b9821564f26f52949758ea3c473&language=es-MX&page=${pagina}`);
		
		if(respuesta.status === 200){
			const datos = await respuesta.json();
			console.log(datos);
			let peliculas = '';

			
			datos.results.forEach(pelicula => {
				// Convertir la fecha de lanzamiento a un objeto Date
				let fechaLanzamiento = new Date(pelicula.release_date);
				
				// Obtener solo el año
				let añoLanzamiento = fechaLanzamiento.getFullYear();
			
			    // Truncar el overview a un máximo de 20 caracteres
				const overviewTruncado = mostrarTextoHasta(pelicula.overview, 115 );
				// Agregar el año al HTML
				peliculas += `
					<div  class="pelicula"  >
						<h4 class="titulo2">${añoLanzamiento}</h4><br>
						<img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}"   >
						<h3 class="tituloPelicula">${pelicula.title}</h3>
						<h3 class="tituloResumen">${overviewTruncado}</h3>
					</div>
 
				`;
			});


			document.getElementById('peliculasonline').innerHTML = peliculas;
		} else if(respuesta.status === 401){
			console.log('Pusiste la llave mal');
		} else if(respuesta.status === 404){
			console.log('La película que buscas no existe');
		} else {
			console.log('Hubo un error y no sabemos qué pasó');
		}
	} catch(error) {
		console.log(error);
	}
}

  

// Inicializa cargando las películas populares
cargarPeliculasPopulares();


 




 
 

//==========================================================================================================================
 




document.addEventListener("DOMContentLoaded", function() {
    // Función para desplazar la página hacia arriba
    function desplazarArriba() {
      window.scrollBy(0, -2600); // Ajusta el valor -50 a la cantidad de píxeles que deseas desplazar hacia arriba
    }

    // Obtener los botones por su ID
    const btnAnterior = document.getElementById("btnAnterior");
    const btnSiguiente = document.getElementById("btnSiguiente");

    // Añadir evento de clic a los botones
    btnAnterior.addEventListener('click', desplazarArriba);
    btnSiguiente.addEventListener('click', desplazarArriba);
  });