const mongoose = require('mongoose');


const bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    author: {
        type: String,
        required: true
    },
    pages: Number,
    genre: String,
    releaseDate: Date,
    price: Number,
    toRead: { // już przeczytana czy do przeczytania
        type: Boolean,
        required: true
    } 
})

module.exports = mongoose.model("Book", bookSchema);