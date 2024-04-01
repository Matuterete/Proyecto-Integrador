import React from 'react';
import IconButton from '../Components/IconButton';

function UserList({ users, onEdit, onDelete }) {
  const [selectedUser, setSelectedUser] = React.useState(null);

  const handleClick = (user) => {
    setSelectedUser(user);
  };

  return (

    <div className='body-product-list'>
      <div className='titleAdminUser'>
        <h2>Administrar Usuarios</h2>
      </div>
      <ul className='adminFeactures'>
        {users.map((objeto, index) => (

          <div className='divLi' key={objeto.id}>

            <li className="list-item">
              <div className=''><p>ID{objeto.id}</p></div>
              <p>{objeto.name}</p>

              <div className='box-editar-eliminar'>
                <IconButton className='button buttonTerciary ' onClick={() => onEdit(objeto)} icon="pencil">Editar</IconButton>
                <IconButton className='button buttonSecundary ' onClick={() => onDelete(objeto.id)} icon="minus">Eliminar</IconButton>
              </div>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default UserList;