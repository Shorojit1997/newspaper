const UserSchema = require('../models/Users')
const checkVaild = require('../validator/registerValidator')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const login = (req, res, next) => {

    const { email, password } = req.body;
    UserSchema.findOne({ email })
        .then(user => {
            if (!user) {
                res.status(404).json({
                    message: 'Please create an account'
                })
            }
            else {
                bcrypt.compare(password, user.password, (err, isTrue) => {
                    if (err) {
                        res.status(404).json({
                            message: 'Something happend error...'
                        })
                    }
                    else {
                        if (isTrue) {
                            const token = jwt.sign({firstname: user.firstname, lastname: user.lastname, email }, 'itssecret');
                            res.status(201).json({
                                message: "Login Successfull...",
                                token
                            })
                        }
                        else {
                            res.status(404).json({
                                message: "Your password is wrong..."
                            })
                        }
                    }
                })

            }
        })
        .catch(err => {
            res.status(404).json({
                message: 'Something happend error...'
            })
        })


}
const signup = (req, res, next) => {
    const {firstname,lastname, email, password, confirmpassword } = req.body;
    const { error, isVaild } = checkVaild({ firstname,lastname, email, password, confirmpassword });
    if (isVaild) {

        UserSchema.findOne({ email })
            .then(user => {
                if (user) {
                    res.status(404).json({
                        message: 'Already have an account.'
                    })
                } else {
                    bcrypt.hash(password, 5, (err, hash) => {
                        if (err) {
                            res.status(404).json({
                                message: 'Please try again..'
                            })
                        } else {
                            const userInfo = new UserSchema({
                                firstname,
                                lastname, 
                                email: email,
                                password: hash
                            })
                            userInfo.save()
                                .then(info => {
                                    var token = jwt.sign({  firstname,lastname, email }, 'itssecret');
                                    res.status(201).json({
                                        message: "Create Account Successfully.",
                                        token
                                    })
                                })
                                .catch(err => {
                                    res.status(404).json({
                                        message: "Something happend wrong",
                                        err
                                    })
                                })
                        }
                    })
                }
            })

    } else {
        res.status(404).json({
            message: 'Something is worng........',
            error
        })
    }


}


module.exports = {
    login,
    signup
}