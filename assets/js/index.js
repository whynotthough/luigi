// console.log('you can use ES6 here : )')

// if (window.location.pathname === '/') {
//  location.assign(newPath)
// }

// JS ONLY FOR PRODUCT PAGES
if (window.location.pathname.indexOf('products') >= 0){

  // IMAGE ZOOM
  const jqueryZoom = require('jquery-zoom')
  // console.log(jqueryZoom)
  $(document).ready(function(){
    $('#big-photo-wraper').zoom();
    // console.log($('#big-photo-wraper')[0])
  });
  // PHOTO GALLERY SWITCHER
  var thumbs = document.querySelectorAll("#thumbs > img"),
      bigPhoto = document.querySelector("#big-photo-wraper > img"),
      prevPhotoBtn = document.querySelector("#left-btn"),
      nextPhotoBtn = document.querySelector("#right-btn");

  thumbs.forEach(function(thumb){
    thumb.addEventListener("click", function(){     
      activateThumb(thumb);
      showcaseMe(thumb);
    });
  });

  prevPhotoBtn.addEventListener('click', function(){
    var currPhoto = document.querySelector(".current");
    if(currPhoto === thumbs[0]) {
      activateThumb(thumbs[thumbs.length-1]);
      showcaseMe(thumbs[thumbs.length-1]);
    }
    else {
      activateThumb(currPhoto.previousElementSibling);
      showcaseMe(currPhoto.previousElementSibling);
    }
  });
  nextPhotoBtn.addEventListener('click', function(){
    var currPhoto = document.querySelector(".current");
    if(currPhoto === thumbs[thumbs.length-1]) {
      activateThumb(thumbs[0]);
      showcaseMe(thumbs[0]);
    }
    else {
      activateThumb(currPhoto.nextElementSibling);
      showcaseMe(currPhoto.nextElementSibling);
    }
  })

  function showcaseMe(img){
    var thumbParamsPosition = img.src.indexOf('?');
    var newAddrForBig = img.src.slice(0, thumbParamsPosition) + '?w=700&q=85&fm=jpg&fl=progressive';
    $('#big-photo-wraper').trigger('zoom.destroy');
    // console.log($('#big-photo-wraper')[0])
    bigPhoto.src = newAddrForBig
    $('#big-photo-wraper').zoom({url: newAddrForBig});
    // console.log($('#big-photo-wraper')[0])
  };

  (function fstThumbIsCurrent(){
    thumbs[0].classList.add('current'); // set the first thumb as 'current' by default
  })(); // run as IIFE straight away: ()();

  function activateThumb(th){
    thumbs.forEach(function(thumb) {
      thumb.classList.remove('current'); // reset 'current' for all thumbs
    });
    th.classList.add('current'); // set 'current' for the clicked thumb
  };

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
  })

}