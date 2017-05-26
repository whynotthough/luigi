// open and collapse an ARTICLE on Product Page 
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