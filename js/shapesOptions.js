


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

      startX = options.e.clientX;
      startY = options.e.clientY;

      initialPoints = [
          { x: 100, y: 10 },
          { x: 125, y: 60 },
          { x: 200, y: 70 },
          { x: 140, y: 115 },
          { x: 160, y: 190 },
          { x: 100, y: 150 },
          { x: 40, y: 190 },
          { x: 60, y: 115 },
          { x: 0, y: 70 },
          { x: 75, y: 60 }
      ];

      initialCenter = {
          x: startX,
          y: startY
      };

      star = new fabric.Polygon(initialPoints, {
          left: initialCenter.x,
          top: initialCenter.y,
          fill: color,
          stroke: 'black',
          strokeWidth: 2,
          selectable: true,
      });

      canvas.add(star);
      startDrawing = true;
  }
});

canvas.on('mouse:move', function (options) {
  if (isCreatingStar && startDrawing) {
      let currentX = options.e.clientX;
      let currentY = options.e.clientY;

      let deltaX = currentX - startX;
      let deltaY = currentY - startY;

      // Calculate the distance between the initial and current points
      let currentDistance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

      // Adjust the scale factor based on the change in distance
      let scaleFactor = currentDistance / initialDistances;

      // Set the new scale factor for the star
      star.set({
          scaleX: scaleFactor,
          scaleY: scaleFactor,
      });

      canvas.renderAll();
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
            startX = options.e.clientX;
            startY = options.e.clientY;

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
                var width = options.e.clientX - startX;
                var height = options.e.clientY - startY;

                // Manually set the position based on the initial click point
                triangles[countTriangles].set({
                    left: width > 0 ? startX : options.e.clientX,
                    top: height > 0 ? startY : options.e.clientY,
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
            startX = options.e.clientX;
            startY = options.e.clientY;

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
                var radius = Math.abs((options.e.clientX - startX) + (options.e.clientY - startY)) / 2;

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
            startX = options.e.clientX;
            startY = options.e.clientY;

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
                var width = options.e.clientX - startX;
                var height = options.e.clientY - startY;
                // var height = options.e.clientY - startY;

                var sideLength = Math.min(Math.abs(width), Math.abs(height));

                // Calculate the correct position based on the mouse movement
                squares[countSquares].set({
                    left: width > 0 ? startX : options.e.clientX,
                    top: height > 0 ? startY : options.e.clientY,
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


