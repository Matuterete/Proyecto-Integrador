import React from 'react';
import IconButton from '../Components/IconButton';

function UserList({ users, onEdit, onDelete }) {
  const [selectedUser, setSelectedUser] = React.useState(null);

  const handleClick = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="container-list">
      {selectedUser && (
        <div>
          <p>Id: {selectedUser.id}</p>
          <h3>{selectedUser.name}</h3>
        </div>
      )}
      {users.map(user => (
        <div key={user.id} className="list-item">
          <p>Id: {user.id}</p>
          <h4>{user.name} {user.lastName}</h4>
          <div>
            <IconButton className='button buttonPrimary' icon="eye">Consultar</IconButton>
            <IconButton className='button buttonPrimary' onClick={() => onEdit(user)} icon="pencil">Modificar</IconButton>
            <IconButton className='button buttonTerciary' onClick={() => onDelete(user.id)} icon="minus">Eliminar</IconButton>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserList;