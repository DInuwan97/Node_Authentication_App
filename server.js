const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const Users = require('./routes/api/Users');
const Course = require('./routes/api/Course');

const app = express();

//body parser middlewwear
app.use(bodyParser.json());

app.get('/api',(req,res)=>{
    res.json({
        message:"Welcome to the API"
    })
});

app.post('/api/posts',verifyToken,(req,res)=>{

    jwt.verify(req.token,'secretkey',(err,authData) =>{
        if(err){
            res.sendStatus(403);
        }else{
            res.json({
                message:"Post Created...",
                authData
            })
        }
    });
  
});

app.get('/api/profile',verifyToken,(req,res)=>{

    jwt.verify(req.token,'secretkey',(err,authData)=>{
        if(err){
            res.sendStatus(403);
        }else{
            res.json({
                userID:authData.user.id,
                username:authData.user.name  
            })
        }
    });

})

app.post('/api/login',(req,res)=>{

    //Mock user
    const user = {
        id:1,
        name:"Dinuwan",
        email:"dinuwan@gmail.com"
    }
    


    jwt.sign({user},'secretkey',{expiresIn:'30s'},(err,token)=>{
        res.json({
            token
        });
    });


});

//Format of token
//Authorization: Bearer <access token>

function verifyToken(req,res,next){

    //Get auth header value
    const bearerHeader = req.headers['authorization'];

    //Cheack if bearer undifined
    if(typeof bearerHeader !== 'undefined'){
        //Split at the space
        const bearer = bearerHeader.split(' ');
        //get token from array
        const bearerToken = bearer[1];
        //set the token
        req.token = bearerToken;
        //Next middlewear
        next();
    }else{
        res.sendStatus(403)
    }
}

//DB config 
const db = require('./config/keys').mongoURI;


//Connet to mongo
mongoose
    .connect(db,{useNewUrlParser:true ,useUnifiedTopology:true})
    .then(() => console.log('Mongo DB Connected.'))
    .catch(err => console.log(err));

app.use('/api/users',Users);
app.use('/api/courses',Course);

app.listen(5000,()=>console.log('Server started on 5000'));