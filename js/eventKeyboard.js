
document.addEventListener('keydown', function (e) {
    if (e.keyCode === 46 ) {
        const activeObjects = canvas.getActiveObjects();

        if (activeObjects && activeObjects.length > 0) {
            activeObjects.forEach(object => {
                canvas.remove(object);
            });
    
            canvas.discardActiveObject();
            canvas.renderAll();
        }
    }

});