const express = require('express');
const router = express.Router();
const  requireAuth  = require('../Middleware/requireAuth');
// Controllers 
const { signupUser, loginUser, addUserProduct, getUserProducts, deleteUserProduct } = require('../Controllers/userController');

//login 
router.post('/login', loginUser);
//singup
router.post('/signup', signupUser);
//Add product to the User Product Array || plus autorization
router.post('/add',requireAuth, addUserProduct);
router.patch('/delete',requireAuth,deleteUserProduct)
// Get user Products
router.get('/get',requireAuth, getUserProducts);

module.exports = router;