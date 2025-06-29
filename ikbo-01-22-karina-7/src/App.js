import React, { useState, useEffect } from 'react';

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
    const [editingItem, setEditingItem] = useState(null);
    const [editText, setEditText] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await fetch('http://localhost:5000/items');
    const data = await res.json();
    setItems(data);
  };

  const addItem = async () => {
    await fetch('http://localhost:5000/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newItem }),
    });
    setNewItem('');
    fetchItems();
  };

  const deleteItem = async (id) => {
    await fetch(`http://localhost:5000/items/${id}`, {
      method: 'DELETE',
    });
    fetchItems();
  };

    const startEdit = (item) => {
        setEditingItem(item.id);
        setEditText(item.name);
    };

    const cancelEdit = () => {
        setEditingItem(null);
        setEditText('');
    };

    const updateItem = async () => {
        await fetch(`http://localhost:5000/items/${editingItem}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: editText }),
        });
        setEditingItem(null);
        setEditText('');
        fetchItems();
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>Список предметов</h2>
            <input
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                placeholder="Новый предмет"
            />
            <button onClick={addItem}>Добавить</button>
            <ul>
                {items.map((item) => (
                    <li key={item.id}>
                        {editingItem === item.id ? (
                            <>
                                <input
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                />
                                <button onClick={updateItem}>Сохранить</button>
                                <button onClick={cancelEdit}>Отмена</button>
                            </>
                        ) : (
                            <>
                                {item.name}{' '}
                                <button onClick={() => startEdit(item)}>Редактировать</button>
                                <button onClick={() => deleteItem(item.id)}>Удалить</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
