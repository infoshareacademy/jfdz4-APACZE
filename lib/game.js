
$(function() {

    var myGameArea = {
        canvas: document.createElement('canvas'),
        start: function () {
            this.canvas.width = 300;
            this.canvas.height = 400;
            this.context = this.canvas.getContext('2d');

            // $('#game-section').css({
            //     'border': '1px solid #d3d3d3',
            //     'background-color': '#f1f1f1'});
            $('#game-section').append(this.canvas);

        }
    };

    startGame();

    function startGame() {
        myGameArea.start();
    }


});

