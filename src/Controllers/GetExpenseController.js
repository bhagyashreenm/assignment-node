const expense = require('../Models/expense');
const moment = require('moment');

async function GetExpensesByUserIdController(req, res) {

    try {

        const { userId,
            page,
            minAmount,
            maxAmount,
            startDate,
            endDate } = req.query

        // let validMinAmount = Number.parseFloat(minAmount);
        // if (Number.isNaN(validMinAmount)) {
        //     return res.status(400).json({
        //         message: `Min Amount invalid! Please enter valid Min Amount`
        //     })
        // }
        // let validMaxAmount = Number.parseFloat(maxAmount);
        // if (Number.isNaN(validMaxAmount)) {
        //     return res.status(400).json({
        //         message: `Max Amount invalid! Please enter valid Max Amount`
        //     })
        // }

        let validPage = Number.parseFloat(page);
        if (Number.isNaN(validPage)) {
            return res.status(400).json({
                message: `Page invalid! Please enter valid page number `
            })
        }

        // if(!moment(startDate, 'YYYY-MM-DD').isValid()){
        //     return res.status(400).json({
        //         message: `Date format invalid! Please enter start date in YYYY-MM-DD`
        //     })
        // }

        // if(!moment(endDate, 'YYYY-MM-DD').isValid()){
        //     return res.status(400).json({
        //         message: `Date format invalid! Please enter end date in YYYY-MM-DD`
        //     })
        // }

        let query = {
           
            $and: []
        }
        if(startDate != null){
            query.$and.push({date: {$gte: new Date(startDate)} })
        }
        if(endDate != null){
            query.$and.push({date: {$lte: new Date(endDate)} })
        }
        if(maxAmount != null){
            query.$and.push({amount:{ $gte: parseFloat(minAmount) }})  
        }
        if(maxAmount != null){
            query.$and.push({amount:{ $lte: parseFloat(maxAmount) }})  
        }
       

        const itemsPerPage = 10

        // const data =await  expense.find({ userId: userId, 'date': { $gte: new Date(startDate), $lte: new Date(endDate) } , 'amount': {$gte: minAmount, $lte: maxAmount}}, null, {skip: itemsPerPage*(page-1), limit: itemsPerPage}).exec()
        const data =await  expense.find({ $and: [{ userId }, query] }, null, {skip: itemsPerPage*(page-1), limit: itemsPerPage}).exec()
        return res.status(200).json(
            data
        );
            
        
    } catch (err) {
        console.error(err.stack);
        res.status(500).json({
            message: err.message
        });
    }
}

module.exports = GetExpensesByUserIdController