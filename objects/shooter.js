//------------------------------------------------------------------
//
// Creates a Bird model based upon the passed in specification.
//
//------------------------------------------------------------------
MyGame.objects.Shooter = function(spec) {

    //------------------------------------------------------------------
    //
    // Move in the direction of the rotation.
    //
    //------------------------------------------------------------------
    function moveUp(elapsedTime) {
        spec.center.y -= (spec.moveRate * elapsedTime);
    }

    function moveDown(elapsedTime) {
        spec.center.y += (spec.moveRate * elapsedTime);
    }

    function moveLeft(elapsedTime) {
        spec.center.x -= (spec.moveRate * elapsedTime);
    }

    function moveRight(elapsedTime) {
        spec.center.x += spec.moveRate * elapsedTime;
}

    function rotateLeft(elapsedTime) {
        spec.rotation -= spec.rotateRate * (elapsedTime);
    }

    function rotateRight(elapsedTime) {
        spec.rotation += spec.rotateRate * (elapsedTime);
    }

    let api = {
        get size() { return spec.size; },
        get center() { return spec.center; },
        get rotation() { return spec.rotation; },
        moveUp: moveUp,
        moveDown: moveDown,
        moveLeft: moveLeft,
        moveRight: moveRight,
        rotateLeft: rotateLeft,
        rotateRight: rotateRight
    };

    return api;
};
