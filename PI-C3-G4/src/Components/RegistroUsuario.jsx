import React, { useState } from 'react';
import axios from 'axios';
import '../Components/styles/Home.css';
import { useNavigate } from 'react-router-dom';
import '../Components/styles/RegistroUsuario.css';
import registroUsuario from '../assets/imagen-Usuario.png';

import emailjs from '@emailjs/browser';


function RegistroUsuario() {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

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

  //const form = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    // send email
    /*
    emailjs
      .sendForm('service_9nydvzd', 'template_vf09e5z', form.current, {
        publicKey: '_tQw4BNfAWBkcyhJO',
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
    */

    if (password == password2) {
      // Aquí podrías enviar los datos a un servidor o hacer cualquier otra acción con ellos
      axios.post('http://prothechnics.us.to:8080/auth/register', {
        name,
        lastName,
        password,
        email
      })
        .then(response => {
          alert(`El usuario ha quedado registrado correctamente.`);
          console.log(response.data.token)
          navigate("/login");
        })
        .catch(error => {
          console.error(error);
          alert('Hubo un error al intentar registrar el usuario');
        });
    }
    else {
      alert('Las contraseñas no coinciden');
    }

    // navigate("/emailRegister");
  };

  return (
    <div className="form container">
     <h1 className='title'>Formulario de Registro de Usuarios</h1>
     <div className='container-img'>
     <img src={registroUsuario} alt="logo registro de usuario" height= "100px" width= "100px" />
     </div>
      <form onSubmit={handleSubmit}>
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
        <div className = "boton"><button  type="submit">Guardar Usuario</button></div>
      </form>
    </div>
  );
}


export default RegistroUsuario;