// src/components/ItemList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ItemList = ({ token }) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const res = await axios.get('http://localhost:5000/items', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setItems(res.data);
            } catch (error) {
                console.error('Ошибка при загрузке предметов:', error);
            }
        };
        fetchItems();
    }, [token]);

    return (
        <div>
            <h2>Список предметов</h2>
            <ul>
                {items.map(item => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default ItemList;
