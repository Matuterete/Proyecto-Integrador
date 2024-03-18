import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function UserEditForm({ user, onSave, onCancel }) {
  const [id] = useState(user.id);
  const [isActive, setIsActive] = useState(user.isActive);
  const [name, setName] = useState(user.name);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [selectedRole, setSelectedRole] = useState(user.role);

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

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`http://prothechnics.us.to:8080/users/update`, {
      id,
      isActive,
      name,
      lastName,
      email,
      role: selectedRole
    })
      .then(() => {
        onSave({
          id,
          isActive,
          name,
          lastName,
          email,
          role: selectedRole
        });
        Swal.fire({
          icon: 'success',
          title: 'Usuario actualizado correctamente',
          showConfirmButton: false,
          timer: 2000 // Cerrar automáticamente después de 2 segundos
        });
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Error inesperado',
          text: 'Hubo un error al intentar actualizar el usuario',
          showConfirmButton: false,
          timer: 2000 // Cerrar automáticamente después de 2 segundos
        });
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
          Rol:
          <select value={selectedRole} onChange={handleRoleChange}>
            <option value="">Seleccione el rol</option>
            <option key="1" value="USER">USER</option>
            <option key="2" value="ADMIN">ADMIN</option>
            <option key="3" value="SUPERADMIN">SUPERADMIN</option>
          </select>
        </label>
      </div>
      <div className='form-group buttonCenter'>
        <button type='submit' className='button buttonPrimary buttonBig'>Guardar Cambios</button>
        &nbsp;&nbsp;&nbsp;
        <button type='button' className='button buttonTerciary buttonBig' onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  );
}

export default UserEditForm;