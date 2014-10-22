$(document).ready(function(){

	var WORK_LINK = "#work";
	var SCROLL_DURATION = 800;

	// Control smooth scrolling
	$.localScroll({duration:SCROLL_DURATION});
	
	/*$(".expand, .contract, .title").click(toggleDescription);
	
	/*function toggleDescription(){
		$(".expand").toggleClass("contract");
		//$(".contract").toggle();
		$(".description").slideToggle();
	}*/
	
	
	// Fix the navigation bar to the screen while scrolling
	moveScroller();
	
	function moveScroller() {
		var move = function() {
			var st = $(window).scrollTop();
			var ot = $("#nav-anchor").offset().top;
			var s = $("#navigation-bar");
			if(st > ot) {
				s.css({
					position: "fixed",
					top: "0px"
				});
			} else {
				if(st <= ot) {
					s.css({
						position: "relative",
						top: ""
					});
				}
			}
		};
		$(window).scroll(move);
		move();
	}
	
	

	$(".detail-link").click( function(event){
		$(".lightbox").fadeIn(200);
	});


	// Highlight the active section in the nav

	// Used to turn off content-sensitive highlighting when the nav is clicked.
	// Otherwise the smooth scroller highlights incorrect nav items
	var navClicked = false; 

	var $aChildren = $(".nav").children(); // find the a children of the list items
    var aArray = []; // create the empty aArray
    var $navWork;
    for (var i=0; i < $aChildren.length; i++) {    
        var aChild = $aChildren[i];
        var ahref = $(aChild).attr('href');
        if(ahref == WORK_LINK){
        	$navWork = $(aChild);
        }
        aArray.push(ahref);
    } // this for loop fills the aArray with attribute href values

    $(window).scroll(function(){
    	if(!navClicked) {
	        var windowPos = $(window).scrollTop(); // get the offset of the window from the top of page
	        var windowHeight = $(window).height(); // get the height of the window
	        var docHeight = $(document).height();

	        for (var i=0; i < aArray.length; i++) {
	            var theID = aArray[i];
	            var divPos = $(theID).offset().top; // get the offset of the div from the top of page
	            var divHeight = $(theID).height(); // get the height of the div in question
	            if (windowPos >= divPos && windowPos < (divPos + divHeight)) {
	                $("a[href='" + theID + "']").addClass("nav-active");

		            // Expand nav-works if we are in the Work section
		            if(theID == WORK_LINK) {
		            	expandNavWorks();
		            }
	            } else {
	                $("a[href='" + theID + "']").removeClass("nav-active");
	            }
	        }

	        // If we're at the top of the screen, Intro should be active
	        var $navFirstChild = $(".nav:first-child a");
	        var hrefFirst = $navFirstChild.attr("href");
	        if(windowPos < $(hrefFirst).offset().top) {
	        	if (!$navFirstChild.hasClass("nav-active")) {
	                var $navActiveCurrent = $(".nav-active");
	               	$navActiveCurrent.removeClass("nav-active");
	                $navFirstChild.addClass("nav-active");
	            }
	            contractNavWorks();
	        }

	        // If we're at the bottom of the screen, 
	        if(windowPos + windowHeight == docHeight) {
	            if (!$(".nav:last-child a").hasClass("nav-active")) {
	                var $navActiveCurrent = $(".nav-active");
	               	$navActiveCurrent.removeClass("nav-active");
	                $("nav li:last-child a").addClass("nav-active");
	            }
	        }
	    }
    });

	var $navWorks = $(".nav-works");
	function expandNavWorks(){
		$navWorks.slideDown(1000);
	}

	function contractNavWorks(){
		$navWorks.slideUp(800);
	}

	$aChildren.click(function(event){
		navClicked = true;
		var $activeNav = $(this);

		if(!$activeNav.hasClass("nav-active")) {
            var $navActiveCurrent = $(".nav-active");
            $navActiveCurrent.removeClass("nav-active");
            $activeNav.addClass("nav-active");
        }


		setTimeout(function(){
			navClicked = false;
	        if($activeNav.attr('href') == WORK_LINK) {
	        	expandNavWorks();
	        }
		}, 800);
	});
	//$navWork.click(expandNavWorks);
	
});