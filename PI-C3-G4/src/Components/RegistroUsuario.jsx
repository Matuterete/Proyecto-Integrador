import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import registroUsuario from "../assets/imagen-Usuario.png";
import "../Components/Styles/RegistroUsuario.css";
import EmailConfirmation from "../Components/EmailConfirmation";
import Swal from "sweetalert2";
import emailjs from "@emailjs/browser";
import Timer from "./Timer";
import requestToAPI from "../services/requestToAPI";

function RegistroUsuario() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [mostrarDespuesDeGuardar, setMostrarDespuesDeGuardar] = useState(true);
  const [formData, setFormData] = useState({});

  const handleNameChange = (e) => {
    const value = e.target.value;
    const normalizedValue = value
      .replace(/\s+/g, " ")
      .replace(/[^a-zA-Z\s]/g, "");
    setName(normalizedValue);
  };

  const handleLastNameChange = (e) => {
    const value = e.target.value;
    const normalizedValue = value
      .replace(/\s+/g, " ")
      .replace(/[^a-zA-Z\s]/g, "");
    setLastName(normalizedValue);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePassword2Change = (e) => {
    setPassword2(e.target.value);
  };

  let navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setUsuario({
      ...usuario,
      imagen: file,
    });
  };

  const form = useRef();

  const enviarCorreo = () => {
    emailjs
      .sendForm("service_ip36kkm", "template_npdyv08", form.current, {
        publicKey: "mTXpE_At67OgrjMJD",
        ...formData,
      })
      .then(
        () => {
          console.log("¡ÉXITO!");
        },
        (error) => {
          console.log("FALLÓ...", error.text);
        }
      );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = { name, lastName, email, password };
    setFormData(formData);

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+.])[A-Za-z\d.!@#$%^&*()_+]{6,}$/;
    const expReg =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
    const esEmailValido = expReg.test(email);
    if (name.length < 3) {
      Swal.fire({
        icon: "error",
        title: "Nombre incorrecto",
        text: "El nombre debe ser mayor a 2 caracteres",
        showConfirmButton: true,
      });
    } else if (lastName.length < 3) {
      Swal.fire({
        icon: "error",
        title: "Apellido incorrecto",
        text: "El apellido debe ser mayor a 2 caracteres",
        showConfirmButton: true,
      });
    } else if (!esEmailValido) {
      Swal.fire({
        icon: "error",
        title: "Email incorrecto",
        text: "El correo electrónico no tiene el formato correcto, un formato válido es por ejemplo user@mail.com",
        showConfirmButton: true,
      });
    } else if (!passwordRegex.test(password)) {
      Swal.fire({
        icon: "error",
        title: "Contraseña incorrecta",
        html: `
            La contraseña debe cumplir las siguientes condiciones:
            <br> <br>
            <div>Tener al menos 6 caracteres</div>
            <div>Contener al menos una letra mayúscula</div>
            <div>Contener al menos un número</div>
            <div>Contener al menos un símbolo: ! @ # $ % ^ & * ( ) _ + .</div>
          `,
        showConfirmButton: true,
      });
    } else if (password != password2) {
      Swal.fire({
        icon: "warning",
        title: "Contraseñas incorrectas",
        text: "Las contraseñas no coinciden",
        showConfirmButton: true,
      });
    } else {
      try {
        const response = await requestToAPI("auth/register", "POST", {
          name,
          lastName,
          password,
          email,
        });
        Swal.fire({
          icon: "success",
          title: "El usuario ha quedado registrado correctamente",
          showConfirmButton: false,
          timer: 1500,
        });

        setMostrarDespuesDeGuardar(false);
        enviarCorreo();

        navigate("/login");
      } catch (error) {
        console.error(error);
        if (error.response && error.response.status === 409) {
          Swal.fire({
            icon: "error",
            title: "Usuario existente",
            text: "El correo ingresado ya está registrado",
            showConfirmButton: true,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error inesperado",
            text: "Ocurrió un error al intentar registrar el usuario",
            showConfirmButton: true,
          });
        }
      }
    }
  };

  return (
    <div className="img-background bodyLogUser">

      <form ref={form} onSubmit={handleSubmit} className="form">

        <h1 className="title">Formulario de Registro de Usuarios</h1>
        <div className="container-img">
          <img
            src={registroUsuario}
            alt="logo registro de usuario"
            height="100px"
            width="100px"
          />
        </div>

        <div className="form-group">
          <label>
            Nombre:
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleNameChange}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Apellido:
            <input
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleLastNameChange}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Correo electrónico:
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              required
              autoComplete="email"
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Contraseña:
            <input
              type="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              required
              autoComplete="new-password"
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Repita contraseña:
            <input
              type="password"
              name="password2"
              value={password2}
              onChange={handlePassword2Change}
              required
              autoComplete="new-password"
            />
          </label>
        </div>
        <div className="buttonFormBox">
          <button type="submit" className="button buttonBlue buttonBig">Guardar Usuario</button>
        </div>
        {mostrarDespuesDeGuardar ? (
          <div></div>
        ) : (
          <div>
            <h1>Confirma tu correo</h1>
            <p>
              Hemos enviado un mensaje de confirmación a tu dirección de correo
              electrónico.
            </p>
            <Timer />
            <button type="submit" className="button buttonPrimary buttonBig">
              Reenviar correo
            </button>
          </div>
        )}
      </form>

    </div>

  );
}

export default RegistroUsuario;
