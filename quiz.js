var startButton = document.querySelector ('#startQuiz');
var gamePrompt = document.querySelector ('.container')
var timerEl = document.querySelector('#timer');
var screen1 = document.querySelector("#screen-1");
var qQnum = document.querySelector('#question-number');
var questionsEl = document.querySelector('#question')
var questionsBox = document.querySelector('.questions')
var highScoreEl = document.querySelector('.high-score');
var answersEl = document.querySelector('.answers')
var nextButton = document.querySelector('.next')
var correctScore = document.querySelector('.correct')
var wrongScore = document.querySelector('.wrong')
var inputInitials = document.createElement('form')
var timeInterval;
var correct = 0;
var wrong = 0;
var highScore = document.querySelector('.highscore')
var answered = true;
var timeLeft = 120;
var isLastQuesiton = false;

var questions = [
    {
        question: 'Which answer choice below best represents the difference between declaring variables using let, const, and var?',
        answers: ['they each differ in scope', 'they are interchangeable', 'they all declare variables', 'they can each redeclare variables.'],
        correctAnswer: 'they each differ in scope'
    },

   { 
       question: 'What are classes in javascript?',
       answers: ['A template for javascript objects', 'A true or false reading', 'A declaration of variables', 'All of the above'],
       correctAnswer: 'A template for javascript objects'
    },

    {
        question: 'What is DOM?',
        answers: ['Document Object Model', 'A tree of Objects', 'something that defines that standard for accesseing documents', 'all of the above'],
        correctAnswer: 'Document Object Model'
    },

    {
        question: 'Which of the following best describes the difference between an arrow function and a traditional function?',
        answers: ['traditional functions have shorter syntax', 'arrow functions have shorter syntax', 'parapeters can be set in arrow functions only', 'Javascript only uses traditional functions'],
        correctAnswer: 'arrow functions have shorter syntax'
    },

    {
        question: 'which represents a data type present in Javasctipt?',
        answers: ['Boolean', 'keys', 'objects', 'statements', 'declarations', 'errors'],
        correctAnswer: 'Boolean',
    },   

    {
        question: 'Which of the following definitions describe hoisting?',
        answers: [' movement of variables or classes to top of scope', 'nesting the variables inside of a variables', 'the storage of seqyences of values', 'accessing the property of a value'],
        correctAnswer: ' movement of variables or classes to top of scope'
    },

    {
        question: 'What are logical Operators? ',
        answers: [' symbol or word used to connect two or more expressions', 'an expression that goes in order of operations', 'an if-then condition', 'all of the above.'],
        correctAnswer: ' symbol or word used to connect two or more expressions'
    },

    {
        question: ' What is the NaN property in Javascript? ',
        answers: [' Not a Number', 'ones grandmother', 'North American Network', 'National Action Network'],
        correctAnswer: ' Not a Number'
    }
]
var currentQuestion = 0;

// countdown timer
    function countdown () {
        
        timeInterval = setInterval(function() {
            if (timeLeft > 1) {
                timerEl.textContent = timeLeft + ' seconds remaining';
                timeLeft--;
            } else if (timeLeft === 1) {
                timerEl.textContent = timeLeft + ' second remaining'
                timeLeft--;
            } else if (timeLeft === 0) {
                wrong++;
            } else {
                timerEl.textContent = ''
                clearInterval(timeInterval);
            }
        }, 1000);

    } 

// start the timer and show first screen
function startQuiz () {
    gamePrompt.style.display = 'none'
    screen1.style.display = 'block'
        countdown();
      renderQuestions();
       nextButton.addEventListener('click', function(event){
        event.stopPropagation();
        event.preventDefault();
        currentQuestion++;
        if(currentQuestion === questions.length-1) {
            nextButton.style.display ='none'
            isLastQuesiton = true
        }
        renderQuestions();
    })
    
    
};

// event listener to start the quiz

startButton.addEventListener('click', function (event){
    event.preventDefault();
    event.stopPropagation();
    startQuiz();

})
        
// function to move between screens and gather scores
function compare (e) {
    var answerClicked = e.target.innerHTML

    if(answerClicked === questions[currentQuestion].correctAnswer) {
        var h1 = document.createElement('h1')
        h1.textContent = 'correct'
        answersEl.appendChild(h1);
        correct++;
        
        
    } else {
        wrong++;
        var h1 = document.createElement('h1')
        h1.textContent = 'Wrong'
        answersEl.appendChild(h1);
        timeLeft -=10;
        
    }
}


//populate the questions

function renderQuestions () {
    var questionObj = questions[currentQuestion];
    answersEl.innerHTML = ""
    questionsEl.textContent = questionObj.question;
    questionObj.answers.forEach(function (question) {
        var li = document.createElement("li");
        li.textContent = question;
        li.style.border = 'solid';
        li.style.backgroundColor = 'blue';
        li.style.marginTop = '10px';
        li.style.color = "white";
        li.style.padding = '10px';
        li.style.borderRadius = '10px'
        li.style.display = 'table'
        li.addEventListener('click', function(e){
           e.preventDefault()
           e.stopPropagation()
           compare(e)
           currentQuestion++;
           
        if(currentQuestion === questions.length) {
            nextButton.style.display ='none'
            isLastQuesiton = true
            endQuiz()
        }
        renderQuestions();
        })
        answersEl.appendChild(li);
    });
}
// function to end the quiz
function endQuiz () {
    window.alert('end')
    renderForm()
    timerEl.textContent = ''
    clearInterval(timeInterval);
    questionsBox.style.display = 'none'
    setCorrect()
    setWrong()
    getCorrect()
    getWrong()
    renderHighscore()
    
}


// save the correct count
    
function setCorrect () {
    correctScore.textContent = correct;
    localStorage.setItem('winCount', JSON.stringify(correct));
}
// save the wrong count
function setWrong () {
    wrongScore.textContent = wrong;
    localStorage.setItem('loseCount', JSON.stringify(wrong));
}
//show the correct count
function getCorrect () {
    var storedCorrect = localStorage.getItem('winCount');
    if (storedCorrect === null) {
        correct = 0
    } else  {
        correct = storedCorrect;
    }

    

    correctScore.textContent = 'Right: ' + correct;
}
//show the wrong count
function getWrong () {
    var storedWrong = localStorage.getItem('loseCount');
    if (storedWrong === null) {
        wrong = 0;
    } else {
        wrong = storedWrong;
    }

    wrongScore.textContent = 'wrong: ' + wrong;
}
// show the high Score
function renderHighscore() {
    highScore = (correct - wrong)
    localStorage.setItem('highscore', JSON.stringify(highScore));
    localStorage.getItem('highscore');
    highScore.textContent = 'High Score: ' + (correct - wrong);
    
}
// dynamically made form to submit initials at the end
function renderForm() {
    var form = document.createElement('form');
    form.className = 'userform'
    form.setAttribute('method', 'post');
    form.setAttribute('action', 'submit.php');
    var FN = document.createElement('input');
    FN.setAttribute('type', 'text');
    FN.setAttribute('name', 'FullName');
    FN.setAttribute('placeholder', 'Full Name');
    

    var submit = document.createElement('input')
    submit.setAttribute('type', 'submit');
    submit.setAttribute('value', 'submit');
    form.appendChild(FN);
    form.appendChild(submit);
    form.addEventListener('submit', function(event){
        event.preventDefault()
        renderMessage()
        function renderMessage() {
            var bestScore = JSON.parse(localStorage.getItem("highscore"));
            if (bestScore !== null) {
              document.querySelector(".message").textContent = FN.value + 
              " received a high score of " + (correct - wrong)
            }
          }

    }) 
    localStorage.setItem('form', JSON.stringify(FN));
    localStorage.getItem('form');
   
    
    highScoreEl.appendChild(form);
}