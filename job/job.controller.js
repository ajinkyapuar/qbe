const express = require('express')
const router = express.Router()
const jobService = require('./job.service')
const uploadImage = require('../uploadImage/upload')
const multer = require('multer')
const fs = require('fs')
const path = require('path')
let dir = __dirname + '/uploads'

var storage = multer.diskStorage({
    filename: function (req, file, callback) {
        callback(null, Date.now() + file.originalname);
    }
});


var imageFilter = function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed'), false);
    }
    cb(null, true);
};


var upload = multer({ storage: storage, fileFilter: imageFilter });

router.post('/save-name', saveName)
router.post('/upload/:id', upload.array('images', 10), uploadImg)

module.exports = router

function saveName(req, res, next) {
    jobService.saveName(req.body).then((result) => {
        console.log("controller", result)
        if (result) {
            res.send({ id: result._id })
        }

    }).catch(err => {
        next(err)
    })

}

function getAll(req, res, next) {
    // console.log("data", req.params.page, req.query)

    projectService.getAll(req.params.page, req.query.value, req.query.user_id).then(data => {
        res.send(data)
    }).catch(err => {
        next(err)
    })
}

function update(req, res, next) {
    // console.log(req.params.id)
    projectService.update(req.params.id, req.body).then(result => {
        // console.log("result", result)
        if (result.length > 0) {
            res.send(result)
        }
    }).catch(err => {
        next(err)
    })
}

function deleteProject(req, res, next) {
    projectService.deleteProj(req.params.id).then(data => {
        // console.log(data)
        if (data.length > 0) {
            res.send(data)
        }
    }).catch(err => {
        next(err)
    })
}

function findProject(req, res, next) {
    // console.log("id", req.params.id)
    projectService.findproject(req.params.id).then(data => {
        // console.log("con data", data)
        res.send(data)
    }).catch(err => {
        next(err)
    })
}


async function uploadImg(req, res, next) {
    console.log("image data", req.body)
    console.log("id", req.params.id)
    console.log("req.files", req.files)
    if (req.files.length > 0) {
        await uploadImage.createContainer(`${req.params.id}`).then(data => {
            // console.log(data)
            
           uploadImage.uploadImg(req.params.id, req.files).then(data => {
                // console.log("dataat", data)
                updateUrl(req.params.id, data).then(data=>{
                    res.send(data)
                })
            })
        })
        
    }



}



function updateUrl(id, urls) {
    return new Promise((resolve, reject) => {
        jobService.updateImgUrl(id, urls).then(data => {
            console.log("data2",data)
            resolve(data)
        }), err => {
            reject(err)
        }
    })
}