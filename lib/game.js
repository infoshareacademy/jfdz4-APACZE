var myBus;
var myObstacles = [];
var score;
var playersScore = 0;
var levels = [
    {
        level: 3,
        gameTime: 3600,
        obs1: 120
    },
    {
        level: 2,
        gameTime: 2700,
        obs1: 150
    },
    {
        level: 1,
        gameTime: 1800,
        obs1: 200
    }
];
var currentLevel = 1;
var currentLevelParams = levels[levels.length - currentLevel];
var obstaclesParams = [
    {
        name: "ambulance",
        imgSrc: "lib/game/ambulance.png",
        width: 156,
        height: 76
    },
    {
        name: "car1",
        imgSrc: "lib/game/car1.png",
        width: 176,
        height: 76
    },
    {
        name: "car2",
        imgSrc: "lib/game/car2.png",
        width: 160,
        height: 76
    },
    {
        name: "car3",
        imgSrc: "lib/game/car3.png",
        width: 165,
        height: 76
    },
    {
        name: "police",
        imgSrc: "lib/game/police.png",
        width: 165,
        height: 76
    },
    {
        name: "taxi",
        imgSrc: "lib/game/taxi.png",
        width: 147,
        height: 76
    }
];

var obstaclesPositions = [372, 284, 194, 284, 194, 104];

var crashText = "Nie ukończyłeś poziomu. Twój wynik to " + playersScore + ". Zagrasz ponownie?";
var nextLevelText = "Ukończyłeś poziom z wynikiem " + playersScore + ". Chcesz przejść do kolejnego poziomu?";
var gameEndText = "Ukończyłeś grę z wynikiem " + playersScore + ". Gratulacje!";

var randomObstacleParams = function () {
    return obstaclesParams[Math.floor(Math.random() * obstaclesParams.length)];
};

var randomObstaclePosition = function () {
    return obstaclesPositions[Math.floor(Math.random() * obstaclesPositions.length)];
};

function startGame() {
    myGameArea.start();
    myBus = new component(259, 80, 2, 205, "lib/game/bus.png");
}

function component(width, height, x, y, src) {
    this.image = new Image ();
    this.image.src = src;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    this.update = function () {
        ctx = myGameArea.context;
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    };
    this.newPos = function () {
        this.x += this.speedX;
        this.y += this.speedY;
    };
    this.crashWith = function (otherobj) {
        var myLeft = this.x;
        var myRight = this.x + (this.width);
        var myTop = this.y;
        var myBottom = this.y + (this.height);
        var otherLeft = otherobj.x;
        var otherRight = otherobj.x + (otherobj.width);
        var otherTop = otherobj.y;
        var otherBottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((myBottom < otherTop) ||
            (myTop > otherBottom) ||
            (myRight < otherLeft) ||
            (myLeft > otherRight)) {
            crash = false;
        }
        return crash;
    }
}

function updateGameArea() {
    var x, y, width, height;
    for (i = 0; i < myObstacles.length; i +=1) {
        if (myBus.crashWith(myObstacles[i]) || score === currentLevelParams.gameTime) {
            myGameArea.stop();
            playersScore += score;
            console.log("Twój wynik to: " + playersScore + ".");
        }
    }
    myGameArea.clear();
    myGameArea.frameNo += 1;
    score = myGameArea.frameNo;
    console.log(myGameArea.frameNo);
    if (myGameArea.frameNo == 1 || everyInterval(currentLevelParams.obs1)) {
        x = myGameArea.canvas.width;
        y = myGameArea.canvas.height - randomObstaclePosition();
        width = randomObstacleParams().width;
        height = randomObstacleParams().height;
        image = randomObstacleParams().imgSrc;
        myObstacles.push(new component(width, height, x, y, image));
    }
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += -2;
        myObstacles[i].update();
    }
    myBus.speedX = 0;
    myBus.speedY = 0;
    if (myGameArea.keys && myGameArea.keys[37]) {myBus.speedX = -1.5;}
    if (myGameArea.keys && myGameArea.keys[39]) {myBus.speedX = 1.5;}
    if (myGameArea.keys && myGameArea.keys[38]) {myBus.speedY = -1.5;}
    if (myGameArea.keys && myGameArea.keys[40]) {myBus.speedY = 1.5;}
    if (myBus.x < 0) {
        myBus.x = 0
    } else if (myBus.x > 641) {
        myBus.x = 641
    } else if (myBus.y < 25) {
        myBus.y = 25
    } else if (myBus.y > 295) {
        myBus.y = 295
    } else {
        myBus.newPos();
    }
    myBus.update();
}

function moveUp() {
    myBus.speedY -= 1;
}

function moveDown() {
    myBus.speedY += 1;
}

function moveLeft() {
    myBus.speedX -= 1;
}

function moveRight() {
    myBus.speedX += 1;
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function () {
        this.canvas.width = 1100;
        this.canvas.height = 400;
        this.context = this.canvas.getContext("2d");
        $('#game').appendChild(this.canvas);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 16.66);
        window.addEventListener('keydown', function (e) {
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = true;
        });
        window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = false;
        })
    },
    clear : function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function () {
        clearInterval(this.interval);
    }
};

function everyInterval(n) {
    if((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}