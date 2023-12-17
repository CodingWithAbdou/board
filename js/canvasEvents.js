canvas.on("mouse:down", function (event) {
});

canvas.on("mouse:down", function (event) {
    if(!overlays) return
    overlays.forEach((overlay) => { overlay.classList.remove("show")  });
});


let isMouseMoving = false;
let mouseMoveTimer;


canvas.on("mouse:move", function (event) {
    if(document.querySelector('.header')) {
        document.querySelector('.header').classList.add('hide_header')
    } 
    if(event.absolutePointer.y < 50) {
        setTimeout(() => {
            document.querySelector('.header').classList.remove('hide_header')
        }, 300);

    }
    // isMouseMoving = true;
    // clearTimeout(mouseMoveTimer);
    // mouseMoveTimer = setTimeout(function () {
    //     if (isMouseMoving) {
    //         document.querySelector('.header').classList.remove('hide_header')
    //         isMouseMoving = false;
    //     }
    // }, 500); // Adjust the timeout duration as needed

});


canvas.on("mouse:up", function () {
    isDrawing = false;
    if (listShape[countIndex]) {
        isSquareDrawn = true;
    }
});



canvas.on("object:added", function () {
    if (!isRedoing) {
        h = [];
    }
    isRedoing = false;
});


var zoomFactor = 1.2; // Adjust this value to control the zoom sensitivity
var isZooming = false;
var lastZoomX, lastZoomY;
var ctrlPressed = false;

canvas.on('mouse:wheel', function (event) {
    if (event.e.ctrlKey) {
        var delta = event.e.deltaY;
        var zoom = canvas.getZoom();
        var zoomPoint = new fabric.Point(event.e.clientX, event.e.clientY);
        if (delta > 0) {
            zoom /= zoomFactor;
        } else {
            zoom *= zoomFactor;
        }
        zoom = Math.min(Math.max(zoom, 0.5), 3); // Adjust the min and max zoom levels as needed
        canvas.zoomToPoint(zoomPoint, zoom);
        canvas.requestRenderAll();
        event.e.preventDefault();
        event.e.stopPropagation();
    }
});

canvas.on('mouse:move', function (event) {
    if (isZooming) {
        var zoomPoint = new fabric.Point(lastZoomX, lastZoomY);
        canvas.zoomToPoint(zoomPoint, canvas.getZoom());
        canvas.requestRenderAll();
    }
});

// Add event listeners for mouse down and up to track zooming state
canvas.on('mouse:down', function (event) {
    if (event.e.ctrlKey) {
        isZooming = true;
        lastZoomX = event.e.clientX;
        lastZoomY = event.e.clientY;
    }
});

canvas.on('mouse:up', function () {
    isZooming = false;
});
