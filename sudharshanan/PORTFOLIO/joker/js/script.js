(function(){
 "use strict";

$('.navbar-brand, .top-scroll a').click(function() {
  if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
	|| location.hostname == this.hostname) {

	var target = $(this.hash);
	target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	if (target.length) {
	  $('html,body').animate({
		scrollTop: target.offset().top
	  }, 2000);
	  return false;
	}
  }
});
var navbarHeight = $('.main-nav').height();
$('a.btnAbout, a.hire').click(function() {
  if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
	|| location.hostname == this.hostname) {

	var target = $(this.hash);
	target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	if (target.length) {
	  $('html,body').animate({
		scrollTop: target.offset().top - navbarHeight
	  }, 2000);
	  return false;
	}
  }
});    
//=======================flexslider==============================================

//=====================================================================
       

//=================================menu scroll==========================================
$('.navbar-nav').onePageNav({
       scrollOffset: navbarHeight,
	   scrollSpeed:1000,
        scrollThreshold: 0.25
	});
//========================================= portfolio filter =========================================	
	

 //============================ function =========================================

imgHover();
lightboxPhoto(); 
winHeight();
barScroll();
  //============================ nav container sticky =========================================

  $(".navbar").sticky({ topSpacing: 0 });
$('ul.nav li a').click(function(){
$('.navbar-inverse .navbar-collapse').removeClass('in')
});
//================= show content ==============================================================
   
})();


$(window).load(function(){
$('#flex-head').flexslider({
animation: "slide",    
slideshow: true
}); 
  navScroll();
$('#filterOptions a').click(function (e) {
    e.preventDefault();
 
    // set active class
    $('#filterOptions a').removeClass('cur');
    $(this).addClass('cur');
 
    // get group name from clicked item
    var groupName = $(this).attr('data-group');
 
    // reshuffle grid
    $grid.shuffle('shuffle', groupName );
	});
    /* initialize shuffle plugin */
    var $grid = $('#grid'),
	$sizer = $grid.find('.shuffle__sizer');
 
    $grid.shuffle({
        itemSelector: '.box', // the selector for the items in the grid
		sizer: $sizer
    });
});

$(window).resize(function(){
navScroll();
winHeight();

});
$(window).scroll(function() {
navScroll();
 }); 
//================================ function ========================================

function imgHover(){
 $('.thumb-img').hover(function(){
     $(this).find('.link-search, .link-chain').fadeIn();
	 $('.link-search').removeClass('fadeOutLeft').addClass('fadeInLeft');
	 $('.link-chain').removeClass('fadeOutRight').addClass('fadeInRight');
    $(this).children('.folio-caption').animate({
    bottom:'0px'
    });
     
 }, function(){
 $(this).find('.link-search, .link-chain').fadeOut();
  $('.link-search').removeClass('fadeInLeft').addClass('fadeOutLeft');
	 $('.link-chain').removeClass('fadeInRight').addClass('fadeOutRight');
    $(this).children('.folio-caption').animate({
    bottom:'-58px'
    });
     
 });   
}

function lightboxPhoto() {
    $(document).delegate('*[data-toggle="lightbox"]', 'click', function(event) {
    event.preventDefault();
    $(this).ekkoLightbox();
    }); 
}
function navScroll(){
 
var top = $(window).scrollTop();

if (top > 3) {
$('.main-nav').fadeIn();

}else {

$('.main-nav').fadeOut();
}

}

function winHeight(){
 //==================================== height header============================
var wHeight = $(window).height();
$('.header').height(wHeight); 
}

    function barScroll(){
     setTimeout(function(){

    $('.progress-bar').each(function() {
        var me = $(this);
        var pe =  $(this).children('.precent-value');
        var perc = me.attr("aria-valuenow");

        var current_perc = 0;

        var progress = setInterval(function() {
            if (current_perc>=perc) {
                clearInterval(progress);
            } else {
                current_perc +=1;
                me.css('width', (current_perc)+'%');
            }

            pe.text((current_perc)+'%');

        },90);
    });
}, 300);

 
        
    }