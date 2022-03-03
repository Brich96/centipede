MyGame.screens['game-play'] = (function(game) {

    function initialize() {
        
    }

    function run() {
        game.showScreen('main-menu');
    }

    return {
        initialize: initialize,
        run: run
    }

}(MyGame.game));