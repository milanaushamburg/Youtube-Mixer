let outputPlayer;
let videoId, sliderValue, source, startTime, latencyOffset;

const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

window.onYouTubeIframeAPIReady = function() {
    const params = new URLSearchParams(window.location.search);
    videoId = params.get('video');
    sliderValue = params.get('audio');
    source = params.get('source');
    startTime = parseFloat(params.get('start')); // Startzeit in Sekunden
    latencyOffset = parseFloat(params.get('latency')) / 1000; // Offset in Sekunden umwandeln

    if (videoId) {
        outputPlayer = new YT.Player('outputPlayer', {
            videoId: videoId,
            playerVars: { 
                'autoplay': 1, 
                'controls': 1,
                'mute': 1
            },
            events: {
                'onReady': onOutputPlayerReady
            }
        });
        
        const audioInfo = document.getElementById('audioResultInfo');
        const volA = 100 - parseInt(sliderValue);
        const volB = parseInt(sliderValue);
        audioInfo.textContent = `Video von Player ${source} wird abgespielt. Ton-Mischung: ${volA}% von Player A und ${volB}% von Player B.`;
    } else {
        document.getElementById('audioResultInfo').textContent = "Kein Video ausgewählt.";
    }
}

function onOutputPlayerReady(event) {
    if (startTime) {
        // Offset anwenden, bevor das Video synchronisiert wird
        const adjustedTime = Math.max(0, startTime + latencyOffset);
        event.target.seekTo(adjustedTime, true);
        event.target.playVideo();
    }
}