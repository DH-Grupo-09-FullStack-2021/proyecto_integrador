window.addEventListener("load",function(){
    let formularioRegister= document.querySelector("form.flexbox-formulario-r");
    formularioRegister.addEventListener("submit",function(event){
        
        let nombreUsuario= document.querySelector("input.nombreProductoFormSubmit")
        let errores=[];

        if(nombreUsuario.value.trim() == ""){
            errores.push(1);
            let validacion= document.querySelector("section.errorNombre")
            validacion.innerHTML ="Debe ingresar el nombre del producto";
        }

        let emailRegister= document.querySelector("input.formulario-input-box-email-register")

        if(emailRegister.value.trim() == ""){
            errores.push(1);
            let validacion= document.querySelector("section.errorFabricante")
            validacion.innerHTML ="Debe ingresar el nombre del fabricante del producto";
        }

        let contrasenaRegister=document.querySelector("input.formulario-input-box-contrasena-register")
        if(contrasenaRegister.value.trim() == ""){
            errores.push(1);
            let validacion= document.querySelector("section.errorDescripcion")
            validacion.innerHTML ="Debe ingresar una descripción del producto";
        }

        let contrasenaRegister2=document.querySelector("input.formulario-input-box-contrasena-register2")
        if(contrasenaRegister2.value == ""){
            errores.push(1);
            let validacion= document.querySelector("section.errorPrecio")
            validacion.innerHTML ="Debe ingresar el valor comercial del producto";
        }

        let imagenSubmit=document.querySelector("input.formulario-input-box-imagen")
        if(imagenSubmit.value == ""){
            errores.push(1);
            let validacion= document.querySelector("section.errorImagen")
            validacion.innerHTML ="Debe subir una imagen del producto";
        }

         if(errores.length>0){
            event.preventDefault();
        }        
        })

}) 
