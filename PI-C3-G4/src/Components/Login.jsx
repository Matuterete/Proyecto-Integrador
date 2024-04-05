import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import requestToAPI from "../services/requestToAPI";
import Parlantesfondo from "../assets/Parlantes-fondo.png"


function Login() {
  const [usuario, setUsuario] = useState({
    correo: "",
    contrasena: "",
  });
  let navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario({
      ...usuario,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await requestToAPI("auth/login", "POST", {
        email: usuario.correo,
        password: usuario.contrasena,
      });

      sessionStorage.setItem("userData", JSON.stringify(response));

      
      const redirectPath = sessionStorage.getItem("redirectPath");
      if (redirectPath) {
        navigate(redirectPath);
        sessionStorage.removeItem("redirectPath");
      } else {
          navigate("/home");
        }

      window.location.reload();

    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Usuario incorrecto",
        text: `Los datos son incorrectos o el usuario ${usuario.correo} no se encuentra registrado en el sistema`,
        showConfirmButton: true,
        customClass: {
          popup: 'my-popup-class'
        }
      });
    }
  };

  return (
    <div className="bodyLogUser bodyA">

      <div className="imgParlantes">
      <img className="Login" src={Parlantesfondo} />
      </div>

      <form onSubmit={handleSubmit} className='form'>

        <div className="titleForm">
          <h2>Bienvenido a ProThechnics!</h2>
        </div>

        <div className="form-group">
          <label>
            Correo electrónico:
            <input
              type="email"
              name="correo"
              value={usuario.correo}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Contraseña:
            <input
              type="password"
              name="contrasena"
              value={usuario.contrasena}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="buttonFormBox">
          <button type="submit" className='button buttonTerciary buttonBig'>Ingresar</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
