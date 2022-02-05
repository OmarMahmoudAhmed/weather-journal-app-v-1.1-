
/* Global Variables */

// 1- API key
const apiKey = `ea3d8971b5ec9b2f459574cecb943add`;

// 2- Generating button
const generateB = document.getElementById(`generate`);

// 3- Creating a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1 +'.'+ d.getDate()+'.'+ d.getFullYear();

// 4- Results
let resultContainer = document.getElementById(`entryHolder`);
let dateE = document.getElementById(`date`);
let tempE = document.getElementById(`temp`);
let contentE = document.getElementById(`content`);

// 5- The event listener:

generateB.addEventListener(`click`, generateF);



/* The main function: */

async function generateF() {

    let zipCode = document.getElementById(`zip`).value;
    let feelings = document.getElementById(`feelings`).value;

    validationF(zipCode);

    fetchingF(zipCode, apiKey, feelings);
};











/* Minor functions: */

// (1):
function validationF(zip) {

    // Alert an error if zipcode value is empty (don't equal true)
    if (zip > 0) {
        console.log(`Valid zip code (${zip})`);
    } else {
        alert(`Error! Zip code is empty. Please enter city's zip code.`);
    };
};

// (2):
async function fetchingF(zip, key, feelings) {

    // Fetching API data
    let preData = await fetch(`http://api.openweathermap.org/data/2.5/forecast?zip=${zip}&appid=${key}&units=metric`);

    // Turning it into JSON
    let DataJSON = await preData.json();

    // Reviewing it
    console.log(DataJSON);

    // Extracting temprature data from the API
    let temprature = DataJSON.list[0].main.temp;
    
    console.log(temprature);

    // (A) 
    resultingF(temprature, feelings);

    // done or failed message
    if (DataJSON.cod = `200`) {
        console.log(`Fetching done`);
    } else {
        alert(`Fetching data failed!`);
    };
};

// (2): (A):
async function resultingF(temp, feelings) {
    
    // Showing fetching results on UI
    resultContainer.style.display = `grid`;
    dateE.textContent = `Date: ${newDate}`;
    tempE.textContent = `Temprature: ${temp} C°`;
    contentE.textContent = `${feelings}`;

    // sending results to server
    postingF(feelings, temp);
};

// (3)
async function postingF(feelings, temp) {

    // Posting data to server
    await fetch(`/post`, {
        method: "POST",
        credentials: 'same-origin',
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            date: newDate,
            temprature: temp,
            content: feelings
        })
    });
    console.log(`Posting done`);
};

// End

// Best wishes

// Omar Mahmoud