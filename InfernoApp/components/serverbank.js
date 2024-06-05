// Node.js сервер
const express = require('express');
const bodyParser = require('body-parser');
const LiqPay = require('liqpay-sdk');
const app = express();

app.use(bodyParser.json());

const liqpay = new LiqPay('Ваш публічний ключ', 'Ваш приватний ключ');

app.post('/payment', (req, res) => {
    const paymentData = req.body;
    const html = liqpay.cnb_form(paymentData);
    res.json({ payment_url: html });
});

app.listen(3000, () => console.log('Сервер запущено на порту 3000'));
