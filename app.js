var BasicFlashcard = require('./BasicCard.js');
var ClozeFlashcard = require('./ClozeCard.js');
var inquirer = require('inquirer');
var fs = require('fs');

inquirer.prompt([{
    name: 'command',
    message: 'Do you wanna try your intelligence ?',
    type: 'list',
    choices: [{
        name: 'start-now'
    }]
}]).then(function(answer) {
    if (answer.command === 'start-now') {
        showTime();
    }
});

var showTime = function() {
    fs.readFile('./basic.txt', 'utf8', function(error, data) {
        if (error) {
            console.log('Error occurred: ' + error);
        }
        var questions = data.split(';');
        var notBlank = function(value) {
            return value;
        };
        questions = questions.filter(notBlank);
        var count = 0;
        showQuestions(questions, count);
    });
};

var showQuestions = function(array, index) {
    var question = array[index];
    var parsedQuestion = JSON.parse(question);
    var questionText;
    var correctReponse;
    if (parsedQuestion.type === 'bcflash') {
        questionText = parsedQuestion.front;
        correctReponse = parsedQuestion.back;
    } else if (parsedQuestion.type === 'ceflash') {
        questionText = parsedQuestion.clozeDeleted;
        correctReponse = parsedQuestion.cloze;
    }
    inquirer.prompt([{
        name: 'response',
        message: questionText
    }]).then(function(answer) {
        if (answer.response === correctReponse) {
            console.log('Correct!');
            if (index < array.length - 1) {
                showQuestions(array, index + 1);
            }
        } else {
            console.log('Wrong!');
            if (index < array.length - 1) {
                showQuestions(array, index + 1);
            }
        }
    });
};