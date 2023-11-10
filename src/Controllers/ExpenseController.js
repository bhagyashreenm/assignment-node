const expense = require('../Models/expense');
const moment = require('moment');

async function AddExpenseController(req, res) {

    try {

        const {userId, item, date, amount} = req.body
        if(userId && item && amount && date){
            if(!moment(date, 'YYYY-MM-DD').isValid()){
                return res.status(400).json({
                    message: `Date format invalid! Please enter date in YYYY-MM-DD`
                })
            }

            let validAmount = Number.parseFloat(amount);
            if (Number.isNaN(validAmount)) {
                return res.status(400).json({
                    message: `Amount invalid! Please enter valid Amount`
                })
            }

            console.log(`UserId : ${userId} && Amount : ${amount}`);

            const expenseData = new expense({userId  , item, amount, date})
            await expenseData.save()

            return res.status(200).json({
                message: `Expense successfully added`,
                data: expenseData
            })
        }else{
            return res.status(400).json({
                message: `All fields are required!! [userId, item, date & amount]`
            })
        }
    } catch (err) {
        console.error(err.stack);
        res.status(500).json({
            message: err.message
        });
    }
}

module.exports = AddExpenseController