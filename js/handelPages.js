const  btnPre =  document.querySelector('.prev_canvas')
const btnNex =  document.querySelector('.next_canvas')
const pagintion = document.querySelector('.pagintion')

let deleteIcon = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";

var img = document.createElement('img');
img.src = deleteIcon;




var pagesData = {};
let numberPage = 1;
let currentpage = 1
let endSetionGoOut = false
var canvasElement = document.getElementById(`canvas`);
// Create a Fabric.js canvas object from the existing canvas element
let heightCanvas = 0 
let widthCanvas = window.innerWidth - 20
if(widthCanvas > 875 ) {
    heightCanvas = window.innerHeight -160
}else {
    heightCanvas = window.innerHeight -210
}


var canvas = new fabric.Canvas(canvasElement, {
    isDrawingMode: false, // Disable freehand drawing mode by default
    brushColor: "#FF0000", // Default brush color
    brushSize: 2,
    width: widthCanvas ,
    height: heightCanvas, // Default brush size
});

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
    btnPre.setAttribute('disabled' , '')
    btnNex.setAttribute('disabled' , '')
}

// Function to create a new page
const  createNewPage =  () => {
    // pagintion.style.display = 'flex'
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
        fabric.Object.prototype.controls.deleteControl = new fabric.Control({
            x: 0.5,
            y: -0.5,
            offsetY: 16,
            cursorStyle: 'pointer',
            mouseUpHandler: deleteObject,
            render: renderIcon,                
            cornerSize: 28
        });
        
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