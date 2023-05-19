let eventos
var id = location.search.split("?id=").filter(Number)
var selectId = id[0]
console.log(selectId)
const eventoDetalle = []

var detalle = "";

async function getData() {
    let datosApi
    await fetch("https://amd-amazingevents-api.onrender.com/api/eventos")
        .then(response => response.json())
        .then(json => datosApi = json)

    eventos = datosApi.eventos
    displayDetails()
}
getData()
//Con los pasos anteriores sacamos el dato de un parametro,
// se le hizo un split y filter para separar y filtrar solo el número


function displayDetails() {
    for (var i = 0; i < eventos.length; i++) {
        var asis_esti = eventos[i].assistance ? "Assistance" : "Estimate"
        if (eventos[i].id == selectId) {
            detalle += `
        <div class="containerDetails">
            <div class="container_img_details">
                <img class="image_details" src="${eventos[i].image}" alt="Evento">
            </div>
            <div class="containter_description_details">
                <div class="item_title_detils">
                    <h2>${eventos[i].name}</h2>
                </div>
                <div class="item_description_details">
                    <p class= "firs_detail" > ${eventos[i].description}</p>
                </div>
                <div class="more_details">
                    <p>Precio: $${eventos[i].price}</p>
                    <p>Fecha: ${eventos[i].date}</p>
                </div>
              </div>
        </div>`
            eventoDetalle.push(eventos[i])
        }
    }
    document.getElementById("prueba").innerHTML = detalle;
}
