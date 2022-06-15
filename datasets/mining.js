const fs = require('fs');
const path = require('path');
/*
Functions for data mining <- Getting and filtering data
and data modelling <- Insert and care the data
*/


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

//Add new response for specific tag
// - Recive a tag and a response
// - Find the tag inside the responses array
// - Add the response given to the tag response array
// - Append the new response to the responses array
// - Write the new responses array to the json file
function addResponse(tag, res) {
    let responses = loadResponses();
    let response = responses.find(item => item.tag === tag);
    response.response.push(res);
    fs.writeFileSync(path.join(__dirname, '../datasets/responses.json'), JSON.stringify(responses));
}

//Inset new traing data to the train.json array 
// - Recive a tag and a sentence
// - Create a new object with the tag and sentence
// - Append the new object to the train.json array
// - Save the new array to the json file
// - Verify if the tag given existis in imput directory
//  - tag.txt <- format
// - if not create a new file with the tag name and append the sentence to the file
function addTrainingData(tag, sentence) {
    let train = JSON.parse(fs.readFileSync(path.join(__dirname, '../datasets/train.json'), 'utf8'));
    train.push({
        tag: tag,
        value: sentence
    });
    fs.writeFileSync(path.join(__dirname, '../datasets/train.json'), JSON.stringify(train));
    let files = fs.readdirSync(path.join(__dirname, '../datasets/imput'));
    if (!files.includes(tag + '.txt')) {
        fs.appendFileSync(path.join(__dirname, '../datasets/imput/' + tag + '.txt'), sentence + '\n');
    }
}





module.exports = {
    loadDataset,
    loadResponses,
    getResponse,
    addResponse,
    addTrainingData
}
