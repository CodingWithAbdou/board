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

function drawSquare() {
    canvas.on("mouse:move", function (event) {
        if (isDrawing && !isLocked && !isSquareDrawn) {
            // تحقق من أن السبورة غير مقفلة وأن المربع لم يُرَسَم بالفعل
            var currentPosition = canvas.getPointer(event.e);
            var width = currentPosition.x - startPosition.x;
            var height = currentPosition.y - startPosition.y;
            switch (selectedShap) {
                case 1:
                    if (!listShape[countIndex]) {
                        listShape[countIndex] = new fabric.Rect({
                            left: startPosition.x,
                            top: startPosition.y,
                            width: 200,
                            height: 200,
                            fill: color,
                        });
                        canvas.add(listShape[countIndex]);
                    } else {
                        listShape[countIndex].set({ width: 200, height: 200 });
                        canvas.renderAll();
                        console.log(countIndex + "test 2");
                    }
                    break;
                case 2:
                    if (!listShape[countIndex]) {
                        listShape[countIndex] = new fabric.Circle({
                            left: startPosition.x,
                            top: startPosition.y,
                            radius: height / 2,
                            fill: color,
                        });
                        canvas.add(listShape[countIndex]);
                    } else {
                        listShape[countIndex].set({ radius: height / 2 });
                        canvas.renderAll();
                        console.log(countIndex + "test 2");
                    }
                    break;
                case 3:
                    if (!listShape[countIndex]) {
                        listShape[countIndex] = new fabric.Triangle({
                            left: startPosition.x,
                            top: startPosition.y,
                            width: 200,
                            height: 300,
                            fill: color,
                        });
                        canvas.add(listShape[countIndex]);
                    } else {
                        listShape[countIndex].set({ width: 200, height: 300 });
                        canvas.renderAll();
                        console.log(countIndex + "test 2");
                    }
                    break;
                case 4:
                    if (!listShape[countIndex]) {
                        var starPoints = [
                            { x: 100, y: 10 }, // Top point
                            { x: 125, y: 60 }, // Upper-right point
                            { x: 200, y: 70 }, // Right point
                            { x: 140, y: 115 }, // Lower-right point
                            { x: 160, y: 190 }, // Bottom point
                            { x: 100, y: 150 }, // Bottom-left point
                            { x: 40, y: 190 }, // Lower-left point
                            { x: 60, y: 115 }, // Lower-right point
                            { x: 0, y: 70 }, // Left point
                            { x: 75, y: 60 }, // Upper-left point
                        ];
                        listShape[countIndex] = new fabric.Polygon(starPoints, {
                            left: startPosition.x,
                            top: startPosition.y,
                            fill: color,
                        });
                        canvas.add(listShape[countIndex]);
                    } else {
                        listShape[countIndex].set({ fill: color });
                        canvas.renderAll();
                        console.log(countIndex + "test 2");
                    }
                    break;
                case 5:
                    if (!listShape[countIndex]) {
                        listShape[countIndex] = new fabric.Textbox("", {
                            left: startPosition.x,
                            top: startPosition.y,
                            fontSize: 20,
                            fontFamily: "Arial",
                            fill: color,
                        });
                        canvas.add(listShape[countIndex]);
                    } else {
                        listShape[countIndex].set({ text: "اكتب هنا" });
                        canvas.renderAll();
                        console.log(countIndex + "textt 2");
                    }
                    break;
            }
        }
    });
}

canvas.on("object:added", function () {
    if (!isRedoing) {
        h = [];
    }
    isRedoing = false;
});
