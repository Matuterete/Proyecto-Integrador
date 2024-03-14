import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
        axios.post('http://prothechnics.us.to:8080/categories/add', { title: newCategoryName })
            .then(response => {
                setCategories([...categories, response.data]);
                setNewCategoryName('');
            })
            .catch(error => {
                console.error('Error adding category:', error);
            });
    };

    const updateCategory = () => {
        axios.put(`http://prothechnics.us.to:8080/categories/update/${editingCategoryId}`, { title: editingCategoryName })
            .then(response => {
                const updatedCategories = categories.map(category =>
                    category.id === editingCategoryId ? { ...category, title: editingCategoryName } : category
                );
                setCategories(updatedCategories);
                setEditingCategoryId(null);
                setEditingCategoryName('');
            })
            .catch(error => {
                console.error('Error updating category:', error);
            });
    };

    const deleteCategory = (categoryId) => {
        axios.delete(`http://prothechnics.us.to:8080/categories/delete/id/${categoryId}`)
            .then(() => {
                const updatedCategories = categories.filter(category => category.id !== categoryId);
                setCategories(updatedCategories);
            })
            .catch(error => {
                console.error('Error deleting category:', error);
            });
    };

    return (
        <div>
            <h1>Administrar Categorías</h1>
            <ul>
                {categories.map(category => (
                    <li key={category.id}>
                       <img src={category.url} alt={category.title} /> 
                        {category.title}
                        <button onClick={() => deleteCategory(category.id)}>Eliminar</button>
                        <button onClick={() => { setEditingCategoryId(category.id); setEditingCategoryName(category.title); }}>Editar</button>
                    </li>
                ))}
            </ul>
            <div>
                <input type="text" value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} />
                <button onClick={addCategory}>Agregar</button>
            </div>
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