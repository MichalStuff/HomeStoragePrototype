const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
    },
    items : [{
        product_id : {
            type : String,
            unique : false
        },
        quantity : {
            type : Number,
            default : 1 
        }
    }]

});

// static signup method
userSchema.statics.signup = async function(email, password) {

    //Validate
    // is Empty?
    if( !email || !password) throw Error("All field must be filled");
    // is Email?
    if (!validator.isEmail(email)) throw Error("This is no valid e-mail");
    // is password strong?
    if(!validator.isStrongPassword(password, {minSymbols : 0})) throw Error("Password not strong enough");

    const checkEmail = await this.findOne({ email });

    if ( checkEmail){
        throw Error('Email is already in use');
    }
    // Encrypt password 

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ email, password : hash});
    
    return user;
} 

// Static login method

userSchema.statics.login = async function(email,password){
    //Validate
    // is Empty?
    if( !email || !password) throw Error("All field must be filled");

    const user = await this.findOne({email})
    // does email exist?
    if(!user) throw Error('Incorrect e-mail or password');

    const match = await bcrypt.compare(password, user.password);
    if(!match) throw Error('Incorrect e-mail or password');
    return user;
}

module.exports = mongoose.model("User", userSchema);