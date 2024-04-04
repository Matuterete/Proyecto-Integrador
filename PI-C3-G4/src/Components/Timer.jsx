import React, { useState, useEffect } from 'react';
import '../Components/Styles/Timer.css'

const Timer = () => {
    const [secondsRemaining, setSecondsRemaining] = useState(120); 

    useEffect(() => {
        const interval = setInterval(() => {
            if (secondsRemaining > 0) {
                setSecondsRemaining(secondsRemaining - 1);
            } else {
                clearInterval(interval);
                
            }
        }, 1000);

        return () => clearInterval(interval); 
    }, [secondsRemaining]);

    const minutes = Math.floor(secondsRemaining / 60);
    const seconds = secondsRemaining % 60;

    return (
        <div className="timer">
            <strong>
                <span>Si no has recibido el correo, Espera:</span>
                <strong className='element'>
                    {minutes}:{seconds.toString().padStart(2, '0')}
                </strong>
                <span>para reenviar el correo de confirmación</span></strong>
        </div>
    );
};

export default Timer;

