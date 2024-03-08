import React, { useState } from 'react';
import '../Components/styles/Home.css';
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
    console.log(usuario);
    var usuarioList = JSON.parse(localStorage.getItem('usuarios'))
    if (!usuarioList) {
      alert(`El usuario ${usuario.correo} no se encuentra registrado en el sistema`)
    }
    else {
      const usuarioEncontrado = usuarioList.find((elemento) => elemento.correo == usuario.correo && elemento.contrasena == usuario.contrasena);
      if (!usuarioEncontrado) {
        alert(`El usuario ${usuario.correo} no se encuentra registrado en el sistema`)
      }
      else {
        localStorage.setItem('usuarioLogueado', JSON.stringify(usuarioEncontrado))
        alert(`Bienvenido usuario ${usuarioEncontrado.nombre}`)
        navigate("/home");
        window.location.reload(); 
      }
    }
  };

  return (
    <div className="Form">
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
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}

export default Login;