MyGame.screens['game-play'] = (function(game, input, renderer, objects, graphics, settings) {
    'use strict';

    let myKeyboard = input.Keyboard();
    
    let lastTimeStamp = performance.now();
    let cancelNextRequest = true;
    let timeSinceLastFire = 10000;

    function initialize() {
        myKeyboard.register('Escape', function() {
            cancelNextRequest = true;
            game.showScreen('main-menu');
        });

        myKeyboard.register('w', shooter.moveUp);
        myKeyboard.register('s', shooter.moveDown);
        myKeyboard.register('a', shooter.moveLeft);
        myKeyboard.register('d', shooter.moveRight);

        myKeyboard.register(' ', makeBolt);

    }

    function run() {
        myKeyboard.register(settings[0], shooter.moveUp);
        myKeyboard.register(settings[1], shooter.moveDown);
        myKeyboard.register(settings[2], shooter.moveLeft);
        myKeyboard.register(settings[3], shooter.moveRight);
        myKeyboard.register(settings[4], makeBolt);

        cancelNextRequest = false;
        requestAnimationFrame(gameLoop);
    }

    function makeBolt() {
        if (timeSinceLastFire > shooter.fireRate) {
            let bolt = objects.Bolt({
                size: { x: 6, y: 14, },       // Size in pixels
                center: { x: shooter.center.x, y: shooter.center.y, },
                rotation: 0,
                moveRate: 5000 / 1000,         // Pixels per second
                rotateRate: Math.PI / 1000
            });
            bullets.push(bolt);
            timeSinceLastFire = 0;
        }
    }

    function processInput(elapsedTime) {
        myKeyboard.update(elapsedTime);
    }

    // GAME LOOP STUFF ----------------------

    let bullets = [];
    // Bullet
    let boltRender = renderer.AnimatedModel({
        spriteSheet: 'sprites/bolt.png',
        spriteCount: 1,
        spriteTime: [25],   // ms per frame
    }, graphics);


    // Shooter
    let shooter = objects.Shooter({
        size: { x: 32, y: 16, },       // Size in pixels
        center: { x: 250, y: 250 },
        rotation: 0,
        fireRate: 200,
        moveRate: 200 / 1000,         // Pixels per second
        rotateRate: Math.PI / 1000    // Radians per second
    });
 
    let shooterRender = renderer.AnimatedModel({
        spriteSheet: 'sprites/shooter.png',
        spriteCount: 1,
        spriteTime: [25],   // ms per frame
    }, graphics);
    
    // centipede ----------------------------------------------
    let centipedeHead = objects.Shooter({
        size: { x: 22, y: 20, },       // Size in pixels
        center: { x: 100, y: 100 },
        rotation: 0,
        moveRate: 200 / 1000,         // Pixels per second
        rotateRate: Math.PI / 1000    // Radians per second
    });

    let centipede = objects.Shooter({
        size: { x: 22, y: 20, },       // Size in pixels
        center: { x: 120, y: 100 },
        rotation: 0,
        moveRate: 200 / 1000,         // Pixels per second
        rotateRate: Math.PI / 1000    // Radians per second
    });
 
    let centipedeHeadRender = renderer.AnimatedModel({
        spriteSheet: 'sprites/head.png',
        spriteCount: 8,
        spriteTime: [25, 25, 25, 25, 25, 25, 25, 25],   // ms per frame
    }, graphics);
 
    let centipedeBodyRender = renderer.AnimatedModel({
        spriteSheet: 'sprites/body.png',
        spriteCount: 8,
        spriteTime: [25, 25, 25, 25, 25, 25, 25, 25],   // ms per frame
    }, graphics);

    // UPDATE STUFF ----------------------------------------------

    function update(elapsedTime) {
        shooterRender.update(elapsedTime);
        centipedeHeadRender.update(elapsedTime);
        centipedeBodyRender.update(elapsedTime);

        timeSinceLastFire += elapsedTime;

        for (let i = 0; i < bullets.length; i++) {
            if(bullets[i].center.y <= 0) {
                bullets.splice(i, 1);
            } else{
                bullets[i].moveUp(elapsedTime);
            }
        }
    }

    // RENDER STUFF -----------------------------------------

    function render() {
        graphics.clear();

        shooterRender.render(shooter);
        centipedeHeadRender.render(centipedeHead);
        centipedeBodyRender.render(centipede);



        for (let i = 0; i < bullets.length; i++) {
            boltRender.render(bullets[i]);
        }

    }

    // GAME LOOP -------------------------------------------------

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

}(MyGame.game, MyGame.input, MyGame.render, MyGame.objects, MyGame.graphics, MyGame.settings));