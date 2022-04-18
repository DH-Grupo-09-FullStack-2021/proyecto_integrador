window.addEventListener("load",function(){
    let formularioRegister= document.querySelector("form.flexbox-formulario-r");
    formularioRegister.addEventListener("submit",function(event){
        
        let nombreUsuario= document.querySelector("input.formulario-input-box")
        let errores=[];

        if(nombreUsuario.value.trim() == ""){
            errores.push(1);
            let validacion= document.querySelector("section.errorNombreUsuario")
            validacion.innerHTML ="Debe ingresar un nombre de usuario";
        } else if(nombreUsuario.value.length <= 8){
            errores.push(1);
            let validacion= document.querySelector("section.errorNombreUsuario")
            validacion.innerHTML ="El nombre de usuario debe tener al menos 8 caracteres";
        }

        let emailRegister= document.querySelector("input.formulario-input-box-email-register")

        if(emailRegister.value.trim() == ""){
            errores.push(1);
            let validacion= document.querySelector("section.ErrorEmail")
            validacion.innerHTML ="Debe ingresar un email valido";
        }

        let contrasenaRegister=document.querySelector("input.formulario-input-box-contrasena-register")
        if(contrasenaRegister.value.trim() == ""){
            errores.push(1);
            let validacion= document.querySelector("section.errorContraseña")
            validacion.innerHTML ="Debe ingresar una constraseña";
        }

        let contrasenaRegister2=document.querySelector("input.formulario-input-box-contrasena-register2")
        if(contrasenaRegister2.value.trim() == ""){
            errores.push(1);
            let validacion= document.querySelector("section.errorContraseña2")
            validacion.innerHTML ="Debe ingresar una constraseña";
         }else if(contrasenaRegister.value != contrasenaRegister2.value){
            errores.push(1);
            let validacion= document.querySelector("section.errorContraseña2")
            validacion.innerHTML ="Las contraseñas no coinciden";
         }

         let checkbox=document.querySelector("input.formulario-checkbox").checked
         if(checkbox == false){
            errores.push(1);
            let validacion= document.querySelector("section.errorCheckbox")
            validacion.innerHTML ="Debe aceptar a los Terminos y Condiciones para registrar una cuenta";
         }
         if(errores.length>0){
            event.preventDefault();
        }        
        })

}) 
