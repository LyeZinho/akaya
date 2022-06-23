const mine = require('./datasets/mining');


function learn(tag, sentence, response) {
    mine.insertTrainingData(tag, sentence);
    mine.addResponse(tag, response);
    mine.tagLister()
}

// learn('tag', 'sentence', 'response');

// learn('farwell', 'See you later', 'Goodbye');


module.exports = {
    learn
}