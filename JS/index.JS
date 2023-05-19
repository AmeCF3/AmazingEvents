let fechaBase;
let eventos;
let searchContainer = document.getElementById("searches_container");
let inputSearch = document.getElementById("buscador");
let nombreEventos = document.getElementById("allEvents");
let contenedorFiltros = document.getElementsByClassName("container_searches");
let modalComentario = document.getElementById("modalComentario");
let textoHTML = document.getElementById("form");
let search = "";
let arrayAFiltrar = [];
let checkedCheckbox = [];

async function getData() {
  try {
    const response = await fetch("https://amd-amazingevents-api.onrender.com/api/eventos");
    const data = await response.json();

    if (Array.isArray(data.eventos)) {
      eventos = data.eventos;
      fechaBase = data.fechaActual;

      // Llamar a la función imprimir después de obtener los datos
      imprimir("home");
    } else {
      console.error("La respuesta de la API no contiene un array válido de eventos:", data);
    }
  } catch (error) {
    console.error("Error al obtener los datos:", error);
  }
}

// Llamar a la función getData al cargar la página
window.addEventListener('load', function () {
  getData().then(() => {
    imprimir("home");
  });
});


// RESALTAR BOTONES DEL NAVBAR Y MOSTRAR DIFERENTES PÁGINAS
var selectNav = document.querySelectorAll(".link_nav");
var buttonNav = [];

for (var i = 0; i < selectNav.length; i++) {
  const element = selectNav[i];
  buttonNav.push(selectNav[i].innerText);
  element.addEventListener("click", function (e) {
    document.getElementById("headDinamico").innerHTML = e.target.innerText;
    imprimir(e.target.id);
  });
}



//FUNCIÓN PARA CAMBIAR DE PÁGINA, HEADER Y RESALTAR BOTONES NAVBAR
function imprimir(id) {
  let eventosFuturos;
  let eventosPasados;
  let index = 0;

  switch (id) {
    case "upcoming":
      eventosFuturos = eventos.filter(evento => evento.date > fechaBase);
      arrayAFiltrar = eventosFuturos;
      index = 1;
      inputSearch.value = "";
      checkedCheckbox = [];
      searchContainer.style.display = "flex";
      nombreEventos.style.display = "flex";
      textoHTML.innerHTML = "";
      print(eventosFuturos);
      allCategories(eventosFuturos);
      window.history.replaceState(null, null, window.location.origin + "/index.html?time=upcomingEvents");
      break;
    case "past":
      eventosPasados = eventos.filter(evento => evento.date < fechaBase);
      arrayAFiltrar = eventosPasados;
      index = 2;
      searchContainer.style.display = "flex";
      textoHTML.innerHTML = "";
      inputSearch.value = "";
      checkedCheckbox = [];
      print(eventosPasados);
      allCategories(eventosPasados);
      window.history.replaceState(null, null, window.location.origin + "/index.html?time=pastEvents");
      break;
    case "contact":
      index = 3;
      searchContainer.style.display = "none";
      nombreEventos.innerHTML = "";
      printForm();
      window.history.replaceState(null, null, window.location.origin + "/index.html?time=contact");
      break;
    case "stats":
      index = 4;
      searchContainer.style.display = "none";
      nombreEventos.innerHTML = "";
      textoHTML.innerHTML = "";
      imprimirStats();
      window.history.replaceState(null, null, window.location.origin + "/index.html?time=stats");
      break;
    default:
      if (Array.isArray(eventos)) {
        arrayAFiltrar = eventos;
        index = 0;
        searchContainer.style.display = "flex";
        textoHTML.innerHTML = "";
        inputSearch.value = "";
        checkedCheckbox = [];
        print(eventos);
        allCategories(eventos);
        window.history.replaceState(null, null, window.location.origin + "/index.html?time=home");
      } else {
        console.error("eventos no es un array válido:", eventos);
      }
  }

  selectNav.forEach(function (element, i) {
    if (i === index) {
      element.classList.add('active');
    } else {
      element.classList.remove('active');
    }
  });
}

//FUNCION PARA LAS CARDS
function print(eventosArray) {
  if (Array.isArray(eventosArray)) {
    const eventosHTML = eventosArray.map(evento =>
      `
      <div class="card_container">
        <div class="item_image">
          <img class="img_pages" src="${evento.image}" alt="${evento.name}">
        </div>
        <div class="item_description">
          <h4 style="color: #DC046C;">${evento.name}</h4>
        </div>
        <div class="item_details">
          <p>$${evento.price}</p>
          <a class="button_index" href="./Pages/Details.html?id=${evento.id}">Más detalles</a>
        </div>
      </div>
      `
    ).join("");

    nombreEventos.innerHTML = eventosHTML;
  } else {
    // Manejar la situación cuando eventosArray no es un array válido
    console.error("eventosArray no es un array válido:", eventosArray);
  }
}

//NAVEGACION ENTRE PÁGINAS
function navigateToPage(time) {
  switch (time) {
    case "pastEvents":
      changePage(2);
      break;
    case "upcomingEvents":
      changePage(1);
      break;
    case "contact":
      changePage(3);
      break;
    case "estadistica":
      changePage(4);
      break;
    default:
      changePage(0);
  }

  const url = window.location.origin + "/index.html?time=" + time + window.location.hash;
  window.history.replaceState(null, null, url);

  // Establecer el nombre del case
  const caseName = time.charAt(0).toUpperCase() + time.slice(1);
  setState("paginaANavegar", caseName);
  ChangeTemplateLayaout();
}

//FORMULARIO DE CONTACTO 
function printForm() {
  textoHTML.innerHTML = `
    <div class="general_container">
      <div class="img_contac_container">
        <img class="img_contact_item" src="../Images/contactimage.png" alt="Contacto">
      </div>
      <form class="form_container">
        <div class="mb-3">
          <label class="form-label">Nombre:</label>
          <input type="text" class="form-control" id="nombreInput" placeholder="nombre completo">
        </div>
        <div class="mb-3">
          <label class="form-label">Email:</label>
          <input type="email" class="form-control" id="emailInput" placeholder="email@ejemplo.com">
        </div>
        <div class="mb-3">
          <label class="form-label">Mensaje:</label>
          <textarea class="form-control" id="mensajeInput" rows="5"></textarea>
        </div>
        <div class="button_contact_container">
          <input type="submit" id="buttonform" class="item_button_contacto" value="Contactar">
        </div>
      </form>
    </div>`;
}

//CAROUSEL
let buttonPrev = document.getElementById("before") // flecha izquierda
buttonPrev.addEventListener("click", function (e) {
  var page = document.getElementById("headDinamico").innerText;
  if (buttonNav.indexOf(page) == 0) {
    changePage(4);
  } else {
    changePage(buttonNav.indexOf(page) - 1);
  }
});

let buttonNext = document.getElementById("after") //flecha derecha
buttonNext.addEventListener("click", function (e) {
  var page = document.getElementById("headDinamico").innerText;
  if (buttonNav.indexOf(page) == 4) {
    changePage(0);
  } else {
    changePage(buttonNav.indexOf(page) + 1);
  }
});

function changePage(i) {
  let eventosFuturos;
  let eventosPasados;
  switch (i) {
    case 0:
      selectNav[0].classList.add('active');
      selectNav[1].classList.remove('active');
      selectNav[2].classList.remove('active');
      selectNav[3].classList.remove('active');
      selectNav[4].classList.remove('active');
      document.getElementById("headDinamico").innerHTML = buttonNav[i];
      searchContainer.style.display = "flex";
      arrayAFiltrar = eventos;
      if (Array.isArray(eventos)) {
        allCategories(eventos);
        print(eventos);
      }
      inputSearch.value = "";
      window.history.replaceState(null, null, window.location.origin + "/index.html?time=home");
      break;
    case 1:
      eventosFuturos = eventos.filter(evento => evento.date > fechaBase);
      selectNav[0].classList.remove('active');
      selectNav[1].classList.add('active');
      selectNav[2].classList.remove('active');
      selectNav[3].classList.remove('active');
      selectNav[4].classList.remove('active');
      document.getElementById("headDinamico").innerHTML = buttonNav[i];
      searchContainer.style.display = "flex";
      arrayAFiltrar = eventosFuturos;
      if (Array.isArray(eventosFuturos)) {
        allCategories(eventosFuturos);
        print(eventosFuturos);
      }
      window.history.replaceState(null, null, window.location.origin + "/index.html?time=upcomingEvents");
      break;
    case 2:
      eventosPasados = eventos.filter(evento => evento.date < fechaBase);
      selectNav[0].classList.remove('active');
      selectNav[1].classList.remove('active');
      selectNav[2].classList.add('active');
      selectNav[3].classList.remove('active');
      selectNav[4].classList.remove('active');
      document.getElementById("headDinamico").innerHTML = buttonNav[i];
      textoHTML.innerHTML = "";
      searchContainer.style.display = "flex";
      arrayAFiltrar = eventosPasados;
      if (Array.isArray(eventosPasados)) {
        allCategories(eventosPasados);
        print(eventosPasados);
      }
      window.history.replaceState(null, null, window.location.origin + "/index.html?time=pastEvents");
      break;
    case 3:
      printForm();
      selectNav[0].classList.remove('active');
      selectNav[1].classList.remove('active');
      selectNav[2].classList.remove('active');
      selectNav[3].classList.add('active');
      selectNav[4].classList.remove('active');
      document.getElementById("headDinamico").innerHTML = buttonNav[i];
      searchContainer.style.display = "none";
      nombreEventos.innerHTML = "";
      window.history.replaceState(null, null, window.location.origin + "/index.html?time=contact");
      break;
    case 4:
      imprimirStats();
      selectNav[0].classList.remove('active');
      selectNav[1].classList.remove('active');
      selectNav[2].classList.remove('active');
      selectNav[3].classList.remove('active');
      selectNav[4].classList.add('active');
      document.getElementById("headDinamico").innerHTML = buttonNav[i];
      searchContainer.style.display = "none";
      nombreEventos.innerHTML = "";
      textoHTML.innerHTML = "";
      window.history.replaceState(null, null, window.location.origin + "/index.html?time=stats");
      break;
  }
}

// BUSCADOR
inputSearch.addEventListener("keyup", function (eventos) {
    const datoInput = eventos.target.value;
    search = datoInput.trim().toLowerCase();
    filtrosCombinados();
});

// CHECKBOX DINÁMICOS
function allCategories(array) {
    if (!Array.isArray(array)) {
        console.error('El parámetro "array" no es un array válido');
        return;
    }

    const categories = array.map(evento => evento.category);
    const uniqueCategories = [...new Set(categories)];

    const eventCategories = uniqueCategories.map(category =>
        `<label><input class="item_check" type="checkbox" value="${category}">${category}</label>`
    ).join("");

    document.getElementById("checkCategories").innerHTML = eventCategories;
    checkboxFunctional();
}

function checkboxFunctional() {
    const checkboxes = document.querySelectorAll('input[type=checkbox]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", function () {
            chekedCheckbox = Array.from(checkboxes)
                .filter(checkbox => checkbox.checked)
                .map(checkbox => checkbox.value);
            console.log(chekedCheckbox);
            filtrosCombinados();
        });
    });
}

function filtrosCombinados() {
    let filtrados = [];

    if (search !== "" && chekedCheckbox.length > 0) {
        chekedCheckbox.forEach(category => {
            filtrados.push(...arrayAFiltrar.filter(evento =>
                evento.name.toLowerCase().includes(search) && evento.category === category
            ));
        });
    }
    else if (search !== "" && chekedCheckbox.length === 0) {
        filtrados = arrayAFiltrar.filter(evento =>
            evento.name.toLowerCase().includes(search.toLowerCase()));
    }
    else if (search === "" && chekedCheckbox.length > 0) {
        chekedCheckbox.forEach(category => {
            filtrados.push(...arrayAFiltrar.filter(evento =>
                evento.category === category
            ));
        });
    } else {
        filtrados = arrayAFiltrar;
    }

    filtrados.length > 0 ?
        print(filtrados) :
        nombreEventos.innerHTML =
        `<div class="ceroSearch">
            <img class="imgCero" src="../Images/nofoundmin.png" alt="SinResultados">
        </div>`;
}
