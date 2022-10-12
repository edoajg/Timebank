'use strict'
var express = require('express');
var PublicationController = require('../controllers/publication');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');
var crypto = require('crypto');
var multer = require('multer');
// var multipart = require('connect-multiparty');
var path = require('path');

const storage = multer.diskStorage({
  destination(req, file, cb){
     cb(null, './uploads/publications');},
  filename(req, file = {}, cb){
    const { originalname } = file;
    const fileExtension = (originalname.match(/\.+[\S]+$/) || [])[0];
    console.log(fileExtension);
    // cb(null, file.fieldname + "-" + Date.now()+".jpg");


     crypto.pseudoRandomBytes(16, function(err, raw){
     cb(null, raw.toString('hex') + Date.now() + fileExtension);});
   },
 })


var mul_upload = multer({storage});

api.get('/probando-pub', md_auth.ensureAuth, PublicationController.probando);
api.post('/publication', md_auth.ensureAuth, PublicationController.savePublication);
api.get('/publications/:page?', md_auth.ensureAuth, PublicationController.getPublications);
api.get('/publication/:id', md_auth.ensureAuth, PublicationController.getPublication);
api.delete('/publication/:id', md_auth.ensureAuth, PublicationController.deletePublication);
api.post('/upload-image-pub/:id', [md_auth.ensureAuth, mul_upload.single('file')], PublicationController.uploadImage);
api.get('/get-image-pub/:imageFile', PublicationController.getImageFile);



module.exports = api;
