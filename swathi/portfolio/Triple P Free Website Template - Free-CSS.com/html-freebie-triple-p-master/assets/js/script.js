$(function () {    
// Navigation 
    $('.site-navigation').affix({
      offset: {
        top: $('.hero').height()
            }
    });

    var $window = $(window);
    function checkWidth() {
        var windowsize = $window.width();
        if (windowsize < 768) {
            $('.nav a').on('click', function(){
                $('.navbar-toggle').click() //bootstrap 3.x by Richard
            });
        }
    }
    // Execute on load
    checkWidth();
    // Bind event listener
    $(window).resize(checkWidth);

// Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.site-header',
        offset: 10
    });

//jQuery for page scrolling feature - requires jQuery Easing plugin
    $(document).on('click', '.page-scroll a', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1000, 'easeInOutExpo');
        event.preventDefault();
    });

//Counters 
    if ($(".counter-start").length>0) {
        $(".counter-start").each(function() {
            var stat_item = $(this),
            offset = stat_item.offset().top;
            $(window).scroll(function() {
                if($(window).scrollTop() > (offset - 1000) && !(stat_item.hasClass('counting'))) {
                    stat_item.addClass('counting');
                    stat_item.countTo();
                }
            });
        });
    };


// Progress bar 
    var $section = $('.section-skills');
    function loadDaBars() {
        $('.progress .progress-bar').progressbar({
            transition_delay: 500,
            display_text: 'center'
        });
    }
    
    $(document).bind('scroll', function(ev) {
        var scrollOffset = $(document).scrollTop();
        var containerOffset = $section.offset().top - window.innerHeight;
        if (scrollOffset > containerOffset) {
            loadDaBars();
            // unbind event not to load scrolsl again
            $(document).unbind('scroll');
        }
    });

//Team Carousel
    $('#services-carousel').carousel({ interval: false });

    // Carousel touch support
    if($(".carousel-inner").length) {
        $(".carousel-inner").swipe({
            //Generic swipe handler for all directions
            swipeLeft: function (event, direction, distance, duration, fingerCount) {
                $(this).parent().carousel('next');
            },
            swipeRight: function () {
                $(this).parent().carousel('prev');
            },
            //Default is 75px, set to 0 for demo so any distance triggers swipe
            threshold: 50
        });
    }

// Slick.js   
    $('.review-carousel').slick({
        nextArrow: '<button class="slick rectangle slick-next"><i class="fa fa-angle-right" aria-hidden="true"></button>',
        prevArrow: '<button class="slick rectangle slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></button>'
    });

    $('.clients-carousel').slick({
        arrows: false,
        slidesToShow: 5,
        responsive: [ {
            breakpoint : 992,
            settings: {
                slidesToShow: 2
            }
        },
        {
            breakpoint : 480,
            settings: {
                slidesToShow: 1
            }
      }]
    });

//shuffle.js
    var shuffleme = (function( $ ) {
      'use strict';
          var $grid = $('#grid'), //locate what we want to sort 
          $filterOptions = $('.portfolio-sorting li'),  //locate the filter categories

      init = function() {

        // None of these need to be executed synchronously
        setTimeout(function() {
          listen();
          setupFilters();
        }, 100);

        // instantiate the plugin
        $grid.shuffle({
          itemSelector: '[class*="col-"]', 
           group: Shuffle.ALL_ITEMS, 
        });
      },

        
      // Set up button clicks
      setupFilters = function() {
        var $btns = $filterOptions.children();
        $btns.on('click', function(e) {
          e.preventDefault();
          var $this = $(this),
              isActive = $this.hasClass( 'active' ),
              group = isActive ? 'all' : $this.data('group');

          // Hide current label, show current label in title
          if ( !isActive ) {
            $('.portfolio-sorting li a').removeClass('active');
          }

          $this.toggleClass('active');

          // Filter elements
          $grid.shuffle( 'shuffle', group );
        });

        $btns = null;
      },

      // Re layout shuffle when images load. This is only needed
      // below 768 pixels because the .picture-item height is auto and therefore
      // the height of the picture-item is dependent on the image
      // I recommend using imagesloaded to determine when an image is loaded
      // but that doesn't support IE7
      listen = function() {
        var debouncedLayout = $.throttle( 300, function() {
          $grid.shuffle('update');
        });

        // Get all images inside shuffle
        $grid.find('img').each(function() {
          var proxyImage;

          // Image already loaded
          if ( this.complete && this.naturalWidth !== undefined ) {
            return;
          }

          // If none of the checks above matched, simulate loading on detached element.
          proxyImage = new Image();
          $( proxyImage ).on('load', function() {
            $(this).off('load');
            debouncedLayout();
          });

          proxyImage.src = this.src;
        });

        // Because this method doesn't seem to be perfect.
        setTimeout(function() {
          debouncedLayout();
        }, 500);
      };      

      return {
        init: init
      };
    }( jQuery ));

    if($('#grid').length >0 ) { 
      shuffleme.init(); //filter portfolio
    };
}());
