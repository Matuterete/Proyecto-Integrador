import React, { useState, useEffect } from 'react';
import '../Components/Styles/AdminPage.css';
import AdminProducts from './AdminProducts.jsx'
import AdminCategories from './AdminCategories.jsx'
import AdminFeatures from './AdminFeatures.jsx';
import AdminUsers from './AdminUsers.jsx'


const AdminPage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [sessionData, setSessionData] = useState(null);
  const [elementSelected, setElementSelected] = useState('productos')
 
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

  const handleButton = (select) => {
    setElementSelected(select)
  }

  return (
    <div className='bodyPage '>
      <div className='adminMenu'>
        <div className='Menu'>
          <div className='ButtonContainer'>
            {!isMobile && (
              <>
                <button className={elementSelected == 'productos' ? 'selected-item-border-green button button-sin-borde' : 'button button-sin-borde'} onClick={() => handleButton('productos')}>Productos</button>
                <button className={elementSelected == 'categorias' ? 'selected-item-border-green button button-sin-borde' : 'button button-sin-borde'} onClick={() => handleButton('categorias')}>Categorías</button>
                <button className={elementSelected == 'caracteristicas' ? 'selected-item-border-green button button-sin-borde' : 'button button-sin-borde'} onClick={() => handleButton('caracteristicas')}>Características</button>
                {sessionData && sessionData.user.role === "SUPERADMIN" && <button onClick={() => handleButton('usuarios')} className={elementSelected == 'usuarios' ? 'selected-item-border-green button button-sin-borde' : 'button button-sin-borde'}>Usuarios</button>}
              </>
            )}
          </div>
        </div>
        {isMobile && <p>Esta página no está disponible en dispositivos móviles.</p>}
      </div>

      <div>
        {elementSelected === 'productos' && <AdminProducts/>}
      </div>
      <div>
        {elementSelected === 'categorias' && <AdminCategories/>}
      </div>
      <div>
        {elementSelected === 'caracteristicas' && <AdminFeatures/>}
      </div>
      <div>
        {elementSelected === 'usuarios' && <AdminUsers/>}
      </div>

    </div>
  );
};

export default AdminPage;