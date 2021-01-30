const mongoose=require('mongoose');
const Schema= mongoose.Schema;

const TotalItem=new Schema({
    item:{
        type:String,
        unique:true
    }
})

module.exports=mongoose.model('items',TotalItem);