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

    var navContracted = true;

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
		            if(theID == WORK_LINK && navContracted) {
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
		navContracted = false;
	}

	function contractNavWorks(){
		$navWorks.slideUp(800);
		navContracted = true;
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
	        if($activeNav.attr('href') == WORK_LINK && navContracted) {
	        	expandNavWorks();
	        }
		}, 800);
	});


	// Collapse thumbnails of nav-pieces in the navigation bar as necessary according to window height
	
	// Need to get the height of a nav-collapsed element,
	// So create a hidden element and record the height



	/*var $col = $(document.createElement('div')).hide().addClass("nav-collapsed");
	$(".nav-works").append($col);
	var collapseHeight = $col.height();
	$col.remove();
	*/

	var MIN_HEIGHT = 12;
	var $navWorks = $(".nav-works");
	var $navPieces = $(".nav-piece");
	var $navImages = $(".nav-img");
	var $highlights = $(".highlight");
	var navPieceHeight = $navPieces.height();
	var navPieceWidth = navPieceHeight;
	var numNavPieces = $navPieces.length;
	var navBarHeight = $("#navigation-bar").height() 
		+ parseInt($("#navigation-bar").css("marginTop"));
	var extraMargin = parseInt($(".nav-works").css("marginBottom"));
	var fullNavHeight = navBarHeight + navPieceHeight * numNavPieces + extraMargin;
	var currNavHeight = fullNavHeight;

	/*
	var minNavHeight = navBarHeight + collapseHeight * $navPieces.length + extraMargin;
	var maxNavHeight = fullNavHeight;
	var $curr = $navPieces.last();
	var collapseDeltaHeight = $(".nav-piece").height() - collapseHeight;
	console.log("Full Nav: "+fullNavHeight);
	console.log("Min Nav: "+minNavHeight);
	console.log("Max Nav: "+maxNavHeight);

	var atFirst = false;*/


	adjustNav();

	function adjustNav() {
		var windowHeight = window.innerHeight;

		if(windowHeight < fullNavHeight) {
			var availableHeight = (windowHeight - navBarHeight - extraMargin - navPieceHeight);
			var dHeight = Math.floor( (availableHeight) / numNavPieces );
			if(dHeight >= MIN_HEIGHT) {
				$navWorks.height(availableHeight + navPieceHeight - dHeight - extraMargin);
				$navPieces.height(dHeight);
				$navImages.css("width", navPieceWidth);
				$highlights.css("width", navPieceWidth);
			}

		}
		else {
			$navWorks.height("");
			$navPieces.height(navPieceHeight);
		}
	}

	/* OLD ADJUST NAV

	function adjustNav(){
		console.log("ADJUST FUNCTION");
		var windowHeight = window.innerHeight;

		// Handle Collapsing


		if(windowHeight <= (minNavHeight + collapseDeltaHeight) ) {
			$navPieces.addClass("nav-collapsed");
			$curr = $navPieces.first();
			atFirst = true;
			fullNavHeight = minNavHeight;
			console.log("At Min Height");
		}
		else {
			while(windowHeight < (fullNavHeight + collapseDeltaHeight) ){
				console.log("Contracted");
				console.log("wh: "+windowHeight);
				console.log("fnh: " + fullNavHeight + " to " + (fullNavHeight-collapseDeltaHeight));

				$curr.addClass("nav-collapsed");
				$curr = $curr.prev();
				fullNavHeight -= collapseDeltaHeight;
			}
		}
		
		// Handle Expanding
		if(windowHeight >= (maxNavHeight + collapseDeltaHeight) ) {
			$navPieces.removeClass("nav-collapsed");
			$curr = $navPieces.last();
			fullNavHeight = maxNavHeight;
			console.log("At Max Height");
		}
		else {
			while(windowHeight > (fullNavHeight + 2*collapseDeltaHeight) ) {
				console.log("Expanded");
				console.log("wh: "+windowHeight);
				console.log("fnh: " + fullNavHeight + " to " + (fullNavHeight+collapseDeltaHeight));

				if(atFirst){
					atFirst = false;
				}
				else {
					$curr = $curr.next();
				}
				$curr.removeClass("nav-collapsed");
				fullNavHeight += collapseDeltaHeight;
			}
		}



	}*/

	// Only call resize function after resizing is complete
	var waitForFinalEvent = (function () {
		var timers = {};
		return function (callback, ms, uniqueId) {
		if (!uniqueId) {
			uniqueId = "Don't call this twice without a uniqueId";
		}
		if (timers[uniqueId]) {
			clearTimeout (timers[uniqueId]);
		}
			timers[uniqueId] = setTimeout(callback, ms);
		};
	})();

	

	$(window).resize(function () {
	    waitForFinalEvent(function(){
			adjustNav();
	    }, 500, "Collapse");
	});

	
});