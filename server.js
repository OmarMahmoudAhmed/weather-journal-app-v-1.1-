/* (A) Introduction: */

// 1- Setup empty JS object to act as endpoint for all routes:
projectData = {};

// 2- Require Express to run server and routes:
const express = require(`express`);

// 3- Start up an instance of app:
const app = express();

// 4- Middleware:
const bodyParser = require(`body-parser`);

// 5- Configuring express to use body-parser as middle-ware:
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 6- Cors for cross origin allowance:
const cors = require(`cors`);
app.use(cors());

// 7- Initializing the main project folder:
app.use(express.static(`website`));

// 8- Setting the server port:
const port = 8000;

// 9- Testing server is running or not:
const server = app.listen(port, listeningFunc);

function listeningFunc() {
    // Function to test if the server work well:
    console.log(`Server is running successfully on port: ${port}.`);
};

/* Server requests: */

// 1- Get:
app.get(`/get`, gettingFunc);

function gettingFunc(req, res) {
    res.send(projectData);
};

// 2- Post:
app.post(`/post`, postingFunc);

function postingFunc(req, res) {
    projectData = {...req.body};
    res.end()
    console.log(projectData);
};

// Best wishes
// Omar Mahmoud