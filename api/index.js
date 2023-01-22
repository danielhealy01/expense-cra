const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const transactionModel = require('./models/transactionModel')

require('dotenv').config();

const app = express();
const PORT = 4000;
const URL = process.env.MONGO_URL

app.use(cors());
app.use(express.json());
// assuming dont need the url encoded middleware
// app.use(express.urlencoded({extended: false}))


// If get warnings
// mongoose.set('strictQuery', false);


app.get('/', (req, res, next) => {
	res.json('hi');
});

//promise chain error  handling for async, try catch for sync
//.catch(next
//app.use((err, req, res, next) => {
  // handle error, maybe, throw New error Error('Something happened' + err)
// }))

// GET all transactions from db
app.get('/api/transactions', async (req, res, next) => {
  await mongoose.connect(URL)
  const transactions = await transactionModel.find()
  res.json(transactions)
});

//POST an expense to the db
app.post('/api/postExpense', async (req, res, next) => {
  await mongoose.connect(URL);
  const { expense, date, desc, price } = req.body
  const transactionCreate = await transactionModel.create({ expense, date, desc, price })
  res.json(transactionCreate)
});

app.listen(PORT);
console.log(`app listening on ${PORT}`);
