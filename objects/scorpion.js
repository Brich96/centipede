//------------------------------------------------------------------
//
// Creates a Bolt model based upon the passed in specification.
//
//------------------------------------------------------------------
MyGame.objects.Scorpion = function(spec) {


    function moveRight(elapsedTime) {
        spec.center.x += spec.moveRate * elapsedTime;
    }

    let api = {
        get size() { return spec.size; },
        get center() { return spec.center; },
        get rotation() { return spec.rotation; },
        get specX() { return spec.center.x; },
        get spawnRate() { return spec.spawnRate; },
        moveRight: moveRight,
    };

    return api;
};
