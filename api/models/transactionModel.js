const mongoose = require('mongoose')
const { model, Schema } = mongoose;

const transactionSchema = new Schema({
	expense: {
		type: String,
		required: true,
	},
	date: {
		type: String,
		required: true,
	},
	desc: {
		type: String,
		required: true,
	},
	price: {
		type: String,
		required: true,
	},
});

const transactionModel = model('transaction2', transactionSchema)

module.exports = transactionModel