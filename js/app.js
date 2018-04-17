//score panel 
var counter = 0;
var count = document.getElementById("counter");
var playAg = document.getElementById("playAgain");
var lives = 3;
var hearts = document.getElementById("hearts");
var heart3 = hearts.getElementsByTagName('li')[2]; //last heart
var heart2 = hearts.getElementsByTagName('li')[1]; //second heart
var heart1 = hearts.getElementsByTagName('li')[0]; //first heart

var gover = document.getElementById("game-over");
// Enemies our player must avoid
var Enemy = function(x, y) {
    this.x = x;
    this.y = y;
    //rtandom speed between 70 and 110 (110-70=40)
    this.speed = Math.floor(Math.random() * 41) + 70;

    // The image/sprite for our enemies
    this.sprite = 'images/enemy-bug.png';

};

//1 row enemies
var enemy1 = new Enemy(1, 50);
var enemy2 = new Enemy(-250, 50);
//2th row
var enemy3 = new Enemy(20, 150);
//3th row
var enemy4 = new Enemy(10, 230);
var enemy5 = new Enemy(-200, 230);

enemy1.speed = enemy2.speed;
enemy4.speed = enemy5.speed;
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

//Loop enemies when they reach the right edge of the board
Enemy.prototype.update = function(dt) {
    if (this.x >= 500)
        this.x = -50;
    else
        this.x = this.x + this.speed * dt;

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// place all enemies in an array
var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5];

//player 
var Player = function() {
    this.x = 200;
    this.y = 400;
    this.sprite = 'images/char-horn-girl.png';

};

// remove one heart from panel
var removelives = function() {
    if (lives === 2) {
        hearts.removeChild(heart3);

    } else if (lives === 1) {
        hearts.removeChild(heart2);

    } else if (lives === 0) {
        hearts.removeChild(heart1);
    }
};

// Place the player object in a variable called player
var player = new Player();



Player.prototype.update = function(dt) {
    //Player can not move off board

    if (this.x >= 430 || this.x <= -30) {
        if (this.x >= 430) {
            this.x -= 30;
        } else if (this.x <= -30) {
            this.x += 30;
        }

    }
    this.checkCollisions();
    // increase counter if player reaches the water
    if (this.y <= -30 || this.y >= 430) {
        if (this.y <= -30) {
            counter += 1;
            count.innerHTML = `score: ${counter}`;
            this.reset();
        } else {
            this.reset();

        }
    }
};


Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


var gameOver = function() {
    //display score panel when player runs out of lives
    gover.style.height = "90%";
    //reset lives, hearts and counter
    lives = 3;
    hearts.appendChild(heart1);
    hearts.appendChild(heart2);
    hearts.appendChild(heart3);
    counter = 0;
};
// player's position and score points are reset 
//when the player collides with one of the enemy
Player.prototype.checkCollisions = function() {
    for (var i = 0; i < allEnemies.length; i++) {

        if (this.x < allEnemies[i].x + 65 &&
            this.x + 65 > allEnemies[i].x &&
            this.y < allEnemies[i].y + 65 &&
            65 + this.y > allEnemies[i].y) {
            this.reset();
            lives -= 1; //remove one life
            removelives(); //remove heart
            //display panel when player run out of lives
            if (lives === 0) {
                // player reached the water at least once
                if (counter > 0) {
                    finalScore.innerHTML = `Your score:  ${counter}`;
                    gameOver();
                    this.reset();
                } else {
                    //player never reached the water
                    finalScore.innerHTML = `Better luck next time `;
                    gameOver();
                    this.reset();

                }
            }

            count.innerHTML = `score: ${ counter }`;
        }
    }
};

// reset player position function
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
};
//move the player with arrow keys
player.handleInput = function(key) {

    if (key === 'left') {
        this.x -= 30;
    } else if (key === 'right') {
        this.x += 30;
    } else if (key === 'up') {
        this.y -= 30;
    } else if (key === 'down') {
        this.y += 30;
    }

};


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
//hide panel when player clicks restart button
playAg.addEventListener("click", function() {
    gover.style.height = "0%"
});