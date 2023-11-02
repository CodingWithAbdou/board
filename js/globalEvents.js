
toolbarItems.forEach((item) => {
    item.addEventListener("click", () => {
        console.log('hi')
        let bool;
        if (item.querySelector(".overlay"))
            bool = item.querySelector(".overlay").classList.contains("show");

        toolbarItems.forEach((item) => {
            item.classList.remove("active");
        });
        overlays.forEach((overlay) => {
            overlay.classList.remove("show");
        });
        item.classList.add("active");
        if (item.querySelector(".overlay")) {
            if (bool) item.querySelector(".overlay").classList.remove("show");
            else item.querySelector(".overlay").classList.add("show");
        }
    });
});

document.querySelector(".canvas").addEventListener("click", () => {
    overlays.forEach((overlay) => {
        overlay.classList.remove("show");
    });
});

// Add event listeners to color circles
colorCircles.forEach(function (circle) {
    circle.addEventListener("click", function () {
        color = circle.style.backgroundColor;
        colorCircles.forEach(function (c) {
            c.style.border = "none";
        });
        // حصول على النص المحدد حالياً
        var activeObject = canvas.getActiveObject();

        // التحقق من أن النص المحدد هو نص
        if (activeObject && activeObject.type === "textbox") {
            // تحديث حجم الخط للنص المحدد
            activeObject.set({ fill: color });
            canvas.renderAll(); // إعادة رسم الكانفاس لتحديث التغيير
        }
        canvas.isDrawingMode = true;
        eraseEnabled = false;
        circle.style.border = "2px solid black";
        updateBrushColor(color);
        //  console.log(color);
    });
});



window.addEventListener("mousemove", (e) => {
    if (isDragging) {
        const clickX = e.clientX - sliderBar.getBoundingClientRect().left;
        const sliderWidth = (clickX / sliderBar.clientWidth) * 100;
        sliderKnob.style.left = sliderWidth + "%";
    }
});

window.addEventListener("mouseup", () => {
    if (isDragging) {
        const sliderWidth = parseFloat(sliderKnob.style.left);
        const seekTime = (sliderWidth / 100) * audio.duration;
        audio.currentTime = seekTime;
        audio.play();
        isDragging = false;
    }
});
