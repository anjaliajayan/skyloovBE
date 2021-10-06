const {Router} = require('express');
const db = require('./database');
const models = require('./models');
const { Register } = require('./models/Register');
const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const router = Router();

router.use((req,res, next) =>{
console.log('request made to create user');
next();
});

router.get('/' ,(req,res) => {
    res.send(200);
});

router.get('/posts',(req,res)=>{
    res.json({route:'POSTS'});
});

// router.post('/', (req,res) =>{
//     const {userName ,password} =req.body;
//     if(userName && password){
//         try {
//            db.promise().query(`INSERT INTO USERS VALUES ('${userName}','${password}')`) ;
//            res.status(201).send({msg:'Registered Successfully'});
//         } catch (err) {
            
//         }
//     }
// });

router.post('/register', (req,res) =>{
  
    const {firstName,lastName,userName,password,email,contact,gender,role,c_password} =req.body;
    if(userName && password){
        try {
           db.promise().query(`INSERT INTO Register (firstName, lastName, userName,password,email,contact,gender,role) VALUES ('${firstName}','${lastName}' ,'${userName}' ,'${password}' ,'${email}' ,'${contact}' ,'${gender}','${role}')`) ;
           res.status(201).send({msg:'Registered Successfully' ,status:true});
        } catch (err) {
            res.status(404).send({msg:'Unsuccesfull Registration' ,status:false});
        }
    }
});


router.post('/login', function(req,res,next){
    const {userName ,passWord} =req.body;
    if(userName && passWord){
        try {
         let promise=  db.promise().query(`SELECT * FROM register WHERE userName='"${userName}"' AND password='"${passWord}"'; `);
         console.log(promise);
         promise.then(function(doc){
                 if(doc) {
                //    if(doc.isValid(req.body.passWord)){
                       // generate token
                       let token = jwt.sign({userName:req.body.userName},'secret_code', {expiresIn : '3h'});
             
                       return res.status(200).json({"msg":"Login succesfull","status":true ,"token":token,"role":"user","userName":req.body.userName});
             
                //    } else {
                     return res.status(501).json({message:' Invalid Credentials'});
                //    }
                 }
                 else {
                   return res.status(501).json({message:'User email is not registered.'})
                 }
                });
             
                promise.catch(function(err){
                  return res.status(501).json({message:'Some internal error'});
                })
          
        } catch (err) {
            console.log('err________',err);
        }
    }
  
 })


 router.get('/username', verifyToken, function(req,res,next){
    return res.status(200).json(decodedToken.username);
  })
  
  var decodedToken='';
  function verifyToken(req,res,next){
    let token = req.query.token;
  
    jwt.verify(token,'secret', function(err, tokendata){
      if(err){
        return res.status(400).json({message:' Unauthorized request'});
      }
      if(tokendata){
        decodedToken = tokendata;
        next();
      }
    })
  }
module.exports = router;