import React from 'react';

function UserList({ users, onEdit, onDelete }) {
  const [selectedUser, setSelectedUser] = React.useState(null);

  const handleClick = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="container">
      {selectedUser && (
        <div>
          <p>Id: {selectedUser.id}</p>
          <h3>{selectedUser.name}</h3>
        </div>
      )}
      {users.map(user => (
        <div key={user.id} className="list-item">
          <p>Id: {user.id}</p>
          <h3>{user.name} {user.lastName}</h3>
          <div>
            <button className='form-button form-button-green' onClick={() => onEdit(user)}>Modificar</button>
            <button className='form-button form-button-red' onClick={() => onDelete(user.id)}>Eliminar</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserList;