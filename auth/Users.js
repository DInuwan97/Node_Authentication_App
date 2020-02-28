const jwt = require('jsonwebtoken');

//barer tokes
module.exports = {

    //middlewear 01
    authenticateUser:(req,res,next)=>{

        const bearerHeader = req.headers['authorization'];
        if(typeof bearerHeader !== 'undefined'){

            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1];
            req.token = bearerToken;
            next();

        }else{
            res.sendStatus(403)
        }
    },

    //middlewear02
    authenticateSeller:(req,res,next)=>{
        jwt.verify(req.token,'secretkey',(err,authData)=>{

            if(err){
                res.sendStatus(403);
            }else{

                if(authData.user.userType == "Customer"){
                    res.json({message:"Unathorized User"})
                }else{
                    next();
                }
            }
        });
    }
}
