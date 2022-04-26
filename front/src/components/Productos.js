import React,{useState,useEffect} from "react";

function Productos(){
  const [Productos, setProductos]= useState([])

    useEffect(()=>{
      fetch("https://tp-grupo9-dh.herokuapp.com/products/api/")
        .then(response => response.json())
        .then(data =>{
          setProductos(data.count)
        })
    },[])

    useEffect(()=>{
      console.log("se actualizo el componente")
    },[Productos])

    return(
      <div>{Productos}</div>
    )
  }
export default Productos;
  