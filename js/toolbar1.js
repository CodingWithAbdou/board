

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
    isAddingText = false;

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
    isAddingText = false;
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
    eraseEnabled = false;
    canvas.isDrawingMode = false;
    isAddingText = true;
    canvas.defaultCursor = 'text';
    isDrawing = true
    temporaryDrawingEnabled = false;
    selectedShap = 5;
    isSquareDrawn = false;
    eraseEnabled = false;
    countIndex++;
    canvas.renderAll(); // إعادة رسم الكانفاس لتحديث التغيير

});

document.getElementById('shape').addEventListener('click' , ()=> {
    canvas.isDrawingMode = false;
    isSquareDrawn = true;
    temporaryDrawingEnabled = false;
    isErasing = false;
})

canvas.on('mouse:down', function(options) {
    let color;
    let fontSizeText = document.getElementById('counterInput').value
    document.querySelectorAll('#toolbartext .color-circle').forEach(element => {
        if(element.classList.contains('border_2')) {
            color = element.style.backgroundColor
        }
    })
    if(!color){
        color = 'black'
    }
    if (isAddingText) {
        
        // saveCanvasState()
        const pointer = canvas.getPointer(options.e);
        const text = new fabric.Textbox('اكتب هنا', {
            left: pointer.x,
            top: pointer.y,
            fontFamily: 'Arial',
            fontSize: fontSizeText,
            fontFamily: fontFamily,
            fill: color,
        });
        canvas.add(text);
        canvas.setActiveObject(text);
        isAddingText = false;
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
                img.set('stackingIndex', 9999);
                // saveCanvasState()
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
// document.getElementById('scissors').addEventListener('click', () => {
//     if (addedImage) {
//         if (cropRect) {
//             canvas.remove(cropRect);
//             cropRect = null;
//         }
//         cropRect = new fabric.Rect({
//             left: 100,
//             top: 100,
//             width: 50,
//             height: 50,
//             fill: 'rgba(0, 0, 0, 0)',
//             stroke: 'red',
//             // selectable: false,
//             transparentCorners: false, // Allows for easier resizing
//             hasControls: true, // Show resize handles
//             lockUniScaling: true, // Maintain aspect ratio during resizing
//         });

//         canvas.add(cropRect);
//         canvas.renderAll();
//     }
// });

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


let isMouseDown;
canvas.on('mouse:down', function (event) {
    isMouseDown = true;
});
canvas.on('mouse:up', function (event) {
    isMouseDown = false;
});


// Function to toggle erase mode
function toggleEraseMode() {
    eraseEnabled = true;
    canvas.selectable = false;
    canvas.isDrawingMode = false;
    isSquareDrawn = true;
    canvas.defaultCursor = 'crosshair';
    canvas.hoverCursor = 'crosshair';

    if (eraseEnabled) {
        isErasing = false;
        canvas.selection = false; // Disable object selection
        canvas.forEachObject(function (obj) {
            obj.selection = false; // Disable selection for all objects
        });
    } 
    // Attach a click event listener to the canvas
canvas.on('mouse:down', function (event) {
    if(isMouseDown){
        if (eraseEnabled && event.target) {
            removeAllShapesAndPaths(event.target);
        }
        if(isErasing){
            eraseEnabled = false;
            const { offsetX, offsetY } = event.e;
            lastMouseX = offsetX;
            lastMouseY = offsetY;
        }
    }
});

}

function removeAllShapesAndPaths(obj) {
        if (obj.type != 'image') {
            canvas.remove(obj);
        }
}

// Example usage:



function saveCanvasState() {
    console.log('ok')
    canvasHistory.push(canvas.getObjects().map(obj => obj.toObject(['selectable', 'evented', 'lockMovementX', 'lockMovementY', 'lockRotation', 'lockScalingX', 'lockScalingY', 'lockUniScaling', 'lockSkewingX', 'lockSkewingY', 'visible'])));
}

let eraseIsImage = false
let isMakeItErease = false
eraserButton.addEventListener("click", function () {
    isErasing = true;
    canvas.selectable = false;
    eraseEnabled = false;

    if (isErasing && !isMakeItErease) {
        canvas.selection = false;
        canvas.isDrawingMode = true;
         eraser = new fabric.EraserBrush(canvas);
        canvas.freeDrawingBrush = eraser;
        eraser.width = 40
        eraser.fill = 'white'
        isMakeItErease  = true
    } else {
        canvas.selection = true; // إعادة تمكين اختيار الكائنات عند عدم استخدام الممحاة
    }
});
// canvas.on('object:added', saveCanvasState);
// canvas.on('object:removed', saveCanvasState);
// canvas.on('object:modified', function(event) {
//     saveCanvasState()
// });

canvas.on('mouse:down:before' , saveCanvasState )

canvas.on('mouse:down', function (event) {
    if (isErasing && event.target) {
        var target = event.target;
        // saveCanvasState()
        if (target.type == 'image') {
            canvas.selection = true;
            canvas.isDrawingMode = false;
        }else {
            canvas.selection = false;
            canvas.isDrawingMode = true;
        }
    }
});
canvas.on('mouse:up', function (event) {
    if (isErasing && event.target) {
        // saveCanvasState()
    }
})
canvas.on('mouse:move' , function(event) {
    if (isErasing && event.target) {

        var target = event.target;
        // تحقق مما إذا كان الكائن هو صورة
        if (target.type == 'image') {
            canvas.selection = true;
            canvas.isDrawingMode = false;
        }else {
            canvas.selection = false;
            canvas.isDrawingMode = true;

        }
    }
})


let dataForUndoRedo = []
dataForUndoRedo.push(canvas.toJSON()) 
let countUndo = 0 ;
let postion = 0 ;

function saveCanvasState() {
    if(JSON.stringify(canvas.toJSON()) == JSON.stringify(dataForUndoRedo[dataForUndoRedo.length - 1])) return
    dataForUndoRedo.push(canvas.toJSON())
}



  function undo(){
    canvas.remove()
    postion = dataForUndoRedo.length - 1 - countUndo
    canvas.loadFromJSON(dataForUndoRedo[dataForUndoRedo.length - 1 - countUndo], function () {
        canvas.renderAll();
    });
    if(dataForUndoRedo.length > countUndo){
        countUndo++
    }
  }

  function redo(){
   canvas.remove()
    if(countUndo > 0) {
        canvas.loadFromJSON(dataForUndoRedo[++postion], function () {
            canvas.renderAll();
        });
        countUndo--
    } 
  }

  document.getElementById("addUndo").addEventListener("click", undo);
  document.getElementById("addRedo").addEventListener("click", redo);
  