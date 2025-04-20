const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
const cors = require('cors');
const { secret } = require('./auth');

const app = express();
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'mydb',
    password: '111',
    port: 5432,
});

app.use(cors());
app.use(express.json());

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.sendStatus(401);
    try {
        const user = jwt.verify(token, secret);
        req.user = user;
        next();
    } catch (e) {
        res.sendStatus(403);
    }
};

app.post('/register', async (req, res) => {
    const { username, password, role = 'user' } = req.body;
    const hash = await bcrypt.hash(password, 10);
    await pool.query('INSERT INTO users (username, password, role) VALUES ($1, $2, $3)', [username, hash, role]);
    res.sendStatus(201);
});

// Логин
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const result = await pool.query('SELECT * FROM users WHERE username=$1', [username]);
    const user = result.rows[0];

    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ id: user.id, role: user.role }, 'super-secret-key');
        res.json({ token });
    } else {
        res.sendStatus(401);
    }
});

app.get('/items', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM things');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Ошибка при получении предметов:', error);
        res.status(500).json({ error: 'Произошла ошибка на сервере' });
    }
});


app.post('/items', authMiddleware, async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ error: 'Название предмета обязательно' });
        }

        const userId = req.user.id;
        const userRole = req.user.role;

        if (userRole !== 'admin') {
            return res.status(403).json({ error: 'Нет прав для добавления предметов' });
        }

        const result = await pool.query('INSERT INTO things (name, owner_id) VALUES ($1, $2) RETURNING *', [name, userId]);
        const newItem = result.rows[0];
        return res.status(201).json(newItem);
    } catch (error) {
        console.error('Ошибка при добавлении предмета:', error);
        res.status(500).json({ error: 'Произошла ошибка на сервере' });
    }
});

app.delete('/items/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const user = req.user;

        const result = await pool.query('SELECT owner_id FROM things WHERE id = $1', [id]);
        const item = result.rows[0];

        if (!item) {
            return res.status(404).json({ error: 'Предмет не найден' });
        }

        if (user.role !== 'admin') {
            return res.status(403).json({ error: 'Нет прав для удаления предмета' });
        }

        await pool.query('DELETE FROM things WHERE id = $1', [id]);
        return res.status(204).send();
    } catch (error) {
        console.error('Ошибка при удалении предмета:', error);
        res.status(500).json({ error: 'Произошла ошибка на сервере' });
    }
});


app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});
