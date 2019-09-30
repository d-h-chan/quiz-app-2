'use strict';

const PROGRESS = {
    numberCorrect: 0,
    numberTotal: 0,
    currentIndex: -1
};

const STORE = [
    {   
        question: "Click the best synonym for: worn-out", 
        answerChoices: 
        [
            {id: 1, answer: "exhausted"},
            {id: 2, answer: "valuable"},
            {id: 3, answer: "closed"},
            {id: 4, answer: "hard-working"}
        ],
        correctChoice: 1
    },
    {   
        question: "Click the best synonym for: hyperbole", 
        answerChoices: 
        [
            {id: 1, answer: "praise"},
            {id: 2, answer: "plague"},
            {id: 3, answer: "exaggeration"},
            {id: 4, answer: "apology"}
        ],
        correctChoice: 3
    },
    {   
        question: "Click the best synonym for: dismay", 
        answerChoices: 
        [
            {id: 1, answer: "display"},
            {id: 2, answer: "jealousy"},
            {id: 3, answer: "provocation"},
            {id: 4, answer: "disappointment"}
        ],
        correctChoice: 4
    },
    {   
        question: "Click the best synonym for: vanish", 
        answerChoices: 
        [
            {id: 1, answer: "fade slowly"},
            {id: 2, answer: "disappear"},
            {id: 3, answer: "ride"},
            {id: 4, answer: "chat"}
        ],
        correctChoice: 2
    },
    {   
        question: "Click the best synonym for: dull", 
        answerChoices: 
        [
            {id: 1, answer: "humid"},
            {id: 2, answer: "boring"},
            {id: 3, answer: "warm and cozy"},
            {id: 4, answer: "uncomfortable"}
        ],
        correctChoice: 2
    }
];

function updateHeader(text) {
    $("h1").text(text);
}

function updateHeaderWithScore() {
    updateHeader(`Question: ${PROGRESS.currentIndex + 1}/${PROGRESS.numberTotal} Correct: ${PROGRESS.numberCorrect}`);
}

function displayNextQuestion() {
    let question = STORE[PROGRESS.currentIndex];
    let answerChoices = question.answerChoices;
    const answersHtml = generateAnswerItemsString(answerChoices);
    $('#js-answer-section').html(answersHtml);
    $('#js-question').text(question.question);
    $('#js-answer-form').show();
    $('#js-continue-button').text("continue");
    $('#js-continue-button').prop('disabled', true);
    //render top screen
}

function handleContinueClicked() {
    $('#js-continue-form').submit(function(event) {
        PROGRESS.currentIndex++;
        updateHeaderWithScore();
        event.preventDefault();
        //continue to next question
        if (PROGRESS.currentIndex < PROGRESS.numberTotal) {
            displayNextQuestion();
        }
        //game ends
        else {
            updateHeader(`Final Score: ${PROGRESS.numberCorrect}/${PROGRESS.numberTotal}`);
            $('#js-continue-button').text("Try Again?");
            resetGame();
        }
    });
}


function generateAnswerElement(item) {
    return `<li><button class="answer-button" data-answer-id="${item.id}">${item.answer}</button><i class="feedback"></i></li>`;
}

function generateAnswerItemsString(quizAnswerList) {
    console.log("Generating answers options element");
    const items = quizAnswerList.map((item) => generateAnswerElement(item));
    items.sort(() => Math.random() - 0.5);
    return items.join("");
}

function getCorrectAnswer(index) {
    return STORE[index].correctChoice;
}

function getSelectedAnswer(item) {
    return $(item).data().answerId;
}

function handleAnswerButtonClicked(event) {
    const correctAnswer = getCorrectAnswer(PROGRESS.currentIndex);
    const selectedAnswer = getSelectedAnswer(event.currentTarget)
    if (correctAnswer === selectedAnswer) {
        $(event.currentTarget).next(".feedback").addClass("fa fa-check").addClass("opaque");
        PROGRESS.numberCorrect++;
    }
    else {
        $(event.currentTarget).next(".feedback").addClass("fa fa-times").addClass("opaque");
        $(event.currentTarget).closest("ul").find(`[data-answer-id=${correctAnswer}]`).next().addClass("fa fa-check").addClass("opaque");
    }
    //console.log(selectedAnswer);
    $(".answer-button").prop('disabled', true);
    $('#js-continue-button').prop('disabled', false);
    updateHeaderWithScore();
    console.log("SCORE: " + PROGRESS.numberCorrect);
}

function resetGame() {
    $('#js-answer-form').hide();
    PROGRESS.numberCorrect = 0;
    PROGRESS.numberTotal = STORE.length;
    PROGRESS.currentIndex = -1;
}

function initialize() {
    resetGame()
    $('ul').on('click', 'button', function(event) {
        event.preventDefault();
        handleAnswerButtonClicked(event);
    });
}

function handleQuizApp() {
    initialize();
    handleContinueClicked();
}
  
// when the page loads, call `handleQuizApp`
$(handleQuizApp);