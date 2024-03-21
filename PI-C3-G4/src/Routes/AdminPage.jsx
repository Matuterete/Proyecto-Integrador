import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../Components/styles/AdminPage.css';

const AdminPage = () => {
  const [isMobile, setIsMobile] = useState(false);

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

  return (
    <div className='bodyPage'>
      <div className='adminMenu'>
        <h1 className='TitleAdminP'>Menú de Administración General</h1>
        <div className='Menu'>
          <h2>Elige la opción</h2>
          <div className='ButtonContainer'>
            {!isMobile && (
              <>
                <Link to="/adminProducts"><button className='button buttonPrimary'>Productos</button></Link>
                <Link to="/adminCategories"><button className='button buttonPrimary'>Categorías</button></Link>
                <Link to="/adminFeatures"><button className='button buttonPrimary'>Características</button></Link>
                <Link to="/adminUsers"><button className='button buttonPrimary'>Usuarios</button></Link>
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