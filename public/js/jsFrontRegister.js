window.addEventListener("load",function(){
    let formularioRegister= document.querySelector("form.flexbox-formulario-r");
    formularioRegister.addEventListener("submit",function(event){
        
        let ABCnombreUsuario= document.querySelector("input.formulario-input-box")
        let errores=[];

        if(ABCnombreUsuario.value.trim() == ""){
            errores.push(1);
            let validacion= document.querySelector("section.errorNombreUsuario")
            validacion.innerHTML ="Debe ingresar un nombre de usuario";
        } else if(ABCnombreUsuario.value.trim().length < 8){
            errores.push(1);
            let validacion= document.querySelector("section.errorNombreUsuario")
            validacion.innerHTML ="El nombre de usuario debe tener al menos 8 caracteres";
        } else if(ABCnombreUsuario.value.trim().length > 32){
            errores.push(1);
            let validacion= document.querySelector("section.errorNombreUsuario")
            validacion.innerHTML ="El nombre de usuario debe respetar el maximo de 32 caracteres";
        }

        let emailRegister= document.querySelector("input.formulario-input-box-email-register")

        if(emailRegister.value.trim() == ""){
            errores.push(1);
            let validacion= document.querySelector("section.ErrorEmail")
            validacion.innerHTML ="Debe ingresar un email valido";
        } else if (!emailRegister.trim().match("^.+@.+$")) {
            errores.push(1);
            let validacion= document.querySelector("section.errorEmail")
	    validacion.innerHTML = "Debe ingresar una direccion de email valida";
	}

        let contrasenaRegister=document.querySelector("input.formulario-input-box-contrasena-register")
        if(contrasenaRegister.value.trim() == ""){
            errores.push(1);
            let validacion= document.querySelector("section.errorContraseña")
            validacion.innerHTML ="Debe ingresar una constraseña";
        } else if(contrasenaRegister.value.trim().length < 8){
            errores.push(1);
            let validacion= document.querySelector("section.errorContraseña")
            validacion.innerHTML ="La contraseña debe tener al menos 8 caracteres";
        } else if(contrasenaRegister.value.trim().length > 32){
            errores.push(1);
            let validacion= document.querySelector("section.errorContraseña")
            validacion.innerHTML ="La contraseña debe respetar el maximo de 32 caracteres";
        }

        let contrasenaRegister2=document.querySelector("input.formulario-input-box-contrasena-register2")
        if(contrasenaRegister2.value.trim() == ""){
            errores.push(1);
            let validacion= document.querySelector("section.errorContraseña2")
            validacion.innerHTML ="Debe ingresar una constraseña";
        }else if(contrasenaRegister.value.trim() != contrasenaRegister2.value.trim()){
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
