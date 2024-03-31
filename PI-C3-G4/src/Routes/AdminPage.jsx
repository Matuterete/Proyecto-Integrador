import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../Components/styles/AdminPage.css';

const AdminPage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [sessionData, setSessionData] = useState(null);

  useEffect(() => {
    const checkWindowSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkWindowSize();
    window.addEventListener('resize', checkWindowSize);

    return () => {
      window.removeEventListener('resize', checkWindowSize);
    };
  }, []);

  useEffect(() => {
    const getSessionData = async () => {
      try {
        const data = await sessionStorage.getItem('userData');
        setSessionData(JSON.parse(data));
      } catch (error) {
        console.error('Error retrieving session data:', error);
      }
    };
    getSessionData();
  }, []);

  return (
    <div className='bodyPage img-background'>
      <div className='adminMenu'>
        <h1 className='TitleAdminP'>Menú de Administración General</h1>
        <div className='Menu'>
          <div className='ButtonContainer'>
            {!isMobile && (
              <>
                <Link to="/adminProducts"><button className='button button-sin-borde'>Productos</button></Link>
                <Link to="/adminCategories"><button className='button button-sin-borde'>Categorías</button></Link>
                <Link to="/adminFeatures"><button className='button button-sin-borde'>Características</button></Link>
                {sessionData && sessionData.user.role === "SUPERADMIN" && <Link to="/adminUsers"><button className='button button-sin-borde'>Usuarios</button></Link>}
              </>
            )}
          </div>
        </div>
        {isMobile && <p>Esta página no está disponible en dispositivos móviles.</p>}
      </div>
    </div>
  );
};

export default AdminPage;