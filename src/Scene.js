

const Scene = function () {
    this._init.apply(this, arguments);
}

Scene.prototype._init = function (options) {
    this._framePosition = options.frame;
    this._convergenceLength = options.convergenceLength;
    this._sceneObjects = [];
};

/**
 * Add a new scene. Keeps scene objects sorted by Z index, from highest to lowest.
 */
Scene.prototype.addObject = function (sceneObj) {
    const z = sceneObj.getLocation().z;
    if (this._sceneObjects.every((existingObject, index) => {
        if (existingObject.getLocation().z < z) {
            this._sceneObjects.splice(index, 0, sceneObj);
            return false;
        }
        return true;
    }, this)) {
        this._sceneObjects.push(sceneObj);
    }
};

Scene.prototype.move = function(delta) {
    const dx = delta.x || 0;
    const dy = delta.y || 0;
    const dz = delta.z || 0;
    this._framePosition.x += dx;
    this._framePosition.y += dy;
    this._framePosition.z += dz;
};

Scene.prototype.render = function (containerEle) {
    while (containerEle.hasChildNodes()) {
      containerEle.removeChild(containerEle.lastChild);
    }
    this._sceneObjects.forEach((sceneObj) => {
        const pos = sceneObj.getLocation();
        const dz = pos.z - this._framePosition.z;
        if (dz < 0) {
            // Scene object is behind the frame, not visible.
            return;
        }

        // Just similar triangles. A line running straight (perp to the frame)
        // back from the "eye" to the plane in which the obj is in,
        // and another running from the eye out to some point in question on that plane.
        // Those are two legs of a right triangle. Where the latter leg (the hypotenuse)
        // intersects the frame, that's where that point is projected onto the plane by
        // the eye's perspective. That shorter piece of the hypotenuse, from the eye
        // to the place where the point is projected to, that's the hypotenuse of the
        // similar triangle.
        const scale = this._convergenceLength / (dz + this._convergenceLength);

        const dx = pos.x - this._framePosition.x;
        const dy = pos.y - this._framePosition.y;
        // TODO: Make sure at least part of the object is in the frame.

        const i = dx * scale;
        const j = dy * scale;

        const objContainer = document.createElement('div');
        sceneObj.getRenderable().render(objContainer, scale);
        objContainer.style.position = 'absolute';
        objContainer.style.left = `${i}px`;
        objContainer.style.bottom = `${j}px`;
        containerEle.appendChild(objContainer);

    }, this);
};

