import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Home from './Routes/Home'
import FormProducto from './Components/FormProducto'
import AgregarProducto from './Components/AgregarProducto'
import { useContext } from './Utils/Context'
import Detail from './Routes/Detail';
import AdminPage from './Routes/AdminPage'
import './App.css'

function App() {
  const { state } = useContext()
  return (
    <Router>
      <div className={`${state.theme} pagina`}>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/administracion' element={<AdminPage />}>
            <Route path='/agregar-producto' element={<AgregarProducto />} />
          </Route>
          <Route path='/FormProducto' element={<FormProducto />} />
          <Route path='*' element={() => <h1>Not Found</h1>} />
          <Route path="/detail/:id" element={<Detail/>}/>
        </Routes>
        <Footer></Footer>
      </div>
    </Router>
  )
}

export default App
