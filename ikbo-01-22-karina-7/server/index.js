const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'mydb',
    password: '111',  // замени при необходимости
    port: 5432,
});

// Получить все записи
app.get('/items', async (req, res) => {
    const result = await pool.query('SELECT * FROM items');
    res.json(result.rows);
});

// Добавить запись
app.post('/items', async (req, res) => {
    const { name } = req.body;
    await pool.query('INSERT INTO items (name) VALUES ($1)', [name]);
    res.sendStatus(201);
});

// Обновить запись
app.put('/items/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ error: 'Name is required' });
        }

        const result = await pool.query(
            'UPDATE items SET name = $1 WHERE id = $2 RETURNING *',
            [name, id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Item not found' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Удалить запись
app.delete('/items/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM items WHERE id = $1', [id]);
    res.sendStatus(204);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
