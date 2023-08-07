require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const https = require('https');
const fs = require('fs');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000


//Routes import 
const productRouter = require("./Routes/Product");
const userRouter = require('./Routes/User');
//developer usege

// let privateKey = fs.readFileSync('ssl/server.key', 'utf8');
// let privateCrt = fs.readFileSync('ssl/server.crt', 'utf8');
// const credentials  = {key: privateKey,cert : privateCrt};

//Show Server IP 
require('dns').lookup(require('os').hostname(),{ family : 4 }, function (err, add) {
    console.log('addr: ' + add);
  });

  app.use(express.json());

  //Cors Origin
const allowedOrigins = [
    'https://homestorage.onrender.com' 
]
  app.use(cors({
    origin : allowedOrigins
  }));
//developer usege

//   app.use(cors());

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
//developer usege
// mongoose.connection.once("open",()=>{
//     https.createServer(credentials,app).listen(process.env.PORT,()=>{
//         console.log(`Server is litening on port ${process.env.PORT}`);
//     })
// })
mongoose.connection.once("open",()=>{
    console.log("Connected to db");
    app.listen(process.env.PORT,()=> console.log(`Server is litening on port ${PORT}`)); 
})
