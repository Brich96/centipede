MyGame.screens['main-menu'] = (function(game) {

    function initialize() {
        document.getElementById('play').addEventListener('click', function() {
            game.showScreen('game-play');
        });
    }

    function run() {

    }

    return {
        initialize: initialize,
        run: run
    }

}(MyGame.game));