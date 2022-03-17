//------------------------------------------------------------------
//
// Creates a Shooter model based upon the passed in specification.
//
//------------------------------------------------------------------
MyGame.objects.Shooter = function(spec) {

    function moveUp(elapsedTime) {
        spec.center.y -= (spec.moveRate * elapsedTime);
        if(checkForShooterMushroomCollision()) {
            spec.center.y += (spec.moveRate * elapsedTime);
        }
    }

    function moveDown(elapsedTime) {
        spec.center.y += (spec.moveRate * elapsedTime);
        if(checkForShooterMushroomCollision()) {      
            spec.center.y -= (spec.moveRate * elapsedTime);
        }
    }

    function moveLeft(elapsedTime) {
        spec.center.x -= (spec.moveRate * elapsedTime);
        if(checkForShooterMushroomCollision()) {
            spec.center.x += (spec.moveRate * elapsedTime);
        }
    }

    function moveRight(elapsedTime) {
        spec.center.x += spec.moveRate * elapsedTime;
        if(checkForShooterMushroomCollision()) {
            spec.center.x -= (spec.moveRate * elapsedTime);
        }
    }

    // function rotateLeft(elapsedTime) {
    //     spec.rotation -= spec.rotateRate * (elapsedTime);
    // }

    // function rotateRight(elapsedTime) {
    //     spec.rotation += spec.rotateRate * (elapsedTime);
    // }

    function checkForShooterMushroomCollision() {
        for (let i = 0; i < spec.mushrooms.length; i++) {
            if(checkForCollision(spec, spec.mushrooms[i])) {
                return true;
            }
        }
        return false;
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

    let api = {
        get size() { return spec.size; },
        get center() { return spec.center; },
        set center(center) { spec.center = center; },
        get rotation() { return spec.rotation; },
        get fireRate() { return spec.fireRate; },
        get mushrooms() { return spec.mushrooms; },
        set mushrooms(mushrooms) { spec.mushrooms = mushrooms; },
        moveUp: moveUp,
        moveDown: moveDown,
        moveLeft: moveLeft,
        moveRight: moveRight
        // rotateLeft: rotateLeft,
        // rotateRight: rotateRight
    };

    return api;
};
