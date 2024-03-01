import React, { useState } from 'react';
import Sun from '../assets/Sun.svg';
import Moon from '../assets/Moon.svg';
import Logo from '../assets/Logo.png';
import Output from '../assets/cerrar.svg';
import Usuario from '../assets/usuario.svg';
import { Link } from 'react-router-dom';
import { useContext } from '../Utils/Context.jsx';
import { TOGGLE_THEME } from '../Reducers/Reducer.jsx';
import './styles/Navbar.css';
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { state, dispatch } = useContext();
  const [ isMobileMenuOpen , setMobileMenuOpen] = useState(false);
  const [ usuarioLogueado ] = useState(JSON.parse(localStorage.getItem('usuarioLogueado')))

  const routesSinUsuario = [
    { path: '/home', name: 'Home' },
    { path: '/Products', name: 'Productos' },
  ]

  const routesConUsuario = [
    { path: '/adminProductos', name: 'Admin Productos' },
  ]

  let navigate = useNavigate(); 
  const RegistroUsuario = () =>{ 
    let path = '/registroUsuario'; 
    navigate(path);
  }
  const Login = () =>{ 
    let path = '/login'; 
    navigate(path);
  }

  const handleTheme = () => {
    dispatch({ type: TOGGLE_THEME });
  }
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  }
  const cerrarSesion = () => {
    localStorage.removeItem('usuarioLogueado')
    navigate('/login');
    window.location.reload();
  }

  return (
    <section className='header'>
      <nav className='navbar'>
        <div className='navbar-logo'>
          <Link to={routesSinUsuario[0].path}>
            <img src={Logo} alt="Logo"></img>
          </Link>
        </div>

        <nav id='mobile'>
          <button id="menu-toggle" onClick={toggleMobileMenu}>☰</button>
          <div id="mobile-menu" className={isMobileMenuOpen ? 'active' : ''}>
            <div className="mobile-menu-items">
              {routesSinUsuario.map((route, index) => (<a key={index} href={route.path}>{route.name}</a>))}
            </div>
          </div>
        </nav>
        {
          !usuarioLogueado &&
          <ul className='menu'>
            {routesSinUsuario.map((route, index) => (
              <li key={index}>
                <Link to={route.path}>{route.name}</Link>
              </li>
            ))}
          </ul>
        }
        {
          usuarioLogueado &&
          <ul className='menu'>
            {routesConUsuario.map((route, index) => (
              <li key={index}>
                <Link to={route.path}>{route.name}</Link>
              </li>
            ))}
          </ul>
        }

        <div className='buttons'>
            {
              !usuarioLogueado &&
              <div>
                <button className='btn-login' onClick ={Login}>Iniciar Sesión</button>
                <button className='btn-registro' onClick ={RegistroUsuario}>Registrarse</button>
              </div>
            }
            {
              usuarioLogueado &&
              <div>
                <img src={Usuario} width='25px' alt="Cerrar sesión"></img>
                &nbsp; Hola, <strong>{usuarioLogueado.nombre}</strong>
                <button className='btn-cerrar' onClick={cerrarSesion}>
                  <img src={Output} width='15px' alt="Cerrar sesión"></img>
                </button>
              </div>
            }
          <button className='btn-theme' onClick={handleTheme}>
            <img src={state.theme === 'light' ? Moon : Sun} width='25px' alt="Theme"></img>
          </button>
        </div>
      </nav>
    </section>
  );
};

export default Navbar;