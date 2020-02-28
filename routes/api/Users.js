const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/Users');

const authUser = require('../../auth/Users').authenticateUser;

const authSeller = require('../../auth/Users').authenticateSeller;

router.get('/', (req,res)=>{
        User.find()
        .sort({date:1})
        .then(users => res.json(users))
});


///////////////////////////////////////////////////Register an User////////////////////////////////////////////////////////////
router.post('/add',(req,res)=>{
    const today = new Date();

    const userData = {
        firstName : req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        mobile:req.body.mobile,
        password:req.body.password,
        regDate:today,
        userType:req.body.userType
    }

    User.findOne({
        email:req.body.email
    })
    .then(user=>{
        if(!user){
            bcrypt.hash(req.body.password,10,(err,hash)=>{

                userData.password = hash
                User.create(userData)
                .then(user =>{
                    res.json({status:user.firstName+ " " +user.lastName+ " was registered" })
                })  
                .catch(err =>{
                    res.json({error:er})
                })
            })
        }
        else{
            res.json({message:"User already registered"})
        }
    })
    .catch(err =>{
        res.json({error:err})
    })
})
///////////////////////////////////////////////////Register an User////////////////////////////////////////////////////////////




///////////////////////////////////////////////////Logging an User/////////////////////////////////////////////////////////////
router.post('/login',(req,res)=>{
    User.findOne({
        email:req.body.email
    })
    .then(user =>{
        if(user){
            if(bcrypt.compareSync(req.body.password,user.password)){

                jwt.sign({user},'secretkey',{expiresIn:'60s'},(err,token)=>{
                            res.json({token});
                });
                
            }else{
                res.json({message:"User Password is Incorrect"})
            }
        }
        else{
            res.json({message:"User does ot exist in the system"})
        }
    })
    .catch(err=>{
        res.json({error:err})
    })
});
///////////////////////////////////////////////////Logging an User////////////////////////////////////////////////////////////




///////////////////////////////////////////////////UserProfile - middlewear trigering////////////////////////////////////////////
router.get('/profile',authUser,authSeller,(req,res)=>{

    jwt.verify(req.token,'secretkey',(err,authData)=>{

        if(err){
            res.sendStatus(403);
        }else{
            res.json({
             email:authData.user.email,
             firstName:authData.user.firstName,
             lastName:authData.user.lastName,
             userType:authData.user.userType
            })
        }
    });
})
///////////////////////////////////////////////////UserProfile - middlewear trigering////////////////////////////////////////////





module.exports = router;

