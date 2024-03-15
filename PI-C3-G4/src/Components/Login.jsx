import React, { useState } from 'react';
import axios from 'axios';
import '../Components/Styles/Home.css';
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setUsuario({
      ...usuario,
      imagen: file
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.get(`http://prothechnics.us.to:8080/users/find/${usuario.correo}/${usuario.contrasena}`)
    .then(response => {
      console.log(response.data);
      localStorage.setItem('usuarioLogueado', JSON.stringify(response.data))
      alert(`Bienvenido usuario: ${response.data.name}`)
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
        <button type="submit" className='button buttonSecundary'>Ingresar</button>
      </form>
    </div>
  );
}

export default Login;