//------------------------------------------------------------------
//
// Creates a Centipede model based upon the passed in specification.
//
//------------------------------------------------------------------
MyGame.objects.Centipede = function(spec) {

    //------------------------------------------------------------------
    //
    // Move in the direction of the rotation.
    //
    //------------------------------------------------------------------
    function moveUp() {
        spec.center.y -= (spec.moveRate);
    }

    function moveDown() {
        spec.center.y += (spec.moveRate);
    }

    function moveLeft(elapsedTime) {
        spec.center.x -= (spec.moveRate);
    }

    function moveRight(elapsedTime) {
        spec.center.x += spec.moveRate;
}

    function rotateLeft() {
        spec.rotation -= spec.rotateRate;
    }

    function rotateRight() {
        spec.rotation += spec.rotateRate;
    }

    let api = {
        get size() { return spec.size; },
        get center() { return spec.center; },
        get rotation() { return spec.rotation; },
        set rotation(value) { spec.rotation = value; },
        get fireRate() { return spec.fireRate; },
        get type() { return spec.type; },
        get direction() { return spec.direction; },
        set direction(value) { spec.direction = value; },
        get oldDirection() { return spec.oldDirection; },
        set oldDirection(value) { spec.oldDirection = value; },
        moveUp: moveUp,
        moveDown: moveDown,
        moveLeft: moveLeft,
        moveRight: moveRight,
        rotateLeft: rotateLeft,
        rotateRight: rotateRight
    };

    return api;
};
