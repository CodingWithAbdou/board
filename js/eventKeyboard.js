
document.addEventListener('keydown', function (e) {
    if (e.keyCode === 46 || e.keyCode === 8) {
        const activeObject = canvas.getActiveObject();
        if (activeObject) {
            if (activeObject.type === 'path') {
                canvas.remove(activeObject);
            } else {
                activeObject.getObjects().forEach(function (obj) {
                    canvas.remove(obj);
                });
            }

            canvas.renderAll();
        }
    }

});