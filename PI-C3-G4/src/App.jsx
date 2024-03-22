
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
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
import AdminCategories from './Routes/AdminCategories';
import FavoriteList from './Routes/FavoriteList';
import './App.css';
import ProtectedRoute from './Utils/ProtectedRoute';
import { useEffect, useState } from 'react';
import UserProfile from './Routes/UserProfile';

function App() {
  const { state } = useContext();

  const [sessionData, setSessionData] = useState(sessionStorage.getItem('userData') || '');

  return (
    <BrowserRouter>
      <div className={`${state.theme} pagina`}>
        <Navbar />

        <Routes>
          <Route path='*' element={() => <h1>Not Found</h1>} />
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path='/registroUsuario' element={<RegistroUsuario />} />
          <Route path='/emailRegister' element={<EmailRegister />} />
          <Route path='/userprofile' element={<UserProfile />} />
          <Route element={<ProtectedRoute canActive={sessionData.includes('ADMIN')} />}>
            <Route path='/administracion' element={<AdminPage />} />
            <Route path='/adminUsers' element={<AdminUsers />} />
            <Route path='/adminProducts' element={<AdminProducts />} />
            <Route path='/adminFeatures' element={<AdminFeatures />} />
            <Route path='/adminCategories' element={<AdminCategories />} />
          </Route>
          <Route path='/FavoriteList' element={<FavoriteList />} />
        </Routes>
      </div>
      <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;