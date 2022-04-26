import './UltimoProducto.css';
import React,{useState,useEffect} from "react";

function UltimoProducto(){
  const [UltimoProducto, setUltimoProducto]= useState([])

    useEffect(()=>{
      fetch("https://tp-grupo9-dh.herokuapp.com/products/apilastcreated/")
        .then(response => response.json())
        .then(data =>{
          setUltimoProducto(data.lastProductCreated)
        })
    },[])

    useEffect(()=>{
      console.log("se actualizo el componente")
    },[UltimoProducto])

    let imagen_producto = "https://tp-grupo9-dh.herokuapp.com/public/img/".concat(UltimoProducto.img);
    return(
      <ul className='ultimoproducto'>
        {UltimoProducto.length === 0 && <p>Cargando...</p>}
                <h3>Nombre: {UltimoProducto.name}</h3>
                <h3>Precio: {UltimoProducto.price}</h3>
                <h3>Descripcion: {UltimoProducto.desc}</h3>
                    <img src={imagen_producto} alt="imagen" class="imagen-react-api"/>
    </ul>
    )
  }
export default UltimoProducto;
  
