import React, { useState } from 'react';
import Sun from '../assets/Sun.svg';
import Moon from '../assets/Moon.svg';
import Logo from '../assets/Logo.png';
import Usuario from '../assets/usuario.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from '../Utils/Context.jsx';
import { TOGGLE_THEME } from '../Reducers/Reducer.jsx';
import './styles/Navbar.css';

import styled from 'styled-components';

// Estilos para el menú hamburguesa
const HamburgerMenuWrapper = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;
`;

const HamburgerIcon = styled.div`
  width: 30px;
  height: 0px;
  background-color: #333;
  margin: 6px 0;
  transition: 0.4s;
  margin-top: 10px;
  margin-right: 10px;
`;

const MenuContainer = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #f9f9f9;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  overflow: hidden;
  width: 20vw;
  color: black;
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
`;

const MenuItem = styled.div`
  padding: 10px;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
  &:hover {
    background-color: #ddd;
  }
`;

const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
`;

const Avatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
`;

const Navbar = () => {
  const { state, dispatch } = useContext();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [usuarioLogueado] = useState(JSON.parse(localStorage.getItem('usuarioLogueado')))
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const routesSinUsuario = [
    { path: '/home', name: 'Home' },
    { path: '/Categories', name: 'Categorias' },
  ]

  const routesConUsuario = [
    { path: '/adminProducts', name: 'Administrar productos' },
    { path: '/adminFeatures', name: 'Administrar caracteristicas' },
    { path: '/adminCategories', name: 'Administrar categorias' },
    { path: '/adminUsers', name: 'Administrar usuarios' },
  ]

  let navigate = useNavigate();
  const RegistroUsuario = () => {
    let path = '/registroUsuario';
    navigate(path);
  }
  const Login = () => {
    let path = '/login';
    navigate(path);
  }
  const Registrar = () => {
    let path = '/FormRegistrar';
    navigate(path);
  }

  //se agregan las formas para autenticar 

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

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

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
              <button className='button buttonPrimary' onClick={Login}>Iniciar Sesión</button>
              <button className='button buttonTerciary' onClick={RegistroUsuario}>Registrarse</button>
            </div>
          }
          {
            usuarioLogueado &&
            <div>
              <HamburgerMenuWrapper>
                <HamburgerIcon onClick={toggleDropdown}>
                  <img src={Usuario} width='45px' alt="Cerrar sesión"></img>
                </HamburgerIcon>
                <MenuContainer isOpen={isDropdownOpen}>
                  <AvatarContainer>
                    <Avatar src={Usuario} alt="Avatar" />
                    <span>{usuarioLogueado.name}</span>
                  </AvatarContainer>
                  <MenuItem>
                    Perfil
                  </MenuItem>
                  <MenuItem onClick={cerrarSesion}>
                    Cerrar sesión
                  </MenuItem>
                </MenuContainer>
              </HamburgerMenuWrapper>
            </div>
          }
          <button className='button buttonSecundary' onClick={handleTheme}>
            <img src={state.theme === 'light' ? Moon : Sun} width='25px' alt="Theme"></img>
          </button>
        </div>
      </nav>

      {/* 
      <div className='sugerencia'>
        <button>home</button>
        <button>categorias</button>
        <button>otra cosa</button>
        <button>otra cosa mas</button>
      </div>
      */}

    </section>
  );
};

export default Navbar;