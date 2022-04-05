window.addEventListener("load",function(){
    let formularioRegister= document.querySelector("form.flexbox-formulario-r");
    formularioRegister.addEventListener("submit",function(event){
        
        let nombreUsuario= document.querySelector("input.formulario-input-box")
        let errores=[];

        if(nombreUsuario.value == " "){
            errores.push("Debe ingresar un nombre de usuario");
        } else if(nombreUsuario.value.length < 8){
            errores.push("El nombre de usuario debe tener minimo 8 caracteres")
        }

        let emailRegister= document.querySelector("input.formulario-input-box-email-register")

        if(emailRegister.value == ""){
            errores.push("Debe ingresar un email");
        }

        let contrasenaRegister=document.querySelector("input.formulario-input-box-contrasena-register")
        if(contrasenaRegister.value == ""){
            errores.push("Debe ingresar una contraseña")
        }

        let contrasenaRegister2=document.querySelector("input.formulario-input-box-contrasena-register2")
        if(contrasenaRegister2.value == ""){
            errores.push("Debe ingresar una contraseña")
         }else if(contrasenaRegister != contrasenaRegister2){
            errores.push("No coinciden las contraseñas")
         }

         let checkbox=document.querySelector("input.formulario-checkbox").checked
         if(checkbox == false){
            errores.push("Debe aceptar los terminos y condiciones ")
         }
         if(errores.length>0){
            event.preventDefault

            let mensajeErrores= document.querySelector("div.errores ul");
            for(let i= 0; i < errores.length;i++){
                mensajeErrores.innerHTML += "<li>"+ errores[i]+ "</li>" 
            }
        }        
        })

}) 