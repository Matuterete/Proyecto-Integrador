import React from 'react'
import '../Components/Styles/EmailRegister.css';

const EmailRegister = () => {
    return (
        <div className="containerEmailRegister">
            <div className='container2'>
                <h1  >Confirma tu correo</h1>
                <p>Hemos enviado un mensaje de confirmación a tu dirección de correo electrónico.</p>
                <p>Por favor, revisa tu bandeja de entrada para confirmar tu registro. Si no encuentras el mensaje de confirmación en tu bandeja de entrada, te sugerimos revisar en la carpeta de correo no deseado (spam).</p>
                <button className='button buttonSecundary'>Reenviar correo</button>
            </div>
        </div>
    )
}

export default EmailRegister