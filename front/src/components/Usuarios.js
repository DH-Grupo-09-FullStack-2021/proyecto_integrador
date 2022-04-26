import React,{useState,useEffect} from "react";

function Usuarios(){
  const [Usuarios, setUsuarios]= useState([])

    useEffect(()=>{
      fetch("https://tp-grupo9-dh.herokuapp.com/users/api/")
        .then(response => response.json())
        .then(data =>{
          setUsuarios(data.count)
        })
    },[])

    useEffect(()=>{
      console.log("se actualizo el componente")
    },[Usuarios])
    
    return(
      <div>{Usuarios}</div>
    )
  }
export default Usuarios;
  