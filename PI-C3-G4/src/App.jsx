import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Home from './Routes/Home'
import FormProducto from './Components/FormProducto'
import AgregarProducto from './Components/AgregarProducto'
import { useContext } from './Utils/Context'
import './App.css'
import Detail from './Routes/Detail';

function App() {
  const { state } = useContext()
  return (
    <Router>
      <div className={`${state.theme}`}>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/AgregarProducto' element={<AgregarProducto />} />
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
