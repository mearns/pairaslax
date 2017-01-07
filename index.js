
function projectPoint(targetPt, eyePt, retinaZCoord) {
    // ray V from eye at (e, f, g) to target pt at (x, y, z)
    // is V = (e, f, g) + t(x-e, y-f, z-g)
    const x = targetPt.x;
    const y = targetPt.y;
    const z = targetPt.z;
    const e = eyePt.x;
    const f = eyePt.y;
    const g = eyePt.z;

    // Find value of t to get from eye to the retina:
    const t = (retinaZCoord - g) / (g - z);

    // Now translate from the eye by that much
    return {
        x: e + t(x - e),
        y: f + t(y - f),
        z: retinaZCoord
    };
}

function renderScene(containerEle, eyePt, retinaZCoord, sceneObjects) {
    sceneObjects.map((sceneObj) => {
        const lowerLeft = sceneObj.getLowerLeft();
        const dimensions = sceneObj.getDimensions();
        const upperRight = {
            x: lowerLeft.x + dimensions.w,
            y: lowerLeft.y + dimensions.h,
            z: lowerLeft.z
        };

        const lowerLeftProjection = projectPoint(lowerLeft, eyePt, retinaZCoord);
        const upperRightProjection = projectPoint(upperRight, eyePt, retinaZCoord);
        const scale = (upperRightProjection.x - lowerLeftProjection.x) / dimensions.w;

        const translation = {
            dx: // XXX
        };
    });
}