import React, { useEffect, useState } from 'react';
import axios from 'axios';
import IconButton from '../Components/IconButton';
import Swal from 'sweetalert2';
import requestToAPI from '../services/requestToAPI';

const AdminCategories = () => {
    const [categories, setCategories] = useState([]);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [editingCategoryId, setEditingCategoryId] = useState(null);
    const [editingCategoryName, setEditingCategoryName] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                const url = 'http://prothechnics.us.to:8080/categories/find/all';
                const method = 'GET';
                const data = null;
                const headers = {};

                const responseData = await requestToAPI(url, method, data, headers);
                setCategories(responseData);
                console.log('llamado de api CATEGORIES');
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, [editingCategoryId]);

    const addCategory = () => {
        Swal.fire({
            title: 'Agregar Categoría',
            input: 'text',
            inputPlaceholder: 'Nombre de la categoría',
            showCancelButton: true,
            confirmButtonText: 'Agregar',
            cancelButtonText: 'Cancelar',
            showLoaderOnConfirm: true,
            preConfirm: (newCategoryName) => {
                if (!newCategoryName) {
                    Swal.showValidationMessage('Por favor ingresa un nombre de categoría');
                }
                return newCategoryName;
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post('http://prothechnics.us.to:8080/categories/add', { title: result.value, description: '', url: '' })
                    .then(response => {
                        setCategories([...categories, response.data]);
                        Swal.fire('¡Agregado!', 'La categoría ha sido agregada correctamente.', 'success');
                    })
                    .catch(error => {
                        console.error('Error adding category:', error);
                        Swal.fire('Error', 'Hubo un problema al agregar la categoría.', 'error');
                    });
            }
        });
    };

    const updateCategory = (categoryId, categoryName) => {
        Swal.fire({
            title: 'Editar Categoría',
            input: 'text',
            inputValue: categoryName,
            inputPlaceholder: 'Nuevo nombre de la categoría',
            showCancelButton: true,
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar',
            showLoaderOnConfirm: true,
            preConfirm: (newCategoryName) => {
                if (!newCategoryName) {
                    Swal.showValidationMessage('Por favor ingresa un nombre de categoría');
                }
                return newCategoryName;
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                axios.put(`http://prothechnics.us.to:8080/categories/update`, { id: categoryId, title: result.value, description: '', url: '' })
                    .then(response => {
                        const updatedCategories = categories.map(category =>
                            category.id === categoryId ? { ...category, title: result.value } : category
                        );
                        setCategories(updatedCategories);
                        Swal.fire('¡Editado!', 'La categoría ha sido actualizada correctamente.', 'success');
                    })
                    .catch(error => {
                        console.error('Error updating category:', error);
                        Swal.fire('Error', 'Hubo un problema al actualizar la categoría.', 'error');
                    })
                    .finally(() => {
                        setEditingCategoryId(null);
                        setEditingCategoryName('');
                    });
            }
        });
    };

    const deleteCategory = (categoryId) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Una vez eliminada, no podrás recuperar esta categoría',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://prothechnics.us.to:8080/categories/delete/id/${categoryId}`)
                    .then(() => {
                        const updatedCategories = categories.filter(category => category.id !== categoryId);
                        setCategories(updatedCategories);
                        Swal.fire('¡Eliminada!', 'La categoría ha sido eliminada correctamente.', 'success');
                    })
                    .catch(error => {
                        console.error('Error deleting category:', error);
                        Swal.fire('Error', 'Hubo un problema al eliminar la categoría.', 'error');
                    });
            }
        });
    };

    return (
        <div className='bodyFeatures'>
            <div className='titleFeatures'>
                <h2>Administrar Categorías</h2>
            </div>
            <div>
                <input type="text" value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} />
                <div className='addFeatureButton'>
                    <IconButton className='button buttonPrimary buttonBig' onClick={addCategory} icon="plus">Agregar Categoría</IconButton>
                </div>
            </div>
            <ul>
                {categories.map(category => (
                    <li key={category.id} className="list-item">
                        <img src={category.url} alt={category.title} />
                        {category.title}
                        <div>
                            <IconButton className='button buttonPrimary' icon="eye">Consultar</IconButton>
                            <IconButton className='button buttonPrimary' onClick={() => updateCategory(category.id, category.title)} icon="pencil">Modificar</IconButton>
                            <IconButton className='button buttonTerciary' onClick={() => deleteCategory(category.id)} icon="minus">Eliminar</IconButton>
                        </div>
                    </li>
                ))}
            </ul>
            {editingCategoryId && (
                <div>
                    <input type="text" value={editingCategoryName} onChange={(e) => setEditingCategoryName(e.target.value)} />
                    <button onClick={updateCategory}>Guardar</button>
                    <button onClick={() => { setEditingCategoryId(null); setEditingCategoryName(''); }}>Cancelar</button>
                </div>
            )}
        </div>
    );
};

export default AdminCategories;