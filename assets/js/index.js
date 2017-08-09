// console.log('you can use ES6 here : )')

// if (window.location.pathname === '/') {
// 	location.assign(newPath)
// }


// LANGUAGE HANDLER
var langOptions = document.querySelectorAll('.lang-option')
langOptions.forEach(function(lo){
  lo.addEventListener('click', function(){
    var clickedLang = lo.innerHTML.toLowerCase(),
        currPath = window.location.pathname,
        newPath

    if (lo.classList.value.indexOf('active') < 0){
      if (clickedLang === 'en'){
        newPath = currPath.slice(3,currPath.length)
        location.assign(newPath)
        // console.log(newPath)
      } else if (clickedLang === 'it') {
        newPath = '/' + clickedLang.concat(currPath)
        location.assign(newPath)
        // console.log(newPath.concat(currPath))
      }
    }

  })
})
