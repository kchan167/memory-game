# Memory Game Project

## Table of Contents

* [Instructions](#instructions)
* [Load game](#load-game)
* [How to play this game](#how-to-play-this-game)
* [Features & Resources](#features-and-resources)

## Instructions

The starter project has some HTML and CSS styling to display a static version of the Memory Game project.
- [Project Description](https://classroom.udacity.com/nanodegrees/nd016beta/parts/45080fba-9129-4bd9-869f-548be080accf/modules/677caa06-55d6-444e-a853-08627c5516a7/lessons/4227cbf4-f6ce-4798-a7e5-b1ce3b9e7c33/concepts/0a38769e-8e23-4e3f-9482-d8d1aa80fbb6)
- [Project Rubric](https://review.udacity.com/#!/rubrics/591/view)

## Load game

- Clone the website from https://github.com/kchan167/memory-game
- Or you can go to https://kchan167.github.io/memory-game/
## How to play this game
This games consist of 16 random cards in a 4x4 grid.
- Flip a card and reveal its symbol.
- Flip another card to find the one match the same symbol.
- If two cards have the same symbol, they will be locked and kept showing.
- If two cards do not match, both are returned hidden.
- The game ends once player finds match all the cards.

### Features and Resources
#### Score
Score is displayed as star and calculated by the numbers of moves.
- 3 stars: Less than 10 moves
- 2 stars: Less than 20 moves
- 1 star: Less than 30 moves
- 0 star: More than 30 moves

#### Aimation counter
In order to freeze the event handler, a counter is applied into this program.
The counter used to check if the animation completed or not.
When the animation is running, the counter is set to false.
If the value of counter equals false, on-click function is diabled.
The default of the counter is set to true.
```javascript
$('class').click(function() {  
    var counter = true;  
    if(counter === true) {  
        <animation code>
        counter = false;
        setTimeout(function () {
            counter = true;
       }, 600);
    }
});
```
Reference: https://stackoverflow.com/questions/13247849/

#### Timer
Score panel consist a timer

#### Result Dialog
Use sweet alert to display the result.
Resources: https://sweetalert.js.org/
