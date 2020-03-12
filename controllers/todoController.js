const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const urlEncodedParser = bodyParser.urlencoded({extended: false});

mongoose.connect('mongodb://localhost:27017/TodoDB', {useNewUrlParser: true, useUnifiedTopology: true});
const Todo = mongoose.model('Todo', { item: String });

module.exports = function(app){

    app.get("/todo", function(req,res){
        Todo.find({}, function(err,data){
            if(err) throw err;
            res.render('todo',{todos: data});
        });
    });

    app.post('/todo', urlEncodedParser, function(req,res){
        var newItem = Todo(req.body).save(function(err,data){
            if(err) throw err;
            res.json(data);
        });
    });
    
    app.delete("/todo/:item", function(req,res){
        Todo.find({item: req.params.item.replace(/-/g,' ')}).remove(function(err,data){
            if(err) throw err;
            res.json(data);
        });
    });
};