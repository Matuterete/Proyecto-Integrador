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
        <h1 className='TitleAdminP'>Administración General</h1>
        <div className='Menu'>
          <h2>Menú</h2>
          <div className='ButtonContainer'>
<<<<<<< HEAD
            {!isMobile && (
              <>
                <Link to="/adminFeatures" className='Button'>Admin Features</Link>
                <Link to="/adminProducts" className='Button'>Admin Products</Link>
              </>
            )}
=======
            <Link to="/adminFeatures"><button className='button buttonPrimary'>Admin Features</button></Link>
            <Link to="/adminProducts"><button className='button buttonTerciary'>Admin Products</button></Link>
>>>>>>> martin_cerbin
          </div>
        </div>
        {isMobile && <p>Esta página no está disponible en dispositivos móviles.</p>}
      </div>
    </div>
  );
};

export default AdminPage;