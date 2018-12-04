debugger;
let card = document.getElementsByClassName("card");
let cards = [...card];
let deck
let list = [];
let matchNum = 0;
let startTime = new Date().getTime();
let endTime = new Date().getTime();
init();

function init() {
    $(".open").removeClass("open");
    $(".show").removeClass("show");
    $(".match").removeClass("match");
    $('.moves').text(0);
    $('.stars').html('<li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li>');
    cards = shuffle(cards);
    matchNum = 0;
    startTime = new Date().getTime();
    endTime = new Date().getTime();
}

function match() {
    $('li').find('open').addClass('match');
}

function addCounter() {
    let countNum = Number($('.moves').text());
    countNum += 1;
    $('.moves').text(countNum);

    if (countNum % 2 === 0) {
        $(".stars").find('li:last-child').remove();
    }
}

function again() {
    $('#play-again').click(function () {
        $('#background').fadeOut(300);
        init();
    });
}

function score(moves, yourTime) {
    return (Math.round(Math.max(yourTime / Number(moves), 0)));
}

function verifier() {
    if (list.length === 2) {
        if (list[0] === list[1]) {
            list.pop();
            list.pop();
            $(".open, .show").addClass("match");
            match();
            matchNum += 1;
        } else {
            addCounter();
        }
    }
    if (matchNum === 8) {
        const endTime = new Date().getTime();
        const yourTime = ((endTime - startTime) / 1000);
        let moves = $(".moves").text();

        $("#background").fadeIn(500);
        $("#notification-box").fadeIn(500);
        again();
        $("#score").text(`Your score is:  ${score(moves, yourTime)}`);
        $("#time").text(`Your time is: ${yourTime.toFixed(2)} s`);
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
    init();
})

$('.card').click(function () {
    if (list.length === 2) {
        $(".open, .show").removeClass("open show");
        list.pop();
        list.pop();
    }
    if ($(this).hasClass("open")) {

    } else {
        $(this).addClass("open");
        $(this).addClass("show");
        addToList($(this).find('i').attr('class'));
        verifier();
    }
});
