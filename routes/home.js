var express=require("express");
var router=express.Router();
var mlcart=require("ml-cart");
var DTRegression=mlcart.DecisionTreeRegression;
var fs = require('fs');
var Arhar = "./public/data/Arhar.csv";
var Bajra = "./public/data/Bajra.csv";
var commodity_dict = {
    //  WheatItem : Wheat,
     BajraItem : Bajra,
     ArharItem : Arhar
  }
var commodity_array = [] ;

annual_rainfall = [29, 21, 37.5, 30.7, 52.6, 150, 299, 251.7, 179.2, 70.5, 39.8, 10.9]
base = {
   // "Paddy": 1245.5,
    "Arhar": 3200,
    "Bajra": 1175,
    "Barley": 980,
    "Copra": 5100,
    "Cotton": 3600,
    "Sesamum": 4200,
    "Gram": 2800,
    "Groundnut": 3700,
    "Jowar": 1520,
    "Maize": 1175,                                
    "Masoor": 2800,                                 
    "Moong": 3500,
    "Niger": 3500,
    "Ragi": 1500,
    "Rape": 2500,
    "Jute": 1675,
    "Safflower": 2500,
    "Soyabean": 2200,
    "Sugarcane": 2250,
    "Sunflower": 3700,
    "Urad": 4300,
    "Wheat": 1350

}

for(var item in commodity_dict  ){

    var data = fs.readFileSync(commodity_dict[item])
        .toString() // convert Buffer to string
        .split('\n') // split string to lines
        .map(e => e.trim()) // remove white spaces for each line
        .map(e => e.split(',').map(e => parseFloat(e.trim()))); // split each line to array
    var data1=data.splice(0,1);//remove top row
    var data2=data.splice(-1,1);//remove bottom row
    commodity_array.push(data);

}
 // console.log(commodity_array);
 function train()
 {
     var wpi=data.map(function(v){return v[3]});
     //console.log(data);
     var data3 = data.map(function(v){return v.splice(0,3) });
 
     const reg = new DTRegression();
     reg.train(data3, wpi);
 }
 
 
 function getPredictedValue(date)
 {
  
     const estimations = reg.predict([[date[0] , date[1] , date[2] ]]);
 
     console.log(estimations);
     return estimations ;
 }

function TopFiveWinners() 
{
   var  current_month = new Date().getMonth()  ;
   var current_year = new Date().getFullYear() ; 
   var current_rainfall = annual_rainfall[current_month - 1] ;
   var prev_month = current_month - 1  ;                
   var prev_rainfall = annual_rainfall[prev_month - 1] ;
   var current_month_prediction = []  ;
   var  prev_month_prediction = []  ;
   var change = []  ;
    train();

   for (var item in commodity_array)
   {
    var current_predict = getPredictedValue([float(current_month), current_year, current_rainfall]) ;
     current_month_prediction.push(current_predict) ;
    var prev_predict = getPredictedValue([float(prev_month), current_year, prev_rainfall]) ;
     prev_month_prediction.push(prev_predict) ;
     change.push( { commodity_list.index[i] : (current_predict - prev_predict) * 100 / prev_predict   }  ) ;
     console.log(current_predict);

   }

}





router.get("/",function(req,res){
    var top5Win = TopFiveWinners() ;
    var bottom5Lose = TopFiveLosers() ;
    console.log(top5Win);
    res.render("home.ejs");
});


module.exports=router;