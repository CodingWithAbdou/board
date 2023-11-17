let mediaRecorder;
let isRecordingPaused = false;
let isSave = true;

const startRecordingButton = document.getElementById('startRecording');
const stopRecordingButton = document.getElementById('stopRecording');
const pauseResumeRecordingButton = document.getElementById('pauseRecording');
const stopVideo = document.getElementById('stopVideo');
const addVideo = document.getElementById('addVideo');
const pauseVideo = document.getElementById('pauseVideo');
const closeVideo = document.getElementById('closeVideo');

const filenameInput = document.getElementById('filenameInput');
const confirmFilenameButton = document.getElementById('confirmFilename');
const cancelRecordingButton = document.getElementById('closeVideo');
const dialog = document.getElementById('dialog');

startRecordingButton.addEventListener('click', async () => {
  startRecordingButton.disabled = true;
  stopRecordingButton.disabled = false;
  isSave = true;

  await navigator.mediaDevices
    .getDisplayMedia({
      video: true,
    })
    .then((videoStream) => {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((audioStream) => {
          audioStream.getTracks().forEach((track) => {
            videoStream.addTrack(track);
          });
          let mimeType = 'video/mp4';
          mediaRecorder = createRecorder(videoStream, mimeType);
        })
        .catch((audioError) => {
          console.error('Error accessing audio:', audioError);
        });
    })
    .catch((error) => {
      console.error('حدث خطأ في الحصول على شاشة العرض:', error);
    });
});

stopRecordingButton.addEventListener('click', () => {
  mediaRecorder.stop();
});

pauseResumeRecordingButton.addEventListener('click', () => {
  if (isRecordingPaused) {
    // استئناف التسجيل
    mediaRecorder.resume();
    pauseResumeRecordingButton.src = 'images/pausevideo.svg';
  } else {
    // إيقاف مؤقت للتسجيل
    mediaRecorder.pause();
    pauseResumeRecordingButton.src = 'images/play.svg';
  }
  isRecordingPaused = !isRecordingPaused;
});

cancelRecordingButton.addEventListener('click', () => {
  if (mediaRecorder.state === 'recording') {
    isSave = false;
    mediaRecorder.stop();
  }
});

const createRecorder = (stream, mimeType) => {
  // the stream data is stored in this array
  let recordedChunks = [];

  const mediaRecorder = new MediaRecorder(stream);

  mediaRecorder.ondataavailable = function (e) {
    if (e.data.size > 0) {
      recordedChunks.push(e.data);
    }
  };
  stopVideo.style.display = 'block';
  addVideo.style.display = 'none';
  pauseVideo.style.display = 'block';
  closeVideo.style.display = 'block';

  mediaRecorder.onstop = () => {
    if (isSave) {
      saveFile(recordedChunks);
    }

    stopVideo.style.display = 'none';
    addVideo.style.display = 'block';
    pauseVideo.style.display = 'none';
    closeVideo.style.display = 'none';
    startRecordingButton.disabled = false;
    stopRecordingButton.disabled = true;
    recordedChunks = [];
    // stream.getTracks()[0].stop();
    stream.getTracks().forEach((track) => track.stop());
  };

  stream.getVideoTracks()[0].addEventListener('ended', () => {
    stream.getTracks().forEach((track) => track.stop());
    console.log('The user has ended sharing the screen');
  });
  mediaRecorder.start(200); // For every 200ms the stream data will be stored in a separate chunk.
  return mediaRecorder;
};

const saveFile = (recordedChunks) => {
  const blob = new Blob(recordedChunks, {
    type: 'video/mp4',
  });
  // عرض مربع الحوار لتسمية الفيديو بعد الضغط على زر التحميل
  // dialog.style.display = 'block';
  // confirmFilenameButton.addEventListener('click', () => {
  let filename = window.prompt('ادخل اسم الملف') || 'recorded-video',
    // const filename = filenameInput.value  'recorded-video';
    downloadLink = document.createElement('a');
  downloadLink.href = URL.createObjectURL(blob);
  downloadLink.download =` ${filename}.mp4`;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  URL.revokeObjectURL(blob); // clear from memory
  document.body.removeChild(downloadLink);
  // dialog.style.display = 'none';
  // });
};