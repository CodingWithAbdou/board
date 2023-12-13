const  btnPre =  document.querySelector('.prev_canvas')
const btnNex =  document.querySelector('.next_canvas')
const pagintion = document.querySelector('.pagintion')

let deleteIcon = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";

var img = document.createElement('img');
img.src = deleteIcon;


var sliceIcon = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23333;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";

var sliceImg = document.createElement('img');
sliceImg.src = sliceIcon;


var pagesData = {};
let numberPage = 1;
let currentpage = 1
let endSetionGoOut = false
var canvasElement = document.getElementById(`canvas`);
// Create a Fabric.js canvas object from the existing canvas element
let widthCanvas = window.innerWidth 
let heightCanvas = window.innerHeight 


var canvas = new fabric.Canvas(canvasElement, {
    isDrawingMode: false, 
    brushColor: "#FF0000", 
    brushSize: 2,
    width: widthCanvas ,
    height: heightCanvas, 
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


function setCanvasSize() {
    var widthCanvas = window.innerWidth;
    var heightCanvas = window.innerHeight;
    canvas.setDimensions({
        width: widthCanvas,
        height: heightCanvas
    });
    canvas.renderAll();
}
window.addEventListener('resize', setCanvasSize);

// // sava data to local
window.addEventListener("beforeunload", function () {
    setData()
    localStorage.setItem("pagesData",  JSON.stringify(pagesData));
    localStorage.setItem("numberPage",  numberPage);
    localStorage.setItem("currentpage",  currentpage);
    if(endSetionGoOut) {
        localStorage.clear()
    }
});

// get Data
if (localStorage.getItem('currentpage')) {

    numberPage = localStorage.getItem("numberPage")
    currentpage = localStorage.getItem('currentpage')
    for(let i = 2 ; i <= +numberPage ; i ++) {
        creathead(i)
    } 
    document.getElementById(`head-${currentpage}`).style.display = 'block'
    // if(numberPage > 1)  pagintion.style.display = 'flex'
    if(currentpage == 1) btnPre.setAttribute('disabled' , '')
    if(currentpage == numberPage ) btnNex.setAttribute('disabled' , '')

    pagesData = JSON.parse(localStorage.getItem('pagesData'))

    canvas.loadFromJSON(pagesData['page' +  currentpage], function () {
        canvas.renderAll();
    });
    addBtnRemove()
}else {
    const hiddenRect = new fabric.Rect({  
        left: 100,
        top: 100,
        width: 50,
        height: 50,
        fill: 'blue',
        visible: false, // Initially set to hide
    });
    
    // Add the rectangle to the canvas
    canvas.add(hiddenRect);
    addBtnRemove()
    btnPre.setAttribute('disabled' , '')
    btnNex.setAttribute('disabled' , '')
}

// Function to create a new page
const  createNewPage =  () => {
    btnPre.removeAttribute('disabled')
    btnNex.removeAttribute('disabled')

    if(currentpage == 1) {
        btnPre.setAttribute('disabled' , '')
        document.getElementById('head-1').style.display = 'block'
    }else {
        btnPre.removeAttribute('disabled')
        if(currentpage != numberPage - 1) {
            btnNex.removeAttribute('disabled')
        }
    }
    numberPage++;

    creathead(numberPage)
}

document.getElementById('btn-Pages').addEventListener('click' , createNewPage)

document.querySelectorAll('.btn_controll').forEach(btn => {
    btn.addEventListener('click' , ()=> {
        dataForUndoRedo = []
        setData()
        if(btn.classList.contains('next_canvas')) currentpage++
        if(btn.classList.contains('prev_canvas')) currentpage--

        if(currentpage == 1) btnPre.setAttribute('disabled' , '')
        else  btnPre.removeAttribute('disabled')

        if(currentpage == numberPage  ) btnNex.setAttribute('disabled' , '')
        else  btnNex.removeAttribute('disabled')

        document.querySelectorAll('.h2').forEach(head => {
            head.style.display = 'none'
        })
        
        getData()
        document.getElementById(`head-${currentpage}`).style.display = 'block'
        checkIfDataAudio()
    })
})

function checkIfDataAudio() {
    if(audioData[currentpage]) {
        if(audioData[currentpage].isActive &&  audioData[currentpage].data != '') {
            addAudio (audioData[currentpage].data) 
        }else {
            closeAudio()
        }
    }else {
        closeAudio()
    }
}

function setData() {
    pagesData['page' + currentpage] =  JSON.stringify(canvas.toJSON(['customId']))
    canvas.clear();
}

function getData() {
    canvas.loadFromJSON(pagesData['page' + currentpage], function () {

        canvas.renderAll();
    });
}

function creathead(index) {
    const head = document.createElement('h2');
    head.className = 'h2';
    head.innerHTML = `الصفحة رقم ${index}`;
    head.id = `head-${index}`;
    document.querySelector('.numberPages').appendChild(head);
    head.style.display = 'none'
}   

function addBtnRemove() {
    canvas.forEachObject(obj => {
        console.log(obj);
        fabric.Object.prototype.set({
            transparentCorners: false,
            cornerColor: '#36b673',
            cornerStyle: 'circle'
        });

        deleteControl = new fabric.Control({
            x: 0.5,
            y: -0.5,
            offsetY: 16,
            cursorStyle: 'pointer',
            mouseUpHandler: deleteObject,
            render: renderIcon,                
            cornerSize: 26
        });
        fabric.Object.prototype.controls.deleteControl = deleteControl;
        // Apply control to fabric.Textbox prototype
        fabric.Textbox.prototype.controls = fabric.Textbox.prototype.controls || {};
        fabric.Textbox.prototype.controls.deleteControl = deleteControl;

        function deleteObject(eventData, transform) {
            var canvas = transform.target.canvas;
            var activeObjects = canvas.getActiveObjects();
        
            activeObjects.forEach(function (object) {
                canvas.remove(object);
            });
        
            canvas.discardActiveObject();
            canvas.requestRenderAll();
        }
    
        function renderIcon(ctx, left, top, styleOverride, fabricObject) {
            var size = this.cornerSize;
            ctx.save();
            ctx.translate(left, top);
            ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
            ctx.drawImage(img, -size/2, -size/2, size, size);
            ctx.restore();
        }
  });
}