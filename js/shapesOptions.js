


var startX, startY, shape;

let isCreatingTriangle = false;
let isCreatingCircle = false;
let  isCreatingSquare = false;
let isCreatingStar = false;


// let isCreatingStar = false;
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

      startX = options.e.clientX / zoomLevel ;
      startY = options.e.clientY / zoomLevel ;

      initialPoints = [
          { x: 160 / zoomLevel, y: 190 / zoomLevel },
          { x: 100 / zoomLevel, y: 150 / zoomLevel },
          { x: 40 / zoomLevel, y: 190 / zoomLevel },
          { x: 60 / zoomLevel, y: 115 / zoomLevel },
          { x: 0 / zoomLevel , y: 70  / zoomLevel},
          { x: 75 / zoomLevel, y: 60  / zoomLevel},
          { x: 100 / zoomLevel, y: 10  / zoomLevel},
          { x: 125 / zoomLevel, y: 60  / zoomLevel},
          { x: 200 / zoomLevel, y: 70  / zoomLevel},
          { x: 140 / zoomLevel, y: 115 / zoomLevel },
      ];

      star = new fabric.Polygon(initialPoints, {
          left: (startX - 150)   / zoomLevel,
          top: (startY  - 150)   / zoomLevel,
          fill: color,
          stroke: 'black',
          strokeWidth: 2,
          selectable: true,
      });

      startDrawing = true;
  }
});

// canvas.on('mouse:move', function (options) {
//   if (isCreatingStar && startDrawing) {
//       let currentX = options.e.clientX;
//       let currentY = options.e.clientY;
//       initialPoints = [
//         { x: 160, y: 290 },
//         { x: 100, y: 150 },
//         { x: 40, y: 190 },
//         { x: 60, y: 115 },
//         { x: 0, y: 70 },
//         { x: 75, y: 60 },
//         { x: 100, y: 10 },
//         { x: 125, y: 60 },
//         { x: 200, y: 70 },
//         { x: 140, y: 115 },
//     ];
//     star.set( star.set({ points: initialPoints }) )
//       canvas.renderAll();
//   }
// });

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

    canvas.on('mouse:down', function (options) {
        console.log(zoomLevel)
        let color;
        document.querySelectorAll('#toolbarshape .color-circle').forEach(element => {
            if (element.classList.contains('border_2')) {
                color = element.style.backgroundColor
            }
        })
        if (!color) {
            color = 'transparent'
        }
        if (isCreatingTriangle) {
            startX = options.e.clientX / zoomLevel;
            startY = options.e.clientY / zoomLevel;

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

            canvas.add(triangles[countTriangles]);
        }
    });

    canvas.on('mouse:move', function (options) {
        if (isCreatingTriangle) {
            if (triangles[countTriangles]) {
                var width = options.e.clientX / zoomLevel - startX;
                var height = options.e.clientY / zoomLevel - startY;

                // Manually set the position based on the initial click point
                console.log('width' , width)
                console.log()
                triangles[countTriangles].set({
                    left: width > 0 ? startX : options.e.clientX / zoomLevel,
                    top: height > 0 ? startY : options.e.clientY / zoomLevel,
                    width: Math.abs(width),
                    height: Math.abs(height),
                });

                canvas.renderAll();
            }
        }
    });

    canvas.on('mouse:up', function () {
        if (isCreatingTriangle) {
            // saveCanvasState()
            isCreatingTriangle = false;
            canvas.selection = true;
            canvas.defaultCursor = 'default';
            canvas.hoverCursor = 'default';
            canvas.setActiveObject(triangles[countTriangles]);
            countTriangles++;
            document.getElementById("select").click()
        }
    });
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

    canvas.on('mouse:down', function (options) {
        let color;
        document.querySelectorAll('#toolbarshape .color-circle').forEach(element => {
            if (element.classList.contains('border_2')) {
                color = element.style.backgroundColor
            }
        })
        if (!color) {
            color = 'transparent'
        }
        if (isCreatingCircle) {
            startX = options.e.clientX / zoomLevel;
            startY = options.e.clientY / zoomLevel;

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
    });

    canvas.on('mouse:move', function (options) {
        if (isCreatingCircle) {
            if (circles[countCircles]) {
                // Calculate the average of horizontal and vertical distances
                var radius = Math.abs((options.e.clientX  / zoomLevel - startX) + (options.e.clientY / zoomLevel - startY)) / 2;

                circles[countCircles].set({
                    radius: radius,
                });

                canvas.renderAll();
            }
        }
    });

    canvas.on('mouse:up', function () {
        if (isCreatingCircle) {
            // saveCanvasState()
            isCreatingCircle = false;
            canvas.selection = true;
            canvas.defaultCursor = 'default';
            canvas.hoverCursor = 'default';
            canvas.setActiveObject(circles[countCircles]);
            countCircles++;
            document.getElementById("select").click()
        }
    });
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

    canvas.on('mouse:down', function (options) {
        let color;
        document.querySelectorAll('#toolbarshape .color-circle').forEach(element => {
            if (element.classList.contains('border_2')) {
                color = element.style.backgroundColor
            }
        })
        if (!color) {
            color = 'transparent'
        }
        if (isCreatingSquare) {
            startX = options.e.clientX / zoomLevel;
            startY = options.e.clientY / zoomLevel;

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
    });

    canvas.on('mouse:move', function (options) {
        if (isCreatingSquare) {
            if (squares[countSquares]) {
                var width = options.e.clientX / zoomLevel - startX;
                var height = options.e.clientY / zoomLevel - startY;
                // var height = options.e.clientY - startY;

                var sideLength = Math.min(Math.abs(width), Math.abs(height));

                // Calculate the correct position based on the mouse movement
                squares[countSquares].set({
                    left: width > 0 ? startX : options.e.clientX / zoomLevel,
                    top: height > 0 ? startY : options.e.clientY / zoomLevel,
                    width: sideLength,
                    height: sideLength,
                });

                canvas.renderAll();
            }
        }
    });

    canvas.on('mouse:up', function () {
        if (isCreatingSquare) {
            // saveCanvasState()
            isCreatingSquare = false;
            canvas.selection = true;
            canvas.defaultCursor = 'default';
            canvas.hoverCursor = 'default';
            canvas.setActiveObject(squares[countSquares]);
            countSquares++;
            document.getElementById("select").click()

        }
    });
});


addingLineBtn.addEventListener("click", activateAddingLine);

addingSingleArrowLineBtn.addEventListener("click",activateAddingSingleArrowLine);

addingDoubleArrowLineBtn.addEventListener("click",activateAddingDoubleArrowLine);


