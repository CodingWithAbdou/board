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
document.getElementById("fontFamilySelect").addEventListener("input", function () {
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