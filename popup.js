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
        document.getElementById("myRange").value = the_value.custom_speed;
      }
      else{
        set_storage_speed(1);
        document.getElementById("speed_value").value = 1;
        document.getElementById("myRange").value = 1;
      }
    });
  }



// const button = document.querySelector("button");
// button.addEventListener("click", async () => {
//     const player_speed = document.getElementById('speed_value').value;
//     changeSpeed(player_speed);
// })

async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  }


async function changeSpeed(speed){
    await set_storage_speed(speed);
    slider.value = speed;
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




    var slider = document.getElementById("myRange");
    
    // Update the current slider value (each time you drag the slider handle)
    slider.oninput = function() {
        document.getElementById("speed_value").value = slider.value;
        changeSpeed(slider.value);
    }



var value_input = document.getElementById("speed_value");
value_input.oninput = function() {
    changeSpeed(value_input.value);
}


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
