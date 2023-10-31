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
    canvas.on("mouse:move", function (event) {
        if (isMouseDown) {
            if (eraseEnabled && event.target) {
                canvas.remove(event.target); // Remove the clicked object
            }
            if (isErasing) {
                eraseEnabled = false;
                const { offsetX, offsetY } = event.e;
                lastMouseX = offsetX;
                lastMouseY = offsetY;
            }
        }
    });
}

// Function to update brush color
function updateBrushColor(color) {
    canvas.freeDrawingBrush.color = color;
}

// Function to update brush size
function updateBrushSize() {
    var brushSize = document.getElementById("brushSize");
    canvas.freeDrawingBrush.width = parseInt(brushSize.value, 10);
}

function undo() {
    if (canvas._objects.length > 0) {
        h.push(canvas._objects.pop());
        canvas.renderAll();
    }
}
function redo() {
    if (h.length > 0) {
        isRedoing = true;
        canvas.add(h.pop());
    }
}

function activateAddingLine() {
    overlaytext.style.display = "none";
    overlayshape.style.display = "block";
    overlaycolor.style.display = "none";
    overlayfile.style.display = "none";
    canvas.isDrawingMode = false;
    temporaryDrawingEnabled = false;
    isSquareDrawn = true;
    addingSingleArrowLineBtnClicked = false;
    if (addingLineBtnClicked === false) {
        addingLineBtnClicked = true;

        canvas.on({
            "mouse:down": startAddingLine,
            "mouse:move": startDrawingLine,
            "mouse:up": stopDrawingLine,
        });
        canvas.selection = false;
        canvas.hoverCursor = "auto";
        objectSelectabilty(false);
    }
}

function startAddingLine(o) {
    mouseDown = true;
    let pointer = canvas.getPointer(o.e);
    line = new fabric.Line([pointer.x, pointer.y, pointer.x, pointer.y], {
        id: "linearrow",
        stroke: color,
        strokeWidth: 3,
        selectable: false,
        hasControls: false,
    });

    canvas.add(line);
    canvas.requestRenderAll();
}
function startDrawingLine(o) {
    if (mouseDown === true) {
        let pointer = canvas.getPointer(o.e);
        line.set({
            x2: pointer.x,
            y2: pointer.y,
        });

        line.setCoords();
        canvas.requestRenderAll();
    }
}

function stopDrawingLine() {
    if (mouseDown) {
        mouseDown = false;

        canvas.off({
            "mouse:down": startAddingLine,
            "mouse:move": startDrawingLine,
            "mouse:up": stopDrawingLine,
        });
        // Reset the drawing mode flag
        addingLineBtnClicked = false;
        canvas.selection = true;
        canvas.hoverCursor = "auto";
        objectSelectabilty(true);
        canvas.requestRenderAll();
    }
}

function objectSelectabilty(value) {
    canvas.getObjects().forEach((o) => {
        o.set({
            selectable: value,
        });
    });
}

function activateAddingSingleArrowLine() {
    overlaytext.style.display = "none";
    overlayshape.style.display = "block";
    overlaycolor.style.display = "none";
    overlayfile.style.display = "none";
    canvas.isDrawingMode = false;
    isSquareDrawn = true;
    temporaryDrawingEnabled = false;
    addingLineBtnClicked = false;
    if (addingSingleArrowLineBtnClicked === false) {
        addingSingleArrowLineBtnClicked = true;

        canvas.on({
            "mouse:down": startAddingSingleArrowLine,
            "mouse:move": startDrawingSingleArrowLine,
            "mouse:up": stopDrawingSingleArrowLine,
        });
        canvas.selection = false;
        canvas.hoverCursor = "auto";
        objectSelectabilty(false);
    }
}

function startAddingSingleArrowLine(o) {
    mouseDown = true;
    let pointer = canvas.getPointer(o.e);
    line = new fabric.Line([pointer.x, pointer.y, pointer.x, pointer.y], {
        id: "linearrow",
        stroke: color,
        strokeWidth: 3,
        selectable: false,
        hasControls: false,
    });
    arrowHead1 = new fabric.Polygon(
        [
            { x: 0, y: 0 },
            { x: -20, y: -10 },
            { x: -20, y: 10 },
        ],
        {
            id: "arrow-head",
            stroke: color,
            strokeWidth: 3,
            fill: color,
            selectable: false,
            hasControls: false,
            top: pointer.y,
            left: pointer.x,
            originX: "center",
            originY: "center",
        }
    );
    canvas.add(line, arrowHead1);
    canvas.requestRenderAll();
}
function startDrawingSingleArrowLine(o) {
    if (mouseDown === true) {
        let pointer = canvas.getPointer(o.e);
        line.set({
            x2: pointer.x,
            y2: pointer.y,
        });
        arrowHead1.set({
            left: pointer.x,
            top: pointer.y,
        });
        let x1 = line.x1;
        let y1 = line.y1;
        let x2 = pointer.x;
        let y2 = pointer.y;

        let verticalHeight = Math.abs(y2 - y1);
        let horizontalWidth = Math.abs(x2 - x1);

        let tanRatio = verticalHeight / horizontalWidth;
        let basicAngle = (Math.atan(tanRatio) * 180) / Math.PI;

        if (x2 > x1) {
            if (y2 < y1) {
                arrowHead1.set({
                    angle: -basicAngle,
                });
            } else if (y2 === y1) {
                arrowHead1.set({
                    angle: 0,
                });
            } else if (y2 > y1) {
                arrowHead1.set({
                    angle: basicAngle,
                });
            }
        } else if (x2 < x1) {
            if (y2 > y1) {
                arrowHead1.set({
                    angle: 180 - basicAngle,
                });
            } else if (y2 === y1) {
                arrowHead1.set({
                    angle: 180,
                });
            } else if (y2 < y1) {
                arrowHead1.set({
                    angle: 180 + basicAngle,
                });
            }
        }
        line.setCoords();
        arrowHead1.setCoords();
        canvas.requestRenderAll();
    }
}

function stopDrawingSingleArrowLine() {
    if (mouseDown) {
        mouseDown = false;

        canvas.off({
            "mouse:down": startAddingSingleArrowLine,
            "mouse:move": startDrawingSingleArrowLine,
            "mouse:up": stopDrawingSingleArrowLine,
        });
        // Reset the drawing mode flag
        addingSingleArrowLineBtnClicked = false;
        canvas.selection = true;
        canvas.hoverCursor = "auto";
        objectSelectabilty(false);
        canvas.requestRenderAll();
    }
}

function activateAddingDoubleArrowLine() {
    overlaytext.style.display = "none";
    overlayshape.style.display = "block";
    overlaycolor.style.display = "none";
    overlayfile.style.display = "none";
    canvas.isDrawingMode = false;
    isSquareDrawn = true;
    addingLineBtnClicked = false;
    temporaryDrawingEnabled = false;
    if (addingDoubleArrowLineBtnClicked === false) {
        addingDoubleArrowLineBtnClicked = true;

        canvas.on({
            "mouse:down": startAddingDoubleArrowLine,
            "mouse:move": startDrawingDoubleArrowLine,
            "mouse:up": stopDrawingDoubleArrowLine,
        });
        canvas.selection = false;
        canvas.hoverCursor = "auto";
        objectSelectabilty(false);
    }
}

function startAddingDoubleArrowLine(o) {
    mouseDown = true;
    let pointer = canvas.getPointer(o.e);
    line = new fabric.Line([pointer.x, pointer.y, pointer.x, pointer.y], {
        id: "linearrow",
        stroke: color,
        strokeWidth: 3,
        selectable: false,
        hasControls: false,
    });
    arrowHead1 = new fabric.Polygon(
        [
            { x: 0, y: 0 },
            { x: -20, y: -10 },
            { x: -20, y: 10 },
        ],
        {
            id: "arrow-head",
            stroke: color,
            strokeWidth: 3,
            fill: color,
            selectable: false,
            hasControls: false,
            top: pointer.y,
            left: pointer.x,
            originX: "center",
            originY: "center",
        }
    );
    arrowHead2 = new fabric.Polygon(
        [
            { x: 0, y: 0 },
            { x: -20, y: -10 },
            { x: -20, y: 10 },
        ],
        {
            id: "arrow-head",
            stroke: color,
            strokeWidth: 3,
            fill: color,
            selectable: false,
            hasControls: false,
            top: pointer.y,
            left: pointer.x,
            originX: "center",
            originY: "center",
        }
    );
    canvas.add(line, arrowHead1, arrowHead2);
    canvas.requestRenderAll();
}
function startDrawingDoubleArrowLine(o) {
    if (mouseDown === true) {
        let pointer = canvas.getPointer(o.e);
        line.set({
            x2: pointer.x,
            y2: pointer.y,
        });
        arrowHead1.set({
            left: pointer.x,
            top: pointer.y,
        });
        arrowHead2.set({
            left: pointer.x,
            top: pointer.y,
        });
        let x1 = line.x1;
        let y1 = line.y1;
        let x2 = pointer.x;
        let y2 = pointer.y;

        let verticalHeight = Math.abs(y2 - y1);
        let horizontalWidth = Math.abs(x2 - x1);

        let tanRatio = verticalHeight / horizontalWidth;
        let basicAngle = (Math.atan(tanRatio) * 180) / Math.PI;

        if (x2 > x1) {
            if (y2 < y1) {
                arrowHead1.set({
                    angle: -basicAngle,
                });
                arrowHead2.set({
                    angle: -basicAngle,
                });
            } else if (y2 === y1) {
                arrowHead1.set({
                    angle: 0,
                });
                arrowHead2.set({
                    angle: 0,
                });
            } else if (y2 > y1) {
                arrowHead1.set({
                    angle: basicAngle,
                });
                arrowHead2.set({
                    angle: basicAngle,
                });
            }
        } else if (x2 < x1) {
            if (y2 > y1) {
                arrowHead1.set({
                    angle: 180 - basicAngle,
                });
                arrowHead2.set({
                    angle: 180 - basicAngle,
                });
            } else if (y2 === y1) {
                arrowHead1.set({
                    angle: 180,
                });
                arrowHead2.set({
                    angle: 180,
                });
            } else if (y2 < y1) {
                arrowHead1.set({
                    angle: 180 + basicAngle,
                });
                arrowHead2.set({
                    angle: 180 + basicAngle,
                });
            }
        }
        line.setCoords();
        arrowHead1.setCoords();
        arrowHead2.setCoords();
        canvas.requestRenderAll();
    }
}

function stopDrawingDoubleArrowLine() {
    if (mouseDown) {
        mouseDown = false;

        canvas.off({
            "mouse:down": startAddingDoubleArrowLine,
            "mouse:move": startDrawingDoubleArrowLine,
            "mouse:up": stopDrawingDoubleArrowLine,
        });
        // Reset the drawing mode flag
        addingDoubleArrowLineBtnClicked = false;
        canvas.selection = true;
        canvas.hoverCursor = "auto";
        objectSelectabilty(false);
        canvas.requestRenderAll();
    }
}
// Function to zoom in
function zoomIn() {
    zoomLevel += 0.1; // Increase zoom level by 10%
    canvas.setZoom(zoomLevel);
    canvas.renderAll(); // Redraw the canvas
}

// Function to zoom out
function zoomOut() {
    zoomLevel -= 0.1; // Decrease zoom level by 10%
    if (zoomLevel < 0.1) {
        zoomLevel = 0.1; // Set a minimum zoom level
    }
    canvas.setZoom(zoomLevel);
    canvas.renderAll(); // Redraw the canvas
}

function clearCanvas() {
    canvas.clear();
}

function showModal() {
    linkModal.style.display = "block";
    grayBackground.style.display = "block";
    grayBackground.style.zIndex = 0;
}

function closeModal() {
    linkModal.style.display = "none";
    grayBackground.style.display = "none";
}
function addLink() {
    var linkTitle = document.getElementById("linkTitle").value;
    var linkURL = document.getElementById("linkURL").value;
    isSquareDrawn = true;
    canvas.isDrawingMode = false;
    var linkText = new fabric.Text(linkTitle, {
        left: 200,
        top: 300,
        fontSize: 25,
        fontWeight: "bold",
        fill: "#008CF7",
        underline: true,
    });

    linkText.on("mousedown", function (event) {
        canvas.selection = true;
        if (event.e.detail === 2) {
            window.open(linkURL, "_blank");
        }
    });

    canvas.add(linkText);
    closeModal();
}

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: "array" });
            // Display available sheet names to the user
            const sheetNames = workbook.SheetNames;
            // Clear previous sheets
            excelSheetsContainer.innerHTML = "";
            sheetNames.forEach((sheetName) => {
                // Create a div for each sheet
                const sheetDiv = document.createElement("div");
                sheetDiv.classList.add("sheet");
                sheetDiv.textContent = sheetName;
                sheetDiv.setAttribute("data-sheet", sheetName); // Add data-sheet attribute
                sheetDiv.addEventListener("click", () =>
                    toggleSheetSelection(sheetName)
                );
                excelSheetsContainer.appendChild(sheetDiv);
                overlayexcel.style.display = "block";
                overlaypdf.style.display = "none";
            });
            // Store the workbook for later use
            excelData = { workbook };
        };
        reader.readAsArrayBuffer(file);
    }
}

function toggleSheetSelection(sheetName) {
    const index = selectedSheetNames.indexOf(sheetName);
    if (index === -1) {
        selectedSheetNames.push(sheetName);
    } else {
        selectedSheetNames.splice(index, 1);
    }

    // Update the style of the clicked sheet div
    const sheetDiv = document.querySelector(
        `.sheet[data-sheet="${sheetName}"]`
    );
    sheetDiv.classList.toggle("selected", index === -1);

    // Find the corresponding sheet on the canvas
    const selectedSheet = renderedSheets.find(
        (sheet) => sheet.name === sheetName
    );
    if (selectedSheet) {
        // If the sheet is selected, add borders
        selectedSheet.set({
            hasBorders: index === -1,
            borderColor: "blue", // You can customize the border color here
        });
        canvas.renderAll();
    }
}

function renderExcelToCanvas() {
    if (!excelData) {
        alert("Please select an Excel file and at least one sheet.");
        return;
    }
    // Clear the canvas
    // canvas.clear();
    renderedSheets = []; // Clear the rendered sheets array
    selectedSheetNames.forEach((sheetName) => {
        const sheet = excelData.workbook.Sheets[sheetName];
        if (sheet) {
            renderSheetToCanvas(sheet, sheetName);
        }
    });
}

function renderSheetToCanvas(sheet, sheetName) {
    // Convert sheet data to an array of objects
    const sheetData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    // Define cell dimensions and styling
    const cellWidth = 100;
    const cellHeight = 50;
    const cellFontSize = 18;
    const cellFillColor = "white";
    const cellStrokeColor = "black";

    // Create a new Fabric.js group for this sheet
    const sheetGroup = new fabric.Group([], {
        left: 100,
        top: 100,
        selectable: true,
        hasControls: true,
        hasBorders: false,
        hoverCursor: "move",
        name: sheetName, // Set a unique name for this sheet group
    });

    // Render each cell content on the sheet group
    sheetData.forEach((row, rowIndex) => {
        row.forEach((cellData, colIndex) => {
            // Calculate cell position
            const left = colIndex * cellWidth;
            const top = rowIndex * cellHeight;

            // Create cell rectangle
            const cell = new fabric.Rect({
                left,
                top,
                width: cellWidth,
                height: cellHeight,
                fill: cellFillColor,
                stroke: cellStrokeColor,
                strokeWidth: 1,
                selectable: false, // Cells should not be selectable individually
            });

            // Create cell text
            const text = new fabric.Text(cellData.toString(), {
                left: left + cellWidth / 2,
                top: top + cellHeight / 2,
                fontSize: cellFontSize,
                fill: "black",
                originX: "center",
                originY: "center",
                selectable: false, // Text should not be selectable individually
            });

            // Add cell and text to the sheet group
            sheetGroup.addWithUpdate(cell);
            sheetGroup.addWithUpdate(text);
        });
    });

    // Add the sheet group to the canvas and store it in the renderedSheets array
    canvas.add(sheetGroup);
    renderedSheets.push(sheetGroup);
}
// Function to create a page preview
function createPagePreview(pageNumber) {
    // Create the page preview div
    var pagePreview = document.createElement("div");
    pagePreview.classList.add("page-preview");
    pagePreview.dataset.pageNumber = pageNumber;
    pagePreview.textContent = pageNumber;

    // Add click event to select the page
    pagePreview.addEventListener("click", function () {
        // Remove the 'selected' class from other previews
        var previews = pagePreviews.getElementsByClassName("page-preview");
        var pageNumber = parseInt(this.dataset.pageNumber, 10);
        var index = selectedPage.indexOf(pageNumber);
        if (index === -1) {
            // Page not selected, so add it to the array
            selectedPage.push(pageNumber);
            this.classList.add("selected");
        } else {
            // Page already selected, so remove it from the array
            selectedPage.splice(index, 1);
            this.classList.remove("selected");
        }

        // Enable the "Add Page" button if any pages are selected
        if (selectedPage.length > 0) {
            addPageButton.removeAttribute("disabled");
        } else {
            addPageButton.setAttribute("disabled", "disabled");
        }
    });

    return pagePreview;
}