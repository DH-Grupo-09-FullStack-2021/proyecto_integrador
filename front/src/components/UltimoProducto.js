import './UltimoProducto.css';
import React,{useState,useEffect} from "react";

function UltimoProducto(){
  const [UltimoProducto, setUltimoProducto]= useState([])

    useEffect(()=>{
      fetch("https://tp-grupo9-dh.herokuapp.com/products/api/")
        .then(response => response.json())
        .then(data =>{
          setUltimoProducto(data.products)
        })
    },[])

    useEffect(()=>{
      console.log("se actualizo el componente")
    },[UltimoProducto])


    return(
      <ul className='ultimoproducto'>
        {UltimoProducto.length === 0 && <p>Cargando...</p>}
        {
          UltimoProducto.filter(producto=>producto.id===8).map((producto,i)=>{
            return(
              <li key={i}>
                <h3>nombre: {producto.name}</h3>
                <h3>precio: {producto.price}</h3>
                <h3>descripcion: {producto.desc}</h3>
                <img src={producto.img} alt="imagen"/>
              </li>
            )
          })
        }
    </ul>
    )
  }
export default UltimoProducto;
  