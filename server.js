const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

var cors = require("cors");

var opt = {
  origin: "*",
  methods: "GET",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
// Requiring the module
const reader = require("xlsx");

// Reading our test file
const file = reader.readFile("./moviedata.xlsx");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
 'movies',
 'root',
 '12345',
  {
    host: '127.0.0.1',
    dialect: 'mysql'
  }
);

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });

let data = [];

const sheets = file.SheetNames;

app.get("/moviesdata", cors(opt), (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  for (let i = 0; i < sheets.length; i++) {
    const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
    temp.forEach((r) => {
      data.push(r);
    });
  }
  res.send(data);
  console.log(data);
});

// listen for requests
var server = app.listen(8080, function () {
  var port = server.address().port;
});
