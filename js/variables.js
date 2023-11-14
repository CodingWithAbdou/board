
var protectedImages = [];

// document.getElementById('btn-Pages').addEventListener('click' , ()=> {
//   number_page
// })

var isDrawing = false;
var isSquareDrawn = false; // متغير لتتبع ما إذا كان المربع قد رُسم بالفعل
var startPosition = { x: 0, y: 0 };
var listShape = []; // الاشكال الهندسية
var isLocked = false;
let countIndex = 0;
var shape = [1, 2, 3, 4, 5];
// 1 مربع
// 2 دائرة
// 3 مثلث
// 4 نجمة
//5 text

let selectedShap = shape[0];




/// get element from dom 

var lock = document.getElementById("lock");
var drawSquareButton = document.getElementById("square");
var drawCircleButton = document.getElementById("circle");
var drawTriangleButton = document.getElementById("triangle");
var drawStarButton = document.getElementById("star");

let addingSingleArrowLineBtnClicked = false;
var addingSingleArrowLineBtn = document.getElementById("linearrow");
let addingDoubleArrowLineBtnClicked = false;
var addingDoubleArrowLineBtn = document.getElementById("linetwoarrow");
let addingLineBtnClicked = false;
var addingLineBtn = document.getElementById("lineshape");
let line;
let arrowHead1;
let mouseDown = false;
var eraseEnabled = false;

var isErasing = false;
isMouseDown = false;
let lastMouseX, lastMouseY;
let eraserSize = 50;

var overlayshape = document.getElementById("toolbarshape");
var overlaycolor = document.getElementById("toolbarcolor");
var overlaytext = document.getElementById("toolbartext");
var overlayfile = document.getElementById("toolbarfile");
var overlaypdf = document.getElementById("toolbarpdf");
var overlayexcel = document.getElementById("toolbarexcel");

var boxcolor = document.getElementById("boxcolor");
var color = "#FF0000";
var colorCircles = document.querySelectorAll(".color-circle");

var isRedoing = false;
var h = [];
var shapes = document.getElementById("shape");

var files = document.getElementById("file");

var text = document.getElementById("text");
// var fontSizeInput = document.getElementById('fontSizeInput');
// var fontFamilySelect = document.getElementById('fontFamilySelect');

var lockimage = document.getElementById("lockimage");

var minusButton = document.querySelector(".minus");
var plusButton = document.querySelector(".plus");
var normalButton = document.getElementById("normal");
var boldButton = document.getElementById("bold");
var italicButton = document.getElementById("italic");
var underlineButton = document.getElementById("underline");
var counterInput = document.getElementById("counterInput");

var zoomLevel = 1.0; // 100%
var zoomInButton = document.getElementById("zoomIn");
var zoomOutButton = document.getElementById("zoomOut");
let mediaRecorder;
let recordedChunks = [];
let isRecordingPaused = false;

const startRecordingButton = document.getElementById("startRecording");
const stopRecordingButton = document.getElementById("stopRecording");
const pauseResumeRecordingButton = document.getElementById("pauseRecording");
const stopVideo = document.getElementById("stopVideo");
const addVideo = document.getElementById("addVideo");
const pauseVideo = document.getElementById("pauseVideo");
const filenameInput = document.getElementById("filenameInput");
const confirmFilenameButton = document.getElementById("confirmFilename");
const dialog = document.getElementById("dialog");

// Audio stream
let audioStream;
var exitButton = document.getElementById("addexist");
var customAlert = document.getElementById("customAlert");
var confirmExitButton = document.getElementById("confirmExit");
var cancelExitButton = document.getElementById("cancelExit");
var grayBackground = document.getElementById("grayBackground");
var linkModal = document.getElementById("linkModal");



const excelSheetsContainer = document.getElementById("excelSheetsContainer");
let selectedSheetNames = []; // Store selected sheet names
let renderedSheets = []; // Store references to rendered sheets

var addNoteButton = document.getElementById("textfile");
const overlayaudio = document.getElementById("toolbaraudio");
const audioFileInput = document.getElementById("audioFileInput");
const audio = document.getElementById("myAudio");
const playButton = document.getElementById("playButton");
const pauseButton = document.getElementById("pauseButton");
const audioSource = document.getElementById("audioSource");
const seekStartButton = document.getElementById("seekStartButton");
const seekEndButton = document.getElementById("seekEndButton");
const endTime = document.getElementById("endTime");
const startTime = document.getElementById("startTime");
const sliderBar = document.querySelector(".custom-slider");
const sliderKnob = document.querySelector(".slider-knob");
const sliderknob1 = document.getElementById("sliderknob");
const sliderBg = document.querySelector(".slider-bg");
let isDragging = false;


let isPinchZooming = false;
let initialDistance = 0;
let initialScale = 1;

let temporaryDrawingEnabled = false;
const penciltime = document.getElementById("penciltime");
const toolbarItems = document.querySelectorAll(".toolbar_items");
const overlays = document.querySelectorAll(".overlay");
let excelData = null; // Store workbook and sheet selector for later use

var canvasHistory = [];
