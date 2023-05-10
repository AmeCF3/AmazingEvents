const fechaBase = dataAmazing.fechaActual;
let eventos = dataAmazing.eventos
const eventosFuturos = eventos.filter(eventos => eventos.date > fechaBase);
const eventosPasados = eventos.filter(eventos => eventos.date < fechaBase);
let nombreEventos = document.getElementById("eventos")
var buttonNavegacion = []
var textoHTML = document.getElementById("form")


var selectNav = Array.from(document.querySelectorAll(".link_nav"));
var carouselContainer = document.getElementById("carousel");
var carouselPages = []; // Array para almacenar las páginas del carrusel
var activePageIndex = 0;

selectNav.forEach(function (element) {
    element.addEventListener("click", function (e) {
        imprimir(e.target.id);
    });
});

function imprimir(id) {
    var activeClasses = {
        "upcoming": [1],
        "past": [2],
        "contact": [3],
        "stats": [4],
        "home": [0]
    };

    selectNav.forEach(function (element, index) {
        if (activeClasses[id] && activeClasses[id].includes(index)) {
            element.classList.add('active');
        } else {
            element.classList.remove('active');
        }
    });

    switch (id) {
        case "upcoming":
            document.getElementById("headDinamico").innerHTML = "EVENTOS FUTUROS";
            display(eventosFuturos);
            navigateCarousel(0);
            break;
        case "past":
            document.getElementById("headDinamico").innerHTML = "EVENTOS PASADOS";
            display(eventosPasados);
            navigateCarousel(0);
            break;
        case "contact":
            document.getElementById("headDinamico").innerHTML = "CONTACTO";
            printForm();
            // No se realiza navegación en el carrusel cuando se muestra el formulario de contacto
            break;
        case "stats":
            document.getElementById("headDinamico").innerHTML = "ESTADÍSTICAS";
            display();
            navigateCarousel(0);
            break;
        default:
            document.getElementById("headDinamico").innerHTML = "HOME";
            display(eventos);
            navigateCarousel(0);
    }
}

function navigateCarousel(index) {
    activePageIndex = index;

    for (var i = 0; i < carouselPages.length; i++) {
        if (i === activePageIndex) {
            carouselPages[i].style.display = "block";
        } else {
            carouselPages[i].style.display = "none";
        }
    }
}

function display(array) {
    carouselContainer.innerHTML = ""; // Limpiar contenido existente

    for (var i = 0; i < array.length; i++) {
        var page = document.createElement("h1");
        page.classList.add("page");
        page.textContent = array[i];
        carouselContainer.appendChild(page);
        carouselPages.push(page);
    }
}

function printForm() {
    // Lógica para mostrar el formulario de contacto
}

// Lógica adicional para llenar el carrusel con los nombres de las páginas
var navLinks = document.querySelectorAll(".navlink");
var pageNames = [];

navLinks.forEach(function (link) {
    pageNames.push(link.textContent);
});

display(pageNames);