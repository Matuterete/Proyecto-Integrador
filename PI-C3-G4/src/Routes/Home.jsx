import React, { useState, useEffect } from 'react';
import Card from '../Components/Card';
import '../Components/styles/Home.css'
import { useContext } from '../Utils/Context';
import requestToAPI from '../services/requestToAPI';

const Home = () => {

  const [responseData, setResponseData] = useState()
  useEffect(() => {
    async function fetchData() {
      try {
        const url = 'https://prothechnics.us.to:8080/products/find/random/6';
        const method = 'GET';
        const data = null;
        const headers = {};
        setResponseData(await requestToAPI(url, method, data, headers))
      } catch (error) {
        // Manejo de errores
        console.error('Error fetching data:', error);
      }
    }
    fetchData()
  }, [])
  console.log(responseData)

  return (
    <div className='body'>

      <div className="buscador">
        <input className="buscador-input" type="search" placeholder="Buscador" />
      </div>



      <div className='Container'>
        <div>
          <p className='cardTitle-2'>Recomendados</p>
          <div className='cardGrid-2'>
            {responseData ? responseData.map(product => <Card product={product} key={product.id} />)
              :
              (<div className="loader-container">
              <div className="loader"></div>
            </div>)}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;
