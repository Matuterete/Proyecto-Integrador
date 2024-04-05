import { useEffect, useState } from "react";
import Logo from "../assets/Logo-2.png";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "../Utils/Context.jsx";
import "./Styles/Navbar.css";
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
      customClass: {
        popup: 'my-popup-class'
      }
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


  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };



  // Función para mostrar el SweetAlert2
  const showNotAvailableOnMobileAlert = () => {
    Swal.fire({
      title: 'Página no disponible en dispositivos móviles',
      text: 'Lo siento, esta página no está disponible en dispositivos móviles.',
      icon: 'error',
      confirmButtonText: 'Entendido',
      customClass: {
        popup: 'my-popup-class'
      }
    });
  };
  return (
    <section className="header">

      <nav className="navbar">

        <Link className="navbar-logo" onClick={handleReload}>
          <img src={Logo} alt="Logo"></img>
        </Link>

        <div>
          <div className="menuMobile">

            <button className="menuHamburguesa" onClick={toggleMenu}>☰</button>

            <div className={`menu ${isOpen ? 'open' : ''}`}>
              <button className="buttonCerrarMenu" onClick={toggleMenu}>✖</button>

              <div>
                {sessionData ? (
                  <div>
                    <h2>{sessionData.user.name} {sessionData.user.lastName}</h2>
                    <Link to="/userprofile" onClick={toggleMenu}>
                      <p>Mi perfil</p>
                    </Link>
                  </div>

                ) : null}

                {sessionData && (sessionData.user.role === "ADMIN" || sessionData.user.role === "SUPERADMIN") && (
                  <Link onClick={() => {
                    showNotAvailableOnMobileAlert();
                  }}>
                    <p>Administración</p>
                  </Link>
                )}

                {sessionData ? (
                  <p onClick={() => { handleLogout(); }}>
                    Cerrar Sesion
                  </p>
                ) : (
                  <div className="">

                    <Link onClick={toggleMenu} to="/registroUsuario" className="button button-sin-borde">
                      Crear Cuenta
                    </Link>
                    <Link onClick={toggleMenu} to="/login" className="button button-sin-borde">
                      Iniciar Sesión
                    </Link>

                  </div>
                )}
              </div>

            </div>
          </div>

          <div>
            {sessionData ? (
              <div className="user">
                <div className="name">
                  <span>{sessionData.user.name} {sessionData.user.lastName}</span>
                </div>

                <div className="dropdown">

                  <div className="dropbtn">
                    <div className="user-logo-container">
                      <button className="user-logo">{userLogo}</button>
                      <img src="\src\assets\FlechaAbajo.png" alt="" />
                    </div>
                  </div>

                  <div className="dropdown-content">
                    <Link to="/userprofile">
                      <p>Mi perfil</p>
                    </Link>

                    {sessionData.user.role === "ADMIN" ||
                      sessionData.user.role === "SUPERADMIN" ? (
                      <Link to="/administracion">
                        <p>Administración</p>
                      </Link>
                    ) : ("")}

                    <a onClick={handleLogout}>
                      Cerrar Sesion
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <div className="button_login_registro_desktop">

                <Link to="/registroUsuario" className="button button-sin-borde">
                  Crear Cuenta
                </Link>
                <Link to="/login" className="button buttonPrimary">
                  Iniciar Sesión
                </Link>

              </div>
            )}
          </div>
        </div>
      </nav>

    </section>
  );
};

export default Navbar;
