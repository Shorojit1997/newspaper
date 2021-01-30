const mongoose=require('mongoose');
const slugify = require('slugify')
const Schema = mongoose.Schema;

const Newsinfo=new Schema({
    author:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true,
    },
    discription:{
        type:String,
        required:true,
    },
    catagory:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    slug:{
        type:String,
        required:true,
        unique:true
    }

})

Newsinfo.pre('validate', function(next) {
    if (this.title) {
      this.slug = slugify(this.title, { lower: true, strict: true })
    }
    next()
  })

  module.exports=mongoose.model('news',Newsinfo);