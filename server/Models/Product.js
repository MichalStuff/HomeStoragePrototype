const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    EAN : {type : String, required: true, unique: true},
    title : {type : String, required: true},
    images : [{type : String, required: true}],
    description : {type : String, required: true},
    manufacturer : {type : String, required: true},
    online_stores : [{
        name : String,
        price : String 
    }]
});
 
module.exports = mongoose.model("Product", productSchema);