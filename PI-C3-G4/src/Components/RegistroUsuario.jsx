import React, { useState, useEffect, Component, useRef } from 'react';
import Card from './Card';
import '../Components/styles/Home.css';
import { useNavigate } from 'react-router-dom';
import '../Components/styles/RegistroUsuario.css';
import registroUsuario from '../assets/imagen-Usuario.png';

import emailjs from '@emailjs/browser';


function RegistroUsuario() {
  const [usuario, setUsuario] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    contrasena: ''

  });
  let navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario({
      ...usuario,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setUsuario({
      ...usuario,
      imagen: file
    });
  };

  const form = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    // send email
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

    console.log(usuario);
    // Aquí podrías enviar los datos a un servidor o hacer cualquier otra acción con ellos
    var usuarioList = JSON.parse(localStorage.getItem('usuarios'))
    if (!usuarioList) {
      usuarioList = [];
      usuario.id = 1;
    }
    else {
      usuario.id = usuarioList.length + 1;
    }
    usuarioList.push(usuario)
    localStorage.setItem('usuarios', JSON.stringify(usuarioList))
    // alert(`El usuario ${usuario.nombre} ha quedado registrado correctamente.`)
    navigate("/emailRegister");

  };

  return (
    <div className="Form container">
     <h1 className='title'>Formulario de Registro de Usuarios</h1>
     <img src={registroUsuario} alt="logo registro de usuario" height= "100px" width= "100px" />

      <form ref={form}  onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre:
            <input type="text" name="nombre" value={usuario.nombre} onChange={handleChange} />
          </label>
        </div>
        <div className="form-group">
          <label>Apellido:
            <input type="text" name="apellido" value={usuario.apellido} onChange={handleChange} />
          </label>
        </div>
        <div className="form-group">
          <label>Correo electrónico:
            <input type="email" name="correo" value={usuario.correo} onChange={handleChange} />
          </label>
        </div>
        <div className="form-group">
          <label>Contraseña:
            <input type="password" name="contrasena" value={usuario.contrasena} onChange={handleChange} />
          </label>
        </div>
        <div className = "boton"><button  type="submit">Guardar Usuario</button></div>
      </form>
    </div>
  );
}


export default RegistroUsuario;