
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
    if ((e.key === 'z' || e.key === 'Z'  || e.key === 'ئ') && (e.altKey)) {
        document.getElementById("addUndo").click()
    }

    if ((e.key === 'm' || e.key === 'M' || e.key === 'ة') && (e.altKey)) {
        document.getElementById("select").click()
    }

    
    if ((e.key === 't' || e.key === 'T'  || e.key === 'ف') && (e.altKey)) {
        document.getElementById("text").click()
    }

    if ((e.key === 'P' || e.key === 'p' || e.key === 'ح') && (e.altKey)) {
        document.getElementById("pencil").click()
    }
    if (e.key === ' ' || e.code === 'Space') {
        let hand = document.getElementById("hand")
        if(!hand.classList.contains('active')) {
            document.getElementById("hand").click()           
        }
    }
})


document.addEventListener('keyup', function (e) {
    if (e.key === ' ' || e.code === 'Space') {
        let select = document.getElementById("select")
        if(!select.classList.contains('active')) {
            document.getElementById("select").click()           
        }
    } 
})

document.addEventListener('mousemove', function(event) {
    lastMouseCoords = {x:event.clientX , y:event.clientY}
});

document.addEventListener('keydown', function (event) {
    if (!event.altKey)return     
    if (event.key === '+' || event.key === '=') {
        zoom(0.1, lastMouseCoords);
    }
    if (event.key === '-'  || event.key === ')') {
        zoom(-0.1, lastMouseCoords);
    }
});

document.addEventListener('keydown', function (event) {
    if (!event.ctrlKey)return     
    if (event.key === 'Enter') {
        document.getElementById('btn-Pages').click()
    }
    if (event.key === 'ArrowLeft') {
        document.querySelector('.prev_canvas.btn_controll').click()
    }
    if (event.key === 'ArrowRight') {
        document.querySelector('.next_canvas.btn_controll ').click()
    }
});
