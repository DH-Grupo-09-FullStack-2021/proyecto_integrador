import './UltimoUsuario.css';
import React,{useState,useEffect} from "react";
function UltimoUsuario(){
  const [UltimoUsuario, setUltimoUsuario]= useState([])

    useEffect(()=>{
      fetch("https://tp-grupo9-dh.herokuapp.com/users/apilastcreated/")
        .then(response => response.json())
        .then(data =>{
          setUltimoUsuario(data.lastUserCreated)

        })
    },[])

    useEffect(()=>{
      console.log("se actualizo el componente")
    },[UltimoUsuario])

    useEffect(()=>{
      return ()=>console.log("Se desmonto el componente")
    })
    console.log(UltimoUsuario)

    return(
      <ul className="usuario">
        {UltimoUsuario.length === 0 && <p>Cargando...</p>}
                <div className="enunciado-lista">Nombre:</div><div> {UltimoUsuario.username}</div>
                <div className="enunciado-lista">E-mail:</div><div> {UltimoUsuario.email}</div>
    </ul>
    )
  }
export default UltimoUsuario;
  
