
exitButton.addEventListener("click", function () {
    customAlert.classList.add('show_model');
    grayBackground.style.display = "block"; // عرض الخلفية الرمادية
});

confirmExitButton.addEventListener("click", function () {
    pagesData = {};
    customAlert.classList.remove('show_model');
    canvas.clear()
    endSetionGoOut = true
    window.location.href = "https://huzmh.sa/login?returnUrl=%2Fhome";
});


cancelExitButton.addEventListener("click", function () {
    customAlert.classList.remove('show_model');
    grayBackground.style.display = "none"; // اخفاء الخلفية الرمادية
});
