let canvasMode = 'select';
var panStart = null; // Store the starting point of the pan
canvas.allowTouchScrolling = true;

document.getElementById("select").addEventListener("click", function () {
    canvasMode = 'select';
    canvas.isDrawingMode = false;
    isSquareDrawn = true;
    temporaryDrawingEnabled = false;
    isErasing = false;
    isErasing = false;
    canvas.isDragging = false;
    canvas.forEachObject(function (obj) {
        obj.set({ evented: true });
      });

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

document.getElementById("hand").addEventListener("click", function () {
    canvasMode = 'hand';
    // canvas.allowTouchScrolling = true;

    canvas.isDrawingMode = false;
    isSquareDrawn = true;
    temporaryDrawingEnabled = false;
    isErasing = false;
    canvas.isDragging = false;
    canvas.selection = true; // Enable object selection after drag
    eraseEnabled = false;
    addingSingleArrowLineBtnClicked = false;
    addingLineBtnClicked = false;
    canvas.forEachObject(function (obj) {
        obj.set({ evented: false });
      });
    canvas.renderAll(); // Redraw the canvas
}); 

canvas.on('mouse:down', function (event) {
    if (canvasMode === 'hand') {
        canvas.setCursor('grab');
        if (event.target) {
        } else {
            canvas.selection = false; 
            panStart = {
                x: event.e.clientX || event.e.touches[0].clientX,
                y: event.e.clientY || event.e.touches[0].clientY
            };
        }
    } else {
        canvas.selection = true;
    }
});

canvas.on('mouse:move', function (event) {
    if (canvasMode === 'hand' && panStart) {
        var panDelta = {
            x: (event.e.clientX || event.e.touches[0].clientX) - panStart.x,
            y: (event.e.clientY || event.e.touches[0].clientY) - panStart.y
        };

        // Iterate over all objects on the canvas and pan them individually
        canvas.getObjects().forEach(function (obj) {
            obj.left += panDelta.x;
            obj.top += panDelta.y;
            obj.setCoords(); // Update coordinates for correct rendering
        });

        canvas.renderAll();
        panStart = {
            x: event.e.clientX || event.e.touches[0].clientX,
            y: event.e.clientY || event.e.touches[0].clientY
        };
    }
});

canvas.on('mouse:up', function () {
    if (canvasMode === 'hand') {
        canvas.selection = true; 
        panStart = null;
    }
});

penciltime.addEventListener("click", function () {
    isAddingText = false;
    canvasMode = 'select';

    temporaryDrawingEnabled = true
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
    canvasMode = 'select';

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
    canvasMode = 'select';
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
    canvas.renderAll(); 
});

canvas.on('mouse:down', function(options) {
    var activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === 'textbox' && isAddingText == true) {
        isAddingText = false
        document.getElementById('select').click()
    }

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
        textAlign:dir
    });
    canvas.add(text);
    canvas.setActiveObject(text);
    document.getElementById('select').click()
    isAddingText = false;
}
});

document.getElementById('shape').addEventListener('click' , ()=> {
    canvasMode = 'select';
    canvas.isDrawingMode = false;
    isSquareDrawn = true;
    temporaryDrawingEnabled = false;
    isErasing = false;
})


let addedImage = null;

document.getElementById("image").addEventListener("click", function () {
    canvasMode = 'select';
    document.getElementById("imageUploadInput").click();
});
document.getElementById("imageUploadInput").addEventListener("change", function (event) {
    canvasMode = 'select';
    canvas.isDrawingMode = false;
    isSquareDrawn = true;
    eraseEnabled = false;
    isErasing = false;
    temporaryDrawingEnabled = false;
    var file = event.target.files[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
                fabric.Image.fromURL(e.target.result, function (img) {
                addedImage = img;

                img.set({
                    left: 100, // تعيين موقع الصورة على الكانفاس
                    top: 100,
                    scaleX: 0.2, // تعيين مقياس الصورة
                    scaleY: 0.2,
                    protected: true
                    
                });
                img.set('stackingIndex', 9999);
                canvas.add(img);
                // addSliceIconToObjects(img)
            });
        };
        reader.readAsDataURL(file);
        document.getElementById("imageUploadInput").value =''
        document.getElementById('select').click()
    }
});


let cropRect = null;


canvas.on('mouse:up', () => {
 
    if (addedImage && cropRect) {
        addedImage.clipPath = cropRect;

        canvas.renderAll();
        canvas.remove(cropRect);
        cropRect = null;
    }
});



lock.addEventListener("click", function () {
    canvasMode = 'select';
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






const eraserButton = document.getElementById("erasepart");
const eraseButton = document.getElementById("eraseall");

eraseButton.addEventListener("click", toggleEraseMode);


let isMouseDown;
canvas.on('mouse:down', function (event) {
});


function toggleEraseMode() {
    // Set up erase mode
    canvasMode = 'select';
    eraseEnabled = true;
    canvas.selectable = false;
    canvas.isDrawingMode = false;
    isSquareDrawn = true;

    canvas.defaultCursor = 'crosshair';
    canvas.hoverCursor = 'crosshair';

    // Disable selection for all objects in the canvas
    if (eraseEnabled) {
        isErasing = false;
        canvas.selection = false;
        canvas.forEachObject(function (obj) {
            obj.selection = false;
        });
    }

    // Attach mouse event listeners
    canvas.on('mouse:down', handleMouseDown);
    canvas.on('mouse:up', handleMouseUp);
    canvas.on('mouse:move', handleMouseMove);
}

function handleMouseDown(event) {
    isMouseDown = true;
    if (isMouseDown && eraseEnabled && event.target) {
        removeAllShapesAndPaths(event.target);
    }
}

function handleMouseUp() {
    isMouseDown = false;
}

function handleMouseMove(event) {
    if (isMouseDown && eraseEnabled && event.target) {
        removeAllShapesAndPaths(event.target);
    }
}

function removeAllShapesAndPaths(obj) {
    // Check if the object is not an image before removing
    if (obj.type !== 'image') {
        canvas.remove(obj);
    }
}
let eraseIsImage = false
let isMakeItErease = false
eraserButton.addEventListener("click", function () {
    canvasMode = 'select';
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

// let countUndo = 0 ;
let postion = 0 ;
let firstUndo = true
let firstRndo = true
// let isPostion =false

let isclickUndo = false
let isclickRndo = false
let cropBox = false

function saveCanvasState() {
  if(temporaryDrawingEnabled ) return
    if(JSON.stringify(canvas.toJSON()) == JSON.stringify(dataForUndoRedo[dataForUndoRedo.length - 1])) return
    
    if(postion != 0 || postion != dataForUndoRedo.length - 1) {
        dataForUndoRedo.length = postion + 1
    }
    canvas.forEachObject(function (obj) {
        if(!obj.customId) return 
        if(obj.customId == 'sliceStrock')  {
            cropBox = true
        } 
    });
    if(!cropBox) {
        dataForUndoRedo[postion++] = canvas.toJSON()
    }
    isclickUndo = false
    isclickRndo = false
    cropBox = false
}



  function undo(){
    canvasMode = 'select';
    if(isclickUndo == false && isclickRndo ==false && dataForUndoRedo.length != 0) {
        dataForUndoRedo[postion] = canvas.toJSON()
    }
    isclickUndo = true
    isclickRndo = false
    
    console.log(postion)
    if(postion == 0) return
    canvas.loadFromJSON(dataForUndoRedo[--postion], function () {
        canvas.renderAll();
    });

}

  function redo(){
    canvasMode = 'select';
    isclickUndo = false
    isclickRndo = true
    console.log(postion)

    if(postion == dataForUndoRedo.length -1 ) return
    canvas.loadFromJSON(dataForUndoRedo[++postion], function () {
        canvas.renderAll();
      });

  }

  document.getElementById("addUndo").addEventListener("click", undo);
  document.getElementById("addRedo").addEventListener("click", redo);
  