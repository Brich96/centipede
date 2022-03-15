//------------------------------------------------------------------
//
// Creates a Bird model based upon the passed in specification.
//
//------------------------------------------------------------------
MyGame.objects.Bolt = function(spec) {

    //------------------------------------------------------------------
    //
    // Move in the direction of the rotation.
    //
    //------------------------------------------------------------------
    function moveUp(elapsedTime) {
        spec.center.y -= (spec.moveRate);
    }

    let api = {
        get size() { return spec.size; },
        get center() { return spec.center; },
        get rotation() { return spec.rotation; },
        get specY() { return spec.center.y; },
        moveUp: moveUp,
    };

    return api;
};
