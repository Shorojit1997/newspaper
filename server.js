const express = require('express');
const morgan =require('morgan');
const mongoose =require('mongoose')
const bodyParser=require('body-parser')
const users=require('./Components/routes/users')
const cors=require('cors')
const newsinfo=require('./Components/routes/newsinfo')
const app =express();

const PORT =process.env.PORT||4000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());

//  work with database
const db = mongoose.connection;
mongoose.connect('mongodb://localhost/newspaper' ,{useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true});

db.on('error',(error)=>{
    console.log(err)
})
db.once('open',()=>{
    console.log('Database Connection Established');
})

app.use('/users',users)
app.use('/news',newsinfo)


app.listen(PORT,(req,res)=>{
    console.log('Server is Connectec on port',PORT);
})