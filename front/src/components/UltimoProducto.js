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
                <div className='display'>
                <h3 >Nombre:</h3><h3 className="enunciado-lista-producto">{UltimoProducto.name}</h3>
                </div>
                <div className='display'>
                <h3>Precio:</h3><h3 className="enunciado-lista-producto">{UltimoProducto.price}</h3>
                </div>
                <div className='display'>
                <h3>Descripcion:</h3 ><h3 className="texto-no-break enunciado-lista-producto">{UltimoProducto.desc}</h3>
                </div>
                <img src={imagen_producto} alt="imagen" class="imagen-react-api"/>
 
    </ul>
    )
  }
export default UltimoProducto;
  
