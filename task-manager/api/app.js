const express = require('express');
const app = express();

const bodyParser = require( 'body-parser' );

//const {mongoose} = require('./db/mongoose')

const {List} = require("./models/list.model");
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

    List.findOneAndRemove({
        _id: req.params.id
    }).then((removedListDoc)=>{
        res.send(removedListDoc);
    })
   
});

app.get('/lists/:listId/tasks',(req,res)=>{
    Task.find({
         _listID : req.params.listId 
        }).then((tasks) =>{
            res.send(tasks)
        })
})

app.get('/lists/:;listId/tasks', (req, res)=>{
    Task.findOne({
        _id: req.params.taskId,
        _listID: req.params.listId
    }).then((task) =>{
        res.send(task);
    })
})

app.post('/lists/:listId/tasks',(req,res)=>{
    let newTask = new Task({
        title: req.body.title,
        _listId: req.params.listId
    })
    newTask.save().then((newTaskDoc) => {
        res.send(newTaskDoc);
    })
})

app.patch('/lists/:listId/tasks/:taskId', (req, res) => {
    Task.findOneAndUpdate({
        _id: req.params.taskId,
        _listId: req.params.listId
    }, {
        $set: req.body
    }).then(() => {
        res.sendStatus();
    })
})

app.delete( '/lists/:listId/tasks/:taskId' ,(req,res)=>{
Task.findOneAndDelete({
    _id:req.params.taskId,
    _listId:req.params.listId
}).then((removedTaskDoc) => {
    res.send(removedTaskDoc);
})

})
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
})