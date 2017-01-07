
const Renderable = function () {
    this._init.apply(this, arguments);
}

Renderable.prototype._init = function() {};

/**
 * Return the dimensions of this object in the form {w, h}
 * where w is the width, and h is the height.
 */
Renderable.prototype.getDimensions = function () {
    throw new Error('Not Implemented');
};

/**
 * Render a representation of this object at the specified scale into
 * the specified containerEle.
 */
Renderable.prototype.render = function (contairEle, scale) {
    throw new Error('Not Implemented');
};
