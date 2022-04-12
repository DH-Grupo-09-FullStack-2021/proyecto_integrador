window.addEventListener("load",function(){
    let formularioLogin= document.querySelector("form.flexbox-formulario");
    formularioLogin.addEventListener("submit",function(event){


        let errores=[];
        let email= document.querySelector("input.formulario-input-box-email-login")

        if(email.value == ""){
            errores.push(1);
            let validacion= document.querySelector("section.errorEmail")
            validacion.innerHTML ="Debe ingresar un email registrado";
            validacion.style.color="red"
        }
        let contrasena=document.querySelector("input.formulario-input-box-contrasena-login")

        if(contrasena.value == ""){
            errores.push(1)
            let validacion=document.querySelector("section.errorContraseña")
            validacion.innerHTML ="Debe ingresar una contraseña"
            validacion.style.color="red"
        }
        if(errores.length>0){
            event.preventDefault
        }
    })
})