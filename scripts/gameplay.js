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

    // Shooter
    let shooter = objects.Shooter({
        size: { x: 32, y: 16, },       // Size in pixels
        center: { x: 250, y: 250 },
        rotation: 0,
        moveRate: 200 / 1000,         // Pixels per second
        rotateRate: Math.PI / 1000    // Radians per second
    });
 
    let shooterRender = renderer.AnimatedModel({
        spriteSheet: 'sprites/shooter.png',
        spriteCount: 1,
        spriteTime: [25],   // ms per frame
    }, graphics);
    
    // centipede
    let centipedeHead = objects.Shooter({
        size: { x: 32, y: 16, },       // Size in pixels
        center: { x: 100, y: 100 },
        rotation: 0,
        moveRate: 200 / 1000,         // Pixels per second
        rotateRate: Math.PI / 1000    // Radians per second
    });

    let centipede = objects.Shooter({
        size: { x: 32, y: 16, },       // Size in pixels
        center: { x: 130, y: 100 },
        rotation: 0,
        moveRate: 200 / 1000,         // Pixels per second
        rotateRate: Math.PI / 1000    // Radians per second
    });
 
    let centipedeHeadRender = renderer.AnimatedModel({
        spriteSheet: 'sprites/head.png',
        spriteCount: 8,
        spriteTime: [50, 50, 50, 50, 50, 50, 50, 50],   // ms per frame
    }, graphics);


 
    let centipedeBodyRender = renderer.AnimatedModel({
        spriteSheet: 'sprites/body.png',
        spriteCount: 8,
        spriteTime: [50, 50, 50, 50, 50, 50, 50, 50],   // ms per frame
    }, graphics);

    function update(elapsedTime) {
        shooterRender.update(elapsedTime);
        centipedeHeadRender.update(elapsedTime);
        centipedeBodyRender.update(elapsedTime);
    }

    function render() {
        graphics.clear();

        shooterRender.render(shooter);
        centipedeHeadRender.render(centipedeHead);
        centipedeBodyRender.render(centipede);

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