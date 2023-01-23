import './App.css';
import { useState, useEffect } from 'react';

function App() {
	const [expense, setExpense] = useState('');
	const [submitExpenseEmpty, setSubmitExpenseEmpty] = useState(false);
	const [date, setDate] = useState('');
	const [desc, setDesc] = useState('');
	const [transactions, setTransactions] = useState([]);

	async function getTransactions() {
		const res = await fetch('http://localhost:4000/api/transactions/');
		return await res.json();
	}

	useEffect(() => {
		getTransactions().then(setTransactions);
	}, [expense]);

	console.log(transactions);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (expense.length === 0) {
			console.log('empty');
			setSubmitExpenseEmpty(true);
		} else {
			const priceValue = expense.split(' ')[0];
			// fetch

			const data = JSON.stringify({
				//trying slice instead of substring
				expense: expense.slice(priceValue.length + 1),
				date,
				desc,
				price: priceValue.slice(1),
			});

			console.log(data);

			fetch('http://localhost:4000/api/postExpense', {
				method: 'POST',
				headers: {
					'content-type': 'application/json',
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
				},
				body: data,
			}).then((res) => {
				res.json().then((json) => {
					console.log(json);
				});
				setExpense('');
				setDate('');
				setDesc('');
			});
		}

		// add shake animation to input filed if empty
	};

	let balance = 0;
	for (const transaction of transactions) {
		// balance += Number(transaction.price)
		balance += +transaction.price;
	}

	return (
		<div className='App'>
			<div className='App-header'>
				<h1>£{balance}</h1>
				<form onSubmit={handleSubmit}>
					<div>
						<input
							placeholder='£700 Macbook'
							type='text'
							value={expense}
							onChange={(e) => setExpense(e.target.value)}
							className={submitExpenseEmpty === false ? 'input' : 'input shake'}
						></input>
						<input
							type='date'
							value={date}
							onChange={(e) => setDate(e.target.value)}
							className='input'
						/>
						<input
							placeholder='Description'
							type='text'
							value={desc}
							onChange={(e) => setDesc(e.target.value)}
							className='input'
						></input>
					</div>
					<button onClick={handleSubmit}>Submit</button>
				</form>
				{transactions.map((transaction) => {
					return (
						<div className='transactions' key={transaction._id}>
							<div className='row'>
								<h2>{transaction.expense}</h2>
								<h2>£{transaction.price}</h2>
							</div>
							<div className='row'>
								<h3>{transaction.date}</h3>
								<h3>{transaction.desc}</h3>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default App;
