const eventos = dataAmazing.eventos

console.log(location.search)
var id = location.search.split("?id=").filter(Number)

var selectId = id[0]
console.log(selectId)

//Con los pasos anteriores sacamos el dato de un parametro,
// se le hizo un split y filter para separar y filtrar solo el número

const eventoDetalle = []

for (var i = 0; i < eventos.length; i++) {
    if (eventos[i].id == selectId) {
        eventoDetalle.push(eventos[i])
    }
}

console.log(eventoDetalle[0])

var texto = document.getElementById("prueba")

texto.innerHTML =
    `<div class="containerDetails">
        <div class="container_img_details">
            <img class="image_details" src="../Images/${eventoDetalle[0].image}" alt="Evento">
        </div>
        <div class="containter_description_details">
            <div class="item_title_detils">
                <h2>${eventoDetalle[0].name}</h2>
            </div>
            <div class="item_description_details">
                <p class= "firs_detail" > ${eventoDetalle[0].description}</p>
            </div>
            <div class="more_details">
                <p>Precio: $${eventoDetalle[0].price}</p>
                <p>Fecha: ${eventoDetalle[0].date}</p>
            </div>
            
        </div>
    </div>`
