const express = require('express');
const app = express();

const bodyParser = require( 'body-parser' );

const {mongoose} = require('./db/mongoose')

const {List} = require("./models/list.model")
const {Task}  = require("./models/task.model");

app.use(bodyParser.json());

app.get('/lists', (req,res) => {
    List.find({}).then((lists) => {
        res.send(lists);
    }).catch((e) =>{
        res.send(e);
    });   
})

app.post('/lists', (req, res) => {
    let title = req.body.title;

    let newList = new List({
        title
    });
    newList.save().then((listDoc)=>{
        res.send(listDoc);
        }).catch((err)=>console.log(err))

    });

app.patch('/lists/:id',(req,res)=>{
    List.findOneAndUpdate({_id: req.params.id},{
        $set:req.body}).then(()=>{
        res.sendStatus(200);
})
})

app.delete('/lists/:id',(req,res)=> {
   
});

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
})