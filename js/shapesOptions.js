


var startX, startY, shape;

let isCreatingTriangle = false;
let isCreatingCircle = false;
let  isCreatingSquare = false;
let isCreatingStar = false;


let startDrawing = false;
let star, initialPoints, initialCenter, initialDistances;


drawStarButton.addEventListener("click", function () {
  isCreatingStar = true;
  isCreatingTriangle = false;
  isCreatingCircle = false;
  isCreatingSquare = false;

  canvas.selection = false;
  canvas.defaultCursor = 'crosshair';
  canvas.hoverCursor = 'crosshair';
});

canvas.on('mouse:down', function (options) {
  if (isCreatingStar) {
      let color;
      document.querySelectorAll('#toolbarshape .color-circle').forEach(element => {
          if (element.classList.contains('border_2')) {
              color = element.style.backgroundColor;
          }
      });

      if (!color) {
          color = 'transparent';
      }

      startX = options.absolutePointer.x ;
      startY = options.absolutePointer.y ;
      console.log(options)
      initialPoints = [
          { x: 160 , y: 190  },
          { x: 100 , y: 150  },
          { x: 40 , y: 190  },
          { x: 60 , y: 115  },
          { x: 0  , y: 70  },
          { x: 75 , y: 60  },
          { x: 100 , y: 10  },
          { x: 125 , y: 60  },
          { x: 200 , y: 70  },
          { x: 140 , y: 115  },
      ];

      star = new fabric.Polygon(initialPoints, {
          left: startX  - 120 ,
          top: startY - 120  ,
          fill: color,
          stroke: 'black',
          strokeWidth: 2,
          selectable: true,
      });

      startDrawing = true;
  }
});

canvas.on('mouse:up', function () {
  if (isCreatingStar && startDrawing) {
      // saveCanvasState();
      isCreatingStar = false;
      canvas.selection = true;
      canvas.defaultCursor = 'default';
      canvas.hoverCursor = 'default';
      startDrawing = false;
      canvas.add(star);
      document.getElementById("select").click()
  }
});


let countTriangles = 0;
let triangles = [];

drawTriangleButton.addEventListener("click", function () {
    isCreatingTriangle = true;
    isCreatingCircle = false;
    isCreatingSquare = false;
    isCreatingStar = false;

    canvas.selection = false;
    canvas.defaultCursor = 'crosshair';
    canvas.hoverCursor = 'crosshair';

    function getPointerCoordinates(event) {
        if (event.e.touches && event.e.touches[0]) {
            // Touch event
            return {
                x: event.e.touches[0].clientX / zoomLevel,
                y: event.e.touches[0].clientY / zoomLevel
            };
        } else {
            // Mouse event
            return {
                x: event.e.clientX / zoomLevel,
                y: event.e.clientY / zoomLevel
            };
        }
    }

    function handleStart(event) {
        let color;
        document.querySelectorAll('#toolbarshape .color-circle').forEach(element => {
            if (element.classList.contains('border_2')) {
                color = element.style.backgroundColor;
            }
        });
        if (!color) {
            color = 'transparent';
        }

        if (isCreatingTriangle) {
            const pointer = getPointerCoordinates(event);
            startX = pointer.x;
            startY = pointer.y;

            triangles[countTriangles] = new fabric.Triangle({
                left: startX,
                top: startY,
                width: 0,
                height: 0,
                fill: color,
                stroke: 'black',
                strokeWidth: 2,
                selectable: true,
            });

            triangles[countTriangles].customId = 'has_remove_btn';

            canvas.add(triangles[countTriangles]);
            canvas.setActiveObject(triangles[countTriangles]);
        }
    }

    function handleMove(event) {
        if (isCreatingTriangle) {
            const pointer = getPointerCoordinates(event);

            if (triangles[countTriangles]) {
                var width = pointer.x - startX;
                var height = pointer.y - startY;

                triangles[countTriangles].set({
                    left: width > 0 ? startX : pointer.x,
                    top: height > 0 ? startY : pointer.y,
                    width: Math.abs(width > height ? width : height),
                    height: Math.abs(width > height ? width : height),
                });

                canvas.renderAll();
            }
        }
    }

    function handleEnd(event) {
        if (isCreatingTriangle) {
            isCreatingTriangle = false;
            canvas.selection = true;
            canvas.defaultCursor = 'default';
            canvas.hoverCursor = 'default';
            canvas.setActiveObject(triangles[countTriangles]);
            countTriangles++;
            document.getElementById("select").click();
        }
    }

    // Mouse events
    canvas.on('mouse:down', handleStart);
    canvas.on('mouse:move', handleMove);
    canvas.on('mouse:up', handleEnd);
});

let countCircles = 0;
let circles = [];

drawCircleButton.addEventListener("click", function () {
    isCreatingCircle = true;
    isCreatingTriangle = false;
    isCreatingSquare = false;
    isCreatingStar = false;

    canvas.selection = false;
    canvas.defaultCursor = 'crosshair';
    canvas.hoverCursor = 'crosshair';

    function getPointerCoordinates(event) {
        if (event.e.touches && event.e.touches[0]) {
            // Touch event
            return {
                x: event.e.touches[0].clientX / zoomLevel,
                y: event.e.touches[0].clientY / zoomLevel
            };
        } else {
            // Mouse event
            return {
                x: event.e.clientX / zoomLevel,
                y: event.e.clientY / zoomLevel
            };
        }
    }

    function handleStart(event) {
        let color;
        document.querySelectorAll('#toolbarshape .color-circle').forEach(element => {
            if (element.classList.contains('border_2')) {
                color = element.style.backgroundColor;
            }
        });
        if (!color) {
            color = 'transparent';
        }
        if (isCreatingCircle) {
            const pointer = getPointerCoordinates(event);
            startX = pointer.x;
            startY = pointer.y;

            circles[countCircles] = new fabric.Circle({
                left: startX,
                top: startY,
                radius: 0,
                fill: color,
                stroke: 'black',
                strokeWidth: 2,
                selectable: true,
            });

            canvas.add(circles[countCircles]);
        }
    }

    function handleMove(event) {
        if (isCreatingCircle) {
            const pointer = getPointerCoordinates(event);

            if (circles[countCircles]) {
                // Calculate the average of horizontal and vertical distances
                var radius = Math.abs((pointer.x - startX) + (pointer.y - startY)) / 2;

                circles[countCircles].set({
                    radius: radius,
                });

                canvas.renderAll();
            }
        }
    }

    function handleEnd(event) {
        if (isCreatingCircle) {
            isCreatingCircle = false;
            canvas.selection = true;
            canvas.defaultCursor = 'default';
            canvas.hoverCursor = 'default';
            canvas.setActiveObject(circles[countCircles]);
            countCircles++;
            document.getElementById("select").click();
        }
    }

    // Mouse events
    canvas.on('mouse:down', handleStart);
    canvas.on('mouse:move', handleMove);
    canvas.on('mouse:up', handleEnd);
});

let countSquares = 0;
let squares = [];

drawSquareButton.addEventListener("click", function () {
    isCreatingSquare = true;
    isCreatingTriangle = false;
    isCreatingCircle = false;
    isCreatingStar = false;

    canvas.selection = false;
    canvas.defaultCursor = 'crosshair';
    canvas.hoverCursor = 'crosshair';

    function getPointerCoordinates(event) {
        if (event.e.touches && event.e.touches[0]) {
            // Touch event
            return {
                x: event.e.touches[0].clientX / zoomLevel,
                y: event.e.touches[0].clientY / zoomLevel
            };
        } else {
            // Mouse event
            return {
                x: event.e.clientX / zoomLevel,
                y: event.e.clientY / zoomLevel
            };
        }
    }

    function handleStart(event) {
        let color;
        document.querySelectorAll('#toolbarshape .color-circle').forEach(element => {
            if (element.classList.contains('border_2')) {
                color = element.style.backgroundColor;
            }
        });
        if (!color) {
            color = 'transparent';
        }
        if (isCreatingSquare) {
            const pointer = getPointerCoordinates(event);
            startX = pointer.x;
            startY = pointer.y;

            squares[countSquares] = new fabric.Rect({
                left: startX,
                top: startY,
                width: 0,
                height: 0,
                fill: color,
                stroke: 'black',
                strokeWidth: 2,
                selectable: true,
            });

            canvas.add(squares[countSquares]);
        }
    }

    function handleMove(event) {
        if (isCreatingSquare) {
            const pointer = getPointerCoordinates(event);

            if (squares[countSquares]) {
                var width = pointer.x - startX;
                var height = pointer.y - startY;
                var sideLength = Math.min(Math.abs(width), Math.abs(height));

                squares[countSquares].set({
                    left: width > 0 ? startX : pointer.x,
                    top: height > 0 ? startY : pointer.y,
                    width: sideLength,
                    height: sideLength,
                });

                canvas.renderAll();
            }
        }
    }

    function handleEnd(event) {
        if (isCreatingSquare) {
            isCreatingSquare = false;
            canvas.selection = true;
            canvas.defaultCursor = 'default';
            canvas.hoverCursor = 'default';
            canvas.setActiveObject(squares[countSquares]);
            countSquares++;
            document.getElementById("select").click();
        }
    }

    // Mouse events
    canvas.on('mouse:down', handleStart);
    canvas.on('mouse:move', handleMove);
    canvas.on('mouse:up', handleEnd);

    // Touch events
    canvas.on('touch:gesture', function (event) {
        // Handle pinch zoom or other gestures if needed
    });

    canvas.on('touch:drag', handleMove);

    canvas.on('touch:up', handleEnd);
});



addingLineBtn.addEventListener("click", activateAddingLine);

addingSingleArrowLineBtn.addEventListener("click",activateAddingSingleArrowLine);

addingDoubleArrowLineBtn.addEventListener("click",activateAddingDoubleArrowLine);


