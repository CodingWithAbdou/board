canvas.on("mouse:down", function (event) {
});

canvas.on("mouse:down", function (event) {
    overlays.forEach((overlay) => { overlay.classList.remove("show")  });

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
