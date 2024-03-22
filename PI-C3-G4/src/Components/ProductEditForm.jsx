import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import requestToAPI from '../services/requestToAPI';

function ProductEditForm({ product, onSave, onCancel }) {
  const [id] = useState(product.id);
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [isActive, setIsActive] = useState(product.isActive);
  const [stock, setStock] = useState(product.stock);
  const [selectedCategory, setSelectedCategory] = useState(product.category.id);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await requestToAPI('categories/find/all', 'GET');
        setCategories(response);
      } catch (error) {
        console.error(error);
      }
    }
  
    fetchCategories();
  }, []);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleIsActiveChange = (e) => {
    setIsActive(e.target.checked);
  };

  const handleStockChange = (e) => {
    setStock(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    requestToAPI(`products/update`, 'PUT', {
      id,
      name,
      description,
      price,
      isActive,
      stock,
      category: {
        id: selectedCategory
      }
    })
      .then(() => {
        onSave({
          id,
          name,
          description,
          price,
          isActive,
          stock,
          category: {
            id: selectedCategory
          }
        });
        Swal.fire({
          icon: 'success',
          title: 'Producto actualizado correctamente',
          showConfirmButton: false,
          timer: 2000 // Cerrar automáticamente después de 2 segundos
        });
      })
      .catch(error => {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Error inesperado',
          text: 'Hubo un error al intentar actualizar el usuario',
          showConfirmButton: true
        });
      });
  };

  return (
    <form onSubmit={handleSubmit} className='Form container'>
      <h2>Editar producto</h2>
      <div className='form-group'>
        <label>
          Nombre:
          <input type="text" value={name} onChange={handleNameChange} />
        </label>
      </div>
      <div className='form-group'>
        <label>
          Descripción:
          <textarea rows="5" value={description} onChange={handleDescriptionChange} />
        </label>
      </div>
      <div className='form-group'>
        <label>
          Precio:
          <input type="number" value={price} onChange={handlePriceChange} />
        </label>
      </div>
      <div className='form-group'>
        <label>
          Activo:
          <input type="checkbox" checked={isActive} onChange={handleIsActiveChange} />
        </label>
      </div>
      <div className='form-group'>
        <label>
          Stock:
          <input type="number" value={stock} onChange={handleStockChange} />
        </label>
      </div>
      <div className='form-group'>
        <label>
          Categoría:
          <select value={selectedCategory} onChange={handleCategoryChange}>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className='form-group buttonCenter'>
        <button type='submit' className='button buttonPrimary buttonBig'>Guardar Cambios</button>
        &nbsp;&nbsp;&nbsp;
        <button type='button' className='button buttonTerciary buttonBig' onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  );
}

export default ProductEditForm;