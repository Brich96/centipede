// --------------------------------------------------------------
//
// Renders an animated model based on a spritesheet.
//
// --------------------------------------------------------------
MyGame.render.AnimatedModelStatic = function(spec, graphics) {
    'use strict';

    let animationTime = 0;
    let subImageIndex = 0;
    let subTextureWidth = 0;
    let isReady = false;  // Can't render until the texture is loaded
    let images = []
    
    for (let i = 0; i < spec.spriteSheet.length; i++) {
        let image = new Image();
        image.onload = function() {
        
            isReady = true;
            subTextureWidth = image.width;
        }
        image.src = spec.spriteSheet[i];
        images.push(image);
    }
    //------------------------------------------------------------------
    //
    // Update the state of the animation
    //
    //------------------------------------------------------------------
    function update(elapsedTime) {
        animationTime += elapsedTime;
        //
        // Check to see if we should update the animation frame
        if (animationTime >= spec.spriteTime[subImageIndex]) {
            //
            // When switching sprites, keep the leftover time because
            // it needs to be accounted for the next sprite animation frame.
            animationTime -= spec.spriteTime[subImageIndex];
            subImageIndex += 1;
            //
            // Wrap around from the last back to the first sprite as needed
            subImageIndex = subImageIndex % spec.spriteCount;
        }
    }

    //------------------------------------------------------------------
    //
    // Render the specific sub-texture animation frame
    //
    //------------------------------------------------------------------
    function render(model) {
        if (isReady) {
            graphics.drawSubTexture(images[model.state], subImageIndex, subTextureWidth, model.center, model.rotation, model.size);
        }
    }

    let api = {
        set spriteSheet(newSpriteSheet) { spec.spriteSheet = newSpriteSheet; },
        update: update,
        render: render
    };

    return api;
};
