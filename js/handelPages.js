const  btnPre =  document.querySelector('.prev_canvas')
const btnNex =  document.querySelector('.next_canvas')
const pagintion = document.querySelector('.pagintion')

var pagesData = {};
let numberPage = 1;
let currentpage = 1

var canvasElement = document.getElementById(`canvas`);
// Create a Fabric.js canvas object from the existing canvas element
var canvas = new fabric.Canvas(canvasElement, {
    isDrawingMode: false, // Disable freehand drawing mode by default
    brushColor: "#FF0000", // Default brush color
    brushSize: 2,
    width: window.innerWidth,
    height: window.innerHeight, // Default brush size
});

// sava data to local
window.addEventListener("beforeunload", function () {
    setData()
    localStorage.setItem("pagesData",  JSON.stringify(pagesData));
    localStorage.setItem("numberPage",  numberPage);
    localStorage.setItem("currentpage",  currentpage);
});

// get Data
if (localStorage.getItem('currentpage')) {

    numberPage = localStorage.getItem("numberPage")
    currentpage = localStorage.getItem('currentpage')
    for(let i = 2 ; i <= +numberPage ; i ++) {
        creathead(i)
    } 
    document.getElementById(`head-${currentpage}`).style.display = 'block'
    if(numberPage > 1)  pagintion.style.display = 'flex'
    if(currentpage == 1) btnPre.setAttribute('disabled' , '')
    if(currentpage == numberPage ) btnNex.setAttribute('disabled' , '')

    pagesData = JSON.parse(localStorage.getItem('pagesData'))

    canvas.loadFromJSON(pagesData['page' +  currentpage], function () {
        canvas.renderAll();
    });
}

// Function to create a new page
const  createNewPage =  () => {
  pagintion.style.display = 'flex'
  
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
    })
})

function setData() {
    pagesData['page' + currentpage] =  JSON.stringify(canvas.toJSON())
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
        document.getElementById('exist').appendChild(head);
        head.style.display = 'none'
}   