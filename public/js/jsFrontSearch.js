window.addEventListener("load", function()
{
    let searchForm= document.querySelector("form.boton-estilizado");
    searchForm.addEventListener("submit", function (event)
    {
        if (document.querySelector("input.subclase-boton-est").value.trim() == "")
            event.preventDefault();
    });
});
