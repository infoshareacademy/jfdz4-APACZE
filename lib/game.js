
$(function() {

    var myGamePiece;
    var myObstacles = [];
    var myScore;
    var myGameArea = {
        canvas: document.createElement('canvas'),
        start: function () {
            this.canvas.width = 200;
            this.canvas.height = 200;
            this.context = this.canvas.getContext('2d');

            $('#game-section').append(this.canvas);

            //frameNo potrzebny do liczenia odświeżeń, żeby pokazywać nowe przeszkody
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

    //function returns true if the current framenumber corresponds with the given interval
    function everyinterval(n) {
        return (myGameArea.frameNo / n) % 1 === 0;
    }

    startGame();

    //object constructor
    function component(width, height, color, x, y, type) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.type = type;
        this.speedX = 0;
        this.speedY = 0;
        this.update = function(){
            ctx = myGameArea.context;
            if (this.type === "text") {
                ctx.font = this.width + " " + this.height;
                ctx.fillStyle = color;
                ctx.fillText(this.text, this.x, this.y);
            } else {
                ctx.fillStyle = color;
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }
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
        myScore = new component(40, 30, "black", 10, 10, "text");
    }

    function updateGameArea() {

        var y, width, gap, minWidth, maxWidth, minGap, maxGap;
        for (var i = 0; i < myObstacles.length; i += 1) {
            if (myGamePiece.crashWith(myObstacles[i])) {
                myGameArea.stop();
                return;
            }
        }
        myGameArea.clear();
        myGameArea.frameNo += 1;
        if (myGameArea.frameNo === 1 || everyinterval(150)) {
            x = myGameArea.canvas.width;
            minWidth = 20;
            maxWidth = 150;
            width = Math.floor(Math.random()*(maxWidth-minWidth+1)+minWidth);
            minGap = 50;
            maxGap = 80;
            gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
            myObstacles.push(new component(width, 10, "green", 0, 0));
            myObstacles.push(new component(y - width - gap, 10, "green", width + gap, 0));
        }
        for (i = 0; i < myObstacles.length; i += 1) {
            myObstacles[i].y += 1;
            myObstacles[i].update();
        }

        myGamePiece.speedX = 0;
        myGamePiece.speedY = 0;
        if (myGameArea.key && myGameArea.key === 87) {
            myGamePiece.speedY = -1;
        } //w - do przodu
        if (myGameArea.key && myGameArea.key === 65) {
            myGamePiece.speedX = -1;
        } //a - w lewo
        if (myGameArea.key && myGameArea.key === 83) {
            myGamePiece.speedY = 1;
        } //s - do tyłu
        if (myGameArea.key && myGameArea.key === 68) {
            myGamePiece.speedX = 1;
        } //d - w prawo
        myScore.text="Score: " + myGameArea.frameNo;
        myScore.update();
        myGamePiece.newPos();
        myGamePiece.update();
    }

});

