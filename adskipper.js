function check(){
    var intv = setInterval(function() {
    var elems = document.getElementsByClassName("ytp-ad-button ytp-ad-visit-advertiser-button ytp-ad-button-link")[0];
    if (typeof elems == "undefined"){
        return false;
    }
    skip();

}, 100);

}

function skip(){
    document.getElementsByClassName('html5-main-video')[0].currentTime = 4000
    sleep(100);
    document.getElementsByClassName('ytp-ad-skip-button ytp-button')[0].click();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


check();