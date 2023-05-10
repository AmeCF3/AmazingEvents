const fechaBase = dataAmazing.fechaActual;
let eventos = dataAmazing.eventos

//FILTROS EVENTOS POR FECHA
const eventosFuturos = eventos.filter(eventos => eventos.date > fechaBase);
const eventosPasados = eventos.filter(eventos => eventos.date < fechaBase);

let nombreEventos = document.getElementById("allEvents")
let contenedorFiltros = document.getElementsByClassName("container_searches")
var textoHTML = document.getElementById("form")

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
            index = 1;
            textoHTML.innerHTML = "";
            display(eventosFuturos);
            break;
        case "past":
            index = 2;
            textoHTML.innerHTML = "";
            display(eventosPasados);
            break;
        case "contact":
            index = 3;
            nombreEventos.innerHTML = "";
            printForm();
            break;
        case "stats":
            index = 4;
            nombreEventos.innerHTML = "";
            textoHTML.innerHTML = "";
            display();
            break;
        default:
            index = 0;
            textoHTML.innerHTML = "";
            display(eventos);
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
function display(array) {
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
        case 0: display(eventos)
            selectNav[0].classList.add('active')
            selectNav[1].classList.remove('active')
            selectNav[2].classList.remove('active')
            selectNav[3].classList.remove('active')
            selectNav[4].classList.remove('active')
            document.getElementById("headDinamico").innerHTML = buttonNav[i]
            break;
        case 1: display(eventosFuturos)
            selectNav[0].classList.remove('active')
            selectNav[1].classList.add('active')
            selectNav[2].classList.remove('active')
            selectNav[3].classList.remove('active')
            selectNav[4].classList.remove('active')
            document.getElementById("headDinamico").innerHTML = buttonNav[i]
            break;
        case 2: display(eventosPasados)
            selectNav[0].classList.remove('active')
            selectNav[1].classList.remove('active')
            selectNav[2].classList.add('active')
            selectNav[3].classList.remove('active')
            selectNav[4].classList.remove('active')
            document.getElementById("headDinamico").innerHTML = buttonNav[i]
            textoHTML.innerHTML = ""
            break;
        case 3: printForm()
            selectNav[0].classList.remove('active')
            selectNav[1].classList.remove('active')
            selectNav[2].classList.remove('active')
            selectNav[3].classList.add('active')
            selectNav[4].classList.remove('active')
            document.getElementById("headDinamico").innerHTML = buttonNav[i]
            nombreEventos.innerHTML = ""
            break;
        case 4: display(eventos)
            selectNav[0].classList.remove('active')
            selectNav[1].classList.remove('active')
            selectNav[2].classList.remove('active')
            selectNav[3].classList.remove('active')
            selectNav[4].classList.add('active')
            document.getElementById("headDinamico").innerHTML = buttonNav[i]
            nombreEventos.innerHTML = ""
            textoHTML.innerHTML = ""

    }
}
