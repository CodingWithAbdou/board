
const toolbarItems = document.querySelectorAll('.toolbar_items')
const overlays = document.querySelectorAll('.overlay')

// console.log(toolbarItems)
toolbarItems.forEach(item => {    
    item.addEventListener('click' , ()=> {
        let bool
        if(item.querySelector('.overlay')) bool = item.querySelector('.overlay').classList.contains("show")
        
        toolbarItems.forEach(item => {
            item.classList.remove('active')
        })
        overlays.forEach(overlay => {
            overlay.classList.remove('show')
        })
        item.classList.add('active')
        if(item.querySelector('.overlay')) {
            if(bool) item.querySelector('.overlay').classList.remove("show")
            else  item.querySelector('.overlay').classList.add("show")
        }
    })
})

document.querySelector('.canvas ').addEventListener('click' , () => {
    overlays.forEach(overlay => {
        overlay.classList.remove('show')
    })
})




let temporaryDrawingEnabled = false;

// Add an event listener to toggle drawing mode
document.getElementById('pencil').addEventListener('click', function () {
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

const penciltime = document.getElementById('penciltime');
penciltime.addEventListener('click', function () {
   temporaryDrawingEnabled = !temporaryDrawingEnabled;
   if (temporaryDrawingEnabled) {
       canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
       canvas.isDrawingMode = true;
       isErasing = false; 
       isSquareDrawn = true;
       eraseEnabled = false;
   }else{
       canvas.isDrawingMode = false;  
   }
       // Set drawing properties
       canvas.freeDrawingBrush.width = parseInt(brushSize.value, 10);
       canvas.freeDrawingBrush.color = color;
   
       let requestId;
       // Function to clear the canvas with a slow fade out animation
       function clearCanvas(objjj) {
          
           let opacity = 1;
        
   const initialOpacity = objjj.opacity;
   
   // Use Fabric.js animate method to create the fading animation
   objjj.animate('opacity', 0, {
       duration: 2000, // Animation duration in milliseconds
       onChange: canvas.renderAll.bind(canvas),
       onComplete: function() {
           // The animation is complete, you can remove the object from the canvas if needed
           canvas.remove(objjj);
       }
   });

           
       }
       canvas.on('path:created', function (event) {
           // The event object contains the drawn path
           const path = event.path;
           if (temporaryDrawingEnabled) {
               clearTimeout(timeoutId);
               timeoutId = setTimeout(clearCanvas(path), 2000);
               }
       
       });
       
   
       // Add event listener to trigger clearCanvas after 3 seconds of inactivity
       let timeoutId;
});


var eraserButton = document.getElementById('erasepart');

eraserButton.addEventListener('click', function () {
    isErasing = !isErasing;
    canvas.selectable =false;
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

// Function to toggle erase mode
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
canvas.on('mouse:move', function (event) {
    if(isMouseDown){
    if (eraseEnabled && event.target) {
        canvas.remove(event.target); // Remove the clicked object
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

// Attach a click event listener to the erase button
var eraseButton = document.getElementById('eraseall');
eraseButton.addEventListener('click', toggleEraseMode);

document.getElementById('select').addEventListener('click', function () {
    canvas.isDrawingMode = false;
    isSquareDrawn = true;
    temporaryDrawingEnabled = false;
    isErasing = false;
    if(isLocked){
        canvas.selection = false;
        objectSelectabilty(false);
    }else{
        canvas.selection = true;
        objectSelectabilty(true);
    }
    eraseEnabled = false;
    addingSingleArrowLineBtnClicked = false;
    addingLineBtnClicked = false;
    canvas.renderAll(); // Redraw the canvas
});

document.getElementById('image').addEventListener('click', function () {

    // افتح مربع حوار لاختيار ملف الصورة
    document.getElementById('imageUploadInput').click();
});
