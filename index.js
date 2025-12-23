const express = require('express');
const app = express();

app.use(express.json({ limit: '10mb' }));

// 👇 ЗАМЕНИ ЭТОТ URL НА ТВОЙ ИЗ APPS SCRIPT (БЕЗ ПРОБЕЛОВ!)
const GAS_URL = 'https://script.google.com/macros/s/AKfycbxy63hBEFZkM12UqbA1qLcGKZYrSLCXK9PI7eWXTliX-u7A5G8C7InUzm5-_2huQtPjhA/exec';

app.post('/telegram', async (req, res) => {
  try {
    await fetch(GAS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
  } catch (e) {
    console.error('Ошибка прокси:', e);
  }
  // ВСЕГДА отвечаем Telegram 200 OK
  res.status(200).send('OK');
});

app.get('/', (req, res) => {
  res.send('Proxy работает ✅');
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
