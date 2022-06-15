const utils = new require('./utils')
const mine = new require('./datasets/mining')
const fs = new require('fs')
const path = require('path')
const natural = require('natural')
const brain = require('brain.js')


let dataset = mine.loadDataset();
let dictionary = utils.createDictionary(dataset);
let train = utils.loadTrain(dictionary);


let net = new brain.NeuralNetwork({
    hiddenLayers: [3]
});

net.train(train, {
        errorThresh: 0.005,
        iterations: 20000,
        log: true,
        logPeriod: 10,
        learningRate: 0.3
});

let word = utils.creatBoW('How are you?', dictionary);

let output = net.run(word);


//Save the model using fs
fs.writeFileSync(path.join(__dirname, './datasets/model.json'), JSON.stringify(net.toJSON()));



console.log("----------------------------------------------")
console.log(`${utils.outputFilter(output)}  ---  ${output[utils.outputFilter(output)]}`);
console.log("----------------------------------------------")
