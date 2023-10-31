
startRecordingButton.addEventListener("click", () => {
    startRecordingButton.disabled = true;
    stopRecordingButton.disabled = false;

    recordedChunks = [];

    navigator.mediaDevices
        .getDisplayMedia({ video: true })
        .then((videoStream) => {
            navigator.mediaDevices
                .getUserMedia({ audio: true })
                .then((audioStream) => {
                    audioStream.getTracks().forEach((track) => {
                        videoStream.addTrack(track);
                    });
                    mediaRecorder = new MediaRecorder(videoStream);

                    mediaRecorder.ondataavailable = (event) => {
                        if (event.data.size > 0) {
                            recordedChunks.push(event.data);
                        }
                    };
                    stopVideo.style.display = "block";
                    addVideo.style.display = "none";
                    pauseVideo.style.display = "block";
                    mediaRecorder.onstop = () => {
                        const blob = new Blob(recordedChunks, {
                            type: "video/webm",
                        });

                        // عرض مربع الحوار لتسمية الفيديو بعد الضغط على زر التحميل
                        dialog.style.display = "block";

                        confirmFilenameButton.addEventListener("click", () => {
                            const filename =
                                filenameInput.value || "recorded-video";

                            const url = URL.createObjectURL(blob);
                            const a = document.createElement("a");
                            a.style.display = "none";
                            a.href = url;
                            a.download = `${filename}.webm`;

                            document.body.appendChild(a);
                            a.click();
                            window.URL.revokeObjectURL(url);
                            document.body.removeChild(a);

                            // إخفاء مربع الحوار بعد التحميل
                            dialog.style.display = "none";
                        });
                    };

                    mediaRecorder.start();
                })
                .catch((audioError) => {
                    console.error("Error accessing audio:", audioError);
                });
        })
        .catch((error) => {
            console.error("حدث خطأ في الحصول على شاشة العرض:", error);
        });
});

stopRecordingButton.addEventListener("click", () => {
    stopVideo.style.display = "none";
    addVideo.style.display = "block";
    pauseVideo.style.display = "none";
    startRecordingButton.disabled = false;
    stopRecordingButton.disabled = true;

    mediaRecorder.stop();
});

cancelRecordingButton.addEventListener("click", () => {
    isRecording = false; // إلغاء التسجيل
    if (mediaRecorder.state === "recording") {
        mediaRecorder.stop();
    }
    dialog.style.display = "none"; // إخفاء مربع الحوار
});

pauseResumeRecordingButton.addEventListener("click", () => {
    if (isRecordingPaused) {
        // استئناف التسجيل
        mediaRecorder.resume();
        pauseResumeRecordingButton.src = "images/pausevideo.svg";
    } else {
        // إيقاف مؤقت للتسجيل
        mediaRecorder.pause();
        pauseResumeRecordingButton.src = "images/play.svg";
    }
    isRecordingPaused = !isRecordingPaused;
});
