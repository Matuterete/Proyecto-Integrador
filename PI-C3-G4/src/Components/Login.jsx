import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [usuario, setUsuario] = useState({
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

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://prothechnics.us.to:8080/auth/login',
    {
      email: usuario.correo,
      password: usuario.contrasena
    })
    .then(response => {
      console.log(response.data);
      localStorage.setItem('usuarioLogueado', JSON.stringify(response.data))
      navigate("/home");
      window.location.reload(); 
    })
    .catch(error => {
      console.error(error);
      alert(`El usuario ${usuario.correo} no se encuentra registrado en el sistema`)
    });
  };

  return (
    <div className="form">
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit" className='button buttonPrimary buttonRight'>Ingresar</button>
      </form>
    </div>
  );
}

export default Login;