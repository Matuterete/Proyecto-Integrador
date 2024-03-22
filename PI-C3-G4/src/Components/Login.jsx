import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import requestToAPI from "../services/requestToAPI";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await requestToAPI('auth/login', 'POST', {
        email: usuario.correo,
        password: usuario.contrasena
      })
      .then(response => {
        console.log(response.data);
        localStorage.setItem('userId', response.data.user.id);
        localStorage.setItem('usuarioLogueado', JSON.stringify(response.data))
        navigate("/home");
        window.location.reload();
      })
      .catch(error => {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Usuario incorrecto',
          text: `Los datos son incorrectos o el usuario ${usuario.correo} no se encuentra registrado en el sistema`,
          showConfirmButton: true
        });
      });
  
      sessionStorage.setItem('userData', JSON.stringify(response));
  
      if (response.user.role === 'ADMIN' || response.user.role === 'SUPERADMIN') {
        navigate("/administracion");
      } else {
        navigate("/home");
      }
      window.location.reload();
  
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Usuario incorrecto',
        text: `Los datos son incorrectos o el usuario ${usuario.correo} no se encuentra registrado en el sistema`,
        showConfirmButton: true
      });
    }
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
        <div className="form-group buttonCenter">
          <button type="submit" className='button buttonPrimary buttonBig'>Ingresar</button>
        </div>
      </form>
    </div>
  );
}

export default Login;