
import React, { useEffect, useState } from 'react'
import '../Components/styles/AdminFeatures.css'
import requestToAPI from '../services/requestToAPI';


const AdminFeatures = () => {

    const [resposeData, setResponseData] = useState()
    const [resposeDataCRUD, setResponseDataCRUD] = useState()
    const [dataRequest, setDataRequest] = useState(
        {
            url: 'http://prothechnics.us.to:8080/features/find/all',
            method: 'GET',
            data: null,
            headers: {}
        }
    )

    useEffect(() => {
        async function fetchData() {
            try {
                const url = dataRequest.url;
                const method = dataRequest.method;
                const data = dataRequest.data;
                const headers = dataRequest.headers;

                setResponseData(await requestToAPI(url, method, data, headers))

                console.log('llamado de api FEATURE')
            } catch (error) {
                // Manejo de errores
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, [dataRequest])

    function handleClick(key) {
        console.log('Se hizo clic en el botón editar ' + key)
        const userInput = window.prompt('Ingrese nuevo nombre:');
        if (userInput !== null) {
            console.log('El usuario ingresó:', userInput);

            setDataRequest({
                ...dataRequest,
                url: 'http://prothechnics.us.to:8080/features/update',
                method: 'PUT',
                data: {
                    id: key,
                    title: userInput,
                    url: `/src/assets/features/id_${key}.svg`
                }, // Cambias los datos a los nuevos datos que deseas enviar
                headers: {}
            })

        } else {
            console.log('El usuario canceló el cuadro de diálogo.');
        }
    }

    return (
        <div className='bodyFeatures'>

            <div className='titleFeatures'>
                <h2>Administrar caracteristicas</h2>
            </div>
            <div>
                <div>
                    <button className='addFeature'>añadir Caracteristica</button>
                </div>
                {resposeData ? (<ul className='adminFeactures'>

                    {resposeData.map((objeto, index) => (
                        <div className='divLi' key={objeto.id}>

                            <li>
                                <div className='divSVG'><img src={objeto.url} /></div>
                                <p>ID {objeto.id} - {objeto.title}</p>
                            </li>

                            <button
                                className='editFeature buttonFeature'
                                onClick={() => handleClick(objeto.id)}>
                                Editar
                            </button>
                            <button className='deletefeature buttonFeature'>Eliminar</button>
                        </div>

                    ))}
                </ul>) : (<div>...CARGANDO</div>)}
            </div>
        </div>
    )
}

export default AdminFeatures