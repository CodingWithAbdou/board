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
let widthCanvas = window.innerWidth 
let heightCanvas = window.innerHeight 


var canvas = new fabric.Canvas(canvasElement, {
    isDrawingMode: false, 
    brushColor: "#FF0000", 
    brushSize: 2,
    width: widthCanvas ,
    height: heightCanvas, 
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


document.addEventListener('DOMContentLoaded',addBtnRemove);
canvas.on('mouse:up', addBtnRemove)

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
}else {
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
        console.log('blabvla')
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
        addBtnRemove()
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
        // if(obj.customId === 'sliceStrock') return
        console.log(obj.type , obj.controls)
        fabric.Object.prototype.set({
            transparentCorners: false,
            cornerColor: '#36b673',
            cornerStyle: 'circle'
        });

        deleteControl = new fabric.Control({
            x: 0.5,
            y: -0.5,
            offsetY: -20,
            cursorStyle: 'pointer',
            mouseUpHandler: deleteObject,
            render: renderIcon,                
            cornerSize: 26
        });
        obj.controls.deleteControl = deleteControl;
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
            if(fabricObject.customId != 'sliceStrock') {
                var size = this.cornerSize;
                ctx.save();
                ctx.translate(left, top);
                ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
                ctx.drawImage(img, -size/2, -size/2, size, size);
                ctx.restore();
            }
        }
        if(obj instanceof fabric.Image) {
            addSliceIconToObjects(obj)
        }
  });
}

function addSliceIconToObjects(obj) {
    const sliceControl = new fabric.Control({
        x: -0.5,
        y: -0.5,
        offsetY: -20,
        cursorStyle: 'pointer',
        mouseUpHandler: sliceObject,
        render: renderSliceIcon,
        cornerSize: 24
    });

    if (obj instanceof fabric.Image) {
        obj.controls = obj.controls || {};
        obj.controls.sliceControl = sliceControl;
        canvas.renderAll();
    }

    function sliceObject(eventData, transform) {
        let activeImg = canvas.getActiveObjects();
        let left = activeImg[0].left;
        let top = activeImg[0].top;
        let height = activeImg[0].height * activeImg[0].scaleY ;
        let width = activeImg[0].width  * activeImg[0].scaleX;
        activeImg[0].set({
            selectable: false,
            hasControls: false,
            hasBorders: false,
            evented: false 
        })
        cropImage(activeImg[0] ,width , height , left , top)
    
    }

    function renderSliceIcon(ctx, left, top, styleOverride, fabricObject) {
        if (fabricObject instanceof fabric.Image) {
            var size = this.cornerSize;
            ctx.save();
            ctx.translate(left, top);
            ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));

            var sliceIcon = new Image();
            sliceIcon.src = 'images/scissors.svg';
            ctx.drawImage(sliceIcon, -size / 2, -size / 2, size, size);

            ctx.restore();
        }
    }
}


function cropImage(img ,width , height , left , top) {
    var rect = new fabric.Rect({
        left: left,
        top: top,
        width: width ,
        height: height,
        fill: 'transparent',  // Fill color
        strokeWidth: 1, // Border width
        stroke: '#36b673' , // Border color
        customId:'sliceStrock',
        hasRotatingPoint: false,
        transparentCorners: true,
        cornerColor: '#36b673',
        cornerStyle: 'inverted-rect',  // Change corner style to circular
        cornerSize :8
        
    });
    canvas.add(rect);
    addTrueAndFalse(rect , img)
    
    canvas.renderAll();
}

function addTrueAndFalse(rect , img) {
    if(rect.customId != 'sliceStrock') return
    const trueControl = new fabric.Control({
        x: -0.5,
        y: -0.5,
        offsetY: -40,
        cursorStyle: 'pointer',
        mouseUpHandler: trueObject,
        render: renderTrue,
        cornerSize: 16
    });
    const falseControl = new fabric.Control({
        x: 0.5,
        y: -0.5,
        offsetY: -40,
        cursorStyle: 'pointer',
        mouseUpHandler: falseObject,
        render: renderFalse,
        cornerSize: 16
    });

    if (rect.customId == 'sliceStrock') {
        rect.controls = rect.controls || {};
        rect.controls.trueControl = trueControl;
        rect.controls.falseControl = falseControl;
        canvas.renderAll();
    }

    function falseObject(eventData, transform) {
        console.log('left' ,eventData)
        canvas.remove(rect);
        img.set({
            selectable: true,
            hasControls: true,
            hasBorders: true,
            evented: true 
        })
    }

    function trueObject(eventData, transform) {
        console.log('right' ,eventData)

        let left = rect.left;
        let top = rect.top;
        let height = rect.height * rect.scaleY ;
        let width = rect.width  * rect.scaleX;
        let capturedDataURL = canvas.toDataURL({
            format: 'jpeg', 
            left: left - (parseInt(width) / 2),
            top: top - (parseInt(height) / 2) , 
            width: parseInt(width),
            height: parseInt(height),
            absolutePositioned: true
        });
        fabric.Image.fromURL(capturedDataURL, function(img) {
            img.set({
                left: parseInt(left),
                top: parseInt(top) ,
                width: parseInt(width),
                height: parseInt(height),
                selectable: true,  
            });
            canvas.add(img);
            canvas.renderAll();
        });
        canvas.remove(rect);
        canvas.remove(img);
        canvas.renderAll();

        // console.log('fresg')
    }

    function renderTrue(ctx, left, top, styleOverride, fabricObject) {
        if (fabricObject.customId == 'sliceStrock') {
            var size = this.cornerSize;
            ctx.save();
            ctx.translate(left, top);
            ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));

            var sliceIcon = new Image();
            sliceIcon.src = 'images/true.svg';
            ctx.drawImage(sliceIcon, -size / 2, -size / 2, size, size);

            ctx.restore();
        }
    }
    function renderFalse(ctx, left, top, styleOverride, fabricObject) {
        if (fabricObject.customId == 'sliceStrock') {
            var size = this.cornerSize;
            ctx.save();
            ctx.translate(left, top);
            ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));

            var sliceIcon = new Image();
            sliceIcon.src = 'images/false.svg';
            ctx.drawImage(sliceIcon, -size / 2, -size / 2, size, size);

            ctx.restore();
        }
    }

}

