// Add an event listener for the minus button
minusButton.addEventListener("click", function () {
    // isAddingText = false;

    var currentValue = parseInt(counterInput.value, 10);
    if (currentValue > 1) {
        currentValue = parseInt(counterInput.value, 10) -1 
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
    // isAddingText = false;

    var currentValue = parseInt(counterInput.value, 10) + 1;
    // حصول على النص المحدد حالياً
    var activeObject = canvas.getActiveObject();

    counterInput.value = currentValue ;
    // التحقق من أن النص المحدد هو نص
    if (activeObject && activeObject.type === "textbox") {
        // تحديث حجم الخط للنص المحدد
        activeObject.set({ fontSize: currentValue  });
        canvas.renderAll(); // إعادة رسم الكانفاس لتحديث التغيير
    }
});

boldButton.addEventListener("click", function () {
    // isAddingText = false;

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
        // isAddingText = false;

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
    // isAddingText = false;

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
    // isAddingText = false;
    console.log('ok')
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
let textDirection = 'leftToRight';

// document.getElementById('align').addEventListener("click", function () {
//     var activeObject = canvas.getActiveObject();
//     console.log(activeObject)
//     if (activeObject && activeObject.type === "textbox") {
//         // textDirection = (textDirection === 'leftToRight') ? 'rightToLeft' : 'leftToRight';
//         canvas.renderAll(); 
//     }
// });


let fontFamily = 'Arial'
// إضافة حدث عند تغيير حجم الخط
document.getElementById("fontFamilySelect").addEventListener("input", function () {
    // isAddingText = false;
    fontFamily =  this.value ; 
    // حصول على النص المحدد حالياً
    var activeObject = canvas.getActiveObject();
    // التحقق من أن النص المحدد هو نص
    if (activeObject && activeObject.type === "textbox") {
        
        activeObject.set({ fontFamily: fontFamily });
        canvas.renderAll(); // إعادة رسم الكانفاس لتحديث التغيير
    }
    return fontFamily;
});