const natural = new require('natural');
const { Console } = require('console');
const fs = require('fs');
const path = require('path');
const mine = require('./datasets/mining')

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

//Create a training set
//Recive a json array from ./datasets/train.json
//for each item in array create a train model
//return the new array
function loadTrain(dictionary){
    let trainingSet = [];
    let train = JSON.parse(fs.readFileSync(path.join(__dirname, './datasets/train.json'), 'utf8'));
    train.forEach(item => {
        let bow = creatBoW(item.value, dictionary);
        trainingSet.push({
            input: bow,
            output: {"tag":item.tag, "value":0.90}
        });
    });
    return trainingSet;
}

let dataset = mine.loadDataset();
console.log(dataset);

let dictionary = createDictionary(dataset);
console.log(dictionary);

let train = loadTrain(dictionary);
console.log(train);
