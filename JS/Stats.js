var stats = document.getElementById("stats")

//Separar por categorias 

function initStats() {
    console.log(eventos)

    var categorias = []

    var unique = eventos.map(eventos => eventos.category) // separar eventos
    const deleteRepeat = new Set(unique)
    categorias = [...quitoRepetidas]

    console.log(categorias)
    
    var porCategorias = []
}