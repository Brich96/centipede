MyGame.screens['main-menu'] = (function(game) {

    function initialize() {
        document.getElementById('play').addEventListener('click', function() {
            game.showScreen('game-play');
        });

        document.getElementById('id-about').addEventListener('click', function() {
            game.showScreen('about');
        });

        document.getElementById('id-settings').addEventListener('click', function() {
            game.showScreen('settings');
        });
    }

    function run() {

    }

    return {
        initialize: initialize,
        run: run
    }

}(MyGame.game));