import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'

import { useContext } from './Utils/Context'

import Navbar from './Components/Navbar'
import Home from './Routes/Home'
import Footer from './Components/Footer'
import RegistroUsuario from './Components/RegistroUsuario'
import Login from './Components/Login'
import AdminProductos from './Components/AdminProductos'
import FormProducto from './Components/FormProducto'
import { useContext } from './Utils/Context'
import './App.css'
import Detail from './Routes/Detail';

function App() {
  const { state } = useContext()
  return (
    <Router>
      <div className={`${state.theme} pagina`}>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/registroUsuario' element={<RegistroUsuario />} />
          <Route path='/adminProductos' element={<AdminProductos />} />
          <Route path='/formProducto' element={<FormProducto />} />
          <Route path='*' element={() => <h1>Not Found</h1>} />
          <Route path="/detail/:id" element={<Detail/>}/>
          <Route path="/detail/:id" element={<Detail/>}/>          
          <Route path='/FormRegistrar' element={<Registrar />} />
          <Route path='/FormRecuperar' element={<Recuperar />} />
          <Route path='/FormLogin' element={<Login />} />

        </Routes>
        <Footer></Footer>
      </div>
    </Router>
  )
}


export default App
