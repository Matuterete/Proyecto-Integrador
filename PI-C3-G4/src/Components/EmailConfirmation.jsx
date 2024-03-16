import React, { useRef } from 'react';
// import emailjs from '@emailjs/browser';

function EmailConfirmation({ emailform, nameform, handleSubmit }) {
//   const form = useRef();

//   const emailSubmit = (e) => {
//     e.preventDefault();

//     emailjs
//       .sendForm('service_9nydvzd', 'template_vf09e5z', form.current, {
//         publicKey: '_tQw4BNfAWBkcyhJO',
//       })
//       .then(
//         () => {
//           console.log('SUCCESS!');
//         },
//         (error) => {
//           console.log('FAILED...', error.text);
//         },
//       );

//     handleSubmit(e); // Llama a la función handleSubmit del componente padre
//   };

  return (
    <div>
      <div className='container2'>
        <h1>Confirma tu correo</h1>
        <p>Hemos enviado un mensaje de confirmación a tu dirección de correo electrónico.</p>
        <p>Por favor, revisa tu bandeja de entrada para confirmar tu registro. Si no encuentras el mensaje de confirmación en tu bandeja de entrada, te sugerimos revisar en la carpeta de correo no deseado (spam).</p>
        <form  onSubmit={handleSubmit}>
          <input type="text" name="name" defaultValue={nameform} style={{ display: 'none' }} />
          <input type="email" name="email" defaultValue={emailform} style={{ display: 'none' }} />
          <button type="submit" className='button buttonSecundary'>Reenviar correo</button>
        </form>
      </div>
    </div>
  );
}

export default EmailConfirmation;

