const toolbarItems = document.querySelectorAll(".toolbar_items");
const overlays = document.querySelectorAll(".overlay");
let box_item ;
let number_click = 0

toolbarItems.forEach((item) => {
    item.addEventListener("click", (event) => {
        if(item.id != 'text') isAddingText = false;

        if (box_item == item) number_click++
        else   number_click = 0

      
        if(number_click  > 0) {
            if(!item.nextElementSibling) return
            item.nextElementSibling.classList.toggle('show')
        }else {
            toolbarItems.forEach((item) => { item.classList.remove("active")})
            item.classList.add("active")
    
            overlays.forEach((overlay) => { overlay.classList.remove("show")});
    
            if(item.nextElementSibling) {
                if(!item.nextElementSibling.classList.contains('overlay')) return
                item.nextElementSibling.classList.add('show')
            }
        }
        box_item = item
        isMakeItErease = false
    })
});

document.querySelector(".canvas").addEventListener("click", () => {
});

var colorCircles = document.querySelectorAll(".overlaycolor .color-circle");
// Add event listeners to color circles

document.querySelectorAll("#toolbarcolortime .color-circle").forEach(function (circle) {
    circle.addEventListener("click", function () {
        color = circle.style.backgroundColor;
        document.querySelectorAll("#toolbarcolortime .color-circle").forEach(function (c) {
            c.classList.remove('border_2')
        });
        canvas.isDrawingMode = true;
        eraseEnabled = false;
        circle.classList.add('border_2')
        updateBrushColor(color);
        updateBrushSizeTime()
    });
});

document.querySelectorAll("#toolbarcolor .color-circle").forEach(function (circle) {
    circle.addEventListener("click", function () {
        color = circle.style.backgroundColor;
        document.querySelectorAll("#toolbarcolor .color-circle").forEach(function (c) {
            c.classList.remove('border_2')
        });
        canvas.isDrawingMode = true;
        eraseEnabled = false;
        circle.classList.add('border_2')
        
        updateBrushColor(color);
        updateBrushSize()
    });
});

document.querySelectorAll("#toolbartext .color-circle").forEach(function (circle) {
    circle.addEventListener("click", function () {
        color = circle.style.backgroundColor;
        document.querySelectorAll("#toolbartext .color-circle").forEach(function (c) {
            c.classList.remove('border_2')
        });
        var activeObject = canvas.getActiveObject();

              // التحقق من أن النص المحدد هو نص
        if (activeObject && activeObject.type === 'textbox') {
        // تحديث حجم الخط للنص المحدد
        activeObject.set({ fill: color });
        canvas.renderAll(); // إعادة رسم الكانفاس لتحديث التغيير
        }
        isAddingText = false;
        eraseEnabled = false;
        circle.classList.add('border_2')        
    });
});

document.querySelectorAll("#toolbarshape .color-circle").forEach(function (circle) {
    circle.addEventListener("click", function () {
        color = circle.style.backgroundColor;
        document.querySelectorAll("#toolbarshape .color-circle").forEach(function (c) {
            c.classList.remove('border_2')
        });
        // canvas.isDrawingMode = true;
        eraseEnabled = false;
        circle.classList.add('border_2')
        var activeObject = canvas.getActiveObject();


        var activeObject = canvas.getActiveObject();
              // التحقق من أن النص المحدد هو نص
        if (!activeObject) return
        if ( activeObject.type === 'triangle' || activeObject.type === 'circle' || activeObject.type === 'polygon' || activeObject.type === 'rect'  ) {
        // تحديث حجم الخط للنص المحدد
        activeObject.set({ fill: color });
        canvas.renderAll(); // إعادة رسم الكانفاس لتحديث التغيير
        }
        // // التحقق من أن النص المحدد هو نص
        // if (activeObject && activeObject.type === 'textbox') {
        // // تحديث حجم الخط للنص المحدد
        // activeObject.set({ fill: color });
        // canvas.renderAll(); // إعادة رسم الكانفاس لتحديث التغيير
        // }
        updateBrushColor(color);
        // updateBrushSize()
    });
});






// تعيين خلفية بيضاء للكانفا
canvas.backgroundColor = 'white';

// إنشاء معالج Hammer.js
const mc = new Hammer(canvas.upperCanvasEl);

// تمكين التقريب والتبعيد
mc.get('pinch').set({ enable: true });

// معالج للتقريب والتبعيد
mc.on('pinch', function (e) {
    const zoom = canvas.getZoom();
    const newZoom = zoom * e.scale;

    // تحديد حدود الزووم المسموح بها
    if (newZoom > 0.5 && newZoom < 5) {
        canvas.zoomToPoint({ x: e.center.x, y: e.center.y }, newZoom);
    }
});
