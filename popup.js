//reset_speed();

function set_storage_speed(speed){
chrome.storage.session.set({ 'custom_speed' : speed }, function() {
    if (chrome.runtime.error) {
      console.log("Runtime error.");
    }
  });
}

document.body.onload = function() {
    load_ad_skipper();
    chrome.storage.session.get('custom_speed', function(the_value) {
      if (!chrome.runtime.error) {
        document.getElementById("speed_value").value = the_value.custom_speed;
        document.getElementById("speedRange").value = the_value.custom_speed;
      }
      else{
        set_storage_speed(1);
        document.getElementById("speed_value").value = 1;
        document.getElementById("speedRange").value = 1;
      }
    });
  }


//From Google Documenation
async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  }


async function changeSpeed(speed){
    await set_storage_speed(speed);
    speed_slider.value = speed;
    value_input.value = speed;
    const tabs = await getCurrentTab();
    chrome.scripting.executeScript({    
      target: {tabId: tabs.id},
      func: injectionSpeedScript,
      args: [speed]
    })
    }


function injectionSpeedScript(speed){
    document.querySelector('video').playbackRate = speed;
    //document.querySelector('video').defaultPlaybackRate = speed;
    //document.getElementsByClassName('html5-main-video')[0].playbackRate = speed;
}




    var speed_slider = document.getElementById("speedRange");
    
    // Update the current slider value (each time you drag the slider handle)
    speed_slider.oninput = function() {
        document.getElementById("speed_value").value = speed_slider.value;
        changeSpeed(speed_slider.value);
    }



var value_input = document.getElementById("speed_value");
value_input.oninput = function() {
    changeSpeed(value_input.value);
}

//Volume Control

var volume_slider = document.getElementById("volumeRange");

volume_slider.oninput = function() {
  if (this.value <= 10) {
    this.step = 1;
  } else {
    this.step = 10;
  }
  document.getElementById("volume_value").value = volume_slider.value;
  changeVolume(volume_slider.value);
}

async function changeVolume(volume){
  // const tabs = await getCurrentTab();
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {message: 'callMyFunction',volume: volume/100});
})
}




//Ad Skipper

var loaded_ad_skipper = 0;
async function load_ad_skipper(){
        const tabs = await getCurrentTab();
        chrome.scripting.executeScript({    
          target: {tabId: tabs.id},
          files : [ "adskipper.js" ],
        }) 

    }






//shortcuts


document.getElementById("speedShortCut0").addEventListener("click", async () => {changeSpeed(0);});
document.getElementById("speedShortCut1").addEventListener("click", async () => {changeSpeed(1);});
document.getElementById("speedShortCut2").addEventListener("click", async () => {changeSpeed(2);});
document.getElementById("speedShortCut3").addEventListener("click", async () => {changeSpeed(3);});
document.getElementById("speedShortCut4").addEventListener("click", async () => {changeSpeed(4);});
document.getElementById("speedShortCut5").addEventListener("click", async () => {changeSpeed(5);});
