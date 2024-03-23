import React, { useEffect, useState } from "react";
import Sun from "../assets/Sun.svg";
import Moon from "../assets/Moon.svg";
import Logo from "../assets/Logo.png";
import Usuario from "../assets/usuario.svg";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "../Utils/Context.jsx";
import { TOGGLE_THEME } from "../Reducers/Reducer.jsx";
import "./styles/Navbar.css";
import Swal from "sweetalert2";

const Navbar = () => {
  const { state, dispatch } = useContext();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const handleTheme = () => {
    dispatch({ type: TOGGLE_THEME });
  };
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const [sessionData, setSessionData] = useState(null);
  const [userLogo, setUserLogo] = useState();

  useEffect(() => {
    const getSessionData = async () => {
      try {
        const data = await sessionStorage.getItem("userData");
        setSessionData(JSON.parse(data));
      } catch (error) {
        console.error("Error retrieving session data:", error);
      }
    };
    getSessionData();
  }, []);

  useEffect(() => {
    sessionData &&
      setUserLogo(sessionData.user.name[0] + sessionData.user.lastName[0]);
  }, [sessionData]);

  const handleLogout = () => {
    Swal.fire({
      title: "Estas por abandonar nuestro sitio",
      text: "¿Seguro deseas cerrar sesión?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cerrar sesión",
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.removeItem("userData");
        setSessionData(null);
        Swal.fire("Sesión cerrada", "", "success").then(() => {
          navigate("/");
        });
      }
    });
  };

  const handleReload = () => {
    navigate("/");
    window.location.reload();
  };

  return (
    <section className="header">
      <nav className="navbar">
        <div className="navbar-logo">
          <Link onClick={handleReload}>
            <img src={Logo} alt="Logo"></img>
          </Link>
        </div>

        <nav id="mobile">
          <button id="menu-toggle" onClick={toggleMobileMenu}>
            ☰
          </button>
          <div id="mobile-menu" className={isMobileMenuOpen ? "active" : ""}>
            <div className="mobile-menu-items">
              <Link to="/login">Iniciar sesión</Link>
              <Link to="/registroUsuario">Crear Cuenta</Link>
            </div>
          </div>
        </nav>

        <div className="buttons">
          {sessionData ? (
            <div className="user">
              <div className="name">
                <span>{sessionData.user.name}</span>
                <span>{sessionData.user.lastName}</span>
              </div>
              <Link to="/userprofile">
                <button className="button user-logo">{userLogo}</button>
              </Link>
              {sessionData.user.role === "ADMIN" ||
              sessionData.user.role === "SUPERADMIN" ? (
                <Link to="/administracion">
                  <button className="button buttonTerciary">Admin Page</button>
                </Link>
              ) : (
                ""
              )}

              <button className="button buttonPrimary" onClick={handleLogout}>
                Cerrar Sesion
              </button>
            </div>
          ) : (
            <div>
              <Link to="/login" className="button buttonPrimary">
                Iniciar Sesión
              </Link>
              <Link to="/registroUsuario" className="button buttonTerciary">
                Crear Cuenta
              </Link>
            </div>
          )}

          <button className="button buttonSecundary" onClick={handleTheme}>
            <img
              src={state.theme === "light" ? Moon : Sun}
              width="20px"
              alt="Theme"
            ></img>
          </button>
        </div>
      </nav>
    </section>
  );
};

export default Navbar;
