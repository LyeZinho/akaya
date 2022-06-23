const natural = new require('natural');
const { Console } = new require('console');
const fs = new require('fs');
const path = new require('path');
const mine = require('./datasets/mining');
//Tokenize a sentence
function tokenize(sentence){
    tokenizer = new natural.TreebankWordTokenizer();
    return tokenizer.tokenize(sentence);
}

//Stemmer
function stemmer(word){
    let stemmed = natural.PorterStemmer.stem(word);
    return stemmed.toLowerCase();
}

/*
//Create a dictionary of all words in the dataset
Recive a raw array of sentences and return an array of sentences 
tokenized and stemmed
*/
function createDictionary(dataset){
    let treatedDataset = [];
    dataset.forEach(sentence => {
        treatedDataset = treatedDataset.concat(tokenize(sentence).map(stemmer));
    });
    return treatedDataset;
}

/*
//Create  a bag of words
Recive a raw sentence and a dictionary of all words in the dataset
Return an array of words in the sentence
*/
function creatBoW(sentence, dictionary){
    let bow = [];
    let words = tokenize(sentence);
    for(let i = 0; i < dictionary.length; i++){
        bow.push(0);
    }
    words.forEach(word => {
        let index = dictionary.indexOf(stemmer(word));
        if(index > -1){
            bow[index]++;
        }
    });
    return bow;
}




//Training factory function
function trainFactory(imput, tagname) {
    var tag = {};
    tag[tagname] = 1;
    var train = {
        input: imput,
        output: tag
    }
    return train;
}

// Select the name of the highest value from the output
function outputFilter(output) {
    let max = 0;
    let tag = '';
    for(var i in output) {
        if(output[i] > max) {
            max = output[i];
            tag = i;
        }
    }
    let valueRaw = output[tag];

    let result = {
        tag: tag,
        value: valueRaw
    }
    return tag;
}

//Create a training set
//Recive a json array from ./datasets/train.json
//for each item in array create a train model
//return the new array
function loadTrain(dictionary){
    let trainingSet = [];
    let train = JSON.parse(fs.readFileSync(path.join(__dirname, './datasets/train.json'), 'utf8'));
    train.forEach(item => {
        let bow = creatBoW(item.sentence, dictionary);
        let trainModel = trainFactory(bow, item.tag);
        console.log(trainModel)
        trainingSet.push(trainModel);
    });
    return trainingSet;
}

// //Load the dataset
// let dataset = mine.loadDataset();

// //Create a dictionary of all words in the dataset
// let dictionary = createDictionary(dataset);

// //Create a training set
// let trainingSet = loadTrain(dictionary);



module.exports = {  
    tokenize,
    stemmer,
    createDictionary,
    creatBoW,
    loadTrain,
    trainFactory,
    outputFilter
}


