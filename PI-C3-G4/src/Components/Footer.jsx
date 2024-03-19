import React from 'react'
import Logo from '../assets/Logo-2.png';
import facebook from '../assets/ico-facebook.png'
import insta from '../assets/ico-instagram.png'
import whap from '../assets/ico-whatsapp.png'
import tiktok from '../assets/ico-tiktok.png'
import '../Components/styles/Footer.css';

const Footer = () => {
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

      <div className='footer-copyright'>
        <p className='copyright'>Copyright ® 2024</p>
      </div>
    </footer>
  )
}

export default Footer