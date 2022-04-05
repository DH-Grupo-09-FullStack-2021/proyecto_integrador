window.addEventListener("load",function(){
    let formularioLogin= document.querySelector("form.flexbox-formulario");
    formularioLogin.addEventListener("submit",function(event){


        let errores=[]

        let email= document.querySelector("input.formulario-input-box-email-login")

        if(email.value == ""){
            errores.push("Debe ingresar un email");
        }
        let contrasena=document.querySelector("input.formulario-input-box-contrasena-login")

        if(contrasena.value == ""){
            errores.push("Debe ingresar una contraseña")
        }
        if(errores.length>0){
            event.preventDefault

            let mensajeErrores= document.querySelector("div.errores lu");
            for(let i= 0; i < errores.length;i++){
                mensajeErrores.innerHTML += "<li>"+ errores[i] + "</li>" 
            }
        }
    })
})