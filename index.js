const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const fs = require("fs");
const app=express();
const cors=require('cors');
const path = require("path");
app.use(express.static("public"));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

var home=require('./routes/home');
app.use("/",home);
app.use("/admin",express.static(path.join(__dirname, 'client/build')));
//app.use("/home",home);

app.get("/",function(req,res){
  res.redirect("/admin")
})
let port=process.env.PORT;

if(port== null ||port==""){
  port=8000;
}
app.listen(port, function() {
  console.log("Server started ");
  //console.log(new Date().getMonth());
});
