import React, { useState, useEffect } from 'react';
import '../Components/Styles/Timer.css'

const Timer = () => {
    const [secondsRemaining, setSecondsRemaining] = useState(120); // 1.5 minutes in seconds

    useEffect(() => {
        const interval = setInterval(() => {
            if (secondsRemaining > 0) {
                setSecondsRemaining(secondsRemaining - 1);
            } else {
                clearInterval(interval);
                // Aquí puedes agregar una acción para cuando el tiempo se agote
            }
        }, 1000); // 1 second interval

        return () => clearInterval(interval); // Cleanup function to stop the timer when the component unmounts
    }, [secondsRemaining]);

    const minutes = Math.floor(secondsRemaining / 60);
    const seconds = secondsRemaining % 60;

    return (
        <div className="timer">
            <strong>
                <span>¡Tranquilo! Si no has recibido el correo, en:</span>
                <strong className='element'>
                    {minutes}:{seconds.toString().padStart(2, '0')}
                </strong>
                <span>minutos podrás reenviarlo sin problema.</span></strong>
        </div>
    );
};

export default Timer;
