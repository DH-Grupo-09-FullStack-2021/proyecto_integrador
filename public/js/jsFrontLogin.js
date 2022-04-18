window.addEventListener("load",function(){
    let formularioLogin= document.querySelector("form.flexbox-formulario");
    formularioLogin.addEventListener("submit",function(event){


        let errores=[];
        let email= document.querySelector("input.formulario-input-box-email-login")

        if(email.value.trim() == ""){
            errores.push(1);
            let validacion= document.querySelector("section.errorEmail")
            validacion.innerHTML ="Debe ingresar un email registrado";
        }
        let contrasena=document.querySelector("input.formulario-input-box-contrasena-login")

        if(contrasena.value.trim() == ""){
            errores.push(1)
            let validacion=document.querySelector("section.errorContraseña")
            validacion.innerHTML ="Debe ingresar una contraseña"
        }
        if(errores.length>0){
            event.preventDefault();
        }
    })
})
