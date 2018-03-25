/*
 * Create a list that holds all of your cards
 */
let list = ['bicycle', 'bicycle', 'leaf', 'leaf', 'cube', 'cube', 'anchor',
'anchor', 'paper-plane-o', 'paper-plane-o', 'bolt', 'bolt', 'bomb', 'bomb',
'diamond', 'diamond'];
let openedCardList = [];
let oneStar = 30;
let twoStar = 20;
let threeStar = 10;
var moves = 0;
var matchCards = 0;
var timer;
var time;
var counter = 0;
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Initiatize Game
function initGame() {
    matchCards = 0;
    moves = 0;
    document.querySelector('.moves').innerHTML = moves;
    resetStar();
    var cards = shuffle(list);
    $('.deck').empty();
    for(var i = 0; i < cards.length; i ++) {
        $('.deck').append($('<li class = "card"><i class="fa fa-' + cards[i] + '"></i></li>'));
    }
    addEventListener();
    cancelTimer();
    startTimer();
}

// End Game
function endGame(moves,score) {
    // Display rating
    swal({
        icon: 'success',
		title: 'You Won',
		text: 'Rating: ' + score + ' Stars\n Total: ' + moves + ' Moves',
		button: 'Play again',
        closeOnEsc: false,
        allowOutsideClick: false,
	}).then(
        function (isConfirm) {
		if (isConfirm) {
			initGame();
		}
	});
}

var startTimer = function() {
    timer = setInterval(function() {
    counter = counter + 1
    document.querySelector('.timer').innerHTML = counter;
    }, 1000);
};

var cancelTimer = function() {
    clearInterval(timer);
    counter = 0;
    document.querySelector('.timer').innerHTML = counter;
};

// Calculate rating by moves
function calRating(moves) {
    var rating = 3;
    if(moves >= threeStar && moves < twoStar) {
        $('.fa-star').eq(2).removeClass('fa-star').addClass('no-star');
        rating = 2;
    }
    else if (moves >= twoStar && moves < oneStar) {
        $('.fa-star').eq(1).removeClass('fa-star').addClass('no-star');
        rating = 1;
    }
    else if (moves > oneStar) {
        $('.fa-star').eq(0).removeClass('fa-star').addClass('no-star');
        rating = 0;
    }
    return rating;
}

// Reset Star on the scoreboard
function resetStar() {
    $('.no-star').removeClass('no-star').addClass('fa-star');
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

// Event listenre for restart game
$(".restart").click(function() {
            initGame();
     });

// Event listener for a card.
var addEventListener = function() {
    var openCard;
    var animationCompelete = true;
    $(".card").click(function() {
        // Get the class of current clicked card
        openCard = $(this).find("i").attr("class");
        // Flip Card
        // Prevent shown cards being clicked again
        if(animationCompelete === true) {
            $(this).addClass('open show');
            // Compare Cards
            if(openedCardList.length === 0) {
                openedCardList.push(openCard);
            }
            else {
                if(openCard === openedCardList[0]) {
                    $('.deck').find('.open').addClass('match animated infinite bounceIn');
                    animationCompelete = false;
                    setTimeout(function() {
                        $('.deck').find('.open').removeClass('open show animated');
                        animationCompelete = true;
                    }, 600);
                    matchCards = matchCards + 1;
                }
                else {
                    $('.deck').find('.open').addClass('unmatch animated flipOutX');
                    animationCompelete = false;
                    setTimeout(function () {
                        $('.deck').find('.open').removeClass('open show unmatch flipOutX');
                        animationCompelete = true;
                    }, 600);
                }
                openedCardList = [];
                moves = moves + 1;
                document.querySelector('.moves').innerHTML = moves;
                var score = calRating(moves);
                if(matchCards === (list.length / 2)) {
                    time = counter;
                    cancelTimer();
                    document.querySelector('.timer').innerHTML = time;
                    setTimeout(function() {
                        endGame(moves, score);
                    }, 700);
                }
            }
        }
    });
}

initGame();
