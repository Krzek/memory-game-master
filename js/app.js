let card = document.getElementsByClassName('card');
const cards = [...card];
const deck = document.getElementById('card-deck');
let list = [];
let matchNum = 0;
let startTime = new Date().getTime();
let endTime = new Date().getTime();
let matchPointsCounter = 0;
let missPointsCounter = 0;
let removedStars = 0;
let timeCount = 0;
let paused = false;
let started = false;

init();

function init() {
    $('.moves').text(0);
    $('.stars').html('<li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li>');
    prepareBoard();
    startTimer();
    matchNum = 0;
    startTime = new Date().getTime();
    endTime = new Date().getTime();
}

function prepareBoard() {
    let shuffleCards = shuffle(cards);
    for (var i = 0; i < shuffleCards.length; i++) {
        deck.innerHTML = '';
        [].forEach.call(cards, function (item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove('show', 'open', 'match');
    }
}

function match() {
    $('li').find('open').addClass('match');
    matchPointsCounter += 10;
}

function addCounter() {
    let countNum = Number($('.moves').text());
    countNum++;
    $('.moves').text(countNum);

    if (countNum % 5 === 0) {
        if (removedStars < 2) {
            $(".stars").find('li:last-child').remove();
            removedStars++;
        }
    }
}

function again() {
    $('#play-again').click(function () {
        $('#background').fadeOut(300);
        resetTimer();
        init();
    });
}

function score() {
    return Math.max(matchPointsCounter - missPointsCounter, 0);
}

function verifier() {
    if (list.length === 2) {
        if (list[0] === list[1]) {
            list.pop();
            list.pop();
            $('.open, .show').addClass('match');
            match();
            matchNum += 1;
        } else {
            missPointsCounter += 2;
            addCounter();
        }
    }
    if (matchNum === 8) {
        const endTime = new Date().getTime();
        const yourTime = ((endTime - startTime) / 1000);
        let scoreStars = 3 - removedStars;
        clearInterval(timeCountVar);

        $('#background').fadeIn(500);
        $('#notification-box').fadeIn(500);
        again();
        $('#score').text(`Your score is:  ${score()} with ${scoreStars} ${scoreStars === 1 ? 'star' : 'stars'}`);
        $('#time').text(`Your time is: ${yourTime.toFixed(2)} s`);
    }
}

function addToList(kind) {
    list.push(kind);
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

$('#notification-box').hide();
$('#background').hide();

$('.restart').click(function () {
    resetTimer();
    init();
})

$('.card').click(function () {
    if (list.length === 2) {
        list.pop();
        list.pop();
        closeCards();
    }
    if (!$(this).hasClass('open')) {
        $(this).addClass('open');
        $(this).addClass('show');
        addToList($(this).find('i').attr('class'));
        verifier();
    }
});

function closeCards() {
    $('.open, .show').removeClass('open show');
}

function startTimer() {
    timeCountVar = setInterval(function () {

        if (paused === false) {
            timeCount++;
            if (timeCount === 1) {
                $('.timer-label').html('Second');
            } else {
                $('.timer-label').html('Seconds');
            }
            $('.timer').html(timeCount);
        }
    }, 1000);
    started = true;
};

function resetTimer() {
    started = false;
    timeCount = 0;
    $('.timer').html(timeCount);

    clearInterval(timeCountVar);
};
