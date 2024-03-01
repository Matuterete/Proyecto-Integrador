import React, { useState } from 'react';
import Sun from '../assets/Sun.svg';
import Moon from '../assets/Moon.svg';
import Logo from '../assets/Logo.png';
import { Link } from 'react-router-dom';
import { useContext } from '../Utils/Context.jsx';
import { TOGGLE_THEME } from '../Reducers/Reducer.jsx';
import './styles/Navbar.css';


const Navbar = () => {
  const { state, dispatch } = useContext();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const routes = [
    { path: '/home', name: 'Home' },
    { path: '/Products', name: 'Products' },

  ]

  const handleTheme = () => {
    dispatch({ type: TOGGLE_THEME });
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  }

  return (
    <section className='header'>
      <nav className='navbar'>
        <div className='navbar-logo'>
          <Link to={routes[0].path}>
            <img src={Logo} alt="Logo"></img>
          </Link>
        </div>

        <nav id='mobile'>
          <button id="menu-toggle" onClick={toggleMobileMenu}>☰</button>
          <div id="mobile-menu" className={isMobileMenuOpen ? 'active' : ''}>
            <div className="mobile-menu-items">
              {routes.map((route, index) => (<a key={index} href={route.path}>{route.name}</a>))}
            </div>
          </div>
        </nav>

        <ul className='menu'>
          {routes.map((route, index) => (
            <li key={index}>
              <Link to={route.path}>{route.name}</Link>
            </li>
          ))}
        </ul>

        <div className='buttons'>
          <button className='btn-login'>Iniciar Sesión</button>
          <button className='btn-registro'>Registrarse</button>
          <button className='btn-theme' onClick={handleTheme}>
            <img src={state.theme === 'light' ? Moon : Sun} width='25px' alt="Theme"></img>
          </button>
        </div>
      </nav>
    </section>
  );
};

export default Navbar;