
const Renderable = function () {}

Renderable.prototype.getInitialState = function () {
    return {};
};

Renderable.prototype.getDefaultProps = function () {
    return {
        scale: 1
    };
};

/**
 * Return the dimensions of this object in the form {w, h}
 * where w is the width, and h is the height.
 */
Renderable.prototype.getDimensions = function () {
    throw new Error('Not Implemented');
};

Renderable.prototype.render = function () {
    throw new Error('Not Implemented');
};

const RenderableView = React.createClass(Renderable.prototype);
