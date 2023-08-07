const express = require('express');
const router = express.Router();
const {getProducts, getProductById, getProductByEAN, createProduct, updateProduct, deleteProduct} = require('../Controllers/productController');
const requireAuth = require('../Middleware/requireAuth');


//Requre auth for all product routes
// router.use(requireAuth);

// GET All Products
router.get('/', getProducts);
// GET Product By ID
router.get('/:id', getProductById);
// GET Product By EAN Code
router.get('/EAN/:ean', getProductByEAN);
//POST [CREATE] Product
router.post('/',createProduct);
//Upate
router.patch('/:id',updateProduct);
//Delete
router.delete('/:id', deleteProduct);

module.exports = router; 