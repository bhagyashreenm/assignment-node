const express = require('express');
const multer = require('multer'); 
const AddUserController = require('../Controllers/AddUserController');
const AddExpenseController = require('../Controllers/ExpenseController');
const GetAllUsersController = require('../Controllers/GetAllUsersController');
const GetExpensesByUserIdController = require('../Controllers/GetExpenseController');
const  UploadImageController = require('../Controllers/UploadImageController');

const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB file size limit
    },
  });

router.get('/allUsers', GetAllUsersController);
router.get('/getExpenseByUserId', GetExpensesByUserIdController);
router.post('/createUser', AddUserController);
router.post('/addExpense', AddExpenseController);
router.post('/uploadImage', upload.single('image') ,UploadImageController) 



module.exports = { router };


