import React, { useEffect, useState } from 'react'
import '../Components/styles/AdminFeatures.css'
import requestToAPI from '../services/requestToAPI';
import IconButton from '../Components/IconButton';
import Swal from 'sweetalert2';

const AdminFeatures = () => {

    const [responseData, setResponseData] = useState()
    const [resposeDataCRUD, setResponseDataCRUD] = useState()
    const [dataRequest, setDataRequest] = useState(
        {
            url: '',
            method: '',
            data: null,
            headers: {}
        }
    )
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    const toggleFormulario = () => {
        setMostrarFormulario(!mostrarFormulario);
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const url = 'features/find/all';
                const method = 'GET';
                const data = null;
                const headers = {}

                setResponseData(await requestToAPI(url, method, data, headers))

                console.log('llamado de api FEATURE')
            } catch (error) {
                // Manejo de errores
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, [resposeDataCRUD])

    useEffect(() => {
        if (dataRequest.url != '') {
            async function fetchData() {
                try {
                    const url = dataRequest.url;
                    const method = dataRequest.method;
                    const data = dataRequest.data;
                    const headers = dataRequest.headers;

                    setResponseDataCRUD(await requestToAPI(url, method, data, headers))

                    console.log('llamado de api CRUD')
                } catch (error) {
                    // Manejo de errores
                    console.error('Error fetching data:');
                }
            }
            fetchData();
        }
    }, [dataRequest])

    /*========= EDIT FEATURE ==========*/

    const handleInput = async (feature) => {

        Swal.fire({
            title: 'Editar elemento',
            input: 'text',
            inputPlaceholder: 'Nuevo nombre',
            showCancelButton: true,
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar',
            showLoaderOnConfirm: true,
            preConfirm: (newValue) => {
                // Aquí puedes realizar la lógica de edición
                setDataRequest({
                    ...dataRequest,
                    url: 'features/update',
                    method: 'PUT',
                    data: {
                        id: feature.id,
                        title: newValue,
                        url: feature.url
                    }, // Cambias los datos a los nuevos datos que deseas enviar
                    headers: {}
                })
                return new Promise((resolve) => {
                    // Simulando una petición asíncrona, puedes hacer la lógica de edición aquí
                    setTimeout(() => {
                        console.log('Valor editado:', newValue);
                        resolve();
                    }, 1000);
                });
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    '¡Editado!',
                    'El elemento ha sido actualizado correctamente.',
                    'success'
                );
            }
        });
    };

    /*========= ADD FEATURE ==========*/

    const [selectedImage, setSelectedImage] = useState(null);

    const handleChangeImage = (event) => {
        setSelectedImage(event);
    };

    const [inputValue, setInputValue] = useState('');

    const handleChange = (event) => {
        setInputValue(event.target.value);
        console.log(inputValue)
    };

    const [enviar, setEnviar] = useState(false)

    const handleChangeSend = () => {

        if (inputValue != '' && selectedImage != null) {

            Swal.fire({
                icon: 'success',
                title: 'Elemento agregado con éxito',
                showConfirmButton: false,
                timer: 1500 // Cerrar automáticamente después de 1.5 segundos
            });

            setDataRequest({
                ...dataRequest,
                url: 'features/add',
                method: 'POST',
                data: {
                    id: '',
                    title: inputValue,
                    url: selectedImage
                },
                headers: {}
            })
            setEnviar(!enviar)

        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Falta completar',
                text: 'Por favor, completa todos los campos antes de continuar.',
            });
        }
        setMostrarFormulario(!mostrarFormulario)
    }

    /*========= DELETE FEATURE ==========*/

    const handleClickDelete = (key) => {

        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Una vez eliminado, no podrás recuperar este elemento',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminarlo',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                // Aquí puedes realizar la acción de eliminación
                setDataRequest({
                    ...dataRequest,
                    url: `features/delete/id/${key}`,
                    method: 'DELETE',
                    data: {},
                    headers: {}
                })
                console.log('Elemento eliminado');
                Swal.fire(
                    '¡Eliminado!',
                    'El elemento ha sido eliminado.',
                    'success'
                );
            }
        });
    }

    return (
        <>
            {responseData ? (<div className='bodyFeatures'>

                <div className='titleFeatures'>
                    <h2>Administrar caracteristicas</h2>
                </div>
                <div>
                    <div className='addFeatureButton'>
                        <IconButton className='button buttonPrimary buttonBig' onClick={toggleFormulario} icon="plus">Añadir Nueva</IconButton>
                    </div>

                    {mostrarFormulario && (
                        <div className='addFeature'>
                            <label>
                                Nombre de la nueva Caracteristica:
                                <input type="text" value={inputValue} onChange={handleChange} />
                            </label>

                            <p>seleccionar Imagen</p>
                            <div className='selectImages'>
                                {responseData.map((feature) => (
                                    <button className='buttonImagefeature' key={feature.id} onClick={() => handleChangeImage(feature.url)}>
                                        <img src={feature.url} alt={`Imagen ${feature.id}`} />
                                    </button>
                                ))}
                            </div>

                            {selectedImage &&
                                <div className='selectImage'>
                                    <p>Imagen Seleccionada:</p>
                                    <button className='buttonImagefeature'>
                                        <img src={selectedImage} />
                                    </button>
                                </div>
                            }

                            <button className='addFeatureButton button buttonSecundary' type="button" onClick={handleChangeSend}>Enviar</button>
                        </div>
                    )}

                    <ul className='adminFeactures'>
                        {responseData.map((objeto, index) => (

                            <div className='divLi' key={objeto.id}>

                                <li className="list-item">
                                    <div className='divSVG'><img src={objeto.url} /></div>
                                    <p>ID {objeto.id} - {objeto.title}</p>

                                    <div>
                                        <IconButton className='button buttonPrimary' icon="eye">Consultar</IconButton>
                                        <IconButton className='button buttonPrimary' onClick={() => handleInput(objeto)} icon="pencil">Editar</IconButton>
                                        <IconButton className='button buttonTerciary' onClick={() => handleClickDelete(objeto.id)} icon="minus">Eliminar</IconButton>
                                    </div>
                                </li>
                            </div>
                        ))}
                    </ul>
                </div>
            </div>)
                :
                (<div className="loader-container">
                    <div className="loader"></div>
                </div>)}
        </>
    )
}

export default AdminFeatures