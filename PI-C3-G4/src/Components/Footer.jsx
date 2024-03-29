import React from 'react'
import Logo from '../assets/Logo-2.png';
import facebook from '../assets/ico-facebook.png'
import insta from '../assets/ico-instagram.png'
import whap from '../assets/ico-whatsapp.png'
import tiktok from '../assets/ico-tiktok.png'
import Swal from 'sweetalert2';
import '../Components/Styles/Footer.css';

const Footer = () => {

  const handleTerminos = (e) => {
    Swal.fire({
      title: "<strong><u>Políticas de Uso, Cuidado y Precauciones</u></strong>",
      icon: "question",
      html: `<p style="text-align: left;">En ProTechnics, nos comprometemos a garantizar una experiencia segura y satisfactoria para todos nuestros clientes. Por ello, es importante que conozcas y cumplas nuestras políticas de uso, cuidado y precauciones al momento de alquilar nuestros productos de sonido e iluminación para eventos.</p>
            <ul style="text-align: left;">
              <li><strong>Uso Responsable:</strong>
                <ul>
                  <li>Los productos alquilados deben ser utilizados exclusivamente para los fines acordados en el contrato de alquiler.</li>
                  <li>No se permite su uso en condiciones climáticas adversas como lluvia, temperaturas extremas, a menos que estén expresamente diseñados para ello.</li>
                </ul>
              </li>
              <li><strong>Manejo y Transporte:</strong>
                <ul>
                  <li>Es importante manipular y transportar los equipos con cuidado para evitar daños.</li>
                  <li>Se recomienda utilizar vehículos apropiados y asegurar una sujeción adecuada durante el transporte para prevenir accidentes y roturas.</li>
                </ul>
              </li>
              <li><strong>Instalación:</strong>
                <ul>
                  <li>La instalación de los equipos debe ser llevada a cabo únicamente por personal capacitado y autorizado por ProTechnics.</li>
                  <li>No se permite modificar la configuración de los equipos sin autorización previa.</li>
                </ul>
              </li>
              <li><strong>Cuidado y Mantenimiento:</strong>
                <ul>
                  <li>Mantén los equipos en condiciones limpias y libres de polvo.</li>
                  <li>Evita exponer los equipos a líquidos o condiciones extremas de temperatura.</li>
                  <li>Reporta cualquier anomalía o mal funcionamiento de los equipos de forma inmediata a nuestro equipo técnico.</li>
                </ul>
              </li>
              <li><strong>Protección contra Robo o Pérdida:</strong>
                <ul>
                  <li>Eres responsable de la seguridad de los equipos durante el período de alquiler.</li>
                  <li>En caso de robo o pérdida, por favor infórmanos de inmediato y asume los costos correspondientes según lo establecido en el contrato de alquiler.</li>
                </ul>
              </li>
              <li><strong>Restricciones de Uso:</strong>
                <ul>
                  <li>No se permite el uso de nuestros equipos en eventos donde se promueva o realice actividad ilegal o peligrosa.</li>
                  <li>Los equipos no deben ser prestados o alquilados a terceros sin nuestro consentimiento previo.</li>
                </ul>
              </li>
              <li><strong>Devolución de Equipos:</strong>
                <ul>
                  <li>Devuelve los equipos en las mismas condiciones en las que fueron entregados.</li>
                  <li>La devolución debe realizarse en la fecha y hora acordadas en el contrato de alquiler. En caso de retraso, se aplicarán cargos adicionales.</li>
                </ul>
              </li>
              <li><strong>Responsabilidad por Daños:</strong>
                <ul>
                  <li>Eres responsable de cualquier daño o pérdida de los equipos durante el período de alquiler, salvo desgaste normal o defectos de fabricación.</li>
                  <li>Realizaremos una inspección de los equipos al momento de la devolución para evaluar posibles daños y determinar responsabilidades.</li>
                </ul>
              </li>
            </ul>`,
      showCloseButton: true,
      focusConfirm: false
    });
  };

  return (
    <footer className='footer'>

      <div className='footer-logo'>
        <img src={Logo}></img>
      </div>

      <div className='footer-iconos'>

        <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
          <img src={facebook} alt='logo_facebook' width='20px' />
        </a>

        <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
          <img src={insta} alt='logo_insta' width='20px' />
        </a>

        <a href="https://www.whatsapp.com" target="_blank" rel="noreferrer">
          <img src={whap} alt='logo_whasap' width='20px' />
        </a>

        <a href="https://www.tiktok.com" target="_blank" rel="noreferrer">
          <img src={tiktok} alt='logo_tiktok' width='20px' />
        </a>

      </div>

      <div className='footer-iconos'>
        <button className='btn-terminos' onClick={handleTerminos}>
          Términos y condiciones
        </button>
      </div>

      <div className='footer-copyright'>
        <p className='copyright'>Copyright ® 2024</p>
      </div>
    </footer>
  )
}

export default Footer