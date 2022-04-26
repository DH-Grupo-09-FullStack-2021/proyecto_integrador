import React from 'react';
import './App.css';
import logo from './logo.JPG'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBoxOpen, faUser, faUsers} from '@fortawesome/free-solid-svg-icons'
import Usuarios from "./components/Usuarios"
import Productos from './components/Productos';
import ListadoProducto from './components/ListadoProducto';
import UltimoUsuario from './components/UltimoUsuario';
import UltimoProducto from './components/UltimoProducto';

function App(){
  return (
<div>
  <div>
    <link rel="preconnect" href="https://fonts.googleapis.com"/>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet"/>
    <title>Farmacia Ruiz admin</title>
  </div>

  <div className="grey-bg-color-idx">
    <header className="header">
      <div className="header-main-top">
        <img src={logo} className="logo" alt="logo"/>
      </div>
    </header>
    <div className="admin">
      Centro de administracion
    </div>
    <main className="main">
      <div className="TotalProductos">
        <article className='titulo'>Total Productos Creados</article>
        <section className='container'>
        <FontAwesomeIcon icon={faBoxOpen} className="logoproducto" />
          <div className="numero">
          <Productos/>
        </div>
        </section>
      </div>
      <div className="TotalUsuario">
      <article className='titulo'>Total De Usuarios Registrados</article>
        <section className='container'>
        <FontAwesomeIcon icon={faUsers} className="logoproducto" />
          <div className="numero">
          <Usuarios/>
        </div>
        </section>
      </div>
      <div className="UltimoUsuario">
      <article className='titulo'>Ultimo Usuario Creado</article>
        <section className='container'>
        <FontAwesomeIcon icon={faUser} className="logoproducto"/>
          <div className="datosUsuario">
            <UltimoUsuario/>
        </div>
        </section>
      </div>
     </main>
     <article className='producto'>
     <section className='listaProductos'>
      <div className='tituloProducto'>
        Listado de productos
        <ListadoProducto/>
      </div>
    </section>
    <section className="Ultimoproducto">
    <div className='tituloProducto'>
      Ultimo producto creado
      <UltimoProducto/>
    </div>
    </section>
    </article>
  </div>
  <footer>
    <div className="container my-auto">
      <div className="copyright">
        <span>Copyright &copy; Dashboard FarmaRuiz 2022</span>
      </div>
    </div>
  </footer>
</div>
  )}
export default App;
