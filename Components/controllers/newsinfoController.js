const mongoose = require('mongoose');
const Newsinfo = require('../models/Newsinfo');
const TotalItem = require('../models/Totalitem');
const jwt = require('jsonwebtoken');


const UploadNews = async (req, res, next) => {
    const { author, title,  discription, catagory } = req.body;

    //this is model assign 

    let items = new TotalItem({
        item:  catagory,
    })
    let newsdata = new Newsinfo({
        author: author,
        title: title,
        discription:  discription,
        catagory:  catagory,
        createdAt: new Date(),
    })
    //now save the data
    newsdata.save()
        .then(info => {
            TotalItem.findOne({ item:  catagory })
                .then(finditem => {
                    if (!finditem) {
                        items.save().then(saveitem => {
                            res.status(201).json({
                                message: 'Your news post save successfully with new item',
                                data: {info},
                                isUpload: true
                            })
                        }).catch(err => {
                            res.status(201).json({
                                message: 'Your news post save successfully but can not possible add new item',
                                data: info,
                                isUpload: true
                            })
                        })
                    }
                    else {
                        res.status(201).json({
                            message: 'Your news post save successfully with exesting items',
                            data: info,
                            isUpload: true
                        })
                    }
                }).catch(err => {
                    res.status(201).json({
                        message: 'Your news post save successfully with exesting items',
                        data: info,
                        isUpload: true
                    })
                })

        })
        .catch(err => {
            res.status(404).json({
                message: 'Please try again...',
                isUpload: false
            })
        })
}
const findNewsBySlug = (req, res, next) => {
    const slug = req.params.id;
    Newsinfo.find({ slug: slug })
        .then(info => {
            if (info) {
                res.status(201).json({
                    message: "Your news in find succesfully by slug",
                    data: info,
                })
            } else {
                res.status(201).json({
                    message: "Sorry can not find any news by this topics",
                    data: info,
                })
            }
        })
        .catch(err => {
            res.status(201).json({
                message: "Sorry Something happend error",
                error: err,
            })
        })

}
const findNewsByNewsType = (req, res, next) => {
    const catagory = req.params.business;

    Newsinfo.find({ catagory: catagory })
        .then(info => {

            if (info) {
                res.status(201).json({
                    message: "Your news in find succesfully by types",
                    data: info,
                })
            } else {
                res.status(201).json({
                    message: "Sorry can not find any news by this topics",
                    data: '',
                })
            }
        })
        .catch(err => {
            res.status(201).json({
                message: "Sorry Something happend error",
                error: err,
            })

        })

}
const findItems=(req,res,next)=>{
    TotalItem.find().then(items=>{
        res.status(201).json({
            message:'Your item is found Successfully',
            items
        })
    }).catch(err=>{
        res.status(404).json({
            message:'Somethings happend error',
            err
        })
    })
}

module.exports = {
    UploadNews,
    findNewsBySlug,
    findNewsByNewsType,
    findItems
}

