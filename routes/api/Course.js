const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const Course = require('../../models/Course');

const authUser = require('../../auth/Users').authenticateUser;


//getting courses
router.get('/',async(req,res)=>{
    Course.find()
    .sort({})
    .then(users => res.json(users))
})


//adding courses
router.post('/add',authUser,(req,res)=>{

    const course = new Course(req.body);

        jwt.verify(req.token,'secretkey',(err,authData) =>{
            if(err){
                res.sendStatus(403);
            }else{
                course.save()
                .then(course =>{
                    res.status(200).json({
                        message:"Course added Successfully",
                        course
                    })
                })
                .catch(err =>{
                    res.status(400).send(err);
                })
            }
        });

});



module.exports = router;