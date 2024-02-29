import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'

import { useContext } from './Utils/Context'

import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Home from './Routes/Home'
import FormProducto from './Components/FormProducto'
import AgregarProducto from './Components/AgregarProducto'
import Detail from './Routes/Detail';
import Login from './Login/FormLogin';
import Registrar from './Login/FormRegistrar';
import Recuperar from './Login/FormRecuperar';

//se anexan las nuevas form

function App() {
  const { state } = useContext()
  return (
    <Router>
      <div className={`${state.theme} pagina`}>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/AgregarProducto' element={<AgregarProducto />} />
          <Route path='/FormProducto' element={<FormProducto />} />
          <Route path='*' element={() => <h1>Not Found</h1>} />
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
