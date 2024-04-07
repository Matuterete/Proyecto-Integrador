import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../Components/Styles/RegistroUsuario.css";
import Swal from "sweetalert2";
import ReactModal from "react-modal";
import requestToAPI from "../services/requestToAPI";
import Parlantesfondo from "../assets/Parlantes-fondo.png";

function RegistroUsuario() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [formData, setFormData] = useState({});
  const [verificationModalOpen, setVerificationModalOpen] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const form = useRef();

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
        customClass: {
          popup: "my-popup-class",
        },
      });
    } else if (lastName.length < 3) {
      Swal.fire({
        icon: "error",
        title: "Apellido incorrecto",
        text: "El apellido debe ser mayor a 2 caracteres",
        showConfirmButton: true,
        customClass: {
          popup: "my-popup-class",
        },
      });
    } else if (!esEmailValido) {
      Swal.fire({
        icon: "error",
        title: "Email incorrecto",
        text: "El correo electrónico no tiene el formato correcto, un formato válido es por ejemplo user@mail.com",
        showConfirmButton: true,
        customClass: {
          popup: "my-popup-class",
        },
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
        customClass: {
          popup: "my-popup-class",
        },
      });
    } else if (password !== password2) {
      Swal.fire({
        icon: "warning",
        title: "Contraseñas incorrectas",
        text: "Las contraseñas no coinciden",
        showConfirmButton: true,
        customClass: {
          popup: "my-popup-class",
        },
      });
    } else {
      try {
        const response = await requestToAPI("auth/register", "POST", {
          name,
          lastName,
          password,
          email,
        });
        setIsSubmitting(true);
        if (response.user.id > 0) {
          setIsSubmitting(false);
          setVerificationModalOpen(true);
        }
      } catch (error) {
        console.error(error);
        setIsSubmitting(false);
        if (error.response && error.response.status === 409) {
          Swal.fire({
            icon: "error",
            title: "Usuario existente",
            text: "El correo ingresado ya está registrado",
            showConfirmButton: true,
            customClass: {
              popup: "my-popup-class",
            },
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error inesperado",
            text: "Ocurrió un error al intentar registrar el usuario",
            showConfirmButton: true,
            customClass: {
              popup: "my-popup-class",
            },
          });
        }
      }
    }
  };

  const handleModalClose = () => {
    setVerificationModalOpen(false);
    setVerificationCode("");
  };

  const handleVerificationCodeChange = (e) => {
    setVerificationCode(e.target.value);
  };

  const handleValidate = () => {
    enableUser(email, parseInt(verificationCode))
      .then(() => {
        setVerificationModalOpen(false);
        Swal.fire({
          icon: "success",
          title: "Validación Exitosa",
          text: "Te validaste correctamente. Puedes iniciar sesión con tus credenciales",
          showConfirmButton: true,
          confirmButtonText: "Aceptar",
          customClass: {
            popup: "my-popup-class",
          },
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/login");
          }
        });
      })
      .catch((error) => {
        console.error(error);
        if (error.response && error.response.status === 400) {
          Swal.fire({
            icon: "error",
            title: "Código incorrecto",
            text: "El código ingresado es incorrecto. Vuelva a intentarlo",
            showConfirmButton: true,
            customClass: {
              popup: "my-popup-class",
            },
          });
        } else if (error.response && error.response.status === 404) {
          Swal.fire({
            icon: "error",
            title: "Usuario no encontrado",
            text: `No se encontró usuario registrado con el correo: ${email}. Vuelva a realizar el registro.`,
            showConfirmButton: true,
            customClass: {
              popup: "my-popup-class",
            },
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error inesperado",
            text: "Ocurrió un error al intentar habilitar el usuario",
            showConfirmButton: true,
            customClass: {
              popup: "my-popup-class",
            },
          });
        }
      });
  };

  const handleRequestNewVerificationCode = () => {
    requestNewVerificationCode(email);
  };

  const enableUser = async (email, verificationCode) => {
    try {
      const response = await requestToAPI(
        `auth/enable-user?email=${email}&validationCode=${verificationCode}`,
        "POST"
      );
      if (response === "User enabled successfully") {
        return response;
      } else {
        throw new Error(response.data);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const requestNewVerificationCode = async (email) => {
    setIsSubmitting(true);
    try {
      const response = await requestToAPI(
        `auth/resend-verification-code?email=${email}`,
        "POST"
      );
      if (response === "Verification code resent successfully") {
        setIsSubmitting(false);
        Swal.fire({
          icon: "success",
          title: "Código de verificación enviado",
          text: "Se ha enviado un nuevo código de verificación a tu correo electrónico.",
          showConfirmButton: true,
          customClass: {
            popup: "my-popup-class",
          },
        });
      } else if (response === "User not found") {
        Swal.fire({
          icon: "error",
          title: "Usuario no encontrado",
          text: `No se encontró usuario registrado con el correo: ${email}. Vuelva a realizar el registro.`,
          showConfirmButton: true,
          customClass: {
            popup: "my-popup-class",
          },
        });
      } else {
        throw new Error("Failed to resend verification code");
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error al solicitar un nuevo código de verificación. Por favor, inténtalo nuevamente más tarde.",
        showConfirmButton: true,
        customClass: {
          popup: "my-popup-class",
        },
      });
    }
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      width: "500px",
      height: "400px",
      transform: "translate(-50%, -50%)",
      borderRadius: "12px",
      padding: "1rem",
      color: "#D7DDE2",
      backgroundColor: "transparent",
      border: "none",
      display: "flex",
    },
    overlay: { backgroundColor: "rgba(0, 0, 0, 0.75)" },
  };

  return (
    <div className=" bodyLogUser">
      <div className="imgParlantes">
        <img className="Login" src={Parlantesfondo} />
      </div>

      <form ref={form} onSubmit={handleSubmit} className="form">
        <div>
          <div className="titleForm">
            <h1>Registrate</h1>
            <p>Es rápido y fácil</p>
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
            <button type="submit" className="button buttonTerciary buttonBig">
              Registrarse
            </button>
          </div>
        </div>
      </form>
      {isSubmitting && (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}
      <ReactModal
        isOpen={verificationModalOpen}
        onRequestClose={handleModalClose}
        style={customStyles}
      >
        <div className="share-social-modal">
          <div className="validate-modal">
            <h2>Valida tu cuenta</h2>
            <p>
              Te hemos enviado un correo con un código de 6 dígitos. Introduce
              este código a continuación para verificar tu cuenta. <br></br>Si
              no has recibido el correo, puedes solicitar otro código.
            </p>
            <input
              type="text"
              value={verificationCode}
              onChange={handleVerificationCodeChange}
              maxLength={6}
              onKeyDown={(e) => {
                const allowedKeys = [
                  "0",
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7",
                  "8",
                  "9",
                  "Backspace",
                  "Delete",
                  "ArrowLeft",
                  "ArrowRight",
                  "v",
                  "Control",
                  "Home",
                  "End",
                ];
                if (!allowedKeys.includes(e.key)) {
                  e.preventDefault();
                }
              }}
              onPaste={(e) => {
                const pastedText = (
                  e.clipboardData || window.clipboardData
                ).getData("text");
                if (!/^\d*$/.test(pastedText)) {
                  e.preventDefault();
                }
              }}
            />
            <div className="modal-buttons">
              <button
                className="button buttonBig buttonTerciary"
                onClick={handleValidate}
              >
                Validar
              </button>
              <button
                className="button buttonBig buttonBlue"
                onClick={handleRequestNewVerificationCode}
              >
                Solicitar código
              </button>
              <button
                className="button buttonBig buttonSecundary"
                onClick={handleModalClose}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </ReactModal>
    </div>
  );
}

export default RegistroUsuario;
