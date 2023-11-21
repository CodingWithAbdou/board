const pdfInput = document.getElementById("pdfInput");
const pagePreviews = document.getElementById("pagePreviews");
const addPageButton = document.getElementById("addPageButton");
let pdfDocument = null;
let selectedPage = [];
window.jsPDF = window.jspdf.jsPDF;

// import { jsPDF } from "jspdf";
document.getElementById("pdf").addEventListener("click", function () {
    document.getElementById("pdfInput").click();
});
// const { jsPDF } = require(".");


// Event listener for PDF input change
pdfInput.addEventListener("change", function (event) {

    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
        const reader = new FileReader();
        reader.onload = function(e) {
            loadDataPdf(e.target.result)
        };
        reader.readAsArrayBuffer(file);
    }else {
        console.log('error')
    }
})

function loadDataPdf (pdfData) {
    pagePreviews.innerHTML = '';

    // Use PDF.js to display the PDF
    pdfjsLib.getDocument({ data: pdfData }).promise.then(function(pdf) {
        pdfDocument = pdf;


        const rowContainer = document.createElement("div");
        rowContainer.classList.add("page-scroll");
        pagePreviews.appendChild(rowContainer)


        for(let i=1 , leng = pdf._pdfInfo.numPages  ; i <= leng ; i++ ) {
            pdf.getPage(i).then(function(page) {
                createPdfFilesPrev(rowContainer  , page , i)
            });
        }
        overlaypdf.style.display = "block";
    });
}

function createPdfFilesPrev(rowContainer , page , pageNumber) {
    // Create the page preview div
    var pagePreview = document.createElement("div");
    pagePreview.classList.add("page-preview");
    pagePreview.dataset.pageNumber = pageNumber;

    let span = document.createElement('span')
    span.className = 'span_number_pages'
    span.textContent = pageNumber;
    pagePreview.appendChild(span)

    const canvas = document.createElement('canvas');
    const viewport = page.getViewport({ scale: 0.2 });
    const context = canvas.getContext('2d');
    canvas.height = viewport.height ;
    canvas.width = viewport.width ;
    
    page.render({
        canvasContext: context,
        viewport: viewport,
    });

    pagePreview.appendChild(canvas)
    rowContainer.appendChild(pagePreview)
    
    eventToPagePreview(pagePreview)
}

function  eventToPagePreview(pagePreview) {
    pagePreview.addEventListener("click", function () {

        var previews = pagePreviews.getElementsByClassName("page-preview");
        var pageNumber = parseInt(this.dataset.pageNumber, 10);
        var index = selectedPage.indexOf(pageNumber);
        if (index == -1) {
            selectedPage.push(pageNumber);
            this.classList.add("selected");
        } else {
            selectedPage.splice(index, 1);
            this.classList.remove("selected");
        }

        // Enable the "Add Page" button if any pages are selected
        if (selectedPage.length > 0)  addPageButton.removeAttribute("disabled");
        else addPageButton.setAttribute("disabled", "disabled");
        
    });
}


// Event listener for "Add Page" button click
addPageButton.addEventListener("click", function () {
    eraseEnabled = false;
    if (pdfDocument && selectedPage.length > 0) {
        for (var i = 0; i < selectedPage.length; i++) {
            var pageNumber = selectedPage[i];
            // Get the selected page from the PDF
            pdfDocument.getPage(pageNumber).then(function (page) {
                // Set the scale for rendering
                var scale = 1.5;
                var viewport = page.getViewport({ scale: scale });

                // Create a canvas for rendering the PDF page
                var canvasPdf = document.createElement("canvas");
                var context = canvasPdf.getContext("2d");
                canvasPdf.height = viewport.height;
                canvasPdf.width = viewport.width;

                // Render the PDF page on the canvas
                var renderContext = {
                    canvasContext: context,
                    viewport: viewport,
                };

                page.render(renderContext).promise.then(function () {
                    // Create a Fabric.js image object from the canvas
                    var pdfImage = new fabric.Image(canvasPdf, {
                        left: 50,
                        top: 50,
                    });

                    // Add the PDF image to the Fabric.js canvas
                    // saveCanvasState()
                    canvas.add(pdfImage);
                });
            });
        }
    }
    overlaypdf.style.display = 'none'
    pdfInput.value = ''
    selectedPage = []
});

////////////////////////////////////// ------------End Pdf -----------/////////////////////////////////////////////////
const wordInput = document.getElementById("wordInput");


// document.getElementById('word').addEventListener('click' , ()=> {
//     document.getElementById("wordInput").click();
// })

// Event listener for PDF input change
// wordInput.addEventListener("change", function (event) {

//     const file = event.target.files[0];
//     if (file) {
        
//         const reader = new FileReader();
//         reader.onload = function(e) {
//             loadDataWord( file , e.target.result)
//         };
//         reader.readAsArrayBuffer(file);
//     }else {
//         console.log('error')
//     }
// })


function loadDataWord(file , wordData ) {
    let pageCount = 0
    // JSZip.loadAsync(wordData).then(function(zip) {
    //     zip.file("docProps/app.xml").async("string").then(function(content) {
    //         console.log(content)
    //         const match = content.match(/<Pages>(\d+)<\/Pages>/);
    //         if (match) {
    //             pageCount = parseInt(match[1]);
    //         }
    //     });
    //     // fetchAndDisplayPage(currentPage);
    // })


    if (file.name.endsWith('.docx')) {
        // console.log(wordData)
        console.log(wordData)

        mammoth.convertToHtml({ arrayBuffer: wordData })
            .then(function(result) {
                // console.log(result)
                const htmlContent = result.value
                console.log(htmlContent)
                // Create a PDF using jspdf

                const pdf = new jsPDF();
                pdf.html(htmlContent, {
                    callback: function (pdf) {
                        pdf.save('converted_document.pdf');
                    }
                });

                // Optional: Display the PDF in an iframe
                const pdfDataUri = pdf.output('datauristring');
                console.log(pdfDataUri)
                // pdfPreview.innerHTML = `<iframe width="100%" height="500" src="${pdfDataUri}"></iframe>`;
            })
            .catch(function(error) {
                console.error('Error converting .docx document:', error);
            });
    }

}




////////////////////////////////////// ------------ Audio -----------/////////////////////////////////////////////////

document.getElementById("audio").addEventListener("click", function () {
    document.getElementById("audioFileInput").click();
});
// Initialize slider position
audioData = {}
audioFileInput.addEventListener("change", handleAudioFileSelect);

function handleAudioFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        audioFileInput.value = ''
        audioSource.src = ''
        audioData[currentpage] = {data : URL.createObjectURL(file) , isActive : true}
        // Set the audio source to the selected file
        addAudio (audioData[currentpage].data)
    } else {
        myAudio.style.display = "none";
    }
}

function addAudio (data) {
    audioSource.src = data ;
        
    // Show the audio player
    document.getElementById('range').value = '0'
    myAudio.style.display = "block";

    // Load the audio
    myAudio.load();
    overlayaudio.style.display = "block";

}



let intervalForSet;
// Pause audio
pauseButton.addEventListener("click", () => {
    playButton.style.display = "block";
    pauseButton.style.display = "none";
    audio.pause();
    clearInterval(intervalForSet);
});

// Play audio
playButton.addEventListener("click", () => {
    playButton.style.display = "none";
    pauseButton.style.display = "block";
    audio.play();
    sliderBar.style.background = `linear-gradient(to right, #0caf3d ${0}%, #ccc ${0}%)`;
    intervalForSet = setInterval(changTimeRunning, 500);
});

// Seek to the start of the audio
seekStartButton.addEventListener("click", () => {
    audio.currentTime = 0;
});

// Seek to the end of the audio
seekEndButton.addEventListener("click", () => {
    audio.currentTime = audio.duration;
});

const playerRangeControl = document.getElementById('range');

const changTimeRunning = () => {
  playerRangeControl.value = audio.currentTime;
  startTime.textContent = formatTime(audio.currentTime);

  fillingRanges();
//   isSoundsEnd();
};

const fillingRanges = (e) => {
    sliderBg.style.width = `${(playerRangeControl.value / playerRangeControl.max) * 100 }%`
};


const updataDuration = () => {
  playerRangeControl.max = Math.ceil(audio.duration);
  endTime.textContent = formatTime(Number(audio.duration));
};

audio.addEventListener("loadeddata", updataDuration);


const request = () => {
    audio.currentTime = playerRangeControl.value;
    startTime.textContent = formatTime(audio.currentTime);
  };

  playerRangeControl.addEventListener("input", request);


overlayaudio.addEventListener("mousedown", (e) => {
    if(e.target.id == 'driver') {
        isDragging = true;
    }else {
        isDragging = false;
    }

    offsetX = e.clientX - overlayaudio.getBoundingClientRect().left;
    offsetY = e.clientY - overlayaudio.getBoundingClientRect().top;
});

overlayaudio.addEventListener("mouseup", () => {
    isDragging = false;
});

window.addEventListener("mousemove", (e) => {
    if (isDragging ) {
        const left = e.clientX - offsetX;
        const top = e.clientY - offsetY;

        overlayaudio.style.left = left + "px";
        overlayaudio.style.top = top + "px";
    }
});


document.getElementById('btn-close_audio').addEventListener('click' , () => {
    closeAudio()
})

function closeAudio() {
    audioData[currentpage] = {data : '' , isActive : false}
    overlayaudio.style.display = 'none'
    overlayaudio.style.top = '100px'
    overlayaudio.style.left = '100px'
    audio.pause();
    audioSource.src = ''
}


////////////////////////////////////// ------------ Audio -----------/////////////////////////////////////////////////


const excelFileInput = document.getElementById("excelFileInput");
// const renderButton = document.getElementById("renderButton");



addNoteButton.addEventListener("click", function () {
    // Create a background image
    fabric.Image.fromURL("images/background.png", function (img) {
        var desiredWidth = 300; // Set your desired width
        var desiredHeight = 200; // Set your desired height
        var scale = Math.min(
            desiredWidth / img.width,
            desiredHeight / img.height
        );

        img.set({
            left: 200,
            top: 400,
            scaleX: scale, // Scale the image based on the desired width and height
            scaleY: scale,
            hasControls: true,
        });

        // Create a text object with custom styling
        var noteText = new fabric.IText('اكتب هنا', {
            left: 350,
            top: 440,
            fontSize: 20,
            fill: "black",
            width: 200,
            fontFamily: 'Arial', // Use an Arabic-supporting font
            fontSize: 20,
            // flipX: true, // Flip the text horizontally
          
        });

        var group = new fabric.Group([img, noteText], {
            left: 50,
            top: 50,
            selectable: true
        });
        // saveCanvasState()
        canvas.add(group)
        group.on('mousedblclick', function() {
            noteText.enterEditing();
            noteText.hiddenTextarea.focus();
            noteText.set({ text: '' }); // Clear the text when double-clicked
            canvas.renderAll();
        });
        
        canvas.renderAll();
    });
});
// canvas.on('object:moving', function(e) {
//     var obj = e.target;
//     if (obj.type === 'group') {
//       obj.getObjects().forEach(function(object) {
//         object.set({ left: obj.left, top: obj.top });
//       });
//       canvas.renderAll();
//     }
//   });

// document.getElementById("excel").addEventListener("click", function () {
//     overlayshape.style.display = "none";
//     overlaycolor.style.display = "none";
//     overlaytext.style.display = "none";
//     overlayfile.style.display = "none";
//     // افتح مربع حوار لاختيار ملف الصورة
//     document.getElementById("excelFileInput").click();
// });

// Event listener for file input change
// excelFileInput.addEventListener("change", handleFileSelect);

// Event listener for render button click
// renderButton.addEventListener("click", renderExcelToCanvas);

// Enable object selection and drag on the canvas
canvas.selection = true;




