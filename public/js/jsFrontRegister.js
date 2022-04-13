window.addEventListener("load",function(){
    let formularioRegister= document.querySelector("form.flexbox-formulario-r");
    formularioRegister.addEventListener("submit",function(event){
        
        let nombreUsuario= document.querySelector("input.formulario-input-box")
        let errores=[];

        if(nombreUsuario.value == " "){
            errores.push(1);
            let validacion= document.querySelector("section.errorNombreUsuario")
            validacion.innerHTML ="Debe ingresar un nombre de usuario";
            validacion.style.color="red"
        } else if(nombreUsuario.value.length <= 5){
            errores.push(1);
            let validacion= document.querySelector("section.errorNombreUsuario")
            validacion.innerHTML ="El nombre de usuario debe tener al menos 5 caracteres";
            validacion.style.color="red"
        }

        let emailRegister= document.querySelector("input.formulario-input-box-email-register")

        if(emailRegister.value == ""){
            errores.push(1);
            let validacion= document.querySelector("section.ErrorEmail")
            validacion.innerHTML ="Debe ingresar un email valido";
            validacion.style.color="red"
        }

        let contrasenaRegister=document.querySelector("input.formulario-input-box-contrasena-register")
        if(contrasenaRegister.value == ""){
            errores.push(1);
            let validacion= document.querySelector("section.errorContraseña")
            validacion.innerHTML ="Debe ingresar una constraseña";
            validacion.style.color="red"
            
        }

        let contrasenaRegister2=document.querySelector("input.formulario-input-box-contrasena-register2")
        if(contrasenaRegister2.value == ""){
            errores.push(1);
            let validacion= document.querySelector("section.errorContraseña2")
            validacion.innerHTML ="Debe ingresar una constraseña";
            validacion.style.color="red"
            
         }else if(contrasenaRegister != contrasenaRegister2){
            errores.push(1);
            let validacion= document.querySelector("section.errorContraseña2")
            validacion.innerHTML ="Las contraseñas no coinciden";
            validacion.style.color="red"
         }

         let checkbox=document.querySelector("input.formulario-checkbox").checked
         if(checkbox == false){
            errores.push(1);
            let validacion= document.querySelector("section.errorCheckbox")
            validacion.innerHTML ="Las contraseñas no coinciden";
            validacion.style.color="red"
         }
         if(errores.length>0){
            event.preventDefault();
        }        
        })

}) 