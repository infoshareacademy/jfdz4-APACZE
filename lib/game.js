
$(function() {

    var myGamePiece;
    // var myObstacle;
    var myObstacles = [];
    var myGameArea = {
        canvas: document.createElement('canvas'),
        start: function () {
            this.canvas.width = 200;
            this.canvas.height = 200;
            this.context = this.canvas.getContext('2d');

            $('#game-section').append(this.canvas);

            this.frameNo = 0;
            this.interval = setInterval(updateGameArea, 20);
            window.addEventListener('keydown', function (e) {
                myGameArea.key = e.keyCode;
            });
            window.addEventListener('keyup', function (e) {
                myGameArea.key = false;
            })
        },
        clear : function() {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        },
        stop : function() {
            clearInterval(this.interval);
        }

    };

    function everyinterval(n) {
        if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
        return false;
    }

    startGame();

    function component(width, height, color, x, y) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.speedX = 0;
        this.speedY = 0;
        this.update = function(){
            ctx = myGameArea.context;
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        };
        this.newPos = function() {
            this.x += this.speedX;
            this.y += this.speedY;
        };
        this.crashWith = function(otherobj) {
            var myleft = this.x;
            var myright = this.x + (this.width);
            var mytop = this.y;
            var mybottom = this.y + (this.height);
            var otherleft = otherobj.x;
            var otherright = otherobj.x + (otherobj.width);
            var othertop = otherobj.y;
            var otherbottom = otherobj.y + (otherobj.height);
            var crash = true;
            if ((mybottom < othertop) ||
                (mytop > otherbottom) ||
                (myright < otherleft) ||
                (myleft > otherright)) {
                crash = false;
            }
            return crash;
        }
    }

    function startGame() {
        myGameArea.start();
        myGamePiece = new component(20, 20, "red", 90, 150);
        // myObstacle = new component(50, 10, "green", 0, 20);
    }

    function updateGameArea() {

        // var x, height, gap, minHeight, maxHeight, minGap, maxGap;
        var y, height, gap, minHeight, maxHeight, minGap, maxGap;
        for (var i = 0; i < myObstacles.length; i += 1) {
            if (myGamePiece.crashWith(myObstacles[i])) {
                myGameArea.stop();
                return;
            }
        }
        myGameArea.clear();
        myGameArea.frameNo += 1;
        if (myGameArea.frameNo == 1 || everyinterval(150)) {
            // x = myGameArea.canvas.width;
            y = myGameArea.canvas.height;
            // minHeight = 20;
            // maxHeight = 200;
            // height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
            minWidth = 20;
            maxWidth = 200;
            // height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
            width = Math.floor(Math.random()*(maxWidth-minWidth+1)+minWidth);
            minGap = 50;
            maxGap = 200;
            gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
            myObstacles.push(new component(width, 10, "green", 0, y));
            myObstacles.push(new component(y - width - gap, 10, "green", 0, width + gap));
        }
        for (i = 0; i < myObstacles.length; i += 1) {
            myObstacles[i].y += 1;
            myObstacles[i].update();
        }

        // if (myGamePiece.crashWith(myObstacle)) {
        //     myGameArea.stop();
        // } else {
        //     myGameArea.clear();
        //     myObstacle.y += 1;
        //     myObstacle.update();
            myGamePiece.speedX = 0;
            myGamePiece.speedY = 0;
            if (myGameArea.key === 87) {
                myGamePiece.speedY = -1;
            } //w - do przodu
            if (myGameArea.key === 65) {
                myGamePiece.speedX = -1;
            } //a - w lewo
            if (myGameArea.key === 83) {
                myGamePiece.speedY = 1;
            } //s - do tyłu
            if (myGameArea.key === 68) {
                myGamePiece.speedX = 1;
            } //d - w prawo
            myGamePiece.newPos();
            myGamePiece.update();
        // }
    }

});

