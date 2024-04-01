import React, { useEffect, useState } from "react";
import Logo from "../assets/Logo-2.png";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "../Utils/Context.jsx";
import "./styles/Navbar.css";
import Swal from "sweetalert2";

const Navbar = () => {
  const { state, dispatch } = useContext();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

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
          handleReload();
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
                <span>{sessionData.user.name} {sessionData.user.lastName}</span>
              </div>
              <Link to="/userprofile">
                <button className="user-logo">{userLogo}</button>
              </Link>
              {sessionData.user.role === "ADMIN" ||
              sessionData.user.role === "SUPERADMIN" ? (
                <Link to="/administracion">
                  <button className="button buttonPrimary">Admin Page</button>
                </Link>
              ) : (
                ""
              )}

              <button className="button buttonPrimary buttonBig" onClick={handleLogout}>
                Cerrar Sesion
              </button>
            </div>
          ) : (
            <div className="button_login_registro_desktop titleFeatures">
             
              <Link to="/registroUsuario" className="button button-sin-borde">
                Crear Cuenta
              </Link>
              <Link to="/login" className="button buttonPrimary">
                Iniciar Sesión
              </Link>

            </div>
          )}

        </div>
      </nav>
    </section>
  );
};

export default Navbar;
