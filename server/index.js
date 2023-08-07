require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const https = require('https');
const fs = require('fs');
const app = express();
const cors = require('cors');

//Routes import 
const productRouter = require("./Routes/Product");
const userRouter = require('./Routes/User');

let privateKey = fs.readFileSync('ssl/server.key', 'utf8');
let privateCrt = fs.readFileSync('ssl/server.crt', 'utf8');
const credentials  = {key: privateKey,cert : privateCrt};
//Show Server IP 
require('dns').lookup(require('os').hostname(),{ family : 4 }, function (err, add) {
    console.log('addr: ' + add);
  });

  app.use(express.json());
  app.use(cors());
//Routes
  app.use('/product', productRouter);
  app.use('/user', userRouter);


const conncectBD = async ()=>{
    try{    
        await mongoose.connect(process.env.MONGO_URI);
    } catch(err){
        console.log(err);
    }
}

conncectBD();

mongoose.connection.once("open",()=>{
    https.createServer(credentials,app).listen(process.env.PORT,()=>{
        console.log(`Server is litening on port ${process.env.PORT}`);
    })
})
