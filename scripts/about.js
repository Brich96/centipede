MyGame.screens['about'] = (function(game) {
    'use strict';

    function initialize() {
        document.getElementById('id-about-back').addEventListener(
            'click',
            function() { game.showScreen('main-menu'); });
    }

    function run() {
        // Nothing to do here.
    }

    return {
        initialize : initialize,
        run : run
    };

}(MyGame.game));