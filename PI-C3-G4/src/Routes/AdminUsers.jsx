import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserList from '../Components/UserList';
import UserEditForm from '../Components/UserEditForm';
import Pagination from '../Components/Pagination';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import "../Components/styles/AdminUsers.css";

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
    axios.get('http://prothechnics.us.to:8080/api/users/find/all')
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
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Una vez eliminado, no podrás recuperar este usuario',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Aquí puedes realizar la acción de eliminación
        axios.delete(`http://prothechnics.us.to:8080/api/users/delete/id/${userId}`)
        .then(() => {
          setUsers(users.filter(user => user.id !== userId));
          Swal.fire(
            '¡Eliminado!',
            'El elemento ha sido eliminado.',
            'success'
          );
        })
        .catch(error => {
          Swal.fire({
            icon: 'error',
            title: 'Error inesperado',
            text: 'Hubo un error al intentar eliminar el usuario',
            showConfirmButton: false,
            timer: 2000 // Cerrar automáticamente después de 2 segundos
          });
          console.error(error);
        });
      }
    });
  };

  return (
    <div className='img-background'>
      <h2 className='container-title'>Administrar Usuarios</h2>
      {showUserList && (
        <div>
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