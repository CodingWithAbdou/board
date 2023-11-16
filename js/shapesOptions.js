drawStarButton.addEventListener("click", function () {
    isDrawing = true

    canvas.isDrawingMode = false;
    selectedShap = 4;
    isSquareDrawn = false;
    eraseEnabled = false;
    temporaryDrawingEnabled = false;
    countIndex++;
    drawSquare(4);
});

drawTriangleButton.addEventListener("click", function () {
    isDrawing = true

    canvas.isDrawingMode = false;
    selectedShap = 3;
    isSquareDrawn = false;
    temporaryDrawingEnabled = false;
    eraseEnabled = false;
    countIndex++;
    drawSquare(3);
});

drawCircleButton.addEventListener("click", function () {
    isDrawing = true

    canvas.isDrawingMode = false;
    selectedShap = 2;
    isSquareDrawn = false;
    temporaryDrawingEnabled = false;
    eraseEnabled = false;
    countIndex++;
    drawSquare(2);
});

drawSquareButton.addEventListener("click", function () {
    isDrawing = true

    canvas.isDrawingMode = false;
    selectedShap = 1;
    isSquareDrawn = false;
    temporaryDrawingEnabled = false;
    eraseEnabled = false;
    countIndex++;
    drawSquare(1);
});


addingLineBtn.addEventListener("click", activateAddingLine);

addingSingleArrowLineBtn.addEventListener("click",activateAddingSingleArrowLine);

addingDoubleArrowLineBtn.addEventListener("click",activateAddingDoubleArrowLine);
