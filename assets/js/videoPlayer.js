// 중요) 자바 스크립트 파일은 모든 페이지에서 로드 된다
// 그래서 항상 검사 해줘야함
// HTML video 관련 video element MDN 검색 후 찾아서 쓰면 됨

const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playBtn = document.getElementById("jsPlayButton");
const volumeBtn = document.getElementById("jsVolumButton");
const expandBtn = document.getElementById("jsExpandButton");
const fullScrnBtn = document.getElementById("jsFullScreenButton");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const volumeRange = document.getElementById("jsVolume");

function handlePlayClick() {
    if(videoPlayer.paused) {
        videoPlayer.play();
        playBtn.innerHTML = '<i class = "fas fa-pause"></i>';
    } else {
        videoPlayer.pause();
        playBtn.innerHTML = '<i class = "fas fa-play"></i>';
    }
}

function handleVolumeClick() {
    if(videoPlayer.muted) {
        videoPlayer.muted= false;
        volumeRange.value = videoPlayer.volume;
        handleVolumeIco(volumeRange.value);
    } else {
        videoPlayer.muted = true;
        volumeBtn.innerHTML = '<i class = "fas fa-volume-mute"></i>';
        volumeRange.value = 0;
    }
}

function goFullScreen() {
    // MDN 에서 크롬은 webkit이 필요하다고 명시
    // videoPlayer.requestFullscreen(); 는 사용불가
    // 그래서 webkit prefix 로 불러줘야한다.
    // 위에서 변경 모든 브라우저를 체크해서 브라우저 별로 fullscreen 을 불러옴
    if (videoContainer.requestFullscreen) {
        videoContainer.requestFullscreen();
      } else if (videoContainer.mozRequestFullScreen) {
        videoContainer.mozRequestFullScreen();
      } else if (videoContainer.webkitRequestFullscreen) {
        videoContainer.webkitRequestFullscreen();
      } else if (videoContainer.msRequestFullscreen) {
        videoContainer.msRequestFullscreen();
      }
    fullScrnBtn.innerHTML = '<i class = "fas fa-compress"></i>';
    // 클릭 후 FullScreen 상태이니 event 삭제
    fullScrnBtn.removeEventListener("click", goFullScreen);
    fullScrnBtn.addEventListener("click", exitFullScreen);
}

function exitFullScreen() {
    fullScrnBtn.innerHTML = '<i class = "fas fa-expand"></i>';

    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }

    fullScrnBtn.removeEventListener("click", exitFullScreen);
    fullScrnBtn.addEventListener("click", goFullScreen);
}

const formatDate = seconds => {
    const secondsNumber = parseInt(seconds, 10);
    let hours = Math.floor(secondsNumber / 3600);
    let minutes = Math.floor((secondsNumber - hours * 3600) / 60);
    let totalSeconds = secondsNumber - hours * 3600 - minutes *60;

    if (hours < 10) {
        hours = `0${hours}`;
      }
      if (minutes < 10) {
        minutes = `0${minutes}`;
      }
      if (seconds < 10) {
        totalSeconds = `0${totalSeconds}`;
    }
    return `${hours}:${minutes}:${totalSeconds}`;
}

function setTotalTime() {
    const totalTimeString = formatDate(videoPlayer.duration);
    totalTime.innerHTML = totalTimeString;
}

function getCurrentTime() {
    currentTime.innerHTML = formatDate(Math.floor(videoPlayer.currentTime));
}

function handleEnded() {
    playBtn.innerHTML = '<i class = "fas fa-redo"></i>';
}

function handleDrag(event) {
    const {
        target : {value}
    } = event;
    videoPlayer.volume = value;
    handleVolumeIco(value);
}

function handleVolumeIco(value) {
    if( value > 0.3 ) {
        volumeBtn.innerHTML = '<i class = "fas fa-volume-up"></i>';
    } else if(value == 0) {
        volumeBtn.innerHTML = '<i class = "fas fa-volume-off"></i>';
    } else {
        volumeBtn.innerHTML = '<i class = "fas fa-volume-down"></i>';
    }
}

function init() {
    // volume 은 0 과 1 사이로 조절된다. 
    videoPlayer.volume = 0.5;
    playBtn.addEventListener("click", handlePlayClick);
    volumeBtn.addEventListener("click", handleVolumeClick);
    fullScrnBtn.addEventListener("click", goFullScreen);
    // 간단 정의 metadata = 데이터에 대한 데이터
    // 메타데이터(video metadata)가 로드 되면 이벤트를 발생시킨다
    // 안그러면 로드 되기 전까지 NaN 
    videoPlayer.addEventListener("loadedmetadata", setTotalTime);
    videoPlayer.addEventListener("timeupdate", getCurrentTime);
    videoPlayer.addEventListener("ended", handleEnded);
    volumeRange.addEventListener("input", handleDrag);
}

// videoContainer 가 있는 페이지에서만 로드되게 검사
if(videoContainer) {
    init();
}