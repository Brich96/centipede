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

        myKeyboard.register('ArrowUp', shooter.moveUp);
        myKeyboard.register('ArrowDown', shooter.moveDown);
        myKeyboard.register('ArrowLeft', shooter.moveLeft);
        myKeyboard.register('ArrowRight', shooter.moveRight);
        myKeyboard.register(' ', makeBolt);

    }

    function run() {
        settings = JSON.parse(window.localStorage.getItem('settings'));
        if(settings != null) {
        myKeyboard.register(settings[0], shooter.moveUp);
        myKeyboard.register(settings[1], shooter.moveDown);
        myKeyboard.register(settings[2], shooter.moveLeft);
        myKeyboard.register(settings[3], shooter.moveRight);
        myKeyboard.register(settings[4], makeBolt);
        }

        bullets = [];
        centipedeBody = []
        // mushroomList = []

        let centipedeHead = objects.Centipede({
            type: 1,
            direction: 'Left',
            oldDirection: '',
            size: { x: 16, y: 16, },       // Size in pixels
            center: { x: graphics.canvasWidth + 10, y: 16 },
            rotation: 0,
            moveRate: 1500 / 1000,         // Pixels per second
            rotateRate: Math.PI / 1000    // Radians per second
        });
        centipedeBody.push(centipedeHead);

        for (let i = 1; i < 13; i++) {
            let centipede = objects.Centipede({
                type: 0,
                direction: 'Left',
                oldDirection: '',
                size: { x: 16, y: 16, },       // Size in pixels
                center: { x: (graphics.canvasWidth + 10) + (15 * i), y: 16 },
                rotation: 0,
                moveRate: 1500 / 1000,         // Pixels per second
                rotateRate: Math.PI / 1000    // Radians per second
            });
            centipedeBody.push(centipede);
        }

        while (mushroomList.length < 20) { // Stop only if 20 squares is added
            // var randomIndex = parseInt(20 * Math.random());
            let randomX = (parseInt(32 * Math.random()) * 16) + 8
            let randomY = (parseInt(32 * Math.random()) * 16) + 8

            let mush = objects.Mushroom({
                size: { x: 16, y: 16, },       // Size in pixels
                center: { x: randomX, y: randomY },
                state: 0
            });
            mushroomList.push(mush);
          }
        cancelNextRequest = false;
        requestAnimationFrame(gameLoop);
    }

    function makeBolt() {
        if (timeSinceLastFire > shooter.fireRate) {
            let bolt = objects.Bolt({
                size: { x: 2, y: 14, },       // Size in pixels
                center: { x: shooter.center.x, y: shooter.center.y - 7, },
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
    let centipedeBody = []
    let mushroomList = []
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
        fireRate: 250,
        moveRate: 200 / 1000,         // Pixels per second
        rotateRate: Math.PI / 1000,    // Radians per second
        mushrooms: mushroomList
    });
 
    let shooterRender = renderer.AnimatedModel({
        spriteSheet: 'sprites/shooter.png',
        spriteCount: 1,
        spriteTime: [25],   // ms per frame
    }, graphics);
    
    // centipede ----------------------------------------------
    let centipedeHeadRender = renderer.AnimatedModel({
        spriteSheet: 'sprites/headclear.png',
        spriteCount: 8,
        spriteTime: [25, 25, 25, 25, 25, 25, 25, 25],   // ms per frame
    }, graphics);
 
    let centipedeBodyRender = renderer.AnimatedModel({
        spriteSheet: 'sprites/bodyclear.png',
        spriteCount: 8,
        spriteTime: [25, 25, 25, 25, 25, 25, 25, 25],   // ms per frame
    }, graphics);

    // Mushroom ----------------------------------------------
    let mushroomRender = renderer.AnimatedModelStatic({
        spriteSheet: ['sprites/mush1.png', 'sprites/mush2.png', 'sprites/mush3.png', 'sprites/mush4.png'],
        spriteCount: 1,
        spriteTime: [25],   // ms per frame
    }, graphics);

    // UPDATE STUFF ----------------------------------------------
    let holdCenterY = 0;

    function update(elapsedTime) {

        shooterRender.update(elapsedTime);
        centipedeHeadRender.update(elapsedTime);
        centipedeBodyRender.update(elapsedTime);

        updateCentipede();
        updateBulletToMushroomCollision();
        checkForPlayerCentipedeCollision();

        timeSinceLastFire += elapsedTime;

        for (let i = 0; i < bullets.length; i++) {
            if(bullets[i].center.y <= 0) {
                bullets.splice(i, 1);
            } else{
                bullets[i].moveUp(elapsedTime);
            }
        }
    }

    function checkForPlayerCentipedeCollision() {
        for (let i = 0; i < centipedeBody.length; i++) {
            if (checkForCollision(shooter, centipedeBody[i])) {
                endGame();
            }
        }
    }

    function endGame() {
        cancelNextRequest = true;
        document.getElementById('canvas-game-div').innerHTML = "<h1>GAME OVER!</h1>";
    }

    function updateBulletToMushroomCollision() {
        for (let i = 0; i < mushroomList.length; i++) {
            for (let j = 0; j < bullets.length; j++) {
                if (checkForCollision(mushroomList[i], bullets[j])) {
                    if(mushroomList[i].state == 3) {
                        mushroomList.splice(i, 1);
                        bullets.splice(j, 1);
                        break;
                    } else {
                        mushroomList[i].state += 1;
                        bullets.splice(j, 1);
                        break;
                    }
                }
            }
        }
    }    

    function checkForCollision(object1, object2) {
        let object1X = object1.center.x - object1.size.x / 2;
        let object1Y = object1.center.y - object1.size.y / 2;
        let object2X = object2.center.x - object2.size.x / 2;
        let object2Y = object2.center.y - object2.size.y / 2;
        return (object1X <= object2X + object2.size.x &&
                object1X + object1.size.x >= object2X &&
                object1Y <= object2Y + object2.size.y &&
                object1Y + object1.size.y >= object2Y)
    }

    function checkCentipedeMushroomCollision(currentCentipede) {
        for (let j = 0; j < mushroomList.length; j++) {
            if (checkForCollision(currentCentipede, mushroomList[j])) {
                return true;
            }
        }
        return false;
    }

    function updateCentipede() {
        for (let i = 0; i < centipedeBody.length; i++) {
            if(centipedeBody[i].direction == 'Left') { 
                if(centipedeBody[i].center.x < 15) { // Needs to be updated to hitting anything, not just canvas walls
                    centipedeBody[i].oldDirection = 'Left';
                    centipedeBody[i].direction = 'Down';
                    holdCenterY = centipedeBody[i].center.y;
                } else {
                    centipedeBody[i].moveLeft();
                }
            } else if(centipedeBody[i].direction == 'Right') {
                if(centipedeBody[i].center.x > graphics.canvasWidth - 15) {  // Needs to be updated to hitting anything, not just canvas walls
                    centipedeBody[i].oldDirection = 'Right';
                    centipedeBody[i].direction = 'Down';
                    holdCenterY = centipedeBody[i].center.y;
                } else {
                    centipedeBody[i].moveRight();
                }
            } else if (centipedeBody[i].direction == 'Up') {
                centipedeBody[i].moveUp();
            } else if (centipedeBody[i].direction == 'Down') {
                if(Math.abs(holdCenterY - centipedeBody[i].center.y) > 17) {
                    if(centipedeBody[i].oldDirection == 'Left') {
                        centipedeBody[i].direction = 'Right';
                    } else if(centipedeBody[i].oldDirection == 'Right') {
                        centipedeBody[i].direction = 'Left';
                    }
                } else {
                    centipedeBody[i].moveDown();
                }
            }
        }
    }

    // RENDER STUFF -----------------------------------------

    function render() {
        graphics.clear();

        shooterRender.render(shooter);

        for (let i = 0; i < centipedeBody.length; i++) {
            if(centipedeBody[i].type == 1) {
                centipedeHeadRender.render(centipedeBody[i]);
            } else {
                centipedeBodyRender.render(centipedeBody[i]);
            }
        }

        for (let mushIndex = 0; mushIndex < mushroomList.length; mushIndex++) {
            mushroomRender.render(mushroomList[mushIndex]);
        }

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