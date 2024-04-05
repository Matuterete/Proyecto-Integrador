import { useState, useEffect } from "react";
import "../Components/Styles/AdminFeatures.css";
import Avatar from "../assets/user_avatar.png";
import Pagination from "../Components/Pagination";
import IconButton from "../Components/IconButton";
import Swal from "sweetalert2";
import requestToAPI from "../services/requestToAPI";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

  // Datos del usuario a editar
  const [selectedUser, setSelectedUser] = useState(null);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const totalUsers = users ? users.length : 0;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await requestToAPI("users/find/all", "GET");
        setUsers(response);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ocurrió un error al cargar los usuarios",
          customClass: {
            popup: "my-popup-class",
          },
        });
      }
    };
    fetchData();
  }, []);

  // Paginación
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users
    ? users.slice(indexOfFirstUser, indexOfLastUser)
    : [];

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Función para editar usuario
  const editUser = (user) => {
    setSelectedUser(user);
    setName(user.name);
    setLastName(user.lastName);
    setEmail(user.email);
    setSelectedRole(user.role);
  };

  // Función para cancelar edición
  const cancelEdit = () => {
    setSelectedUser(null);
    setName("");
    setLastName("");
    setEmail("");
    setSelectedRole("");
  };

  // Función para actualizar usuario
  const updateUser = async (e) => {
    e.preventDefault();
    const updatedUser = {
      id: selectedUser.id,
      isActive: true,
      name,
      lastName,
      email,
      role: selectedRole,
    };
    console.log(updatedUser);
    try {
      await requestToAPI("users/update", "PUT", updatedUser);
      // Actualizar la lista de usuarios después de la edición
      const updatedUsers = users.map((user) =>
        user.id === selectedUser.id ? updatedUser : user
      );
      setUsers(updatedUsers);
      // Limpiar los campos de edición
      cancelEdit();
      Swal.fire({
        title: "¡Actualizado!",
        text: "El usuario ha sido actualizado satisfactoriamente.",
        icon: "success",
        customClass: {
          popup: "my-popup-class",
        },
      });
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error al actualizar el usuario",
        customClass: {
          popup: "my-popup-class",
        },
      });
    }
  };

  // Función para eliminar usuario
  const deleteUser = async (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Una vez eliminado, no podrás recuperar este usuario",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
      customClass: {
        popup: "my-popup-class",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await requestToAPI(`users/delete/id/${id}`, "DELETE");
          const updatedUsers = users.filter((user) => user.id !== id);
          setUsers(updatedUsers);
          Swal.fire({
            title: "¡Eliminado!",
            text: "El usuario ha sido eliminado satisfactoriamente.",
            icon: "success",
            customClass: {
              popup: "my-popup-class",
            },
          });
        } catch (error) {
          console.error("Error al eliminar el usuario:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Ocurrió un error al eliminar el usuario",
            customClass: {
              popup: "my-popup-class",
            },
          });
        }
      }
    });
  };

  return (
    <div className="bodyFeatures img-background">
      <div className="asdf">
        <div className="space-between container-add-button">
          <h2>Administrar Usuarios</h2>
        </div>
        <ul className="adminFeactures">
          {currentUsers.map((user) => (
            <div className="divLi" key={user.id}>
              <li className="list-item">
                <div className="divSVG">
                  <img src={Avatar} alt={user.name} />
                </div>
                <p>
                  ID {user.id} | {user.name} {user.lastName} | {user.role}
                </p>

                <div className="box-editar-eliminar">
                  <IconButton
                    className="button buttonTerciary"
                    onClick={() => editUser(user)}
                    icon="pencil"
                  >
                    Editar
                  </IconButton>
                  <IconButton
                    className="button buttonSecundary"
                    onClick={() => deleteUser(user.id)}
                    icon="minus"
                  >
                    Eliminar
                  </IconButton>
                </div>
              </li>
              {selectedUser && selectedUser.id === user.id && (
                <form onSubmit={updateUser} className="form container spacer-form">
                  <h2>Editar usuario</h2>
                  <div className="form-group">
                    <label>
                      Nombre:
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </label>
                  </div>
                  <div className="form-group">
                    <label>
                      Apellido:
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                      />
                    </label>
                  </div>
                  <div className="form-group">
                    <label>
                      Email:
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </label>
                  </div>
                  <div className="form-group">
                    <label>
                      Rol:
                      <select
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                      >
                        <option value="">Seleccione el rol</option>
                        <option value="USER">USER</option>
                        <option value="ADMIN">ADMIN</option>
                        <option value="SUPERADMIN">SUPERADMIN</option>
                      </select>
                    </label>
                  </div>
                  <div className="buttonFormBox">
                    <button
                      type="submit"
                      className="button buttonBlue buttonBig"
                    >
                      Guardar Cambios
                    </button>
                    &nbsp;&nbsp;&nbsp;
                    <button
                      type="button"
                      className="button buttonSecundary buttonBig"
                      onClick={cancelEdit}
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              )}
            </div>
          ))}
        </ul>
        <Pagination
          productsPerPage={usersPerPage}
          totalProducts={users.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default AdminUsers;
