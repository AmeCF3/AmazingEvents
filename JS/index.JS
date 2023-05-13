const fechaBase = dataAmazing.fechaActual;
let eventos = dataAmazing.eventos
var searchContainer = document.getElementById("searches_container")
var inputSearch = document.getElementById("buscador")
let nombreEventos = document.getElementById("allEvents")
let contenedorFiltros = document.getElementsByClassName("container_searches")
var textoHTML = document.getElementById("form")
let search = ""
let arrayAFiltrar = []
var chekedCheckbox = []

//FILTROS EVENTOS POR FECHA
const eventosFuturos = eventos.filter(eventos => eventos.date > fechaBase);
const eventosPasados = eventos.filter(eventos => eventos.date < fechaBase);


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
    var index = 0;
    switch (id) {
        case "upcoming":
            arrayAFiltrar = eventosFuturos
            index = 1;
            inputSearch.value = ""
            chekedCheckbox = []
            searchContainer.style.display = "flex"
            nombreEventos.style.display = "flex"
            textoHTML.innerHTML = "";
            print(eventosFuturos);
            allCategories(eventosFuturos);
            break;
        case "past":
            arrayAFiltrar = eventosPasados
            index = 2;
            searchContainer.style.display = "flex"
            textoHTML.innerHTML = "";
            inputSearch.value = ""
            chekedCheckbox = []
            print(eventosPasados);
            allCategories(eventosPasados)
            break;
        case "contact":
            index = 3;
            searchContainer.style.display = "none"
            nombreEventos.innerHTML = "";
            printForm();
            break;
        case "stats":
            index = 4;
            searchContainer.style.display = "none"
            nombreEventos.innerHTML = "";
            textoHTML.innerHTML = "";
            display();
            break;
        default:
            arrayAFiltrar = eventos
            index = 0;
            searchContainer.style.display = "flex"
            textoHTML.innerHTML = "";
            inputSearch.value = ""
            chekedCheckbox = []
            print(eventos);
            allCategories(eventos)
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
function print(array) {
    var url = location.pathname == "/Pages/Details.html" ? "./Details.html" : "./Pages/Details.html";
    var imageUrl = location.pathname == "/Pages/Details.html" ? "../Images/" : "./Images/";

    var html = array.map(function (item) {
        return `
        <div class="card_container">
          <div class="item_image">
            <img class="img_pages" src="${imageUrl}${item.image}" alt=${item.name}>
          </div>
          <div class="item_description">
            <h4 style="color: #DC046C;">${item.name}</h4>
            </div>
          <div class="item_details">
            <p>$${item.price}</p>
            <a class="button_index" href="${url}?id=${item.id}">Más detalles</a>
          </div>
        </div>
      `;
    });
    nombreEventos.innerHTML = html;
}

//NAVEGACION ENTRE PÁGINAS
var time = location.search.split("?time=")[1];
if (time) {
    switch (time) {
        case "upcoming":
            imprimir("upcoming");
            break;
        case "past":
            imprimir("past");
            break;
        case "contact":
            imprimir("contact");
            break;
        default:
            imprimir("home");
    }
} else {
    imprimir("home");
}

//FORMULARIO DE CONTACTO 
function printForm() {
    textoHTML.innerHTML =
        `<div class="general_container">
<div class="img_contac_container">
    <img class="img_contact_item" src="../Images/contactimage.png" alt="Contacto">
</div>
<form class="form_container" action="./Contact.html">
    <div class="mb-3">
        <label class="form-label">Nombre:</label>
        <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="nombre completo">
    </div>
    <div class="mb-3">
        <label class="form-label">Email:</label>
        <input type="email" class="form-control" id="exampleFormControlInput2"
            placeholder="email@ejemplo.com">
    </div>
    <div class="mb-3">
        <label class="form-label">Mensaje:</label>
        <textarea class="form-control" id="exampleFormControlTextarea1" rows="5"></textarea>
    </div>
    <div class="button_contact_container">
        <button class="item_button_contacto"> Contactar </button>
    </div>
</form>
</div>
<footer>
<div class="item_copyright">
 <p>©ACNUR Dic/2022</p>
</div>
<div class="item_icons">
 <ul>
     <li><i class="fa-brands fa-instagram"></i></li>
     <li><i class="fa-brands fa-facebook"></i></li>
     <li><i class="fa-brands fa-whatsapp"></i></li>
 </ul>
</div>
</footer>`
}

//CAROUSEL
let buttonPrev = document.getElementById("before") // flecha izquierda
buttonPrev.addEventListener("click", function (e) {
    var page = document.getElementById("headDinamico").innerText
    if (buttonNav.indexOf(page) == 0) {
        changePage(4)
    } else {
        changePage(buttonNav.indexOf(page) - 1)
    }
})

let buttonNext = document.getElementById("after") //flecha derecha
buttonNext.addEventListener("click", function (e) {
    var page = document.getElementById("headDinamico").innerText
    if (buttonNav.indexOf(page) == 4) {
        changePage(0)
    } else {
        changePage(buttonNav.indexOf(page) + 1)
    }
})

function changePage(i) {
    switch (i) {
        case 0: print(eventos)
            selectNav[0].classList.add('active')
            selectNav[1].classList.remove('active')
            selectNav[2].classList.remove('active')
            selectNav[3].classList.remove('active')
            selectNav[4].classList.remove('active')
            document.getElementById("headDinamico").innerHTML = buttonNav[i]
            searchContainer.style.display = "flex"
            arrayAFiltrar = eventos
            allCategories(eventos)
            inputSearch.value = ""
            break;
        case 1: print(eventosFuturos)
            selectNav[0].classList.remove('active')
            selectNav[1].classList.add('active')
            selectNav[2].classList.remove('active')
            selectNav[3].classList.remove('active')
            selectNav[4].classList.remove('active')
            document.getElementById("headDinamico").innerHTML = buttonNav[i]
            searchContainer.style.display = "flex"
            arrayAFiltrar = eventosFuturos
            allCategories(eventosFuturos)
            break;
        case 2: print(eventosPasados)
            selectNav[0].classList.remove('active')
            selectNav[1].classList.remove('active')
            selectNav[2].classList.add('active')
            selectNav[3].classList.remove('active')
            selectNav[4].classList.remove('active')
            document.getElementById("headDinamico").innerHTML = buttonNav[i]
            textoHTML.innerHTML = ""
            searchContainer.style.display = "flex"
            arrayAFiltrar = eventosPasados
            allCategories(eventosPasados)
            break;
        case 3: printForm()
            selectNav[0].classList.remove('active')
            selectNav[1].classList.remove('active')
            selectNav[2].classList.remove('active')
            selectNav[3].classList.add('active')
            selectNav[4].classList.remove('active')
            document.getElementById("headDinamico").innerHTML = buttonNav[i]
            nombreEventos.innerHTML = ""
            searchContainer.style.display = "none"
            break;
        case 4: print(eventos)
            selectNav[0].classList.remove('active')
            selectNav[1].classList.remove('active')
            selectNav[2].classList.remove('active')
            selectNav[3].classList.remove('active')
            selectNav[4].classList.add('active')
            document.getElementById("headDinamico").innerHTML = buttonNav[i]
            nombreEventos.innerHTML = ""
            textoHTML.innerHTML = ""
            searchContainer.style.display = "none"
    }
}

//BUSCADOR
inputSearch.addEventListener("keyup", function (eventos) {
    var datoInput = eventos.target.value
    search = datoInput.trim().toLowerCase()
    filtrosCombinados()
})

//CHECKBOX DINÁMICOS
function allCategories(array) {
    let categories = array.map(eventos => eventos.category)
    let cantNoRepeat = new Set(categories)
    let lastCategories = [...cantNoRepeat]

    let eventCategories = ""
    lastCategories.map(category =>
        eventCategories +=
        `<label><input class="item_check" type="checkbox" value="${category}">${category} </label>`
    )
    document.getElementById("checkCategories").innerHTML = eventCategories
    checkboxFunctional()
}


function checkboxFunctional() {
    var checkbox = document.querySelectorAll('input[type=checkbox')
    for (i = 0; i < checkbox.length; i++) {
        checkbox[i].addEventListener("change", function () {
            chekedCheckbox = []
            for (i = 0; i < checkbox.length; i++) {
                if (checkbox[i].checked) {
                    chekedCheckbox.push(checkbox[i].value)
                }
            }
            console.log(chekedCheckbox)
            filtrosCombinados()
        })
    }
}

function filtrosCombinados() {
    var filtrados = []
    if (search !== "" && chekedCheckbox.length > 0) {
        chekedCheckbox.map(category => filtrados.push(...arrayAFiltrar.filter(eventos =>
            eventos.name.toLowerCase().includes(search) && eventos.category === category)
        ))
    }
    else if (search !== "" && chekedCheckbox.length == 0) {
        filtrados = arrayAFiltrar.filter(eventos => eventos.name.toLowerCase().includes(search))
    }
    else if (search === "" && chekedCheckbox.length > 0) {
        chekedCheckbox.map(category =>
            filtrados.push(...arrayAFiltrar.filter(eventos => eventos.category === category)))
    }
    else {
        filtrados = arrayAFiltrar
    }

    filtrados.length > 0 ?
        print(filtrados) :
        nombreEventos.innerHTML =
        `<div class="ceroSearch">
            <img clas="imgCero" src="../Images/nofoundmin.png" alt="SinResultados">
        </div>`
}