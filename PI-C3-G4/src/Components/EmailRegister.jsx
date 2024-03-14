import React from 'react'
import '../Components/Styles/EmailRegister.css';

const EmailRegister = () => {
    return (
        <div className="container">
            <div className='container2'>
                <h1  >Confirma tu correo</h1>
                <p>Hemos enviado un correo a tu correo.</p>
                <p>Revisa tu correo para confirmar tu registro, si la confirmación del correo no está en tu bandeja de entrada, por favor revisa en Spam, Gracias</p>
                <button className='button buttonSecundary'>Reenviar correo</button>
            </div>
        </div>
    )
}

export default EmailRegister