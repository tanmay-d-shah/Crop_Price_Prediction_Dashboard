var express=require("express");
var router=express.Router();
var mlcart=require("ml-cart");
var DTRegression=mlcart.DecisionTreeRegression;
var fs = require('fs');

var data = fs.readFileSync('./public/data/Arhar.csv')
    .toString() // convert Buffer to string
    .split('\n') // split string to lines
    .map(e => e.trim()) // remove white spaces for each line
    .map(e => e.split(',').map(e => parseFloat(e.trim()))); // split each line to array
var data1=data.splice(0,1);//remove top row
var data2=data.splice(-1,1);//remove bottom row


var wpi=data.map(function(v){return v[3]});
console.log(data);
var data3 = data.map(function(v){return v.splice(0,3) });


const reg = new DTRegression();
reg.train(data3, wpi);

const estimations = reg.predict([[5,2019,61.3]]);

console.log(estimations);

router.get("/",function(req,res){
    res.render("home.ejs");
});
module.exports=router;