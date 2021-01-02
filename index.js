const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const fs = require("fs");
const app=express();

app.use(express.static("public"));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

var home=require('./routes/home');

app.use('/',home);

let port=process.env.PORT;

if(port== null ||port==""){
  port=5000;
}
app.listen(port, function() {
  console.log("Server started ");
});
