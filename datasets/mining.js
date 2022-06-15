const fs = require('fs');
const path = require('path');



//Read all txt files in imput directory
//Add all lines to an single array of strings
//Return an array of strings
function loadDataset(){
    let dataset = [];
    let files = fs.readdirSync(path.join(__dirname, '../datasets/imput'));
    files.forEach(file => {
        let lines = fs.readFileSync(path.join(__dirname, '../datasets/imput/' + file), 'utf8').split('\n');
        dataset = dataset.concat(lines);
    });
    return dataset;
}


//Read all the responses from the json file
//return an array of objects
function loadResponses(){
    let responses = [];
    let file = fs.readFileSync(path.join(__dirname, '../datasets/responses.json'), 'utf8');
    responses = JSON.parse(file);
    return responses;
}

/*
Find the object in the array that has the same tag as the input
Pick a random index from response and return
*/
function getResponse(tag) {
    let responses = loadResponses();
    let response = responses.find(item => item.tag === tag);
    let index = Math.floor(Math.random() * response.response.length);
    return response.response[index];
}

console.log(getResponse("farwell", 0.5));

module.exports = {
    loadDataset,
    getResponse
}
