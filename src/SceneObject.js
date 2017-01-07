
const SceneObject = function () {
    this._init.apply(this, arguments);
}

SceneObject.prototype._init = function (options) {
    this._renderable = options.renderable;
    this._location = options.location;
};

SceneObject.prototype.getRenderable = function () {
    return this._renderable;
};

SceneObject.prototype.getLocation = function () {
    return this._location;
};
