// src/components/AdminItemActions.js
import React, { useState } from 'react';
import axios from 'axios';

const AdminItemActions = ({ token }) => {
    const [itemName, setItemName] = useState('');

    const addItem = async () => {
        if (!itemName) return;

        try {
            const res = await axios.post(
                'http://localhost:5000/items',
                { name: itemName },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log('Предмет добавлен:', res.data);
        } catch (error) {
            console.error('Ошибка при добавлении предмета:', error.response ? error.response.data : error.message);
            alert('Ошибка при добавлении предмета');
        }
    };

    const deleteItem = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/items/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log('Предмет удалён');
        } catch (error) {
            console.error('Ошибка при удалении предмета:', error.response ? error.response.data : error.message);
            alert('Ошибка при удалении предмета');
        }
    };

    return (
        <div>
            <h2>Добавить предмет</h2>
            <input
                type="text"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                placeholder="Введите название предмета"
            />
            <button onClick={addItem}>Добавить</button>

            <h2>Удалить предмет</h2>
            <button onClick={() => deleteItem(1)}>Удалить предмет с ID 1</button>
        </div>
    );
};

export default AdminItemActions;
