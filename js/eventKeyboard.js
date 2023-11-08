
document.addEventListener('keydown', function (e) {
    if (e.keyCode === 46 || e.keyCode === 8) {
        const activeObject = canvas.getActiveObject();
        if (activeObject) {
            canvas.remove(activeObject);
            canvas.renderAll();
        }
    }
});