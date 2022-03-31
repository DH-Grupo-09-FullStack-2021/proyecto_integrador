window.addEventListener("load",function(){
    let formularioLogin= document.querySelector("form.flexbox-formulario");
    formularioLogin.addEventListener("submit",function(){

        let email= document.querySelector("input.formulario-input-box-email-login")

        if(email.value == ""){
            alert("Debe ingresar un email");
        }
        let contrasena=document.querySelector("input.formulario-input-box-contrasena-login")

        if(contrasena.value == ""){
            alert("Debe ingresar una contraseña")
        }
    })
})