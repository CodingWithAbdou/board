// Event listener for PDF input change
pdfInput.addEventListener("change", function (event) {
    var file = event.target.files[0];
    if (file) {
        // Load the PDF using PDF.js
        pdfjsLib
            .getDocument(URL.createObjectURL(file))
            .promise.then(function (pdf) {
                pdfDocument = pdf;
                // Clear previous page previews
                pagePreviews.innerHTML = "";
                var rowContainer = document.createElement("div");
                rowContainer.classList.add("page-scroll");
                for (var i = 1; i <= pdf.numPages; i++) {
                    // Create a page preview and append it
                    var pagePreview = createPagePreview(i);
                    rowContainer.appendChild(pagePreview);

                    pagePreviews.appendChild(rowContainer);
                }
                overlaypdf.style.display = "block";
                overlayexcel.style.display = "none";
            })
            .catch(function (error) {
                console.error("Error loading PDF:", error);
            });
    }
});

// Event listener for "Add Page" button click
addPageButton.addEventListener("click", function () {
    eraseEnabled = false;
    if (pdfDocument && selectedPage.length > 0) {
        // canvas.clear();

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
                    canvas.add(pdfImage);
                });
            });
        }
    }
});

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
            textDirection: 'rtl', // Set text direction to RTL
            // flipX: true, // Flip the text horizontally
            textAlign: 'left' // Adjust text alignment
          
        });

        var group = new fabric.Group([img, noteText], {
            left: 50,
            top: 50,
            selectable: true
        });

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

document.getElementById("excel").addEventListener("click", function () {
    overlayshape.style.display = "none";
    overlaycolor.style.display = "none";
    overlaytext.style.display = "none";
    overlayfile.style.display = "none";
    // افتح مربع حوار لاختيار ملف الصورة
    document.getElementById("excelFileInput").click();
});

// Event listener for file input change
excelFileInput.addEventListener("change", handleFileSelect);

// Event listener for render button click
renderButton.addEventListener("click", renderExcelToCanvas);

// Enable object selection and drag on the canvas
canvas.selection = true;


document.getElementById("pdf").addEventListener("click", function () {
    overlayshape.style.display = "none";
    overlaycolor.style.display = "none";
    overlaytext.style.display = "none";
    overlayfile.style.display = "none";
    // افتح مربع حوار لاختيار ملف الصورة
    document.getElementById("pdfInput").click();
});


document.getElementById("audio").addEventListener("click", function () {
    overlayshape.style.display = "none";
    overlaycolor.style.display = "none";
    overlaytext.style.display = "none";
    overlayfile.style.display = "none";
    // افتح مربع حوار لاختيار ملف الصورة
    document.getElementById("audioFileInput").click();
});
// Initialize slider position

audioFileInput.addEventListener("change", handleAudioFileSelect);

overlayaudio.addEventListener("mousedown", (e) => {
    isDragging = true;

    // حساب الإزاحة بين موقع الماوس وموقع العنصر
    offsetX = e.clientX - overlayaudio.getBoundingClientRect().left;
    offsetY = e.clientY - overlayaudio.getBoundingClientRect().top;
});

overlayaudio.addEventListener("mousemove", (e) => {
    if (isDragging) {
        // حساب الموقع الجديد للعنصر بناءً على حركة الماوس
        const left = e.clientX - offsetX;
        const top = e.clientY - offsetY;

        // تحديث موقع العنصر
        overlayaudio.style.left = left + "px";
        overlayaudio.style.top = top + "px";
    }
});

overlayaudio.addEventListener("mouseup", () => {
    isDragging = false;
});

// Play audio
playButton.addEventListener("click", () => {
    playButton.style.display = "none";
    pauseButton.style.display = "block";
    audio.play();
    sliderBar.style.background = `linear-gradient(to right, #0caf3d ${0}%, #ccc ${0}%)`;
});

// Pause audio
pauseButton.addEventListener("click", () => {
    playButton.style.display = "block";
    pauseButton.style.display = "none";
    audio.pause();
});

// Seek to the start of the audio
seekStartButton.addEventListener("click", () => {
    audio.currentTime = 0;
});

// Seek to the end of the audio
seekEndButton.addEventListener("click", () => {
    audio.currentTime = audio.duration;
});

// Update the end time when the audio time updates
audio.addEventListener("timeupdate", () => {
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    if (!isNaN(audio.duration)) {
        // Format the duration as minutes and seconds
        const minutes = Math.floor(audio.duration / 60);
        const seconds = Math.floor(audio.duration % 60);
        const formattedDuration =
            minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
        endTime.textContent = formattedDuration;
    } else {
        // If the duration is NaN, display "0:00"
        endTime.textContent = "0:00";
    }
    // endTime.textContent = formatTime(duration);
    startTime.textContent = formatTime(currentTime);

    // Calculate the progress percentage
    const progress = (currentTime / duration) * 100;

    // Update the custom slider position
    const sliderWidth = progress;
    sliderKnob.style.left = sliderWidth + "%";

    // Update the background color of the slider based on progress
    sliderBg.style.width = progress + "%";
});


// Handle custom slider knob dragging
sliderKnob.addEventListener("mousedown", () => {
    isDragging = true;
    audio.pause();
});