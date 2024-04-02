import React, { useState, useEffect } from 'react';
import "../Components/Styles/IconButton.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const IconButton = ({ onClick, children, className, icon }) => {
    const [faIcon, setFaIcon] = useState('');

    useEffect(() => {
        if (icon == 'plus') {
            setFaIcon(faPlusCircle);
        }
        else if (icon == 'minus') {
            setFaIcon(faMinusCircle);
        }
        else if (icon == 'pencil') {
            setFaIcon(faPencil);
        }
        else if (icon == 'eye') {
            setFaIcon(faEye);
        }
        else if (icon == 'star') {
            setFaIcon(faStar);
        }
      }, []);
    
    return (
        <button type='button' onClick={onClick} className={'customButton ' + className}>
            {children}
            {faIcon ? (
                <FontAwesomeIcon className='customButton-icon' icon={faIcon} />
            ) :
            (
                <div/>
            )}
        </button>
    );
}

export default IconButton;