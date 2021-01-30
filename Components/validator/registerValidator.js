
const validator = require('validator')

const checkVaild = user => {

    const { firstname,lastname, email, password, confirmpassword } = user;

    let error = {};
    let isVaild=true;
    if (!firstname) {
        error.firstname = 'Please provide your firstname..'
    }
   if (!lastname) {
        error.lastname = 'Please provide your lastname..'
    }
    if (!email) {
        error.email = 'Please provide your email..'
    }
     if (!password) {
        error.password = 'Please provide your password'
    }
    if (!confirmpassword) {
        error.confirmpassword = 'Please provide your confirm-password'
    }
    if (password !== confirmpassword) {
        error.matchpassword = 'Password does not match'
    }
     else if (password.length < 6) {
        error.lenpassword = 'Your password must have at least 6 character'
    } 

    if(!error)
    isVaild=false;
    return{
        error,
        isVaild
    }

}
module.exports=checkVaild;