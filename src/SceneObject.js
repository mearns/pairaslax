
const SceneObject = function () {}

SceneObject.prototype.getInitialState = function () {
    return {};
};

SceneObject.prototype.getDefaultProps = function () {
    return {
        renderable: null,
        location: {x: 0, y: 0}
    };
};

SceneObject.prototype.render = function () {
    throw new Error('Not Implemented');
};

const SceneObjectView = React.createClass(SceneObject.prototype)
