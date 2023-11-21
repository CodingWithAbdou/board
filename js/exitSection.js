
exitButton.addEventListener("click", function () {
    customAlert.style.display = "block";
    grayBackground.style.display = "block"; // عرض الخلفية الرمادية
});

confirmExitButton.addEventListener("click", function () {
    pagesData = {};
    customAlert.style.display = "none";
    canvas.clear()
    endSetionGoOut = true
    window.location.href = "https://huzmh.sa/login?returnUrl=%2Fhome";
});


cancelExitButton.addEventListener("click", function () {
    customAlert.style.display = "none";
    grayBackground.style.display = "none"; // اخفاء الخلفية الرمادية
});
