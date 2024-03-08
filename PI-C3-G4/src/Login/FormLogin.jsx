import React, { useState, useEffect } from 'react';
//import Card from './Card';
'../Components/styles/Home.css';

//forma login
function FormLogin(props) {
  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Iniciar Sesion</h3>
          <div className="form-group mt-3">
            <label>Correo Electronico</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Ingrese Correo Electronico"
            />
          </div>
          <div className="form-group mt-3">
            <label>Contraseña</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Ingrese Contraseña"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn-registro">
              Iniciar
            </button>
          </div>
          <p className="forgot-password text-right mt-2">
            Olvidaste tu  <a href="/FormRecuperar">Contraseña?</a>
          </p>
        </div>
      </form>
    </div>
  )

}
export default FormLogin;