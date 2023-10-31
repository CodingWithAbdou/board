canvas.on("mouse:down", function (event) {
    isMouseDown = true;
});

canvas.on("mouse:down", function (event) {
    isMouseDown = true;
});

canvas.on("mouse:down", function (event) {
    if (!isLocked && !isSquareDrawn) {
        // تحقق من أن السبورة غير مقفلة وأن المربع لم يُرَسَم بالفعل
        isDrawing = true;
        startPosition = canvas.getPointer(event.e);
    }
    // canvas.remove(listSquare[countIndex]);
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
