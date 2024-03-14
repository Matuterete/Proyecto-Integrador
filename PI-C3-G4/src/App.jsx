import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useContext } from './Utils/Context';
import Navbar from './Components/Navbar';
import Home from './Routes/Home';
import Footer from './Components/Footer';
import Login from './Components/Login';
import RegistroUsuario from './Components/RegistroUsuario';
import EmailRegister from './Components/EmailRegister';
import Detail from './Routes/Detail';
import AdminProducts from './Routes/AdminProducts';
import AdminUsers from './Routes/AdminUsers';
import AdminFeatures from './Routes/AdminFeatures';
import AdminPage from './Routes/AdminPage';
import Categories from './Routes/Categories';
import ProductosPorCategoria from './Routes/ProductosPorCategoria';
import AdminCategories from './Routes/AdminCategories';
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
          <Route path='/FormLogin' element={<Login />} />
          <Route path='/registroUsuario' element={<RegistroUsuario />} />
          <Route path='/emailRegister' element={<EmailRegister />} />
          <Route path='/administracion' element={<AdminPage />} />
          <Route path='/adminUsers' element={<AdminUsers />} /> 
          <Route path='/adminProducts' element={<AdminProducts />} /> 
          <Route path='/adminFeatures' element={<AdminFeatures />} />
          <Route path='/adminCategories' element={<AdminCategories />} />
          <Route path='/categories' element={<Categories />} />
          <Route path="/categories/:categoryId" element={<ProductosPorCategoria />} />
          <Route path='*' element={() => <h1>Not Found</h1>} />
        </Routes>
      </div>
      <Footer></Footer>
    </Router>
  );
}

export default App;