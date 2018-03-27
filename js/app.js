/*
 * Create a list that holds all of your cards
 */
let list = ['bicycle', 'bicycle', 'leaf', 'leaf', 'cube', 'cube', 'anchor',
'anchor', 'paper-plane-o', 'paper-plane-o', 'bolt', 'bolt', 'bomb', 'bomb',
'diamond', 'diamond'];
let openedCardList = [];
let twoStar = 20;
let threeStar = 10;
var moves = 0;
var matchCards = 0;
var timer;
var time;
var counter = 0;
var clicked = 0;
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

// Initiatize function
function initGame() {
    // Initiatize counters
    clicked = 0;
    matchCards = 0;
    moves = 0;
    document.querySelector('.moves').innerHTML = moves;
    resetStar();
    // Shuffle Deck
    var cards = shuffle(list);
    $('.deck').empty();
    for(var i = 0; i < cards.length; i ++) {
        $('.deck').append($('<li class = "card"><i class="fa fa-' + cards[i] + '"></i></li>'));
    }
    // Add click function
    addEventListener();
    // Reset timer
    cancelTimer();
}

// endGame function()
function endGame(moves,score) {
    // End Game
    swal({
        icon: 'success',
		title: 'You Won',
        // Display rating
		text: 'Rating: ' + score + ' Stars\n Total: ' + moves + ' Moves'
            + ' within ' + time + ' sec',
		button: 'Play again',
        closeOnEsc: false,
        allowOutsideClick: false,
	}).then(
        function (isConfirm) {
		if (isConfirm) {
			initGame(); // Initiatize the game
		}
	});
}

// Start timer function
var startTimer = function() {
    timer = setInterval(function() {
    counter = counter + 1
    document.querySelector('.timer').innerHTML = counter;
    }, 1000); // Update html's timer for each second
}

// Reset timer function
var cancelTimer = function() {
    clearInterval(timer);
    counter = 0; // Reset counter
    document.querySelector('.timer').innerHTML = counter; // Reset html's timer
}

// calRating() function
function calRating(moves) {
    // Calculate rating by moves
    var rating = 3;
    if(moves >= threeStar && moves < twoStar) {
        // Show two stars
        $('.fa-star').eq(2).removeClass('fa-star').addClass('no-star');
        rating = 2;
    }
    else if (moves >= twoStar && moves >= twoStar) {
        // Show 1 star
        $('.fa-star').eq(1).removeClass('fa-star').addClass('no-star');
        rating = 1;
    }
    return rating;
}

// Reset rating function
function resetStar() {
    // Reset Star on the scoreboard
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

// Event listener function for restart game
$(".restart").click(function() {
            initGame(); // Initiatize the game
     });

// Event listener for cards.
var addEventListener = function() {
    var openCard;
    var animationCompelete = true;
    $(".card").click(function() {
        // Start Timer
        if(clicked === 0) {
            startTimer();
            clicked += 1;
        }
        // Prevent clicking the same card
        if($(this).hasClass('show') || $(this).hasClass('match')) {
            return true;
        }
        // Get the class of current clicked card
        openCard = $(this).find("i").attr("class");
        // Flip Card
        if(animationCompelete === true) {
            // animationCompelete used to check if animation queue
            // It prevents shown cards being clicked again
            $(this).addClass('open show'); // display the card
            if(openedCardList.length === 0) {
                openedCardList.push(openCard); // Add clicked card to a list
            }
            else {
                // Compare Cards
                if(openCard === openedCardList[0]) {
                    $('.deck').find('.open').addClass('match animated infinite bounceIn'); // Animated Card
                    animationCompelete = false; // Start animation
                    setTimeout(function() {
                        $('.deck').find('.open').removeClass('open show animated'); // Stop animation;
                        animationCompelete = true;
                    }, 600);
                    matchCards = matchCards + 1; // Increment counter
                }
                else {
                    $('.deck').find('.open').addClass('unmatch animated flipOutX'); // Animated Card
                    animationCompelete = false; // Start animation
                    setTimeout(function () {
                        $('.deck').find('.open').removeClass('open show unmatch flipOutX'); // Stop animation
                        animationCompelete = true;
                    }, 600);
                }
                openedCardList = []; // Reset list
                moves = moves + 1; // Increment moves counter
                document.querySelector('.moves').innerHTML = moves; // Update moves on the webpage
                var score = calRating(moves); // Update rating
                // End Game
                if(matchCards === (list.length / 2)) {
                    // Stop timer
                    time = counter;
                    cancelTimer();
                    document.querySelector('.timer').innerHTML = time;
                    // Pop out a dialog to show the result
                    setTimeout(function() {
                        endGame(moves, score);
                    }, 700);
                }
            }
        }
    });
}

initGame(); // Start the program
