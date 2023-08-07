const User = require('../Models/User');
const Product = require('../Models/Product');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const createToken = (_id)=>{
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d'});
}

// login
const loginUser = async (req,res) =>{
    const { email, password } = req.body;

    try{
        const user = await User.login(email, password);
        //Create token
        const token = createToken(user._id);
        const id  = user._id.toString();
        res.status(200).json({email, token, id});
    }catch(error){
        res.status(400).json({ message : error.message });
    }
}


// signup
const signupUser = async (req,res) =>{
    const {email, password} = req.body;

    try{
        const user = await User.signup(email, password);
        //Create token

        const token = createToken(user._id);

        res.status(200).json({email, token});
    }catch(error){
        res.status(400).json({message : error.message});
    }
}

// Add Product to user Product Array -> (User.items)
const addUserProduct = async (req, res) => {
    const { product_id, quantity} = req.body;
    const  user_id  = req.user._id;
    if(!mongoose.Types.ObjectId.isValid(user_id)) return res.status(404).json({ message : "No such User"});

    if(!mongoose.Types.ObjectId.isValid(product_id)) return res.status(404).json({ message : "No such Product"});

    try{
        let newItem = {}
        if(typeof quantity === "number"){
            console.log(quantity)
            newItem = {product_id : product_id, quantity : quantity} //NEW ITEM
        }else{
            newItem = {product_id : product_id, quantity : 1} //NEW ITEM
        }
        const isEmpty = await User.find({_id : user_id, items : {$elemMatch : {product_id : product_id}}}); //Check that item exists 
        let user = null;
        //If item does not exist add new item
        if(isEmpty.length === 0){
             user = await User.findOneAndUpdate({_id : user_id}, {
            $push : { items : newItem}});
        //If item exists increase quantity
        }else if(typeof quantity === "number"){
            user = await User.findOneAndUpdate({_id : user_id},
                { $inc : { 'items.$[elem].quantity' : quantity}},
                {arrayFilters: [{'elem.product_id' : product_id}]}
                );
        }else{
            user = await User.findOneAndUpdate({_id : user_id},
                { $inc : { 'items.$[elem].quantity' : 1}},
                {arrayFilters: [{'elem.product_id' : product_id}]}
                );
        }
        return res.status(200).json({ user });
    }catch(error){
        return res.status(500).json({message : error.message});
    }

}

// Delete Product from user Product Array -> (User.items)
const deleteUserProduct = async (req, res) => {
    const {product_id } = req.body;
    const user_id = req.user._id;

    if(!mongoose.Types.ObjectId.isValid(user_id)) return res.status(404).json({ message : "No such User"});

    if(!mongoose.Types.ObjectId.isValid(product_id)) return res.status(404).json({ message : "No such Product"});

    try{

        const itemQuantity = await User.find({_id : user_id, items : {$elemMatch : {quantity : {$lte : 1}, product_id : product_id}}}); //Check that item expists 
        console.log(itemQuantity);
        let user = null;
        //If there is no item or quantity is less than or equal to 1 
        if(itemQuantity.length !==0){
           user  = await User.findOneAndUpdate({_id : user_id,items : {$elemMatch : {product_id : product_id}} },
            {$pull : {items : {product_id : product_id}}});
        //If there is item with quantity greater than 1 decrease quantity
        }else{
            user = await User.findOneAndUpdate({_id : user_id},
                { $inc : { 'items.$[elem].quantity' : -1}},
                {arrayFilters: [{'elem.product_id' : product_id}]}
                );
        }


        return res.status(200).json({ user });
    }catch(error){
        return res.status(500).json({message : error.message});
    }

}
// Get all user products

const getUserProducts = async (req, res) => {
    const { id } = req.user;
    console.log(id) 
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message : 'Cannot find User'}); 
    try{
        const user = await User.findById({_id : id});
        if( user == null ) return res.status(404).json({ message : "Cannot find User"});
        //get only product ID from User.items array (Array of objects);
        const userProductsId = [...user.items].map(item => item.product_id);
        //find Products by userProductsId Array of (User.items.pruduct_id) and then return Array of Products with quantity from (User.items.quantity)
        const userProducts = await Product.find({_id : {$in : userProductsId}}).then(res => {
            let response = []; // response Array of Products with quantity from (User.items.quantity)
            res.forEach( prod => {
               user.items.forEach(item => {
                    if(prod._id.toString() === item.product_id){ // check that Product id match userProductsId Array of (User.items.pruduct_id)
                        response.push({...prod._doc, quantity : item.quantity}); // Adds Product and quantity from  quantity from (User.items.quantity) to response array
                        delete response.__v; // delete __v (varsionKey) <--- TEMPORARY
                    }
                });
            })
            return response;
        })


        return res.status(200).json(userProducts);

    }catch(error){
        return res.status(500).json({message : error.message});
    }
}


module.exports = { signupUser, loginUser, addUserProduct, getUserProducts, deleteUserProduct}; 