window.addEventListener("load",function(){
    let formularioRegister= document.querySelector("form.flexbox-formulario-r");
    formularioRegister.addEventListener("submit",function(event){
        
        let nombreUsuario= document.querySelector("input.formulario-input-box")

        if(nombreUsuario.value == " "){
            alert("Debe ingresar un nombre de usuario");
        } else if(nombreUsuario.value.length < 8){
            alert("El nombre de usuario debe tener minimo 8 caracteres")
        }

        let emailRegister= document.querySelector("input.formulario-input-box-email-register")

        if(emailRegister.value == ""){
            alert("Debe ingresar un email");
        }

        let contrasenaRegister=document.querySelector("input.formulario-input-box-contrasena-register")
        if(contrasenaRegister.value == ""){
            alert("Debe ingresar una contraseña")
        }

        let contrasenaRegister2=document.querySelector("input.formulario-input-box-contrasena-register2")
        if(contrasenaRegister2.value == ""){
            alert("Debe ingresar una contraseña")
         }else if(contrasenaRegister != contrasenaRegister2){
            alert("No coinciden las contraseñas")
         }

         let checkbox=document.querySelector("input.formulario-checkbox").checked
         if(checkbox == false){
            alert("Debe aceptar los terminos y condiciones ")
         }
        
        })

}) 