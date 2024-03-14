import React, { useState, useRef } from 'react';
import axios from 'axios';
import '../Components/Styles/Home.css';
import { useNavigate } from 'react-router-dom';
import '../Components/Styles/RegistroUsuario.css';
import registroUsuario from '../assets/imagen-Usuario.png';
import EmailConfirmation from '../Components/EmailConfirmation'

import emailjs from '@emailjs/browser';
import Timer from './Timer';


function RegistroUsuario() {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [mostrarDespuesDeGuardar, setMostrarDespuesDeGuardar] = useState(true)
  const [formData, setFormData] = useState({})

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
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
      imagen: file
    });
  };

  const form = useRef();

  const enviarCorreo = () => {

    emailjs
      .sendForm('service_ip36kkm', 'template_npdyv08', form.current, {
        publicKey: 'mTXpE_At67OgrjMJD',
        ...formData
      })
      .then(
        () => {
          console.log('¡ÉXITO!');
        },
        (error) => {
          console.log('FALLÓ...', error.text);
        }
      );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = { name, lastName, email, password };
    setFormData(formData);

    if (password == password2) {
      // Aquí podrías enviar los datos a un servidor o hacer cualquier otra acción con ellos
      // axios.post('http://prothechnics.us.to:8080/auth/register', {
      //   isActive: true,
      //   name,
      //   lastName,
      //   email,
      //   password
      // })
      //   .then(response => {
      // alert(`El usuario ${response.data.name} ha quedado registrado correctamente.`)
      setMostrarDespuesDeGuardar(false);
      enviarCorreo();
      // })
      //     .catch(error => {
      //       console.error(error);
      //       alert('Hubo un error al intentar registrar el usuario');
      //     });
      // }
      // else {
      //   alert('Las contraseñas no coinciden');
      // }

      //  navigate("/emailRegister");
    };
  }



  return (
    <div className="form container">
      <h1 className='title'>Formulario de Registro de Usuarios</h1>
      <div className='container-img'>
        <img src={registroUsuario} alt="logo registro de usuario" height="100px" width="100px" />
      </div>

      <form ref={form} onSubmit={handleSubmit}>


        <div className="form-group">
          <label>Nombre:
            <input type="text" name="name" value={name} onChange={handleNameChange} />
          </label>
        </div>
        <div className="form-group">
          <label>Apellido:
            <input type="text" name="lastName" value={lastName} onChange={handleLastNameChange} />
          </label>
        </div>
        <div className="form-group">
          <label>Correo electrónico:
            <input type="email" name="email" value={email} onChange={handleEmailChange} />
          </label>
        </div>
        <div className="form-group">
          <label>Contraseña:
            <input type="password" name="password" value={password} onChange={handlePasswordChange} />
          </label>
        </div>
        <div className="form-group">
          <label>Repita contraseña:
            <input type="password" name="password2" value={password2} onChange={handlePassword2Change} />
          </label>
        </div>
        <div className="boton"><button className='button buttonSecundary' type="submit">Guardar Usuario</button></div>

        {mostrarDespuesDeGuardar ? (<div></div>
        ) : (
          <div>
            <h1>Confirma tu correo</h1>
            <p>Hemos enviado un mensaje de confirmación a tu dirección de correo electrónico.</p>
            <Timer />
            <button type="submit" className='button buttonSecundary'>Reenviar correo</button>
          </div>
        )}
      </form>



    </div>
  );
}


export default RegistroUsuario;


{/* <div>
          <h1>Confirma tu correo</h1>
          <p>Hemos enviado un mensaje de confirmación a tu dirección de correo electrónico.</p>
          <p>Por favor, revisa tu bandeja de entrada para confirmar tu registro. Si no encuentras el mensaje de confirmación en tu bandeja de entrada, te sugerimos revisar en la carpeta de correo no deseado (spam).</p>
          <form ref={form} onSubmit={enviarCorreo}>
            <input type="text" name="name" defaultValue={formData.name} style={{ display: 'none' }} />
            <input type="email" name="email" defaultValue={formData.email} style={{ display: 'none' }} />
            <button type="submit" className='button buttonSecundary'>Reenviar correo</button>
          </form>
        
        </div> */}

// //  <EmailConfirmation emailform={email} nameform={name} handleSubmit={handleSubmit} />