const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config(); 
const bodyParser = require('body-parser');
const books = require('./routes/books');

app.use(bodyParser.json());


app.get('/', (req,res) => {
    res.send("Strona główna");
})


app.use('/library', books);


mongoose.connect(process.env.checkAuth, { useNewUrlParser: true },() => {
    console.log("Połączono z bazą danych")
})


app.listen(3000);
