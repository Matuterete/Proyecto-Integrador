import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useContext } from './Utils/Context';
import Navbar from './Components/Navbar';
import Home from './Routes/Home';
import Footer from './Components/Footer';
import RegistroUsuario from './Components/RegistroUsuario';
import Login from './Components/Login';
import Detail from './Routes/Detail';
import AdminProducts from './Routes/AdminProducts';
import Registrar from './Login/FormRegistrar';
import Recuperar from './Login/FormRecuperar';
import EmailRegister from './Components/EmailRegister';
import AdminFeatures from './Routes/AdminFeatures';
import AdminPage from './Routes/AdminPage';
import Categories from './Routes/Categories';
import './App.css';

function App() {
  const { state } = useContext();
  return (
    <Router>
      <div className={`${state.theme} pagina`}>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path="/detail/:id" element={<Detail/>}/>          
          <Route path='/registroUsuario' element={<RegistroUsuario />} />
          <Route path='/emailRegister' element={<EmailRegister />} />
          <Route path='/administracion' element={<AdminPage />} />
          <Route path='/adminProducts' element={<AdminProducts />} /> 
          <Route path='/adminFeatures' element={<AdminFeatures />} />
          <Route path='/FormRegistrar' element={<Registrar />} />
          <Route path='/FormLogin' element={<Login />} />
          <Route path='/FormRecuperar' element={<Recuperar />} />
          <Route path='/categories' element={<Categories />} />
          <Route path='*' element={() => <h1>Not Found</h1>} />
        </Routes>
        <Footer></Footer>
      </div>
    </Router>
  );
}

export default App;