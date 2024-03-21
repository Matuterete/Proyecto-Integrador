import React, { useState } from 'react';
import Sun from '../assets/Sun.svg';
import Moon from '../assets/Moon.svg';
import Logo from '../assets/Logo.png';
import Usuario from '../assets/usuario.svg';
import { Link  } from 'react-router-dom';
import { useContext } from '../Utils/Context.jsx';
import { TOGGLE_THEME } from '../Reducers/Reducer.jsx';
import './styles/Navbar.css';

const Navbar = () => {
  const { state, dispatch } = useContext();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);


  const handleTheme = () => {
    dispatch({ type: TOGGLE_THEME });
  }
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  }
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <section className='header'>
      <nav className='navbar'>
        <div className='navbar-logo'>
          <Link to="/home">
            <img src={Logo} alt="Logo"></img>
          </Link>
        </div>

        <nav id='mobile'>
          <button id="menu-toggle" onClick={toggleMobileMenu}>☰</button>
          <div id="mobile-menu" className={isMobileMenuOpen ? 'active' : ''}>
            <div className="mobile-menu-items">
              <Link to="/login">Iniciar sesión</Link>
              <Link to="/registroUsuario">Crear Cuenta</Link>
            </div>
          </div>
        </nav>

        <div className='buttons'>
          <div>
          <Link to="/login" className='button buttonPrimary'>Iniciar Sesión</Link>
          <Link to="/registroUsuario" className='button buttonTerciary'>Crear Cuenta</Link>
          </div>


          <button className='button buttonSecundary' onClick={handleTheme}>
            <img src={state.theme === 'light' ? Moon : Sun} width='20px' alt="Theme"></img>
          </button>
        </div>
      </nav>

    </section>
  );
};

export default Navbar;