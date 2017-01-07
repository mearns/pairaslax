
function load () {
    const frameContainerElem = document.getElementById('frame');
    console.log(frameContainerElem);

    const scene = new Scene({
        frame: {
            x: 0,
            y: 0,
            z: 0
        },
        convergenceLength: 1
    });

    const Square = function () {
        Renderable.apply(this, arguments);
    }
    Square.prototype = Object.create(Renderable.prototype);
    Square.prototype.getDimensions = function () {
        return {w: 100, h: 100};
    };
    Square.prototype.render = function (containerEle, scale) {
        const dim = this.getDimensions();
        const ele = document.createElement('div');
        ele.style.backgroundColor = this.getBackgroundColor();
        ele.style.width = `${dim.w*scale}px`;
        ele.style.height = `${dim.h*scale}px`;
        ele.appendChild(document.createTextNode('Hello'));
        ele.style.fontSize = `${parseInt(40*scale)}px`;
        containerEle.appendChild(ele);
    };
    Square.prototype.getBackgroundColor = function () {
        throw new Error('Not Implemented');
    };

    const RedSquare = function () {
        Square.apply(this, arguments);
    }
    RedSquare.prototype = Object.create(Square.prototype);
    RedSquare.prototype.getBackgroundColor = function () {
        return 'red';
    }

    const BlueSquare = function () {
        Square.apply(this, arguments);
    }
    BlueSquare.prototype = Object.create(Square.prototype);
    BlueSquare.prototype.getBackgroundColor = function () {
        return 'blue';
    }

    scene.addObject(new SceneObject({
        renderable: new RedSquare(),
        location: {
            x: 100,
            y: 100,
            z: 0
        },
    }));

    scene.addObject(new SceneObject({
        renderable: new BlueSquare(),
        location: {
            x: 500,
            y: 100,
            z: 1
        },
    }));

    scene.render(frameContainerElem);

    const step = function (ttl) {
        scene.move({x: -4, y: 1.5, z: 0});
        scene.render(frameContainerElem);
        console.log(ttl);
        if (ttl > 0) {
            setTimeout(() => step(ttl-1), 33);
        }
    };

    step(100);
}
