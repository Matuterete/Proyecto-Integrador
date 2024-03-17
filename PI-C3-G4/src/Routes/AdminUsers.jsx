import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserList from '../Components/UserList';
import UserEditForm from '../Components/UserEditForm';
import UserAddForm from '../Components/UserAddForm'
import Pagination from '../Components/Pagination';
import { useNavigate } from 'react-router-dom';
//import "../Components/styles/AdminUsers.css";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [showUserList, setShowUserList] = useState(true);
  const [showUserAddForm, setShowUserAddForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  // const [usuarioLogueado] = useState(JSON.parse(localStorage.getItem('usuarioLogueado')))

  let navigate = useNavigate();

  useEffect(() => {
    // if (usuarioLogueado) {
      axios.get('http://prothechnics.us.to:8080/users/find/all')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error(error);
      });
    // }
    // else {
    //   navigate("/home");
    // }
  }, []);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const handleAddUser = () => {
    setShowUserList(false);
    setShowUserAddForm(true);
  };

  const handleSaveUser = (newUser) => {
    setShowUserList(true);
    setShowUserAddForm(false);
    users.push(newUser);
  };

  const handleCancelUser = () => {
    setShowUserList(true);
    setShowUserAddForm(false);
    setEditingUser(null);
  };

  const handleEditUser = (user) => {
    setShowUserList(false);
    setEditingUser(user);
  };

  const handleSaveEdit = (editedUser) => {
    setUsers(users.map(user => (user.id === editedUser.id ? editedUser : user)));
    setShowUserList(true);
    setEditingUser(null);
  };

  const handleDeleteUser = (userId) => {
    const confirmDelete = window.confirm('¿Estás seguro que deseas eliminar este usuario?');

    if (confirmDelete) {
      axios.delete(`http://prothechnics.us.to:8080/users/delete/id/${userId}`)
        .then(() => {
          setUsers(users.filter(user => user.id !== userId));
          alert('Usuario eliminado correctamente');
        })
        .catch(error => {
          console.error(error);
          alert('Hubo un error al intentar eliminar el usuario');
        });
    }
  };

  return (
    <div>
      <h2 className='title'>Administrar Usuarios</h2>
      {showUserList && (
        <div>
          <div className='add-button'>
            <button className='form-button form-button-blue' onClick={handleAddUser}>Agregar Usuario</button>
          </div>
          <UserList
              users={currentUsers}
              onEdit={handleEditUser}
              onDelete={handleDeleteUser} />
          <Pagination
            usersPerPage={usersPerPage}
            totalUsers={users.length}
            paginate={paginate}
            currentPage={currentPage} />
        </div>
      )}
      {showUserAddForm && 
        <UserAddForm onAdd={handleSaveUser} onCancel={handleCancelUser} />
      }
      {editingUser && 
        <UserEditForm user={editingUser} onSave={handleSaveEdit} onCancel={handleCancelUser} />
      }
    </div>
  );
}

export default AdminUsers;