MyGame.screens['settings'] = (function(game, settings, input) {
    'use strict';

    function initialize() {
        document.getElementById('id-settings-back').addEventListener(
            'click',
            function() { game.showScreen('main-menu'); 
        });

        document.getElementById('id-settings-save').addEventListener('click', function() {
            saveSettings();
        });
    }

    function run() {
        // Nothing to do here.
    }

    function saveSettings() {
        settings = [];
        settings.push(document.getElementById('up-input').value);
        settings.push(document.getElementById('down-input').value);
        settings.push(document.getElementById('left-input').value);
        settings.push(document.getElementById('right-input').value);
        settings.push(document.getElementById('shoot-input').value);

        window.localStorage.setItem('settings', JSON.stringify(settings));
    }

    return {
        initialize : initialize,
        run : run
    };

}(MyGame.game, MyGame.settings, MyGame.input));