//------------------------------------------------------------------
//
// Creates a Bolt model based upon the passed in specification.
//
//------------------------------------------------------------------
MyGame.objects.Flea = function(spec) {


    function moveDown(elapsedTime) {
        spec.center.y += (spec.moveRate * elapsedTime);
    }

    let api = {
        get size() { return spec.size; },
        get center() { return spec.center; },
        get rotation() { return spec.rotation; },
        get specY() { return spec.center.y; },
        get spawnRate() { return spec.spawnRate; },
        moveDown: moveDown,
    };

    return api;
};
