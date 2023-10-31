
exitButton.addEventListener("click", function () {
    customAlert.style.display = "block";
    grayBackground.style.display = "block"; // عرض الخلفية الرمادية
});

confirmExitButton.addEventListener("click", function () {
    customAlert.style.display = "none";
    clearCanvas();
    window.location.href = "srar.html";
});

cancelExitButton.addEventListener("click", function () {
    customAlert.style.display = "none";
    grayBackground.style.display = "none"; // اخفاء الخلفية الرمادية
});
