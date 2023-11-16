

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
    let color;
    document.querySelectorAll('#toolbarcolortime .color-circle').forEach(element => {
        if(element.classList.contains('border_2')) {
            color = element.style.backgroundColor
        }
    })
    updateBrushSizeTime();
    updateBrushColor(color);
    canvas.renderAll(); // Redraw the canvas
    let timeoutId;

    canvas.on("path:created", function (event) {
        // The event object contains the drawn path
        const path = event.path;
        if (temporaryDrawingEnabled) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(clearCanvas(path), 2000);
        }
    });
    
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
    let color;
    document.querySelectorAll('#toolbarcolor .color-circle').forEach(element => {
        if(element.classList.contains('border_2')) {
            color = element.style.backgroundColor
        }
    })
    updateBrushSize();
    updateBrushColor(color);
    canvas.renderAll(); // Redraw the canvas
});
let isAddingText = false;

// let isAddingText = false;
text.addEventListener("click", function () {
    isAddingText = !isAddingText;
    changeCursor();
    isDrawing = true
    temporaryDrawingEnabled = false;
    selectedShap = 5;
    isSquareDrawn = false;
    eraseEnabled = false;
    countIndex++;
    drawSquare(5);
    
});
function changeCursor() {
    if (isAddingText) {
        canvas.defaultCursor = 'text';
    } else {
        canvas.defaultCursor = 'default';
    }
}
canvas.on('mouse:down', function(options) {
    if (isAddingText) {
        const pointer = canvas.getPointer(options.e);
        const text = new fabric.Textbox('اكتب هنا', {
            left: pointer.x,
            top: pointer.y,
            fontFamily: 'Arial',
            fontSize: 18,
            fill: color,
        });
        canvas.add(text);
        canvas.setActiveObject(text);
        isAddingText = false;
        changeCursor();
    }
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
                    protected: true
                });
                canvas.add(img);
                protectedImages.push(img);

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



const eraserButton = document.getElementById("erasepart");
const eraseButton = document.getElementById("eraseall");

eraseButton.addEventListener("click", toggleEraseMode);

function toggleEraseMode() {
    eraseEnabled = !eraseEnabled;
    canvas.isDrawingMode = false;
    isSquareDrawn = true;
    if (eraseEnabled) {
        isErasing = false;
        canvas.selection = false; // Disable object selection
        canvas.forEachObject(function (obj) {
            obj.selection = false; // Disable selection for all objects
        });
    }
    // Attach a click event listener to the canvas
    canvas.on("mouse:move", function (event) {
        if (isMouseDown) {
            if (eraseEnabled && event.target) {
                if (!(event.target instanceof fabric.Image)) {
                    canvas.remove(event.target); // Remove the clicked object if it's not an image
                }
            }
            if (isErasing) {
                eraseEnabled = false;
                const { offsetX, offsetY } = event.e;
                lastMouseX = offsetX;
                lastMouseY = offsetY;
            }
        }
    });
}
function saveCanvasState() {
    canvasHistory.push(canvas.getObjects().map(obj => obj.toObject(['selectable', 'evented', 'lockMovementX', 'lockMovementY', 'lockRotation', 'lockScalingX', 'lockScalingY', 'lockUniScaling', 'lockSkewingX', 'lockSkewingY', 'visible'])));
}
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
    } else {
        canvas.selection = true; // إعادة تمكين اختيار الكائنات عند عدم استخدام الممحاة
    }
    saveCanvasState();
});

// الحدث mouse:down للتحقق من العناصر قبل عملية الممحاة
canvas.on('mouse:down', function (event) {
    if(isErasing ) {

    }
    if (isErasing && event.target) {

        var target = event.target;
        // تحقق مما إذا كان الكائن هو صورة
        if (target instanceof fabric.Image) {
            // isMouseDown = false
            canvas.selection = true;
            // Toggle eraser mode off
            isErasing = false;
            // Reset the drawing mode to the regular mode
            canvas.isDrawingMode = false;
    
            return;
        }else {
            isMouseDown = true;
            if (!isLocked && !isSquareDrawn) {
                // تحقق من أن السبورة غير مقفلة وأن المربع لم يُرَسَم بالفعل
                isDrawing = true;
                startPosition = canvas.getPointer(event.e);
            }
        }
        // استمر في عملية الممحاة لغير الصور
    }
});
// الحدث mouse:down للتحقق من العناصر قبل عملية الممحاة
canvas.on('mouse:down', function (event) {

  
    
});



document.getElementById("addUndo").addEventListener("click", undo);
document.getElementById("addRedo").addEventListener("click", redo);
