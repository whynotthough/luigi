var bannerOverlay = document.getElementById('banner-overlay'),
    videoCtaDiv = document.getElementById('video-cta'),
    playButton = document.querySelector('#video-cta > img'),
    playerLayer = document.getElementById('player'),
    loadVideoHTML = '<script>loadVideoFunc();</script>';


playButton.addEventListener("click", function(){
  switchHTML(bannerOverlay, videoCtaDiv, loadVideoHTML)
});



// MY STOP LOGICS
// if (event.data == YT.PlayerState.ENDED) {
//   var playButton = document.getElementById('playbutton'),
//       ctaLayer = document.getElementById('bannerGradient'),
//       playerLayer = document.getElementById('player');
//       playerLayer.classList.toggle("zero-opacity");
//       setTimeout(playerLayer.classList.toggle("hidden"), 700);
//       setTimeout(ctaLayer.classList.toggle("hidden"), 700);
//       setTimeout(ctaLayer.classList.toggle("zero-opacity"), 700);
//   }



function switchHTML(parent, current, next){
  // current.classList.toggle("zero-opacity");
  parent.innerHTML = next;
}



function loadVideoFunc() {
  // 2. This code loads the IFrame Player API code asynchronously.
  var tag = document.createElement('script');

  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  // 3. This function creates an <iframe> (and YouTube player)
  //		after the API code downloads.
  var player;
  function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
      height: '100%',
      width: '100%',
      videoId: 'pX3xiOnOtTc',
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      },

      // don't show related videos when finished
      playerVars: {rel: 0}

    });
  }

  // 4. The API will call this function when the video player is ready.
  function onPlayerReady(event) {
    event.target.playVideo();
  }

  // 5. The API calls this function when the player's state changes.
  //		The function indicates that when playing a video (state=1),
  //		the player should play for six seconds and then stop.
  var done = false;
  function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
      //- setTimeout(stopVideo, 6000);
      //- done = true;
    }
  }
  function stopVideo() {
    player.stopVideo();
  }

}
