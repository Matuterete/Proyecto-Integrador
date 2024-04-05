import { useEffect, useState } from "react";
import "../Components/Styles/AdminFeatures.css";
import requestToAPI from "../services/requestToAPI";
import IconButton from "../Components/IconButton";
import Swal from "sweetalert2";
import Dropzone from "react-dropzone";
import Pagination from "../Components/Pagination";

const AdminFeatures = () => {
  const sectionTitle = "característica";
  const urlTitle = "features";
  const [responseData, setResponseData] = useState();
  const [resposeDataCRUD, setResponseDataCRUD] = useState();
  const [dataRequest, setDataRequest] = useState({
    url: "",
    method: "",
    data: null,
    headers: {},
  });
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarFormularioEdit, setMostrarFormularioEdit] = useState({
    mostrarForm: false,
    idEdit: 0,
  });
  const [inputValue, setInputValue] = useState("");
  const [originalUrl, setOriginalUrl] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageEdit, setSelectedImageEdit] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);

  const toggleFormulario = () => {
    setMostrarFormulario(!mostrarFormulario);
  };

  const fetchData = async () => {
    try {
      const url = urlTitle + "/find/all";
      const method = "GET";
      const data = null;
      const headers = {};

      setResponseData(await requestToAPI(url, method, data, headers));
    } catch (error) {
      // Manejo de errores
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [resposeDataCRUD]);

  useEffect(() => {
    if (dataRequest.url !== "") {
      async function fetchData() {
        try {
          const url = dataRequest.url;
          const method = dataRequest.method;
          const data = dataRequest.data;
          const headers = dataRequest.headers;

          setResponseDataCRUD(await requestToAPI(url, method, data, headers));
        } catch (error) {
          // Manejo de errores
          console.error("Error fetching data:");
        }
      }
      fetchData();
    }
  }, [dataRequest]);

  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const newFileName =
      inputValue.toLowerCase().replace(/\s+/g, "_") +
      "." +
      file.name.split(".").pop();
    const newFile = new File([file], newFileName, { type: file.type });
    setSelectedImage(newFile);
  };

  const handleDropEdit = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const newFileName =
      inputValue.toLowerCase().replace(/\s+/g, "_") +
      "." +
      file.name.split(".").pop();
    const newFile = new File([file], newFileName, { type: file.type });
    setSelectedImageEdit(newFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (inputValue !== "" && selectedImage !== null) {
      try {
        const formData = new FormData();
        formData.append("files", selectedImage);
        const imageUploadResponse = await requestToAPI(
          `storage/${urlTitle}/uploadFiles`,
          "POST",
          formData
        );

        const [imageUrl] = imageUploadResponse;

        await requestToAPI(`${urlTitle}/add`, "POST", {
          title: inputValue,
          url: imageUrl,
        });

        Swal.fire({
          icon: "success",
          title: `La ${sectionTitle} se agrego satisfactoriamente`,
          showConfirmButton: false,
          timer: 1500,
        });

        fetchData();
        setInputValue("");
        setSelectedImage(null);
        setMostrarFormulario(false);
      } catch (error) {
        console.error(`Error al agregar ${sectionTitle}:`, error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `Hubo un error al agregar la ${sectionTitle}.`,
        });
      }
    } else {
      Swal.fire({
        icon: "warning",
        title: "Falta completar",
        text: "Por favor, completa todos los campos antes de continuar.",
      });
    }
  };

  const handleChangeCancel = () => {
    setMostrarFormulario(false);
    setMostrarFormularioEdit({ mostrarForm: false, idEdit: 0 });
    setInputValue("");
    setSelectedImage(null);
    setSelectedImageEdit(null);
  };

  useEffect(() => {
    if (mostrarFormularioEdit.idEdit !== 0) {
      const selectedObject = responseData.find(
        (objeto) => objeto.id === mostrarFormularioEdit.idEdit
      );
      setInputValue(selectedObject.title);
      setSelectedImage(selectedObject.url);
    }
  }, [mostrarFormularioEdit]);

  const handleInput = (objeto) => {
    setMostrarFormularioEdit({ mostrarForm: true, idEdit: objeto.id });
    setOriginalUrl(objeto.url);
    console.log(originalUrl);
  };

  const handleInputEdit = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputUpdate = async () => {
    try {
      if (inputValue !== "" && selectedImageEdit !== null) {
        const formData = new FormData();
        formData.append("files", selectedImageEdit);
        const imageUploadResponse = await requestToAPI(
          `storage/${urlTitle}/uploadFiles`,
          "POST",
          formData
        );
        const newImageUrl = imageUploadResponse[0];

        await requestToAPI(`${urlTitle}/update`, "PUT", {
          id: mostrarFormularioEdit.idEdit,
          title: inputValue,
          url: newImageUrl,
        });
      } else if (inputValue !== "") {
        await requestToAPI(`${urlTitle}/update`, "PUT", {
          id: mostrarFormularioEdit.idEdit,
          title: inputValue,
          url: originalUrl,
        });
      } else {
        Swal.fire({
          icon: "warning",
          title: "Falta completar",
          text: "Por favor, completa todos los campos antes de continuar.",
        });
        return;
      }

      Swal.fire({
        icon: "success",
        title: `La ${sectionTitle} se actualizó satisfactoriamente`,
        showConfirmButton: false,
        timer: 1500,
      });

      fetchData();
      setInputValue("");
      setSelectedImageEdit(null);
      setSelectedImage(null);
      setMostrarFormularioEdit({ mostrarForm: false, idEdit: 0 });
    } catch (error) {
      console.error(`Error al actualizar ${sectionTitle}:`, error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Ocurrió un error al actualizar la ${sectionTitle}.`,
      });
    }
  };

  const handleClickDelete = (key) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: `Una vez eliminada, no podrás recuperar esta ${sectionTitle}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Obtener las URLs de las imágenes asociadas
          const featureImages = responseData.find(
            (feature) => feature.id === key
          ).url;
          console.log(featureImages);

          // Borrar las imágenes del bucket S3
          if (featureImages) {
            const deleteFormData = new FormData();
            deleteFormData.append("url", featureImages);
            console.log(deleteFormData);
            await requestToAPI("storage/deleteFile", "DELETE", deleteFormData);
          }

          // Eliminar de la base de datos
          await requestToAPI(`${urlTitle}/delete/id/${key}`, "DELETE");

          Swal.fire(
            "¡Eliminada!",
            `La ${sectionTitle} ha sido eliminada satisfactoriamente.`,
            "success"
          );
          fetchData();
        } catch (error) {
          console.error(`Error al eliminar  ${sectionTitle}:`, error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: `Ocurrió un error al eliminar la ${sectionTitle}`,
          });
        }
      }
    });
  };

  // Obtener las características actuales dependiendo de la página actual
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = responseData
    ? responseData.slice(indexOfFirstProduct, indexOfLastProduct)
    : [];

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      {responseData ? (
        <div className="bodyFeatures img-background">
          <div className="asdf">
            <div className="space-between container-add-button">
              <h2>Administar {sectionTitle}s</h2>
              <IconButton
                className="button buttonBlue buttonBig"
                onClick={toggleFormulario}
                icon="plus"
              >
                Agregar {sectionTitle}
              </IconButton>
            </div>

            {mostrarFormulario && (
              <form onSubmit={handleSubmit} className="form container">
                <div className="form-group">
                  <h2>Agregar nueva {sectionTitle}</h2>
                  <label>
                    Nombre:
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                    />
                  </label>
                </div>
                <div className="form-group">
                  <Dropzone
                    onDrop={handleDrop}
                    accept={{
                      "image/*": [".png", ".jpeg", ".jpg", ".gif", ".svg"],
                    }}
                    multiple={false}
                    className="dropzone"
                  >
                    {({ getRootProps, getInputProps }) => (
                      <section className="form-group">
                        <label>Icono:</label>
                        <div {...getRootProps()} className="dropzone">
                          <input {...getInputProps()} />
                          <p>
                            Arrastra y suelta un ícono aquí, o haz clic para
                            seleccionar uno
                          </p>
                        </div>
                        {selectedImage && (
                          <div className="form-group image-drop">
                            <div className="image-preview space">
                              <img
                                src={URL.createObjectURL(selectedImage)}
                                alt={inputValue}
                              />
                            </div>
                          </div>
                        )}
                      </section>
                    )}
                  </Dropzone>
                </div>
                <div className="buttonFormBox">
                  <button
                    className="addFeatureButton button buttonBlue buttonBig"
                    type="submit"
                  >
                    Confirmar
                  </button>
                  <button
                    className="button buttonBig buttonSecundary"
                    onClick={handleChangeCancel}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            )}

            <ul className="adminFeactures">
              {currentProducts.map((objeto, index) => (
                <div className="divLi" key={objeto.id}>
                  <li className="list-item">
                    <div className="divSVG">
                      <img src={objeto.url} />
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
                  {mostrarFormularioEdit.mostrarForm &&
                    mostrarFormularioEdit.idEdit == objeto.id && (
                      <form className="form container spacer-form">
                        <div className="form-group">
                          <h2>Editar {sectionTitle}</h2>
                          <label>
                            Nombre:
                            <input
                              type="text"
                              value={inputValue}
                              onChange={handleInputEdit}
                            />
                          </label>
                        </div>
                        <div className="form-group">
                          <Dropzone
                            onDrop={handleDropEdit}
                            accept={{
                              "image/*": [
                                ".png",
                                ".jpeg",
                                ".jpg",
                                ".gif",
                                ".svg",
                              ],
                            }}
                            multiple={false}
                            className="dropzone"
                          >
                            {({ getRootProps, getInputProps }) => (
                              <section className="form-group">
                                <label>Icono:</label>
                                <div {...getRootProps()} className="dropzone">
                                  <input {...getInputProps()} />
                                  <p>
                                    Arrastra y suelta un ícono aquí, o haz clic
                                    para seleccionar uno
                                  </p>
                                </div>
                                {selectedImageEdit && (
                                  <div className="form-group image-drop">
                                    <div className="image-preview space">
                                      <img
                                        src={URL.createObjectURL(
                                          selectedImageEdit
                                        )}
                                        alt={inputValue}
                                      />
                                    </div>
                                  </div>
                                )}
                              </section>
                            )}
                          </Dropzone>
                        </div>
                        <div className="buttonFormBox">
                          <button
                            className="addFeatureButton button buttonBlue buttonBig"
                            type="button"
                            onClick={handleInputUpdate}
                          >
                            Confirmar
                          </button>
                          <button
                            className="button buttonBig buttonSecundary"
                            onClick={handleChangeCancel}
                          >
                            Cancelar
                          </button>
                        </div>
                      </form>
                    )}
                </div>
              ))}
            </ul>

            {/* Agregar el componente de paginación */}
            <Pagination
              productsPerPage={productsPerPage}
              totalProducts={responseData.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </div>
        </div>
      ) : (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}
    </>
  );
};

export default AdminFeatures;
