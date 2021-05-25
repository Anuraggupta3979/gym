const express= require("express");
const fs= require("fs");
const path = require("path");
const app =express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/contactgym', {useNewUrlParser: true, useUnifiedTopology: true});
const port = 80;

const gymSchema = new mongoose.Schema({
    name: String,
    age: String,
    gender: String,
    mob: String,
    address: String,
    more: String
  });
const gym = mongoose.model('gym',gymSchema);

gymSchema.methods.speak = function () {
    const greeting = this.name + this.name;
    console.log(greeting);
  }

//express specific stuf
app.use('/static', express.static('static'))
app.use(express.urlencoded())

//pug specific stuf
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

//endpoints
app.get('/', (req,res)=>{
    const anu= "This is anurag gupta "
    const paras={'title' : 'pubg is the best game ', "content" : anu}
    res.status(200).render('index.pug' , paras)
})
// app.post('/',(req,res)=>{
//     name=req.body.name
//     age=req.body.age
//     gender=req.body.gender
//     mob=req.body.mob
//     address=req.body.address
//     more=req.body.more
//     let outputToWright = `The name of the client is ${name}, ${age} years old ,Gender - ${gender},residing at ${address} , mobile no . is ${mob},more is ${more}`
//     fs.writeFileSync(`output.txt`, outputToWright)
//     const paras={'message' : 'Your Form Is Submited successfully '}
//     res.status(200).render('index.pug' , paras)
// })
//start the server
app.post('/', (req, res)=>{
    var myData = new gym(req.body);
    myData.save().then(()=>{
    res.send("This item has been saved to the databas")
    }).catch(()=>{
    res.status(400).send("item was not saved to the databse")
  });
  })
app.listen(port,()=>{
    console.log(`the application started successsfully on port ${port}`);
})