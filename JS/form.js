function actionForm(event){
    event.preventDefault()
    
let formData = {
    nombre: event.target[0].value,
    correo: event.target[1].value,
    mensaje: event.target[2].value
}
    console.log(formData)
    swal({
        title: "Gracias " + formData.nombre + " por dejarnos tu comentario, a la brevedad nos contactaremos.",
        icon: "success",
        button: "Continuar",
    })
}

