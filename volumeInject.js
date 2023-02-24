try {
    var videoElement = document.querySelector("video")
    var audioCtx = new AudioContext()
    var source = audioCtx.createMediaElementSource(videoElement)
    var gainNode = audioCtx.createGain()
    gainNode.gain.value = 1
    source.connect(gainNode)
    gainNode.connect(audioCtx.destination)
}catch(e){
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  try{  if (request.message === 'callMyFunction') {
      changeVolume(request.volume);
    }}catch(e){}
  });
  

function changeVolume(volume){
    try{
      gainNode.gain.value = parseFloat(volume);
    }catch(e){
    }
}

// injectVolume();