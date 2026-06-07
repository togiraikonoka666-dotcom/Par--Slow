// server.js - Backend для "Пара слов"
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Хранилище сообщений (в памяти)
let messages = [];

// Получить все сообщения
app.get('/api/messages', (req, res) => {
    res.json(messages);
});

// Отправить сообщение
app.post('/api/messages', (req, res) => {
    const { text, isAnonymous } = req.body;
    if (!text) return res.status(400).json({ error: 'Текст обязателен' });

    const message = {
        id: Date.now(),
        text,
        isAnonymous: isAnonymous !== false,
        timestamp: new Date().toISOString()
    };

    messages.push(message);
    res.json(message);
});

// Главная страница
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
