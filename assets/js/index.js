// console.log('you can use ES6 here : )')

// if (window.location.pathname === '/') {
// 	location.assign(newPath)
// }



// IMAGE ZOOM
const jqueryZoom = require('jquery-zoom')
// console.log(jqueryZoom)
$(document).ready(function(){
  $('#big-photo-wraper').zoom();
  // console.log($('#big-photo-wraper'))
});


// PHOTO GALLERY SWITCHER
var thumbs = document.querySelectorAll("#thumbs > img");
var bigPhoto = document.querySelector("#bigphoto > img");
(function bigPhotoSwitcher() {
  thumbs.forEach(function(thumb){
    thumb.addEventListener("click", function(){
      var thumbParamsPosition = thumb.src.indexOf('?');
      var newAddrForBig = thumb.src.slice(0, thumbParamsPosition);
      bigPhoto.src = newAddrForBig // '?w=600&h=400';
      // console.log(bigPhoto.src)
    })
  })
})();

// OPEN AND COLLAPSE AN ARTICLE ON PRODUCT PAGE
var more = document.querySelector("#read-more-cta a");
var longread = document.querySelector("#product-longread");
var gradient = document.querySelector("#white-gradient-when-collapsed");
more.addEventListener("click", function(){
  if (longread.classList.contains("lr-collapsed")) {
    more.innerHTML = '<button>Show Less</button><i class="fa fa-angle-up" aria-hidden="true"></i>';
  } else {
    more.innerHTML = '<button>Read More</button><i class="fa fa-angle-down" aria-hidden="true"></i>';
  }
  longread.classList.toggle("lr-collapsed");
  gradient.classList.toggle("gradient-off");
});
