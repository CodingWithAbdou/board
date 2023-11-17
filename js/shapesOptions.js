

var isCreatingShape = false;
var startX, startY, shape;

drawStarButton.addEventListener("click", function () {
    isDrawing = true

    canvas.isDrawingMode = false;
    selectedShap = 4;
    isSquareDrawn = false;
    eraseEnabled = false;
    temporaryDrawingEnabled = false;
    countIndex++;
    drawSquare(4);
    // let star
    // let isCreatingStar = true;
    // canvas.selection = false;
    // canvas.defaultCursor = 'crosshair';
    // canvas.hoverCursor = 'crosshair';

   
    //     canvas.on('mouse:down', function (options) {
    //       if (isCreatingStar) {
    //         startX = options.e.clientX;
    //         startY = options.e.clientY;
    //         var starPoints = [
    //           { x: 100, y: 10 }, // Top point
    //           { x: 125, y: 60 }, // Upper-right point
    //           { x: 200, y: 70 }, // Right point
    //           { x: 140, y: 115 }, // Lower-right point
    //           { x: 160, y: 190 }, // Bottom point
    //           { x: 100, y: 150 }, // Bottom-left point
    //           { x: 40, y: 190 }, // Lower-left point
    //           { x: 60, y: 115 }, // Lower-right point
    //           { x: 0, y: 70 }, // Left point
    //           { x: 75, y: 60 }, // Upper-left point
    //       ];
    //       star = new fabric.Polygon(starPoints, {
    //           left: startX,
    //           top: startY,
    //           fill: color,
    //           strokeWidth: 2,
    //           selectable: false,
    //       });
    //       canvas.add(star);

    //       }
    //     });
  
        // canvas.on('mouse:move', function (options) {
        //   if (isCreatingStar) {
        //     if (star) {
        //       var width = options.e.clientX - startX;
        //       var height = options.e.clientY - startY;
  
        //       star.set({
        //         width: width,
        //         height: height,
        //       });
  
        //       canvas.renderAll();
        //     }
        //   }
        // });
  
        // canvas.on('mouse:up', function () {
        //   if (isCreatingStar) {
        //     isCreatingStar = false;
        //     canvas.selection = true;
        //     canvas.defaultCursor = 'default';
        //     canvas.hoverCursor = 'default';
        //     canvas.add(star)
        //   }
        // });

   

    // var star;
    // var originalPoints = [
    //   { x: 100, y: 10 },
    //   { x: 125, y: 60 },
    //   { x: 200, y: 70 },
    //   { x: 140, y: 115 },
    //   { x: 160, y: 190 },
    //   { x: 100, y: 150 },
    //   { x: 40, y: 190 },
    //   { x: 60, y: 115 },
    //   { x: 0, y: 70 },
    //   { x: 75, y: 60 },
    // ];

    // var center = calculateCenter(originalPoints);
    // var distance = 50; // Initial distance
    // var isDrawing = false;

    // // Create a star with the original points
    // star = new fabric.Polygon(originalPoints, {
    //   fill: 'black',
    //   stroke: 'black',
    //   strokeWidth: 2,
    //   selectable: false
    // });

    // // Listen for mouse down event
    // canvas.on('mouse:down', function () {
    //   isDrawing = true;
    //   canvas.defaultCursor = 'crosshair';
    // });

    // // Listen for mouse move event
    // canvas.on('mouse:move', function (options) {
    //   if (isDrawing) {
    //     var mouseX = options.e.clientX;
    //     var mouseY = options.e.clientY;

    //     // Calculate the new distance based on the mouse position
    //     distance = calculateDistance(center.x, center.y, mouseX, mouseY);

    //     // Update the points with the new distance
    //     var newPoints = changeDistance(originalPoints, distance);

    //     // Update the fabric.Polygon with the new points
    //     star.set({ points: newPoints });
    //     canvas.renderAll();
    //   }
    // });

    // // Listen for mouse up event
    // canvas.on('mouse:up', function () {
    //   isDrawing = false;
    //   canvas.defaultCursor = 'default';
    // });

    // // Function to calculate the center of a polygon
    // function calculateCenter(points) {
    //   var centerX = points.reduce((sum, point) => sum + point.x, 0) / points.length;
    //   var centerY = points.reduce((sum, point) => sum + point.y, 0) / points.length;
    //   return { x: centerX, y: centerY };
    // }

    // // Function to calculate the distance between two points
    // function calculateDistance(x1, y1, x2, y2) {
    //   return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    // }

    // // Function to adjust the distance for each point
    // function changeDistance(points, distance) {
    //   var center = calculateCenter(points);

    //   // Adjust the distance for each point
    //   points.forEach(function (point) {
    //     var angle = Math.atan2(point.y - center.y, point.x - center.x);
    //     point.x = center.x + distance * Math.cos(angle);
    //     point.y = center.y + distance * Math.sin(angle);
    //   });

    //   return points;
    // }

    });
   
  


drawTriangleButton.addEventListener("click", function () {
    // activateShapeCreation('triangle')
    // isDrawing = true

    // canvas.isDrawingMode = false;
    // selectedShap = 3;
    // isSquareDrawn = false;
    // temporaryDrawingEnabled = false;
    // eraseEnabled = false;
    // countIndex++;
    // drawSquare(3);

    let triangle;
    isCreatingTriangle = true;
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
        color = 'black'
    }
        if (isCreatingTriangle) {
          startX = options.e.clientX;
          startY = options.e.clientY;

          triangle = new fabric.Triangle({
            left: startX,
            top: startY,
            width: 0,
            height: 0,
            fill: 'transparent',
            fill : color,
            strokeWidth: 2,
            selectable: true,
          });

          canvas.add(triangle);
        }
      });

      canvas.on('mouse:move', function (options) {
        if (isCreatingTriangle) {
          if (triangle) {
            var width = options.e.clientX - startX;
            var height = options.e.clientY - startY;

            triangle.set({
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
        }
      });
});

drawCircleButton.addEventListener("click", function () {
  var circle;
  var isCreatingCircle = true;
  
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
        color = 'black'
    }
    if (isCreatingCircle) {
      startX = options.e.clientX;
      startY = options.e.clientY;
  
      circle = new fabric.Circle({
        left: startX,
        top: startY,
        radius: 0,
        fill: color,
        strokeWidth: 2,
        selectable: true,
      });
  
      canvas.add(circle);
    }
  });
  
  canvas.on('mouse:move', function (options) {
    if (isCreatingCircle) {
      if (circle) {
        var radius = Math.sqrt(
          Math.pow(options.e.clientX - startX, 2) +
          Math.pow(options.e.clientY - startY, 2)
        );
  
        circle.set({
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
    }
  });
  });

drawSquareButton.addEventListener("click", function () {
    // activateShapeCreation('square')
    // isDrawing = true

    // canvas.isDrawingMode = false;
    // selectedShap = 1;
    // isSquareDrawn = false;
    // temporaryDrawingEnabled = false;
    // eraseEnabled = false;
    // countIndex++;
    // drawSquare(1);
    let rectangle;
    isCreatingRectangle = true;
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
            color = 'black'
        }
        if (isCreatingRectangle) {
          startX = options.e.clientX;
          startY = options.e.clientY;

          rectangle = new fabric.Rect({
            left: startX,
            top: startY,
            width: 0,
            height: 0,
            fill : color,
            strokeWidth: 2,
            selectable: true,
          });

          canvas.add(rectangle);
        }
      });

      canvas.on('mouse:move', function (options) {
        if (isCreatingRectangle) {
          if (rectangle) {
            var width = options.e.clientX - startX;
            var height = options.e.clientY - startY;

            rectangle.set({
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

        }
      });

});


addingLineBtn.addEventListener("click", activateAddingLine);

addingSingleArrowLineBtn.addEventListener("click",activateAddingSingleArrowLine);

addingDoubleArrowLineBtn.addEventListener("click",activateAddingDoubleArrowLine);
