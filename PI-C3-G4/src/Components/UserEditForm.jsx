import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserEditForm({ user, onSave, onCancel }) {
  const [id] = useState(user.id);
  const [isActive, setIsActive] = useState(user.isActive);
  const [name, setName] = useState(user.name);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');

  useEffect(() => {
    axios.get('https://prothechnics.us.to:8080/roles/find/all')
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

    axios.put(`https://prothechnics.us.to:8080/users/update/role`, {
      id,
      isActive,
      name,
      lastName,
      email,
      password,
      /*role: {
        id: selectedRole
      }*/
    })
      .then(() => {
        onSave({
          id,
          isActive,
          name,
          lastName,
          email,
          password,
          /*role: {
            id: selectedRole
          }*/
        });
        alert('Usuario actualizado correctamente');
      })
      .catch(error => {
        console.error(error);
        alert('Hubo un error al intentar actualizar el usuario');
      });
  };

  return (
    <form onSubmit={handleSubmit} className='Form container'>
      <h2>Editar usuario</h2>
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
            <option key="1" value="1">USER</option>
            <option key="2" value="2">ADMIN</option>
            <option key="3" value="3">SUPERADMIN</option>
          </select>
        </label>
      </div>
      <div className='form-group'>
        <button type="submit" className="submit-button">Guardar Cambios</button>
      </div>
      <div className='form-group'>
        <button type="button" className="cancel-button" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  );
}

export default UserEditForm;