import { useEffect, useState } from "react";
import IconButton from "../Components/IconButton";
import Swal from "sweetalert2";
import requestToAPI from "../services/requestToAPI";

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editingCategoryName, setEditingCategoryName] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const url = "categories/find/all";
        const method = "GET";
        const data = null;
        const headers = {};

        const responseData = await requestToAPI(url, method, data, headers);
        setCategories(responseData);
        console.log("llamado de api CATEGORIES");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [editingCategoryId]);

  const addCategory = () => {
    Swal.fire({
      title: "Agregar Categoría",
      input: "text",
      inputPlaceholder: "Nombre de la categoría",
      showCancelButton: true,
      confirmButtonText: "Agregar",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
      preConfirm: (newCategoryName) => {
        if (!newCategoryName) {
          Swal.showValidationMessage(
            "Por favor ingresa un nombre de categoría"
          );
        }
        return newCategoryName;
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        requestToAPI("categories/add", "POST", {
          title: result.value,
          description: "",
          url: "",
        })
          .then((response) => {
            setCategories([...categories, response.data]);
            Swal.fire(
              "¡Agregado!",
              "La categoría ha sido agregada correctamente.",
              "success"
            );
          })
          .catch((error) => {
            console.error("Error adding category:", error);
            Swal.fire(
              "Error",
              "Hubo un problema al agregar la categoría.",
              "error"
            );
          });
      }
    });
  };

  const updateCategory = (categoryId, categoryName) => {
    Swal.fire({
      title: "Editar Categoría",
      input: "text",
      inputValue: categoryName,
      inputPlaceholder: "Nuevo nombre de la categoría",
      showCancelButton: true,
      confirmButtonText: "Guardar",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
      preConfirm: (newCategoryName) => {
        if (!newCategoryName) {
          Swal.showValidationMessage(
            "Por favor ingresa un nombre de categoría"
          );
        }
        return newCategoryName;
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        requestToAPI(`categories/update`, "PUT", {
          id: categoryId,
          title: result.value,
          description: "",
          url: "",
        })
          .then((response) => {
            const updatedCategories = categories.map((category) =>
              category.id === categoryId
                ? { ...category, title: result.value }
                : category
            );
            setCategories(updatedCategories);
            Swal.fire(
              "¡Editado!",
              "La categoría ha sido actualizada correctamente.",
              "success"
            );
          })
          .catch((error) => {
            console.error("Error updating category:", error);
            Swal.fire(
              "Error",
              "Hubo un problema al actualizar la categoría.",
              "error"
            );
          })
          .finally(() => {
            setEditingCategoryId(null);
            setEditingCategoryName("");
          });
      }
    });
  };

  const deleteCategory = (categoryId) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Una vez eliminada, no podrás recuperar esta categoría",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        requestToAPI(`categories/delete/id/${categoryId}`, "DELETE")
          .then(() => {
            const updatedCategories = categories.filter(
              (category) => category.id !== categoryId
            );
            setCategories(updatedCategories);
            Swal.fire(
              "¡Eliminada!",
              "La categoría ha sido eliminada correctamente.",
              "success"
            );
          })
          .catch((error) => {
            console.error("Error deleting category:", error);
            Swal.fire(
              "Error",
              "Hubo un problema al eliminar la categoría.",
              "error"
            );
          });
      }
    });
  };

  return (
    <div className="bodyCategorias img-background">
      
      <div className='container-add-button space-between'>

        <h2>Administar Categorias</h2>

        {/* <input
          type="text"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
        /> */}

        <IconButton
          className="button buttonBlue buttonBig"
          onClick={addCategory}
          icon="plus"
        >
          Agregar Categoría
        </IconButton>
      </div>

      <ul className='adminFeactures'>
        {categories.map((objeto, index) => (

          <div className='divLi' key={objeto.id}>

            <li className="list-item">
              <div className='divSVG'><img className="categoria-SVG" src={objeto.url} /></div>
              <p>{objeto.title}</p>

              <div className='box-editar-eliminar'>
                <IconButton className="button buttonTerciary " onClick={() => updateCategory(objeto.id, objeto.title)} icon="pencil">Editar</IconButton>
                <IconButton className="button buttonSecundary " onClick={() => deleteCategory(objeto.id)} icon="minus">Eliminar</IconButton>
              </div>
            </li>
          </div>
        ))}
      </ul>




      {editingCategoryId && (
        <div>
          <input
            type="text"
            value={editingCategoryName}
            onChange={(e) => setEditingCategoryName(e.target.value)}
          />
          <button onClick={updateCategory}>Guardar</button>
          <button
            onClick={() => {
              setEditingCategoryId(null);
              setEditingCategoryName("");
            }}
          >
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminCategories;
