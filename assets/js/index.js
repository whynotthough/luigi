
// ------------- NETLIFY + AJAX HANDLER FOR EMAIL SUBSCRIPTION FORM -------
$("#email-form").submit(function(e) {
  e.preventDefault();

  updateFormState()

  gtag('event', 'hit-submit-button', {
    'event_category': 'email-subscription'
  })


  let $form = $(this),
      start = performance.now()

  $.post($form.attr("action"), $form.serialize()).then(function() {

    let timing = Math.floor(performance.now() - start) + 'ms'

    gtag('event', 'promise-resolved', {
      'event_category': 'email-subscription',
      'event_label': timing
    })

    // updateFormState(8000)

  })

})

// my function
function updateFormState (timing = 0) {

  var input = document.querySelector('#email-form > #email'),
      stateReady = document.querySelectorAll('.state-ready'),
      stateDoneNotif = document.querySelector('.state-done-notif'),
      notifHtml = '<span>' + input.value + '</span>' + stateDoneNotif.dataset.line + '<br>' +
                  stateDoneNotif.dataset.cheers,

  resetForm = setTimeout(() => {
    if (timing) {
      // if timing is passed then reset the form after timing
      stateDoneNotif.textContent = input.value = ''
    } else {
      // if no timing is passed then show ajax notif immediately
      stateDoneNotif.innerHTML = notifHtml
    }
    stateReady.forEach( function (e) {
                e.classList.toggle('off') })
    stateDoneNotif.classList.toggle('off')
  }, timing)
}








// if (window.location.pathname === '/') {
//  location.assign(newPath)
// }


// HIDE/SHOW MOB NAV BAR VIA SCROLL
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('#mobnav').outerHeight();

$(window).scroll(function(event){
    didScroll = true;
});

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled() {
    var st = $(this).scrollTop();

    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)
        return;

    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight){
        // Scroll Down
        $('#mobnav').removeClass('mob-nav-down').addClass('mob-nav-up');
    } else {
        // Scroll Up
        if(st + $(window).height() < $(document).height()) {
            $('#mobnav').removeClass('mob-nav-up').addClass('mob-nav-down');
        }
    }

    lastScrollTop = st;
}




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


// APPEND ~ AS A SUPERSCRIPT TO ALL N LETTERS IN 'VICUNA'
const word = 'vicuna',
      nRelPos = 4, // relative position of 'n' in 'vicuna'
      prepndStr = '<span class="superscripted-n">',
      appendStr = '</span>'

var bodyNodes = document.body.getElementsByTagName("*")

for (var i = bodyNodes.length; i--;) {
  // grab all bottom level nodes wich have 'vicuna'
  if ( (bodyNodes[i].textContent.toLowerCase().indexOf('vicuna') >=0) && bodyNodes[i].childElementCount === 0 ) {

    // parse in lower case mode
    const array = bodyNodes[i].textContent.toLowerCase()

    var indicesForN = [], // array for all letter 'n' absolute positions in a node
        vicunaIdx = array.indexOf(word),
        nLetterHolder,
        injection,
        nodeNewHTML = '',
        nAbsPosIndexer = -1 // indexer for an array of 'n' absolute positions

    // make a loop while we keep meeting 'vicuna' in a node
    while (vicunaIdx != -1) {

      // push 'n' absolute position to an array
      indicesForN.push(vicunaIdx + nRelPos)

      // update indexer of indicesForN array to use it below (0, 1, 2, etc.)
      nAbsPosIndexer++

      // hold original 'n' for later injection (case sensative)
      nLetterHolder = bodyNodes[i].textContent[ vicunaIdx + nRelPos ]

      injection = prepndStr + nLetterHolder + appendStr

      if (indicesForN.length === 1) {
        // if first inclusion, get the beginning of the node
        nodeNewHTML = bodyNodes[i].textContent.slice( 0, vicunaIdx + nRelPos ) +
                      injection
      } else {
        // get a part between previuse and current 'n' positions
        nodeNewHTML = nodeNewHTML +
                      bodyNodes[i].textContent.slice( indicesForN[ nAbsPosIndexer - 1 ] + 1, indicesForN[ nAbsPosIndexer ] ) +
                      injection
      }

      // find the next inclusion of word
      vicunaIdx = array.indexOf(word, vicunaIdx + word.length)

      if (vicunaIdx === -1) {
        // get a tail of a node if no more inclusions
        nodeNewHTML = nodeNewHTML +
                      bodyNodes[i].textContent.slice( indicesForN[ indicesForN.length-1 ] + 1, bodyNodes[i].textContent.length )
      }

    }

    bodyNodes[i].innerHTML = nodeNewHTML

  }
}

