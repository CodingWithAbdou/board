

var isCreatingShape = false;

var startX, startY, shape;

let countStars = 0;

drawStarButton.addEventListener("click", function () {
    let stars = [];
    isCreatingStar = true;
    isCreatingCircle = false;
    isCreatingRectangle = false;

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
            isCreatingStar = false;
            canvas.selection = true;
            canvas.defaultCursor = 'default';
            canvas.hoverCursor = 'default';
            countStars++;
        }
    });
});


let countTriangles = 0;
drawTriangleButton.addEventListener("click", function () {
    let triangles =[];
    isCreatingTriangle = true;
    isCreatingCircle = false;
    isCreatingRectangle = false;

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
          isCreatingTriangle = false;
          canvas.selection = true;
          canvas.defaultCursor = 'default';
          canvas.hoverCursor = 'default';
          countTriangles++;
        }
      });
});
let countCircles = 0;

drawCircleButton.addEventListener("click", function () {
  var circle;
  let  circles = []
  var isCreatingCircle = true;
  
  isCreatingTriangle = false;
  isCreatingRectangle = false;


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
      isCreatingCircle = false;
      canvas.selection = true;
      canvas.defaultCursor = 'default';
      canvas.hoverCursor = 'default';
      countCircles++
    }
  });
  });
  let countRectangles = 0;

drawSquareButton.addEventListener("click", function () {
    let rectangles = [];
    isCreatingRectangle = true;
    isCreatingTriangle = false;
    isCreatingCircle = false;

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
          isCreatingRectangle = false;
          canvas.selection = true;
          canvas.defaultCursor = 'default';
          canvas.hoverCursor = 'default';
          countRectangles++
        }
      });

});

addingLineBtn.addEventListener("click", activateAddingLine);

addingSingleArrowLineBtn.addEventListener("click",activateAddingSingleArrowLine);

addingDoubleArrowLineBtn.addEventListener("click",activateAddingDoubleArrowLine);
