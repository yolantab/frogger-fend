// Enemies our player must avoid

var counter = 0;
var count = document.getElementById("counter");
var Enemy = function(x, y) {
    this.x = x;
    this.y = y;
    //rtandom spee between 80 and 120 (120-80=40)
    this.speed = Math.floor(Math.random() * 41) + 70;
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

};
var enemy1 = new Enemy(1, 50);
var enemy2 = new Enemy(-250, 50);
var enemy3 = new Enemy(20, 150);
var enemy4 = new Enemy(10, 230);
var enemy5 = new Enemy(-200, 230);
enemy1.speed = enemy2.speed;
enemy4.speed = enemy5.speed;
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

//loop enemies
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

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5];

var Player = function() {
    this.x = 200;
    this.y = 400;
    this.sprite = 'images/char-horn-girl.png';

};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();



Player.prototype.update = function(dt) {
    // don't allow player to  move out of the board

    if (this.x >= 430 || this.x <= -30) {
        if (this.x >= 430) {
            this.x -= 30;
        } else if (this.x <= -30) {
            this.x += 30;
        }

    }
    this.checkCollisions();

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

// collisions with enemy

Player.prototype.checkCollisions = function() {
    for (var i = 0; i < allEnemies.length; i++) {

        if (this.x < allEnemies[i].x + 65 &&
            this.x + 65 > allEnemies[i].x &&
            this.y < allEnemies[i].y + 65 &&
            65 + this.y > allEnemies[i].y) {
            this.reset();
            counter = 0;
            count.innerHTML = `score: ${counter}`;
        }
    }
};

// reset player position
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
};
//move player
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