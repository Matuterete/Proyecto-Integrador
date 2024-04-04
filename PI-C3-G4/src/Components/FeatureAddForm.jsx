import { useState } from 'react';
import Swal from 'sweetalert2';

const FeatureAddForm = ({ isOpen, onClose, onSubmit }) => {
    const [inputValue, setInputValue] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleChangeImage = (imageUrl) => {
        setSelectedImage(imageUrl);
    };

    const handleSubmit = () => {
        if (inputValue.trim() !== '' && selectedImage !== null) {
            onSubmit(inputValue, selectedImage);
            onClose();
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Falta completar',
                text: 'Por favor, completa todos los campos antes de continuar.',
            });
        }
    };

    return (
        <div className={`modal ${isOpen ? 'open' : ''}`}>
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Agregar Característica</h2>
                <label>
                    Nombre de la nueva Característica:
                    <input type="text" value={inputValue} onChange={handleChange} />
                </label>
                <p>Seleccionar Imagen</p>
                <div className='selectImages'>
                    {responseData.map((feature) => (
                        <button className='buttonImagefeature' key={feature.id} onClick={() => handleChangeImage(feature.url)}>
                            <img src={feature.url} alt={`Imagen ${feature.id}`} />
                        </button>
                    ))}
                </div>
                {selectedImage && (
                    <div className='selectImage'>
                        <p>Imagen Seleccionada:</p>
                        <button className='buttonImagefeature'>
                            <img src={selectedImage} alt="Imagen seleccionada" />
                        </button>
                    </div>
                )}
                <div className='buttonFormBoxFeature'>
                    <button className='addFeatureButton button buttonBlue buttonBig' type="button" onClick={handleSubmit}>Confirmar</button>
                    <button className='button buttonBig buttonSecundary' onClick={onClose}>Cancelar</button>
                </div>
            </div>
        </div>
    );
};

export default FeatureAddForm;
