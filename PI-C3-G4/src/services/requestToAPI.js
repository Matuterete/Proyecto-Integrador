import axios from 'axios';

async function requestToAPI(endpoint, method, data = null, headers = {}) {
  try {
    const url = `http://prothechnics.us.to:8080/api/${endpoint}`;
    const response = await axios({
      method: method,
      url: url,
      data: data,
      headers: headers
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export default requestToAPI;


// ========= EJEMPLO DE UTILIZACION =========== //

/*
import requestToAPI from './requestToAPI';

async function fetchData() {
  try {
    const url = 'https://api.example.com/data';
    const method = 'GET';
    const data = null;
    const headers = {}; // Puedes pasar encabezados personalizados si es necesario
    const responseData = await requestToAPI(url, method, data, headers);
    console.log(responseData);
    // Procesar los datos obtenidos de la API
  } catch (error) {
    // Manejo de errores
    console.error('Error fetching data:', error);
  }
}

fetchData();
*/