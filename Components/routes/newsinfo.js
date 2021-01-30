const express=require('express');
const newsinfoController=require('../controllers/newsinfoController')
const route=express.Router();

route.post('/post',newsinfoController.UploadNews);
route.get('/slug/:id',newsinfoController.findNewsBySlug);
route.get('/items',newsinfoController.findItems)
route.get('/article/:business',newsinfoController.findNewsByNewsType);


module.exports=route;