var express = require("express");
var router = express.Router();
var mlcart = require("ml-cart");
var DTRegression = mlcart.DecisionTreeRegression;
var fs = require('fs');
const cors=require('cors');
var arharPath = "./public/data/Arhar.csv";
var bajraPath = "./public/data/Bajra.csv";
var barleyPath = "./public/data/Barley.csv";
var copraPath = "./public/data/Copra.csv";
var cottonPath = "./public/data/Cotton.csv";
var gramPath = "./public/data/Gram.csv";
var groundnutPath = "./public/data/Groundnut.csv";
var jowarPath = "./public/data/Jowar.csv";
var jutePath = "./public/data/Jute.csv";
var maizePath = "./public/data/Maize.csv";
var masoorPath = "./public/data/Masoor.csv";
var moongPath = "./public/data/Moong.csv";
var nigerPath = "./public/data/Niger.csv";
var paddyPath = "./public/data/Paddy.csv";
var ragiPath = "./public/data/Ragi.csv";
var rapePath = "./public/data/Rape.csv";
var safflowerPath = "./public/data/Safflower.csv";
var sesamumPath = "./public/data/Sesamum.csv";
var soyabeanPath = "./public/data/Soyabean.csv";
var sugarcanePath = "./public/data/Sugarcane.csv";
var sunflowerPath = "./public/data/Sunflower.csv";
var uradPath = "./public/data/Urad.csv";
var wheatPath = "./public/data/Wheat.csv";
var commodity_dict = {
    //  WheatItem : Wheat,
    Bajra: bajraPath,
    Arhar: arharPath,
    Barley : barleyPath,
    Copra : copraPath,
    Cotton : cottonPath,
    Gram : gramPath,
    Groundnut : groundnutPath,
    Jowar : jowarPath,
    Jute : jutePath,
    Maize : maizePath,
    Masoor : masoorPath,
    Moong: moongPath,
    Niger : nigerPath,
    Paddy: paddyPath,
    Ragi : ragiPath,
    Rape : rapePath,
    Safflower : safflowerPath,
    Sesamum : sesamumPath,
    Soyabean : soyabeanPath,
    Sugarcane : sugarcanePath,
    Sunflower : sunflowerPath,
    Urad : uradPath,
    Wheat : wheatPath
}


annual_rainfall = [29, 21, 37.5, 30.7, 52.6, 150, 299, 251.7, 179.2, 70.5, 39.8, 10.9]
base = {
    "Paddy": 1245.5,
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






async function train(predictors, wpi) {
    const reg = new DTRegression();
    await reg.train(predictors, wpi);

    return reg;

}


async function getPredictedValue(regressor, date) {



    const estimations = await regressor.predict([[date[0], date[1], date[2]]]);


    return estimations;
}

async function ExtremumCrops() {
    var commodity_array = [];

    for (var item in commodity_dict) {

        
        
        var data = fs.readFileSync(commodity_dict[item])
            .toString() // convert Buffer to string
            .split('\n') // split string to lines
            .map(e => e.trim()) // remove white spaces for each line
            .map(e => e.split(',').map(e => parseFloat(e.trim()))); // split each line to array
        var data1 = data.splice(0, 1);//remove top row
        var data2 = data.splice(-1, 1);//remove bottom row
        commodity_array.push([item, data]);
        
    
    
    
    }
    
    var current_month = new Date().getMonth();
    

    var current_year = new Date().getFullYear();
    var current_rainfall = annual_rainfall[current_month];
    var prev_month = (current_month + 11) % 12;

    var prev_rainfall = annual_rainfall[prev_month];
    var current_month_prediction = [];
    var prev_month_prediction = [];
    var changeMap = new Map();



    for (var i = 0; i < commodity_array.length; i++) {

        var cropData = commodity_array[i];



        var wpi = cropData[1].map(function (row) { return row[3] });

        var predictors = cropData[1].map(function (v) { return v.splice(0, 3) });



        var regressor = await train(predictors, wpi);



        var current_predict = await getPredictedValue(regressor, [current_month, current_year, current_rainfall]);
        var prev_predict = await getPredictedValue(regressor, [(prev_month), current_year, prev_rainfall]);

        var current_predict_num = current_predict[0];
        var prev_predict_num = prev_predict[0];


        current_month_prediction.push(current_predict_num);
        prev_month_prediction.push(prev_predict_num);

        changeMap.set(i, ((current_predict_num - prev_predict_num) * 100 / prev_predict_num).toFixed(2));


    }

    const topSortedMap = new Map([...changeMap.entries()].sort((a, b) => b[1] - a[1]));
   
    topSend = [];
    bottomSend = [];
    mapSize = changeMap.size - 1;
    for (var i = 0; i < 5; i++) {
        var topRow = Array.from(topSortedMap)[i];
        var bottomRow = Array.from(topSortedMap)[mapSize - i];

        var topName = commodity_array[topRow[0]][0];

        var topPerc = topRow[1];
        var bottomName = commodity_array[bottomRow[0]][0];

        var bottomPerc = bottomRow[1];
        topSend.push([topName, Math.round(current_month_prediction[topRow[0]] * base[topName] / 100, 2), topPerc]);
        bottomSend.push([bottomName, Math.round(current_month_prediction[bottomRow[0]] * base[bottomName] / 100, 2), bottomPerc]);
    }

    var extremum = [topSend, bottomSend];
    return extremum;

}





router.get("/home",cors(),async  function (req, res) {
    console.log("sent data");
    var data=await ExtremumCrops();
    console.log(data);
    res.send(data);
    
    
});


module.exports = router;