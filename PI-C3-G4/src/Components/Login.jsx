import React, { useState } from 'react';
import "../Components/Styles/Home.css";
import { useNavigate } from "react-router-dom";


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
    // Hacer lógica para validar que el correo y contraseña se encuentra en la bd (en este caso en el localstorage usuarios)
    alert(`Bienvenido usuario ${usuario.nombre}`)
    navigate("/home");
  };

  return (
    <div className="Form">
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Correo electrónico:
            <input type="text" name="correo" value={usuario.correo} onChange={handleChange} />
          </label>
        </div>
        <div className="form-group">
          <label>Contraseña:
            <input type="text" name="contrasena" value={usuario.contrasena} onChange={handleChange} />
          </label>
        </div>
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}

export default Login;