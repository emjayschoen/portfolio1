$(document).ready(function(){


	var $bde = $("#best-designer-ever");
	var $bde_hover = $("#best-designer-ever-hover");

	$.localScroll({duration:800});
	$bde.hover( function(event){
		$(this).hide();
		$bde_hover.show();
	});
	
	$bde_hover.mouseout( function(event){
		$(this).hide();
		$bde.show();
	});
	
	/*$(".expand, .contract, .title").click(toggleDescription);
	
	/*function toggleDescription(){
		$(".expand").toggleClass("contract");
		//$(".contract").toggle();
		$(".description").slideToggle();
	}*/
	
	
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
	
	$("#nav-ink-series").hover( function(event){
		$("#nav-title-ink-series").toggle();
	});
	$("#nav-social-pool").hover( function(event){
		$("#nav-title-social-pool").toggle();
	});
	$("#nav-worthalter-site").hover( function(event){
		$("#nav-title-worthalter-site").toggle();
	});
	$("#nav-city-nights").hover( function(event){
		$("#nav-title-city-nights").toggle();
	});
	$("#nav-eyes").hover( function(event){
		$("#nav-title-eyes").toggle();
	});
	$("#nav-fly").hover( function(event){
		$("#nav-title-fly").toggle();
	});
	$("#nav-self-portraits").hover( function(event){
		$("#nav-title-self-portraits").toggle();
	});
	$("#nav-beats").hover( function(event){
		$("#nav-title-beats").toggle();
	});
	$("#nav-conquer").hover( function(event){
		$("#nav-title-conquer").toggle();
	});
	$("#nav-sound-burst").hover( function(event){
		$("#nav-title-sound-burst").toggle();
	});
	
});