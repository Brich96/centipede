MyGame.screens['game-play'] = (function(game, input, renderer, objects, graphics) {
    'use strict';

    let myKeyboard = input.Keyboard();
    
    let lastTimeStamp = performance.now();
    let cancelNextRequest = true;

    function initialize() {
        myKeyboard.register('Escape', function() {
            cancelNextRequest = true;
            game.showScreen('main-menu');
        });

        myKeyboard.register('w', shooter.moveUp);
        myKeyboard.register('s', shooter.moveDown);
        myKeyboard.register('a', shooter.moveLeft);
        myKeyboard.register('d', shooter.moveRight);
    }

    function run() {
        cancelNextRequest = false;
        requestAnimationFrame(gameLoop);
    }

    function processInput(elapsedTime) {
        myKeyboard.update(elapsedTime);
    }

    // GAME LOOP STUFF ----------------------
    let shooter = objects.Shooter({
        size: { x: 70, y: 50, },       // Size in pixels
        center: { x: 250, y: 250 },
        rotation: 0,
        moveRate: 200 / 1000,         // Pixels per second
        rotateRate: Math.PI / 1000    // Radians per second
    });
 
    let shooterRender = renderer.AnimatedModel({
        spriteSheet: 'sprites/singlesquare.png',
        spriteCount: 10,
        spriteTime: [0, 750, 0, 0, 0, 0, 0, 0, 0, 0, ],   // ms per frame
    }, graphics);

    function update(elapsedTime) {
        shooterRender.update(elapsedTime);
    }

    function render() {
        graphics.clear();

        shooterRender.render(shooter);
    }

    function gameLoop(time) {
        let elapsedTime = time - lastTimeStamp;
        lastTimeStamp = time;
        processInput(elapsedTime);
        update(elapsedTime);
        render();

        if (!cancelNextRequest) {
            requestAnimationFrame(gameLoop);
        }
    }

    return {
        initialize: initialize,
        run: run
    }

}(MyGame.game, MyGame.input, MyGame.render, MyGame.objects, MyGame.graphics));