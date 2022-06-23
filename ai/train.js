const utils = new require('./utils')
const mine = new require('./datasets/mining')
const fs = new require('fs')
const path = require('path')
const natural = require('natural')
const brain = require('brain.js')


let dataset = mine.loadDataset();
console.log("dataset loaded")
console.log(dataset)
let dictionary = utils.createDictionary(dataset);
console.log("dictionary created")
console.log(dictionary)
let train = utils.loadTrain(dictionary);
console.log("train loaded")
console.log(train)


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


let imput = "How are you?"
let word = utils.creatBoW(imput, dictionary);

let output = net.run(word);



//Save the model using fs
fs.writeFileSync(path.join(__dirname, './datasets/model.json'), JSON.stringify(net.toJSON()));
console.log("________________________________________________")
console.log(output);
console.log("________________________________________________")
console.log("------------------[Test]------------------------")
console.log(`[${utils.outputFilter(output)}]  ---  [${output[utils.outputFilter(output)]}]`);
console.log("Accuracy: " + (output[utils.outputFilter(output)] * 100).toFixed(2).toString() + "%");
console.log("------------------------------------------------")
console.log(`input -> ${imput}`);
console.log('response ->' + mine.getResponse(utils.outputFilter(output)))
console.log("------------------------------------------------")
