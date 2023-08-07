const mongoose = require('mongoose');
const Product = require('../Models/Product');

// GET All Products
const getProducts = async(req, res) => {
    try{
        const products = await Product.find({}).sort({createdAt : -1});
        res.status(200).json(products);
    }catch(error){
        res.status(500).json({message : error.message});
    }
}

//GET Product By ID 

const getProductById = async (req, res) => {
    const {id} = req.params;
    let product;
    console.log("id : ",id);
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message : "no such product"});
    }
    try{
        product = await Product.findById(id);
        if(product == null) return res.status(404).json({message : 'Cannot find product'});
    }catch(error){
        return res.status(500).json({ message : error.message});
    }
    res.status(200).json(product);
}
//GET Product By EAN Code

const getProductByEAN = async (req, res) => {
    const {ean} = req.params;
    let product;
    try{
        product = await Product.find({EAN : ean});
        if(product == null || product.length == 0) return res.status(404).json({message : 'Cannot find product'});
    }catch(error){
        return res.status(500).json({ message : error.message});
    }
    console.log("GET_PRODUCT")
    res.status(200).json(product);
}

//POST [CREATE] Product
const createProduct = async (req, res) => {
    const product = new Product({
        EAN : req.body.EAN,
        title : req.body.title,
        images : req.body.images,
        description : req.body.description,
        manufacturer : req.body.manufacturer,
        online_stores : req.body.online_stores,
    });
    try{
        const newProduct = await product.save();
        return res.status(201).json(newProduct);
    }catch(error){
        return res.status(400).json({ message : error.message});
    }
}

//PATCH [EDIT] Product

const updateProduct = async (req,res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id) ){
        return res.status(404).json({ message : "No such Product"});
    }
    let product;
    try{
        product = await Product.findOneAndUpdate({_id: id}, {
            ...req.body
        });
        if(!product) return res.status(404).json({message : "No such Product"});
    }catch(error){
        return res.status(500).json({message : error.message});
    }

    res.status(200).json(product);
}

//DELETE Product

const deleteProduct = async (req,res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ message : "No such Product"});
    }
    let product
    try{
        product = await Product.findOneAndDelete({_id : id});
        if(!product) return res.status(404).json({message : "No such Product"});
    }catch(error){
        res.status(500).json({ message : error.message});
    }

    return res.status(200).json(product);

}

module.exports = {getProducts, getProductById, getProductByEAN, createProduct, updateProduct, deleteProduct};