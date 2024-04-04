import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import "../Components/Styles/AdminFeatures.css";
import requestToAPI from "../services/requestToAPI";
import IconButton from "../Components/IconButton";
import Swal from "sweetalert2";

const AdminFeatures = () => {
  const [responseData, setResponseData] = useState([]);
  const [dataRequest, setDataRequest] = useState({
    url: "",
    method: "",
    data: null,
    headers: {},
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const toggleFormulario = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const handleChangeImage = (event) => {
    setSelectedImage(event);
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleChangeSend = () => {
    if (inputValue !== "" && selectedImage !== null) {
      Swal.fire({
        icon: "success",
        title: "Elemento agregado con éxito",
        showConfirmButton: false,
        timer: 1500, // Cerrar automáticamente después de 1.5 segundos
      });

      setDataRequest({
        ...dataRequest,
        url: "features/add",
        method: "POST",
        data: {
          id: "",
          title: inputValue,
          url: selectedImage,
        },
        headers: {},
      });

      setModalIsOpen(false);
    } else {
      Swal.fire({
        icon: "warning",
        title: "Falta completar",
        text: "Por favor, completa todos los campos antes de continuar.",
      });
    }
  };

  const handleInput = async (feature) => {
    Swal.fire({
      title: "Editar Caracteristica",
      input: "text",
      inputPlaceholder: "Nuevo nombre",
      showCancelButton: true,
      confirmButtonText: "Guardar",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
      preConfirm: (newValue) => {
        setDataRequest({
          ...dataRequest,
          url: "features/update",
          method: "PUT",
          data: {
            id: feature.id,
            title: newValue,
            url: feature.url,
          },
          headers: {},
        });
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, 1000);
        });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "¡Editado!",
          "El elemento ha sido actualizado correctamente.",
          "success"
        );
      }
    });
  };

  const handleClickDelete = (key) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Una vez eliminado, no podrás recuperar este elemento",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminarlo",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setDataRequest({
          ...dataRequest,
          url: `features/delete/id/${key}`,
          method: "DELETE",
          data: {},
          headers: {},
        });
        Swal.fire("¡Eliminado!", "El elemento ha sido eliminado.", "success");
      }
    });
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await requestToAPI("features/find/all", "GET");
        setResponseData(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="bodyFeatures img-background">
      <div className="asdf">
        <div className="space-between container-add-button">
          <h2>Administrar de Caracteristicas</h2>
          <IconButton
            className="button buttonBlue buttonBig"
            onClick={toggleFormulario}
            icon="plus"
          >
            Agregar Caracteristica
          </IconButton>
        </div>
        <ul className="adminFeactures">
          {responseData.map((objeto, index) => (
            <div className="divLi" key={objeto.id}>
              <li className="list-item">
                <div className="divSVG">
                  <img src={objeto.url} alt={`Imagen ${objeto.id}`} />
                </div>
                <p>
                  ID {objeto.id} - {objeto.title}
                </p>
                <div className="box-editar-eliminar">
                  <IconButton
                    className="button buttonTerciary "
                    onClick={() => handleInput(objeto)}
                    icon="pencil"
                  >
                    Editar
                  </IconButton>
                  <IconButton
                    className="button buttonSecundary "
                    onClick={() => handleClickDelete(objeto.id)}
                    icon="minus"
                  >
                    Eliminar
                  </IconButton>
                </div>
              </li>
            </div>
          ))}
        </ul>
        <ReactModal
          isOpen={modalIsOpen}
          onRequestClose={toggleFormulario}
          className="Modal"
          overlayClassName="Overlay"
        >
          <form className="form container">
            <div className="form-group">
              <h2>Agregar Carcterística</h2>
              <label>
                Nombre:
                <input type="text" value={inputValue} onChange={handleChange} />
              </label>
              <div className="form-group">
                <label>Seleccionar Imagen</label>
              </div>
            </div>
            <div className="buttonFormBoxFeature">
              <button
                className="addFeatureButton button buttonBlue buttonBig"
                type="button"
                onClick={handleChangeSend}
              >
                Confirmar
              </button>
              <button
                className="button buttonBig buttonSecundary"
                onClick={toggleFormulario}
              >
                Cancelar
              </button>
            </div>
          </form>
        </ReactModal>
      </div>
    </div>
  );
};

export default AdminFeatures;
