const toolbarItems = document.querySelectorAll(".toolbar_items");
const overlays = document.querySelectorAll(".overlay");

toolbarItems.forEach((item) => {
    item.addEventListener("click", () => {
        let bool;
        if (item.querySelector(".overlay"))
            bool = item.querySelector(".overlay").classList.contains("show");

        toolbarItems.forEach((item) => {
            item.classList.remove("active");
        });
        overlays.forEach((overlay) => {
            overlay.classList.remove("show");
        });
        item.classList.add("active");
        if (item.querySelector(".overlay")) {
            if (bool) item.querySelector(".overlay").classList.remove("show");
            else item.querySelector(".overlay").classList.add("show");
        }
    });
});

document.querySelector(".canvas").addEventListener("click", () => {
    overlays.forEach((overlay) => {
        overlay.classList.remove("show");
    });
});

// Add an event listener to toggle drawing mode
document.getElementById("pencil").addEventListener("click", function () {
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

penciltime.addEventListener("click", function () {
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
    // Set drawing properties
    canvas.freeDrawingBrush.width = parseInt(brushSize.value, 10);
    canvas.freeDrawingBrush.color = color;

    let requestId;
    // Function to clear the canvas with a slow fade out animation
    function clearCanvas(objjj) {
        let opacity = 1;
        const initialOpacity = objjj.opacity;
        // Use Fabric.js animate method to create the fading animation
        objjj.animate("opacity", 0, {
            duration: 2000, // Animation duration in milliseconds
            onChange: canvas.renderAll.bind(canvas),
            onComplete: function () {
                // The animation is complete, you can remove the object from the canvas if needed
                canvas.remove(objjj);
            },
        });
    }

    canvas.on("path:created", function (event) {
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

eraserButton.addEventListener("click", function () {
    isErasing = !isErasing;
    canvas.selectable = false;
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

// Attach a click event listener to the erase button
eraseButton.addEventListener("click", toggleEraseMode);

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

document.getElementById("image").addEventListener("click", function () {
    // افتح مربع حوار لاختيار ملف الصورة
    document.getElementById("imageUploadInput").click();
});

// const setDrawableErasableProp = (drawable, value) => {
//     canvas.get(drawable)?.set({ erasable: value });

//   };

// Add event listeners to color circles
colorCircles.forEach(function (circle) {
    circle.addEventListener("click", function () {
        color = circle.style.backgroundColor;
        colorCircles.forEach(function (c) {
            c.style.border = "none";
        });
        // حصول على النص المحدد حالياً
        var activeObject = canvas.getActiveObject();

        // التحقق من أن النص المحدد هو نص
        if (activeObject && activeObject.type === "textbox") {
            // تحديث حجم الخط للنص المحدد
            activeObject.set({ fill: color });
            canvas.renderAll(); // إعادة رسم الكانفاس لتحديث التغيير
        }
        canvas.isDrawingMode = true;
        eraseEnabled = false;
        circle.style.border = "2px solid black";
        updateBrushColor(color);
        //  console.log(color);
    });
});

// Add event listener to brush size input
document.getElementById("brushSize").addEventListener("input", function () {
    updateBrushSize();
});

// استمع لتغييرات اختيار ملف الصورة
document
    .getElementById("imageUploadInput")
    .addEventListener("change", function (event) {
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
                    img.set({
                        left: 100, // تعيين موقع الصورة على الكانفاس
                        top: 100,
                        scaleX: 0.5, // تعيين مقياس الصورة
                        scaleY: 0.5,
                    });
                    canvas.add(img);
                });
            };
            reader.readAsDataURL(file);
        }
    });

// // Bind the redo function to a button
// document.getElementById('addRedo').addEventListener('click', redo);

document.getElementById("addUndo").addEventListener("click", undo);
document.getElementById("addRedo").addEventListener("click", redo);

addingLineBtn.addEventListener("click", activateAddingLine);

addingSingleArrowLineBtn.addEventListener(
    "click",
    activateAddingSingleArrowLine
);

addingDoubleArrowLineBtn.addEventListener(
    "click",
    activateAddingDoubleArrowLine
);

// Add an event listener for the minus button
minusButton.addEventListener("click", function () {
    var currentValue = parseInt(counterInput.value, 10);
    if (currentValue > 1) {
        counterInput.value = currentValue - 1;
    }
    // حصول على النص المحدد حالياً
    var activeObject = canvas.getActiveObject();

    // التحقق من أن النص المحدد هو نص
    if (activeObject && activeObject.type === "textbox") {
        // تحديث حجم الخط للنص المحدد
        activeObject.set({ fontSize: currentValue });
        canvas.renderAll(); // إعادة رسم الكانفاس لتحديث التغيير
    }
});

// Add an event listener for the plus button
plusButton.addEventListener("click", function () {
    var currentValue = parseInt(counterInput.value, 10);
    counterInput.value = currentValue + 1;
    // حصول على النص المحدد حالياً
    var activeObject = canvas.getActiveObject();

    // التحقق من أن النص المحدد هو نص
    if (activeObject && activeObject.type === "textbox") {
        // تحديث حجم الخط للنص المحدد
        activeObject.set({ fontSize: currentValue });
        canvas.renderAll(); // إعادة رسم الكانفاس لتحديث التغيير
    }
});
boldButton.addEventListener("click", function () {
    // حصول على النص المحدد حالياً
    var activeObject = canvas.getActiveObject();
    // التحقق من أن النص المحدد هو نص
    if (activeObject && activeObject.type === "textbox") {
        // تحديث حجم الخط للنص المحدد
        activeObject.set({
            fontWeight: activeObject.fontWeight === "bold" ? "normal" : "bold",
        });
        // Apply italic style if it's already italic
        if (activeObject.fontStyle === "italic") {
            activeObject.set({ fontStyle: "italic" });
        }
        if (activeObject.underline === true) {
            activeObject.set({ underline: true });
        }
        canvas.renderAll(); // إعادة رسم الكانفاس لتحديث التغيير
    }
});

normalButton.addEventListener("click", function () {
    // حصول على النص المحدد حالياً
    var activeObject = canvas.getActiveObject();

    // التحقق من أن النص المحدد هو نص
    if (activeObject && activeObject.type === "textbox") {
        // تحديث حجم الخط للنص المحدد
        activeObject.set({
            fontWeight:
                activeObject.fontWeight === "normal" ? "normal" : "normal",
        });
        if (activeObject.fontStyle === "italic") {
            activeObject.set({ fontStyle: "italic" });
        }
        if (activeObject.fontWeight === "bold") {
            activeObject.set({ fontWeight: "bold" });
        }
        if (activeObject.underline === true) {
            activeObject.set({ underline: true });
        }
        canvas.renderAll(); // إعادة رسم الكانفاس لتحديث التغيير
    }
});

italicButton.addEventListener("click", function () {
    // Get the currently selected text object
    var activeObject = canvas.getActiveObject();

    // Check if the selected object is a text object
    if (activeObject && activeObject.type === "textbox") {
        // Toggle between italic and not italic
        activeObject.set({
            fontStyle:
                activeObject.fontStyle === "italic" ? "normal" : "italic",
        });

        // Apply bold style if it's already bold
        if (activeObject.fontWeight === "bold") {
            activeObject.set({ fontWeight: "bold" });
        }
        if (activeObject.underline === true) {
            activeObject.set({ underline: true });
        }

        canvas.renderAll(); // Update the canvas to reflect the changes
    }
});

underlineButton.addEventListener("click", function () {
    // حصول على النص المحدد حالياً
    var activeObject = canvas.getActiveObject();

    // التحقق من أن النص المحدد هو نص
    if (activeObject && activeObject.type === "textbox") {
        // تحديث حجم الخط للنص المحدد
        activeObject.set({
            underline: activeObject.underline === true ? false : true,
        });
        if (activeObject.fontWeight === "bold") {
            activeObject.set({ fontWeight: "bold" });
        }
        if (activeObject.fontStyle === "italic") {
            activeObject.set({ fontStyle: "italic" });
        }

        canvas.renderAll(); // إعادة رسم الكانفاس لتحديث التغيير
    }
});

// إضافة حدث عند تغيير حجم الخط
document
    .getElementById("fontFamilySelect")
    .addEventListener("input", function () {
        var newFontFamily = this.value;

        // حصول على النص المحدد حالياً
        var activeObject = canvas.getActiveObject();

        // التحقق من أن النص المحدد هو نص
        if (activeObject && activeObject.type === "textbox") {
            // تحديث حجم الخط للنص المحدد
            activeObject.set({ fontFamily: newFontFamily });
            canvas.renderAll(); // إعادة رسم الكانفاس لتحديث التغيير
        }
    });

text.addEventListener("click", function () {
    // overlaytext.style.display = "block";
    // overlayshape.style.display = "none";
    // overlaycolor.style.display = "none";
    // overlayfile.style.display = "none";
    // canvas.isDrawingMode = false;
    temporaryDrawingEnabled = false;
    selectedShap = 5;
    isSquareDrawn = false;
    eraseEnabled = false;
    countIndex++;
    drawSquare(5);
});

drawStarButton.addEventListener("click", function () {
    canvas.isDrawingMode = false;
    selectedShap = 4;
    isSquareDrawn = false;
    eraseEnabled = false;
    temporaryDrawingEnabled = false;
    countIndex++;
    drawSquare(4);
});

drawTriangleButton.addEventListener("click", function () {
    canvas.isDrawingMode = false;
    selectedShap = 3;
    isSquareDrawn = false;
    temporaryDrawingEnabled = false;
    eraseEnabled = false;
    countIndex++;
    drawSquare(3);
});

drawCircleButton.addEventListener("click", function () {
    canvas.isDrawingMode = false;
    selectedShap = 2;
    isSquareDrawn = false;
    temporaryDrawingEnabled = false;
    eraseEnabled = false;
    countIndex++;
    drawSquare(2);
});

drawSquareButton.addEventListener("click", function () {
    canvas.isDrawingMode = false;
    selectedShap = 1;
    isSquareDrawn = false;
    temporaryDrawingEnabled = false;
    eraseEnabled = false;
    countIndex++;
    drawSquare(1);
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

// Add event listener to the zoom-in button
zoomInButton.addEventListener("click", zoomIn);

// Initial zoom level
// var zoomLevel = 1.0; // 100%

// Add event listener to the Zoom Out button
zoomOutButton.addEventListener("click", zoomOut);

pauseResumeRecordingButton.addEventListener("click", () => {
    if (isRecordingPaused) {
        // استئناف التسجيل
        mediaRecorder.resume();
        pauseResumeRecordingButton.src = "images/pausevideo.svg";
    } else {
        // إيقاف مؤقت للتسجيل
        mediaRecorder.pause();
        pauseResumeRecordingButton.src = "images/play.svg";
    }
    isRecordingPaused = !isRecordingPaused;
});

startRecordingButton.addEventListener("click", () => {
    startRecordingButton.disabled = true;
    stopRecordingButton.disabled = false;

    recordedChunks = [];

    navigator.mediaDevices
        .getDisplayMedia({ video: true })
        .then((videoStream) => {
            navigator.mediaDevices
                .getUserMedia({ audio: true })
                .then((audioStream) => {
                    audioStream.getTracks().forEach((track) => {
                        videoStream.addTrack(track);
                    });
                    mediaRecorder = new MediaRecorder(videoStream);

                    mediaRecorder.ondataavailable = (event) => {
                        if (event.data.size > 0) {
                            recordedChunks.push(event.data);
                        }
                    };
                    stopVideo.style.display = "block";
                    addVideo.style.display = "none";
                    pauseVideo.style.display = "block";
                    mediaRecorder.onstop = () => {
                        const blob = new Blob(recordedChunks, {
                            type: "video/webm",
                        });

                        // عرض مربع الحوار لتسمية الفيديو بعد الضغط على زر التحميل
                        dialog.style.display = "block";

                        confirmFilenameButton.addEventListener("click", () => {
                            const filename =
                                filenameInput.value || "recorded-video";

                            const url = URL.createObjectURL(blob);
                            const a = document.createElement("a");
                            a.style.display = "none";
                            a.href = url;
                            a.download = `${filename}.webm`;

                            document.body.appendChild(a);
                            a.click();
                            window.URL.revokeObjectURL(url);
                            document.body.removeChild(a);

                            // إخفاء مربع الحوار بعد التحميل
                            dialog.style.display = "none";
                        });
                    };

                    mediaRecorder.start();
                })
                .catch((audioError) => {
                    console.error("Error accessing audio:", audioError);
                });
        })
        .catch((error) => {
            console.error("حدث خطأ في الحصول على شاشة العرض:", error);
        });
});

stopRecordingButton.addEventListener("click", () => {
    stopVideo.style.display = "none";
    addVideo.style.display = "block";
    pauseVideo.style.display = "none";
    startRecordingButton.disabled = false;
    stopRecordingButton.disabled = true;

    mediaRecorder.stop();
});

cancelRecordingButton.addEventListener("click", () => {
    isRecording = false; // إلغاء التسجيل
    if (mediaRecorder.state === "recording") {
        mediaRecorder.stop();
    }
    dialog.style.display = "none"; // إخفاء مربع الحوار
});

exitButton.addEventListener("click", function () {
    customAlert.style.display = "block";
    grayBackground.style.display = "block"; // عرض الخلفية الرمادية
});

confirmExitButton.addEventListener("click", function () {
    customAlert.style.display = "none";
    clearCanvas();
    window.location.href = "srar.html";
});

cancelExitButton.addEventListener("click", function () {
    customAlert.style.display = "none";
    grayBackground.style.display = "none"; // اخفاء الخلفية الرمادية
});

// Function to clear the canvas
function clearCanvas() {
    canvas.clear();
}

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

let excelData = null; // Store workbook and sheet selector for later use

document.getElementById("pdf").addEventListener("click", function () {
    overlayshape.style.display = "none";
    overlaycolor.style.display = "none";
    overlaytext.style.display = "none";
    overlayfile.style.display = "none";
    // افتح مربع حوار لاختيار ملف الصورة
    document.getElementById("pdfInput").click();
});

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
        var noteText = new fabric.IText("اكتب هنا", {
            left: 350,
            top: 440,
            fontSize: 20,
            fill: "black",
            fontFamily: "Arial",
            fontWeight: "bold",
            lineHeight: 1.2,
            angle: 0,
            width: 200,
            direction: "rtl",
        });
        // Add the background image to the canvas first
        canvas.add(img);
        canvas.add(noteText);

        noteText.on("mousedown", function () {
            noteText.set({
                selectable: false,
                hasControls: true,
                editable: true,
            });
            canvas.renderAll(); // ادخل وضع تحرير النص
        });

        // Make the text object selected for editing
        canvas.setActiveObject(noteText);
        noteText.enterEditing(); // Enter text editing mode
    });
});

var savedCanvasData = localStorage.getItem("canvasData");

// Check if there is saved canvas data in local storage
if (savedCanvasData) {
    // If data exists, load it into the canvas
    canvas.loadFromJSON(savedCanvasData, function () {
        canvas.renderAll();
    });
}

// Add an event listener to save canvas data when the page is unloaded (e.g., on refresh or close)
window.addEventListener("beforeunload", function () {
    // Serialize the canvas data to JSON and store it in local storage
    var canvasData = JSON.stringify(canvas.toJSON());
    localStorage.setItem("canvasData", canvasData);
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

function handleAudioFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        // Set the audio source to the selected file
        audioSource.src = URL.createObjectURL(file);

        // Show the audio player
        myAudio.style.display = "block";

        // Load the audio
        myAudio.load();
        overlayaudio.style.display = "block";
    } else {
        // Hide the audio player if no file is selected
        myAudio.style.display = "none";
    }
}

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

window.addEventListener("mousemove", (e) => {
    if (isDragging) {
        const clickX = e.clientX - sliderBar.getBoundingClientRect().left;
        const sliderWidth = (clickX / sliderBar.clientWidth) * 100;
        sliderKnob.style.left = sliderWidth + "%";
    }
});

window.addEventListener("mouseup", () => {
    if (isDragging) {
        const sliderWidth = parseFloat(sliderKnob.style.left);
        const seekTime = (sliderWidth / 100) * audio.duration;
        audio.currentTime = seekTime;
        audio.play();
        isDragging = false;
    }
});

// Helper function to format time in MM:SS format
function formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}
