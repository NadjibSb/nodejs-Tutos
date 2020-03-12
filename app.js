var express = require("express");
var todoCtrl = require("./controllers/todoController");

var app = express();

app.set('view engine','ejs');
app.use(express.static("./public"));

todoCtrl(app);

app.listen(3000);
