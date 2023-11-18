


var startX, startY, shape;

let countStars = 0;
let stars = [];

let isCreatingTriangle = false;
let isCreatingCircle = false;
let  isCreatingRectangle = false;
let isCreatingStar = false;

drawStarButton.addEventListener("click", function () {
     isCreatingStar = true;
    isCreatingCircle = false;
    isCreatingRectangle = false;
    isCreatingTriangle = false 
    canvas.selection = false;
    canvas.defaultCursor = 'crosshair';
    canvas.hoverCursor = 'crosshair';

    canvas.on('mouse:down', function (options) {
        let color;
        document.querySelectorAll('#toolbarshape .color-circle').forEach(element => {
            if (element.classList.contains('border_2')) {
                color = element.style.backgroundColor;
            }
        });
        if (!color) {
            color = 'transparent';
        }
        if (isCreatingStar) {
            let starPoints = [
                { x: 100, y: 10 }, // Top point
                { x: 125, y: 60 }, // Upper-right point
                { x: 200, y: 70 }, // Right point
                { x: 140, y: 115 }, // Lower-right point
                { x: 160, y: 190 }, // Bottom point
                { x: 100, y: 150 }, // Bottom-left point
                { x: 40, y: 190 }, // Lower-left point
                { x: 60, y: 115 }, // Lower-right point
                { x: 0, y: 70 }, // Left point
                { x: 75, y: 60 } // Upper-left point
            ];

            stars[countStars] = new fabric.Polygon(starPoints, {
                left: options.e.clientX,
                top: options.e.clientY,
                fill: color,
                stroke: 'black',
                strokeWidth: 2,
                selectable: true
            });

            canvas.add(stars[countStars]);
        }
    });

    canvas.on('mouse:move', function (options) {
        if (isCreatingStar) {
            if (stars[countStars]) {
                let offsetX = options.e.clientX - stars[countStars].left;
                let offsetY = options.e.clientY - stars[countStars].top;

                let starPoints = [
                    { x: 100, y: 10 }, // Top point
                    { x: 125, y: 60 }, // Upper-right point
                    { x: 200, y: 70 }, // Right point
                    { x: 140, y: 115 }, // Lower-right point
                    { x: 160, y: 190 }, // Bottom point
                    { x: 100, y: 150 }, // Bottom-left point
                    { x: 40, y: 190 }, // Lower-left point
                    { x: 60, y: 115 }, // Lower-right point
                    { x: 0, y: 70 }, // Left point
                    { x: 75, y: 60 } // Upper-left point
                ];

                starPoints = starPoints.map(point => ({
                    x: point.x + offsetX,
                    y: point.y + offsetY
                }));

                stars[countStars].set({
                    points: starPoints
                });

                canvas.renderAll();
            }
        }
    });

    canvas.on('mouse:up', function () {
        if (isCreatingStar) {
            saveCanvasState()
            isCreatingStar = false;
            canvas.selection = true;
            canvas.defaultCursor = 'default';
            canvas.hoverCursor = 'default';
            canvas.setActiveObject(stars[countStars]);
            countStars++;
        }
    });

    return isCreatingStar
});


let countTriangles = 0;
let triangles =[];
drawTriangleButton.addEventListener("click", function () {
    isCreatingTriangle = true;
    isCreatingCircle = false;
    isCreatingRectangle = false;
    isCreatingStar = false;

      canvas.selection = false;
      canvas.defaultCursor = 'crosshair';
      canvas.hoverCursor = 'crosshair';

      canvas.on('mouse:down', function (options) {
        let color;
    document.querySelectorAll('#toolbarshape .color-circle').forEach(element => {
        if(element.classList.contains('border_2')) {
            color = element.style.backgroundColor
        }
    })
    if(!color){
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
            fill : color,
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

            triangles[countTriangles].set({
              width: width,
              height: height,
            });

            canvas.renderAll();
          }
        }
      });

      canvas.on('mouse:up', function () {
        if (isCreatingTriangle) {
          saveCanvasState()
          isCreatingTriangle = false;
          canvas.selection = true;
          canvas.defaultCursor = 'default';
          canvas.hoverCursor = 'default';
          canvas.setActiveObject(triangles[countTriangles]);
          countTriangles++;
        }
      });
});
let countCircles = 0;
let  circles = []

drawCircleButton.addEventListener("click", function () {
   isCreatingCircle = true;
  
  isCreatingTriangle = false;
  isCreatingRectangle = false;
  isCreatingStar = false;


  canvas.selection = false;
  canvas.defaultCursor = 'crosshair';
  canvas.hoverCursor = 'crosshair';
  
  canvas.on('mouse:down', function (options) {
    let color;
    document.querySelectorAll('#toolbarshape .color-circle').forEach(element => {
        if(element.classList.contains('border_2')) {
            color = element.style.backgroundColor
        }
    })
    if(!color){
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
        stroke : 'black' ,
        strokeWidth: 2,
        selectable: true,
      });
  
      canvas.add(circles[countCircles]);
    }
  });
  
  canvas.on('mouse:move', function (options) {
    if (isCreatingCircle) {
      if (circles[countCircles]) {
        var radius = Math.sqrt(
          Math.pow(options.e.clientX - startX, 2) +
          Math.pow(options.e.clientY - startY, 2)
        );
  
        circles[countCircles].set({
          radius: radius,
        });
  
        canvas.renderAll();
      }
    }
  });
  
  canvas.on('mouse:up', function () {
    if (isCreatingCircle) {
      saveCanvasState()
      isCreatingCircle = false;
      canvas.selection = true;
      canvas.defaultCursor = 'default';
      canvas.hoverCursor = 'default';
      canvas.setActiveObject(circles[countCircles]);
      countCircles++
    }
  });
  });
  let countRectangles = 0;
  let rectangles = [];

drawSquareButton.addEventListener("click", function () {
     isCreatingRectangle = true;
    isCreatingTriangle = false;
    isCreatingCircle = false;
    isCreatingStar = false;

      canvas.selection = false;
      canvas.defaultCursor = 'crosshair';
      canvas.hoverCursor = 'crosshair';
      canvas.on('mouse:down', function (options) {
        // ++
        let color;
        document.querySelectorAll('#toolbarshape .color-circle').forEach(element => {
            if(element.classList.contains('border_2')) {
                color = element.style.backgroundColor
            }
        })
        if(!color){
            color = 'transparent'
        }
        if (isCreatingRectangle) {
          startX = options.e.clientX;
          startY = options.e.clientY;

          rectangles[countRectangles] = new fabric.Rect({
            left: startX,
            top: startY,
            width: 0,
            height: 0,
            fill : color,
            stroke : 'black' ,
            strokeWidth: 2,
            selectable: true,
          });
          canvas.add(rectangles[countRectangles]);
        }
      });

      canvas.on('mouse:move', function (options) {
        if (isCreatingRectangle) {
          if (rectangles[countRectangles]) {
            var width = options.e.clientX - startX;
            var height = options.e.clientY - startY;

            rectangles[countRectangles].set({
              width: width,
              height: height,
            });

            canvas.renderAll();
          }
        }
      });

      canvas.on('mouse:up', function () {
        if (isCreatingRectangle) {
          saveCanvasState()
          isCreatingRectangle = false;
          canvas.selection = true;
          canvas.defaultCursor = 'default';
          canvas.hoverCursor = 'default';
          canvas.setActiveObject(rectangles[countRectangles]);

          countRectangles++
        }
      });

});

addingLineBtn.addEventListener("click", activateAddingLine);

addingSingleArrowLineBtn.addEventListener("click",activateAddingSingleArrowLine);

addingDoubleArrowLineBtn.addEventListener("click",activateAddingDoubleArrowLine);
