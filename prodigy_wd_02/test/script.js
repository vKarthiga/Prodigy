// script.js
let startTime;
let elapsedTime = 0;
let timerInterval;
let lapNumber = 1;

function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);

    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let diffInMs = (diffInSec - ss) * 1000;
    let ms = Math.floor(diffInMs);

    let formattedHH = hh.toString().padStart(2, "0");
    let formattedMM = mm.toString().padStart(2, "0");
    let formattedSS = ss.toString().padStart(2, "0");
    let formattedMS = ms.toString().padStart(3, "0");

    return ${formattedHH}:${formattedMM}:${formattedSS}.${formattedMS};
}

function print(txt) {
    document.getElementById("display").innerHTML = txt;
}

function start() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function printTime() {
        elapsedTime = Date.now() - startTime;
        print(timeToString(elapsedTime));
    }, 10);
    showButton("PAUSE");
}

function pause() {
    clearInterval(timerInterval);
    showButton("START");
}

function reset() {
    clearInterval(timerInterval);
    print("00:00:00.000");
    elapsedTime = 0;
    lapNumber = 1;
    document.getElementById("laps").innerHTML = "";
    showButton("START");
}

function lap() {
    const lapTime = timeToString(elapsedTime);
    const lapElement = document.createElement("div");
    lapElement.innerText = Lap ${lapNumber}: ${lapTime};
    document.getElementById("laps").appendChild(lapElement);
    lapNumber++;
}

function showButton(buttonKey) {
    const startButton = document.getElementById("startButton");
    const pauseButton = document.getElementById("pauseButton");

    if (buttonKey === "START") {
        startButton.style.display = "inline";
        pauseButton.style.display = "none";
    } else {
        startButton.style.display = "none";
        pauseButton.style.display = "inline";
    }
}

document.getElementById("startButton").addEventListener("click", start);
document.getElementById("pauseButton").addEventListener("click", pause);
document.getElementById("resetButton").addEventListener("click", reset);
document.getElementById("lapButton").addEventListener("click", lap);

showButton("START");
