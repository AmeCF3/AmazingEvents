const fechaBase = dataAmazing.fechaActual;
let eventos = dataAmazing.eventos

//FILTROS EVENTOS POR FECHA
const eventosFuturos = eventos.filter(eventos => eventos.date > fechaBase);
const eventosPasados = eventos.filter(eventos => eventos.date < fechaBase);

let nombreEventos = document.getElementById("allEvents")
let contenedorFiltros = document.getElementsByClassName("container_searches")
var textoHTML = document.getElementById("form")


// RESALTAR BOTONES DEL NAVBAR Y MOSTRAR DIFERENTES PÁGINAS

var selectNav = Array.from(document.querySelectorAll(".link_nav"));
selectNav.forEach(function (element) {
    element.addEventListener("click", function (e) {
        imprimir(e.target.id);
    });
});

//FUNCIÓN PARA CAMBIAR DE PÁGINA, HEADER Y RESALTAR BOTONES NAVABAR
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
            textoHTML.innerHTML = ""
            display(eventosFuturos);
            break;
        case "past":
            document.getElementById("headDinamico").innerHTML = "EVENTOS PASADOS";
            textoHTML.innerHTML = ""
            display(eventosPasados);
            break;
        case "contact":
            document.getElementById("headDinamico").innerHTML = "CONTACTO";
            nombreEventos.innerHTML = ""
            printForm();
            break;
        case "stats":
            document.getElementById("headDinamico").innerHTML = "ESTADÍSTICAS";
            textoHTML.innerHTML = ""
            nombreEventos.innerHTML = ""
            display();
            break;
        default:
            document.getElementById("headDinamico").innerHTML = "HOME";
            textoHTML.innerHTML = ""
            display(eventos);
    }
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
            <p>${item.description}</p>
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
console.log(time);
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
    imprimir("home"); // Manejar el caso en el que no se encuentre un valor válido en time[1]
}


let before = document.getElementById(before) // flecha izquierda
let after = document.getElementById(after) //flecha derecha
let counter = 0;
const cont = selectNav[0]



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







after.addEventListener("click", function (e) {
    var page = document.getElementById("headDinamico")
    if (buttonNav.indexOf(page) == 4) {
        changePage(0)
    } else {
        changePage(buttonNavegacion.indexOf(page) + 1)
    }
})

before.addEventListener("click", function (e) {
    var page = document.getElementById("headDinamico")
    if (buttonNave.indexOf(page) == 0) {
        changePage(4)
    } else {
        changePage(buttonNavegacion.indexOf(page) - 1)
    }
})





// function changePage(i) {
//     switch (i) {
//         case 0: display(eventos)
//             document.getElementById("headDinamico").innerHTML = buttonNavegacion[i]
//             break;
//         case 1: display(eventosFuturos)
//             document.getElementById("headDinamico").innerHTML = buttonNavegacion[i]
//             arrayAFiltrar = eventosFuturos
//             break;
//         case 2: display(eventosPasados)
//             document.getElementById("headDinamico").innerHTML = buttonNavegacion[i]
//             arrayAFiltrar = eventosPasados
//             break;
//         case 3: imprimirFormulario("contact")
//             document.getElementById("headDinamico").innerHTML = buttonNavegacion[i]
//             break;
//         case 4: imprimirStats("stats")
//             document.getElementById("headDinamico").innerHTML = buttonNavegacion[i]
//             break;
//     }
// }