
let numberPage = 1;
let showPagination = false
let currentpage = 1

var pagesData = {
};

var canvasElement = document.getElementById(`canvas`);
// Create a Fabric.js canvas object from the existing canvas element
var canvas = new fabric.Canvas(canvasElement, {
    isDrawingMode: false, // Disable freehand drawing mode by default
    brushColor: "#FF0000", // Default brush color
    brushSize: 2,
    width: window.innerWidth,
    height: window.innerHeight, // Default brush size
});

    
document.getElementById('btn-Pages').addEventListener('click' , createNewPage)


  // Function to create a new page
function createNewPage() {
    if(showPagination == false) {
        showPagination = true
        document.querySelector('.pagintion').style.display = 'flex'
        if(currentpage == 1) document.querySelector('.prev_canvas').setAttribute('disabled' , '')
        else  document.querySelector('.prev_canvas').removeAttribute('disabled')
    } 
    numberPage++;
    const head = document.createElement('h2');
    head.className = 'h2';
    head.innerHTML = `الصفحة رقم ${numberPage }`;
    head.id = `head-${numberPage}`;


    document.getElementById('exist').appendChild(head);

    head.style.display = 'none'
    document.getElementById('head-1').style.display = 'block'
}

document.querySelectorAll('.btn_controll').forEach(btn => {
    if(showPagination) return
    btn.addEventListener('click' , ()=> {
        setData()
        if(btn.classList.contains('next_canvas')) currentpage++
        if(btn.classList.contains('prev_canvas')) currentpage--

        if(currentpage == 1) document.querySelector('.prev_canvas').setAttribute('disabled' , '')
        else  document.querySelector('.prev_canvas').removeAttribute('disabled')

        if(currentpage == numberPage  ) document.querySelector('.next_canvas').setAttribute('disabled' , '')
        else  document.querySelector('.next_canvas').removeAttribute('disabled')

        document.querySelectorAll('.h2').forEach(head => {
            head.style.display = 'none'
        })
        
        getData()
        document.getElementById(`head-${currentpage }`).style.display = 'block'
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