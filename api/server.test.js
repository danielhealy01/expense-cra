const request = require('supertest')
const app = require('./server.js')

describe('POST /api/postExpense', () => {
	describe('given all fields', () => {
		test('should status code 200', async () => {
      const response = await request(app).post('/api/postExpense').send({
				expense: 'testExpense',
				date: '2023-01-20',
				desc: 'testDescr',
				price: '222'
      });
      expect(response.statusCode).toBe(200)
    });
    test('res headers are json', async () => {
			const response = await request(app).post('/api/postExpense').send({
				expense: 'testExpense',
				date: '2023-01-20',
				desc: 'testDescr',
				price: '222',
			});
			expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
		});

		// save data to db
		//res json object
	});
});
