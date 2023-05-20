let eventos
var id = location.search.split("?id=").filter(Number)
var selectId = id[0]
console.log(selectId)
const eventoDetalle = []

async function getData() {
    try {
        const response = await fetch("https://amd-amazingevents-api.onrender.com/api/eventos");
        const data = await response.json();

        if (Array.isArray(data.eventos)) {
            eventos = data.eventos;
            displayDetails();
        } else {
            console.error("La respuesta de la API no contiene un array válido de eventos:", data);
        }
    } catch (error) {
        console.error("Error al obtener los datos:", error);
    }
}

getData();

function displayDetails() {
    var detalle = "";
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
