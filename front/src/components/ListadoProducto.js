import './ListadoProducto.css';
import React,{useState,useEffect} from "react";

function ListadoProducto(){
  const [ListadoProducto, setListadoProductos]= useState([])

    useEffect(()=>{
      fetch("https://tp-grupo9-dh.herokuapp.com/products/api/")
        .then(response => response.json())
        .then(data =>{
          setListadoProductos(data.products)
        })
    },[])

    useEffect(()=>{
      console.log("se actualizo el componente")
    },[ListadoProducto])

    return(
      <ul className='productos'>
        {ListadoProducto.length === 0 && <p>Cargando...</p>}
        {
          ListadoProducto.map((listaProductos,i)=>{
            return(
              <li key={i}>
                <div className="displaypro">
                <h3>Nombre:</h3><h3 className='enunciado'>{listaProductos.name}</h3>
                </div>
                <div className="displaypro">
                <h3>Precio:</h3><h3 className='enunciado'>{listaProductos.price}</h3>
                </div>
              </li>
            )
          })
        }
    </ul>
    )
  }
export default ListadoProducto;
  
