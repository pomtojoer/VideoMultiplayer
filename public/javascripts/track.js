const video = document.getElementById("localVideo");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

let startButton = document.getElementById("startbutton");
let pauseButton = document.getElementById("pausebutton");
let restartButton = document.getElementById("restartbutton");

let isVideo = false;
let model = null;

const modelParams = {
    flipHorizontal: true,   // flip e.g for video  
    maxNumBoxes: 20,        // maximum number of boxes to detect
    iouThreshold: 0.5,      // ioU threshold for non-max suppression
    scoreThreshold: 0.6,    // confidence threshold for predictions.
}


function startVideo() {
    handTrack.startVideo(video).then(function (status) {
        console.log("video started", status);
        if (status) {
            isVideo = true
            runDetection()
        } else {
          console.log('srtart video')
        }
    });
}


function toggleVideo() {
    if (!isVideo) {
        startVideo();
        startButton.disabled = true;
        pauseButton.disabled = false;
    } else {
        handTrack.stopVideo(video)
        isVideo = false;
        startButton.disabled = false;
        pauseButton.disabled = true;
    }
}


function runDetection() {
    model.detect(video).then(predictions => {
        model.renderPredictions(predictions, canvas, context, video);
        if (isVideo) {
            requestAnimationFrame(runDetection);
        }
    });
}


function setupPage() {
  handTrack.load(modelParams)
    .then(lmodel => {
      // detect objects in the image.
      model = lmodel;
      startButton.disabled = false;

    })
    .then(function() {
      showPage();
    })
    // .then(startVideo());
  // showPage();
}

function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("filler").style.display = "none";
  document.getElementById("displayDiv").style.display = "block";
}