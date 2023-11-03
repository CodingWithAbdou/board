
document.addEventListener('keydown', (event) => {
    const key = event.key; 
    if (key === "Delete") {
        toggleEraseMode()
    }
});