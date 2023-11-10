const mongoose = require('mongoose')
const { Schema } = mongoose

const expenseSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    item: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
},
{
    timestamps: true,
})

module.exports = mongoose.model('Expense', expenseSchema)