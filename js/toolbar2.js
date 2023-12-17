let zoomLevel = 1.0; // Initial zoom level
 valueAdded = 0;
 let lastMouseCoords = { x: 0, y: 0 };


function zoomIn() {
    zoom(0.1, lastMouseCoords);
}

function zoomOut() {
    zoom(-0.1, lastMouseCoords);
}

function zoom(factor, croods) {
    const canvasZoom = canvas.getZoom();
    const zoomPoint = new fabric.Point(croods.x, croods.y);
    console.log('x' , croods.x , "y" ,croods.y)
    // Adjust the zoom factor
    zoomLevel += factor;
    if (zoomLevel < 0.1) {
        zoomLevel = 0.1;
    }

    // Calculate new zoom level and adjust the canvas
    const newZoom = canvasZoom + factor;
    canvas.zoomToPoint(zoomPoint, newZoom);
    canvas.renderAll();
    valueAdded += 30 * factor;
}

zoomInButton.addEventListener("click", function (event) {
    var element = canvas.getActiveObject();
    var transform = canvas.viewportTransform;

    // Get the element's coordinates in untransformed space
    var untransformedX = element.left;
    var untransformedY = element.top;

    // Apply the canvas transformation to get the transformed coordinates
    var transformedX = untransformedX * transform[0] + untransformedY * transform[2] + transform[4];
    var transformedY = untransformedX * transform[1] + untransformedY * transform[3] + transform[5];

    console.log(transform)
    if (element) {
        var left = transformedX + element.width /2;
        var top = transformedY + element.height /2;
        lastMouseCoords = {x:left , y:top}       
        console.log(lastMouseCoords)
    }else {
        lastMouseCoords = fabric.util.getPointer(event);
    }

    zoomIn();

});

zoomOutButton.addEventListener("click", function (event) {
    var element = canvas.getActiveObject();
    var transform = canvas.viewportTransform;

    // Get the element's coordinates in untransformed space
    var untransformedX = element.left;
    var untransformedY = element.top;

    // Apply the canvas transformation to get the transformed coordinates
    var transformedX = untransformedX * transform[0] + untransformedY * transform[2] + transform[4];
    var transformedY = untransformedX * transform[1] + untransformedY * transform[3] + transform[5];

    console.log(transform)
    if (element) {
        var left = transformedX + element.width /2;
        var top = transformedY + element.height /2;
        lastMouseCoords = {x:left , y:top}       
        console.log(lastMouseCoords)
    }else {
        lastMouseCoords = fabric.util.getPointer(event);
    }
    zoomOut();
});

// Assuming you have a mouse click event listener on your canvas
canvas.on('mouse:down', function (event) {
    if (event.e.ctrlKey) {
        zoom(event.e.deltaY > 0 ? -0.1 : 0.1, event.e);
    }
});

