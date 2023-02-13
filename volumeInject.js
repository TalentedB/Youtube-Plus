
    var videoElement = document.querySelector("video")
    var audioCtx = new AudioContext()
    var source = audioCtx.createMediaElementSource(videoElement)
    var gainNode = audioCtx.createGain()
    gainNode.gain.value = 1
    source.connect(gainNode)
    gainNode.connect(audioCtx.destination)

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'callMyFunction') {
      changeVolume(request.volume);
    }
  });
  

function changeVolume(volume){
    gainNode.gain.value = parseFloat(volume);
}

// injectVolume();