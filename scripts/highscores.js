MyGame.screens['highscores'] = (function(game, score) {
    'use strict';

    function initialize() {
        document.getElementById('id-highscores-back').addEventListener(
            'click',
            function() { game.showScreen('main-menu'); });
    }

    function run() {
        let storedScores = JSON.parse(window.localStorage.getItem('scores'));
        storedScores.sort((a, b) => (a.score < b.score) ? 1 : -1)
        document.getElementById('id-highscores-list').innerHTML = '';
        if(storedScores !== null) {
            for(let i = 0; i < storedScores.length; i++) {
                let scoreList = document.createElement('li');
                scoreList.innerHTML = storedScores[i].name + ': ' + storedScores[i].score;
                scoreList.setAttribute('class', 'list-group-item');
                document.getElementById('id-highscores-list').appendChild(scoreList);
            }
        }
    }

    return {
        initialize : initialize,
        run : run
    };

}(MyGame.game, MyGame.score));