var ss = require('simple-statistics');
const fs = require('fs');
const dataPath = "./data/data.json";
let rawdata = fs.readFileSync(dataPath);
let stringdata = rawdata.toString()
var jsondata =  JSON.parse(rawdata);
console.log(ss.min([1, 5, -10, 100, 2]));
//console.log(stringdata);
_ = require('underscore');
//Simple Regression
//var cleanData = _.filter(stringdata, function(d) { return true});
/*console.log(stringdata);
console.log(jsondata.toString());
//console.log(cleanData.toString());
var xAndY = _.map(jsondata, function(h){ return h.FlowValue; });
//var xAndY = cleanData.map(function(h) { return [h.FlowValue, h.PressureValue]; });
var xAndYString = xAndY.toString();
console.log(xAndYString);*/

  ////Plotting
//var plotly = require('plotly')({"username": "ayykav", "apiKey": "maTlM1JIaGPrdgcebr5T", "host": "localhost", "port": 443})
var plotly = require('plotly')({"username": "ayykav", "apiKey": "maTlM1JIaGPrdgcebr5T"});

var flowpressureData = _.map(jsondata, function(item) {  
    return [item.FlowValue],[item.PressureValue];
  });

var flowData = _.map(jsondata, function(item) {  
    return item.FlowValue;
  });

var pressureData = _.map(jsondata, function(item) {  
    return item.PressureValue;
  });

var timeData = _.map(jsondata, function(item) {  
    return item.TimeStamp;
  });

var xAndY = [];
xAndY.push(flowData);
xAndY.push(pressureData);
var x = flowData;
var y = pressureData;

   console.log(xAndY); 
   //var line = ss.linearRegressionLine(ss.linearRegression(xAndY));
   var test = ss.linearRegression(xAndY);
   console.log(test);
   var linearExpressionFormulaValues = ss.linearRegression(xAndY);//get the m and b values
   var line = ss.linearRegressionLine(linearExpressionFormulaValues); //project a line based on m and b values

   // Use the linear regression function to get a set of data to graph the linear regression line
   var y2 = [];
   x.forEach(function(xi) {
     y2.push(line(xi));
   });

   // Create scatter plots of training data + linear regression function
   var layout = {
     title: 'flow vs pressure',
     xaxis: {
       title: 'flow'
     },
     yaxis: {
       title: 'pressure'
     }
   };
   var trace1 = {
     x: x,
     y: y,
     name: 'Training Data',
     mode: "markers",
     type: "scatter"
   };
   var trace2 = {
     x: x,
     y: y2,
     name: 'Linear Regression',
     mode: "lines",
     type: "scatter"
   };
   var plotData = [trace1, trace2];
   var graphOptions = {layout: layout,filename: "cars-linear-regression", fileopt: "overwrite"}
   plotly.plot(plotData, graphOptions, function (err, msg) {
     console.log(msg);
   });


