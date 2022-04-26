import './UltimoUsuario.css';
import React,{useState,useEffect} from "react";
function UltimoUsuario(){
  const [UltimoUsuario, setUltimoUsuario]= useState([])

    useEffect(()=>{
      fetch("https://tp-grupo9-dh.herokuapp.com/users/api/")
        .then(response => response.json())
        .then(data =>{
          setUltimoUsuario(data.users)

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
        {
          UltimoUsuario.filter(usuario=>usuario.id>17).map((usuario,i)=>{
            return(
              <li key={i}>
                <h3>nombre:{usuario.username}</h3>
                <h3>email:{usuario.email}</h3>
              </li>
            )
          })
        }
    </ul>
    )
  }
export default UltimoUsuario;
  