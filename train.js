const utils = new require('./utils')
const mine = new require('./datasets/mining')
const fs = require('fs')
const path = require('path')
const natural = require('natural')
const brain = require('brain.js')


let dataset = mine.loadDataset();
let dictionary = utils.createDictionary(dataset);
let train = utils.loadTrain(dictionary);


let net = new brain.NeuralNetwork();

net.train(train);

let word = utils.creatBoW('Hello, how are you?', dictionary);

let output = net.run(word);

console.log(output);