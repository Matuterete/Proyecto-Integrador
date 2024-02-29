import React, { useState, useEffect } from 'react';
//import Card from './Card';
import "../Components/Styles/Home.css";
import { useNavigate } from "react-router-dom";


function FormRegistrar(props) {

  return (
    <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Registrarse</h3>
            <div className="text-center">
              Estas registrado?{" "}
              <a className="link-primary"  href="/FormLogin">  Iniciar Sesion   </a>
            </div>
            <div className="form-group mt-3">
              <label>Nombre</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Nombre"
              />
            </div>
            <div className="form-group mt-3">
              <label>Apellido</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Apellido"
              />
            </div>
            <div className="form-group mt-3">
              <label>Correo Electronico</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Correo Electronico"
              />
            </div>
            <div className="form-group mt-3">
              <label>Contraseña</label>
              <input
                type="Contraseña"
                className="form-control mt-1"
                placeholder="Contraseña"
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn-registro">
                Registrar
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
export default FormRegistrar;