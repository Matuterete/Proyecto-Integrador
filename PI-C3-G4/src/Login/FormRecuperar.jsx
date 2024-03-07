import React, { useState, useEffect } from 'react';
//import Card from './Card';
import "../Components/styles/Home.css";
import { useNavigate } from "react-router-dom";

//form recuperar

function FormRecuperar(props) {

  return (
    <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Recuperar Contraseña</h3>
             <div className="form-group mt-3">
              <label>Correo Electronico</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Correo Electronico"
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn-registro">
                Recuperar
              </button>
            </div>
          </div>
        </form>
      </div>
  )


}
export default FormRecuperar;