import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserAddForm({ onAdd, onCancel }) {
  const [isActive, setIsActive] = useState(true);
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');

  useEffect(() => {
    axios.get('http://prothechnics.us.to:8080/roles/find/all')
      .then(response => {
        setRoles(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleIsActiveChange = (e) => {
    setIsActive(e.target.checked);
  };

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

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://prothechnics.us.to:8080/users/add', {
      isActive,
      name,
      lastName,
      email,
      password,
      /*role: {
        id: selectedRole
      }*/
    })
      .then(response => {
        onAdd(response.data);
        alert('Usuario agregado correctamente');
        setIsActive(true);
        setName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setSelectedRole('');
      })
      .catch(error => {
        console.error(error);
        alert('Hubo un error al intentar agregar el usuario');
      });
  };

  return (
    <form onSubmit={handleSubmit} className='Form container'>
      <h2>Agregar nuevo usuario</h2>
      <div className='form-group'>
        <label>
          Nombre:
          <input type="text" value={name} onChange={handleNameChange} required />
        </label>
      </div>
      <div className='form-group'>
        <label>
          Apellido:
          <input type="text" value={lastName} onChange={handleLastNameChange} required />
        </label>
      </div>
      <div className='form-group'>
        <label>
          Email:
          <input type="email" value={email} onChange={handleEmailChange} required />
        </label>
      </div>
      <div className='form-group'>
        <label>
          Activo:
          <input type="checkbox" checked={isActive} onChange={handleIsActiveChange} />
        </label>
      </div>
      <div className='form-group'>
        <label>
          Contraseña:
          <input type="text" value={password} onChange={handlePasswordChange} required />
        </label>
      </div>
      <div className='form-group'>
        <label>
          Rol:
          <select value={selectedRole} onChange={handleRoleChange}>
            <option value="">Seleccione el rol</option>
            <option key="1" value="1">Role 1</option>
            <option key="2" value="2">Role 2</option>
            <option key="3" value="3">Role 3</option>
          </select>
        </label>
      </div>
      <div className='form-group'>
        <button type="submit" className="submit-button">Agregar Usuario</button>
      </div>
      <div className='form-group'>
        <button type='button' className="cancel-button" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  );
}

export default UserAddForm;