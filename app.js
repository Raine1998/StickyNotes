var express = require('express'); //these are the packages we need to be using
const path = require('path'); //another package
const xlsxFile = require('read-excel-file/node') // package used for reading excel files


var app = express();
var port = process.env.PORT || 3000; //use the specified port (variable that heroku looks for), or 3000

app.use(express.static(__dirname + '')); //this is where the static (Frontend) files eg css (dirname is wherever it is right now)

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/index.html')); //this is where to look for the html file
});

app.listen(port, function () {
    console.log('Example app listening on port ' + port + '!'); //first line of code run after root is set up
});

var data; // 2D array with excel file data
var scenarios; // Dictionary (map) of different scenarios and options:

var money = 100;
var happiness = 100;

// Converts excel file into 2D array:
xlsxFile('./household-expenditure-statistics-year-ended-june-2019.xlsx', {sheet : 2}).then((rows) => {
    data = rows;
    scenarios =
    {
        transport : {
            description : "You are going to school. What option do you choose?",
            stat : "The average household weekly expenditure on transport is $20.50",
            options : [
                {
                    description : "Take the train.",
                    moneyImpact : -0.70,
                    happinessImpact : 5
                },
                {
                    description : "Take the car.",
                    moneyImpact : 5,
                    happinessImpact : 2
                }
            ]
        }
    };
})