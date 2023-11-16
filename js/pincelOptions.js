
// Add event listener to brush size input
document.getElementById("brushSize").addEventListener("input", function () {
    let color;
    document.querySelectorAll('#toolbarcolor .color-circle').forEach(element => {
        if(element.classList.contains('border_2')) {
            console.log(element.style.backgroundColor)
            color = element.style.backgroundColor
        }
    })
    updateBrushSize()
    updateBrushColor(color);
});
document.getElementById('brushSizetime').addEventListener("input", function () {
    let color;
    document.querySelectorAll('#toolbarcolor .color-circle').forEach(element => {
        if(element.classList.contains('border_2')) {
            color = element.style.backgroundColor
        }
    })
    updateBrushSizeTime()
    updateBrushColor(color);
});
