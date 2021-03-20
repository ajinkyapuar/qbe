const express = require('express');
const router = express.Router();
const userService = require('./user.service');
const mailgun_config = require('../globalConfig/globalConfig').emailConfig;
const mailgun = require('mailgun-js')(mailgun_config)
// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
// router.get('/forgot',forgotPass)
// router.post('/newPass', setNew);
// router.get('/current', getCurrent);
// router.get('/:id', getById);
// router.put('/:id', update);
// router.delete('/:id', _delete);

module.exports = router;

function authenticate(req, res, next) {
    // console.log(req.body)
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({
            message: 'Username or password is incorrect'
        }))
        .catch(err => next(err));
}

function register(req, res, next) {
    userService.create(req.body).then(data =>res.json({data}))
        .catch(err => next(err));
}

// function getAll(req, res, next) {
//     userService.getAll()
//         .then(users => res.json(users))
//         .catch(err => next(err));
// }

// function getCurrent(req, res, next) {
//     userService.getById(req.user.sub)
//         .then(user => user ? res.json(user) : res.sendStatus(404))
//         .catch(err => next(err));
// }

// function getById(req, res, next) {
//     userService.getById(req.params.id)
//         .then(user => user ? res.json(user) : res.sendStatus(404))
//         .catch(err => next(err));
// }

// function update(req, res, next) {
//     userService.update(req.params.id, req.body)
//         .then(() => res.json({}))
//         .catch(err => next(err));
// }

// function _delete(req, res, next) {
//     userService.delete(req.params.id)
//         .then(() => res.json({}))
//         .catch(err => next(err));
// }



// function forgotPass(req,res,next){
//    userService.getId(req['query']['email']).then(data=>{
//     //    console.log(data)
//        if(data){
//         let result={
//             id:data,
//             email:req['query']['email'],
//             message:`To verify your email, <a href="http://139.59.88.78:4000/newPass?id=${data}"> Click Here</a> `
//         }
//         res.send(sendMail(result))

//        }          
//    })
    
// }



// function setNew(req,res,next){
//     // console.log("in setnew",req['body'])
//     userService.updatePass(req['body']).then(data=>{
//         // console.log(data)
//         res.send(data)
//     }).catch(err => next(err));
// }