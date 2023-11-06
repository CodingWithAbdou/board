

document.getElementById("select").addEventListener("click", function () {
    canvas.isDrawingMode = false;
    isSquareDrawn = true;
    temporaryDrawingEnabled = false;
    isErasing = false;
    if (isLocked) {
        canvas.selection = false;
        objectSelectabilty(false);
    } else {
        canvas.selection = true;
        objectSelectabilty(true);
    }
    eraseEnabled = false;
    addingSingleArrowLineBtnClicked = false;
    addingLineBtnClicked = false;
    canvas.renderAll(); // Redraw the canvas
}); 


penciltime.addEventListener("click", function () {
    temporaryDrawingEnabled = !temporaryDrawingEnabled;
    if (temporaryDrawingEnabled) {
        canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
        canvas.isDrawingMode = true;
        isErasing = false;
        isSquareDrawn = true;
        eraseEnabled = false;
    } else {
        canvas.isDrawingMode = false;
    }
    // Set drawing properties
    canvas.freeDrawingBrush.width = parseInt(brushSize.value, 10);
    canvas.freeDrawingBrush.color = color;

    canvas.on("path:created", function (event) {
        // The event object contains the drawn path
        const path = event.path;
        if (temporaryDrawingEnabled) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(clearCanvas(path), 2000);
        }
    });
    let timeoutId;
});

document.getElementById("pencil").addEventListener("click", function () {
    temporaryDrawingEnabled = false;
    canvas.isDrawingMode = true;
    isErasing = false; // Always switch to drawing mode when clicking the "Pen" button
    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
    isSquareDrawn = true;
    eraseEnabled = false;
    addingSingleArrowLineBtnClicked = false;
    addingLineBtnClicked = false;
    canvas.renderAll(); // Redraw the canvas
});

text.addEventListener("click", function () {
    temporaryDrawingEnabled = false;
    selectedShap = 5;
    isSquareDrawn = false;
    eraseEnabled = false;
    countIndex++;
    drawSquare(5);
});
let addedImage = null;

document.getElementById("imageUploadInput").addEventListener("change", function (event) {
    canvas.isDrawingMode = false;
    isSquareDrawn = true;
    eraseEnabled = false;
    isErasing = false;
    temporaryDrawingEnabled = false;
    var file = event.target.files[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
            // قم بإنشاء صورة Fabric.js وأضفها إلى الكانفاس
            fabric.Image.fromURL(e.target.result, function (img) {
                addedImage = img;

                img.set({
                    left: 100, // تعيين موقع الصورة على الكانفاس
                    top: 100,
                    scaleX: 0.5, // تعيين مقياس الصورة
                    scaleY: 0.5,
                });
                canvas.add(img);
            });
        };
        reader.readAsDataURL(file);
    }
});

// // Function to add an image
// document.getElementById('imageInput').addEventListener('change', function (e) {
//     const file = e.target.files[0];
//     if (file) {
//         const reader = new FileReader();
//         reader.onload = function (event) {
//             fabric.Image.fromURL(event.target.result, function (img) {
//                 addedImage = img;
//                 canvas.add(img);
//                 canvas.renderAll();
//             });
//         };
//         reader.readAsDataURL(file);
//     }
// });

let cropRect = null;

// Function to enable cropping mode
document.getElementById('scissors').addEventListener('click', () => {
    if (addedImage) {
        if (cropRect) {
            canvas.remove(cropRect);
            cropRect = null;
        }
        cropRect = new fabric.Rect({
            left: 100,
            top: 100,
            width: 50,
            height: 50,
            fill: 'rgba(0, 0, 0, 0)',
            stroke: 'red',
            // selectable: false,
            transparentCorners: false, // Allows for easier resizing
            hasControls: true, // Show resize handles
            lockUniScaling: true, // Maintain aspect ratio during resizing
        });

        canvas.add(cropRect);
        canvas.renderAll();
    }
});

canvas.on('mouse:up', () => {
    // if (addedImage && cropRect) {
    //     const cropWidth = document.getElementById('cropWidth').value;
    //     const cropHeight = document.getElementById('cropHeight').value;

    //     if (cropWidth && cropHeight) {
    //         cropRect.set({
    //             width: parseInt(cropWidth),
    //             height: parseInt(cropHeight),
    //         });
    //     }

    //     addedImage.clipPath = cropRect;
    //     canvas.renderAll();
    // }
    if (addedImage && cropRect) {
        // cropRect.set({
        //     width: 400,
        //     height: 400,
        // });

        addedImage.clipPath = cropRect;
        canvas.renderAll();
        canvas.remove(cropRect);
        cropRect = null;
    }

});



lock.addEventListener("click", function () {
    isLocked = !isLocked;
    lockimage.src = isLocked ? "images/lock.png" : "images/unlock.png";

    canvas.forEachObject(function (object) {
        object.selectable = !isLocked;
        if (isLocked) {
            canvas.selection = false;
            objectSelectabilty(false);
        } else {
            canvas.selection = true;
            objectSelectabilty(true);
        }
        object.evented = !isLocked;
    });

    canvas.renderAll();
});


document.getElementById("image").addEventListener("click", function () {
    // افتح مربع حوار لاختيار ملف الصورة
    document.getElementById("imageUploadInput").click();
});


eraseButton.addEventListener("click", toggleEraseMode);

eraserButton.addEventListener("click", function () {
    isErasing = !isErasing;
    canvas.selectable = false;
    if (isErasing) {
        canvas.selection = false;
        canvas.isDrawingMode = true;
        var eraser = new fabric.EraserBrush(canvas);
        canvas.freeDrawingBrush = eraser;
        eraser.color = canvas.backgroundColor;
        eraser.width = 40;
        // Disable object selection while erasing
    } else {
        canvas.selection = true; // Re-enable object selection when not erasing
    }
});

document.getElementById("addUndo").addEventListener("click", undo);
document.getElementById("addRedo").addEventListener("click", redo);
