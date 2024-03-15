import React from 'react'

const EmailRegister = () => {
    // const sendEmail = (e) => {
    //     e.preventDefault();

    //     emailjs
    //         .sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, {
    //             publicKey: 'YOUR_PUBLIC_KEY',
    //         })
    //         .then(
    //             () => {
    //                 console.log('SUCCESS!');
    //             },
    //             (error) => {
    //                 console.log('FAILED...', error.text);
    //             },
    //         );
    // };
    return (
        <div className="containerEmailRegister">
            <div className='container2'>
                <h1  >Confirma tu correo</h1>
                <p>Hemos enviado un mensaje de confirmación a tu dirección de correo electrónico.</p>
                <p>Por favor, revisa tu bandeja de entrada para confirmar tu registro. Si no encuentras el mensaje de confirmación en tu bandeja de entrada, te sugerimos revisar en la carpeta de correo no deseado (spam).</p>
                {/* <form ref={form} onSubmit={sendEmail}>
                    <div className="form-group">
                        <label>Nombre:
                            <input type="text" name="name" value={name} onChange={handleNameChange} />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>Correo electrónico:
                            <input type="email" name="email" value={email} onChange={handleEmailChange} />
                        </label>
                    </div>
                    <button type="submit" className='button buttonSecundary'>Reenviar correo</button>

                </form> */}
            </div>
        </div>
    )
}

export default EmailRegister