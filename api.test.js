const supertset =  require('supertest')
const express = require('express') ;
const app = express();

  describe('api/v1/allUsers', () => {
    it('should give all user details', async () => {
      const res = await supertset(app)
        .get('/api/v1/getAllUsers')
        expect(200)
        expect(res.body)
    })
  })

  describe('api/v1/createUser', () => {
      it('should create a new post', async () => {
        const res = await supertset(app)
          .post('/api/v1/createUser')
          .send({
              "name":"Radha",
              "phone":"7862234986"
          })
        expect(200)
        expect(res.body)
      })
    })
  
  describe('api/v1/addExpense', () => {
    it('should create a new expense', async () => {
      const res = await supertset(app)
        .post('/api/v1/addExpense')
        .send({
            "userId": "654124a19430c12eb9b7ca81",
            "item": "Fruits",
            "amount": "1280.00",
            "date": "2023-10-25"
        })
      expect(200)
      expect(res.body)
    })
  })

  describe('api/v1/getExpenseByUserId', () => {
    it('should return user', async () => {
      const res = await supertset(app)
        .post('/api/v1/getExpenseByUserId')
        .query({
            "userId": "654124a19430c12eb9b7ca81",
            "page":"2",
            "minAmount":"0",
            "maxAmoun":"200",
            "startDate":"22023-10-26",
            "endDate":"22023-10-30"
        })
      expect(200)
      expect(res.body)
    })
  })

  