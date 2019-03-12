jQuery(document).ready(function($){
	
/*-------------------------------------------------------------------------

	1.	Plugin Init
	2.	Helper Functions
	3.	Shortcode Stuff
	4.	Header + Search
	5.	Page Specific
	6.	Cross Browser Fixes


-------------------------------------------------------------------------*/


/*-------------------------------------------------------------------------*/
/*	1.	Plugin Init
/*-------------------------------------------------------------------------*/

/***************** Pretty Photo ******************/

	function prettyPhotoInit(){
		
		$("a.pp").prettyPhoto({
			theme: 'dark_rounded',
			social_tools: '',
			markup: '<div class="pp_pic_holder"> \
							<div class="ppt">&nbsp;</div> \
							<div class="pp_content_container"> \
								<div class="pp_left"> \
								<div class="pp_right"> \
									<div class="pp_content"> \
										<div class="pp_loaderIcon"></div> \
										<div class="pp_fade"> \
											<div class="pp_hoverContainer"> \
												<a class="pp_next" href="#">next</a> \
												<a class="pp_previous" href="#">previous</a> \
											</div> \
											<div id="pp_full_res"></div> \
											<div class="pp_details"> \
												<div class="pp_nav"> \
													<a href="#" class="pp_arrow_previous">Previous</a> \
													<p class="currentTextHolder">0/0</p> \
													<a href="#" class="pp_arrow_next">Next</a> \
												</div> \
												<a class="pp_close" href="#">Close</a> \
											</div> \
										</div> \
									</div> \
								</div> \
								</div> \
							</div> \
						</div> \
						<div class="pp_overlay"></div>'
		});
		
	}
	
	prettyPhotoInit();
		
		
		
/***************** Smooth Scrolling ******************/

	function niceScrollInit(){
		$("html").niceScroll({
			scrollspeed: 60,
			mousescrollstep: 35,
			cursorwidth: 15,
			cursorborder: 0,
			cursorcolor: '#2D3032',
			cursorborderradius: 6,
			autohidemode: false
		});
		
		$('body, body #header-outer').css('padding-right','16px');
	}
	
	var $smoothActive = $('body').attr('data-smooth-scrolling'); 
	if( $smoothActive == 1){ niceScrollInit(); }
	
	


/***************** Sliders ******************/

	var sliderAdvanceSpeed = parseInt($('#featured').attr('data-advance-speed'));
	var sliderAnimationSpeed = parseInt($('#featured').attr('data-animation-speed'));
	var sliderAutoplay = parseInt($('#featured').attr('data-autoplay'));
	
	if( isNaN(sliderAdvanceSpeed) ) { sliderAdvanceSpeed = 5500;}
	if( isNaN(sliderAnimationSpeed) ) { sliderAnimationSpeed = 800;}
	
	var $yPos;
	
	
	var img_urls=[];
	$('[style*="background"]').each(function() {
	    var style = $(this).attr('style');
	    var pattern = /background.*?url\('(.*?)'\)/g
	    var match = pattern.exec(style);
	    if (match) {        
	        img_urls.push(match[1]);
	    }
	});
	
	var imgArray = [];
	
	for(i=0;i<img_urls.length;i++){
		imgArray[i] = new Image();
		imgArray[i].src = img_urls[i];
	}

	$(window).load(function(){
		
		//home slider
		 $('#featured').orbit({
         	 animation: 'fade',
         	 advanceSpeed: sliderAdvanceSpeed,
         	 animationSpeed: sliderAnimationSpeed, 
         	 timer: sliderAutoplay
    	 });
    	 
    	 $('#featured article .post-title h2 span').show();
    		 
    	 //add hover effect to slider nav
    	$('.slider-nav > span').append('<span class="white"></span>');	
    	
    	
    	//gallery
    	 $('.flex-gallery').flexslider({
	        animation: 'fade',
	        controlsContainer: '.flexslider',
	        smoothHeight: true
	    });
    	
    	//gallery slider span add
		$('.flex-gallery .flex-direction-nav li a').append('<span>');

	});
	
	


	
/***************** Parallax Slider ******************/
	
	if( $('#featured').length > 0 ){
	
		var $scrollTop;
		$(window).scroll(function(){
		    $scrollTop = $(window).scrollTop();
			
			$('body:not(.mobile) .orbit-wrapper #featured .orbit-slide article .container').css({ 
				'opacity' : 1-($scrollTop/400),
				'top' : ($scrollTop*-0.4) + 292 +"px"
			});
			
			$('body:not(.mobile) .orbit-wrapper .slider-nav > span').css({ 
				'opacity' : 1-($scrollTop/400),
				'top' : ($scrollTop*-0.4) + 363 +"px"
			});
	
			
			$('body:not(.mobile) .orbit-wrapper #featured .slide article').css({'background-position': 'center ' + - $scrollTop / 5 + 'px'});	
		});
		
		//disable parallax for mobile
		$(window).resize(function(){
			if($('body').hasClass('mobile')){
				$('.orbit-wrapper #featured article').css('backgroundPosition','center 60%');
			}
			
			else {
				$('.orbit-wrapper #featured article').css('backgroundPosition','center top');
			}
		});
		
	}



/***************** Superfish ******************/

	function initSF(){

		$(".sf-menu").superfish({
			 delay:  100,
			 autoArrows:    true,
			 speed: 'fast',
			 animation:   {opacity:'show'}
		}); 
	}
	
	function addOrRemoveSF(){
		
		if( $(window).width() <= 1050 ){
			$('body').addClass('mobile');
			$('header#top nav > ul').hide();
		}
		
		else {
			$('body').removeClass('mobile');
			$('header#top nav > ul').show();
		}
	}
	
	addOrRemoveSF();
	initSF();
	
	$(window).resize(addOrRemoveSF);
	
	$('body.mobile header#top nav > ul a.sf-with-ul').on('click',function(){
		$(this).next('ul').toggleClass('mobile-open');
		return false;
	});
	
	//turn dropdown arrows into font awesome
	$('nav > ul.sf-menu > li').each(function(){
		$(this).find(' > a > .sf-sub-indicator').html('<i class="icon-angle-down"></i>');
	});
	
	function SFArrows(){
		if($('body').hasClass('mobile')){
			$('nav > ul.sf-menu > li > ul li').each(function(){
				$(this).find(' > a > .sf-sub-indicator').html('<i class="icon-angle-down"></i>');
			});
		}
		
		else {
			$('nav > ul.sf-menu > li > ul li').each(function(){
				$(this).find(' > a > .sf-sub-indicator').html('<i class="icon-angle-right"></i>');
			});	
		}
		
	}
	
	SFArrows();
	
	$(window).resize(SFArrows);
	


/***************** Caroufredsel ******************/

    $(window).load(function(){
    	

    	$('.carousel').each(function(){
	    	var $that = $(this);
	    	var scrollSpeed, easing;
					
			(parseInt($(this).attr('data-scroll-speed'))) ? scrollSpeed = parseInt($(this).attr('data-scroll-speed')) : scrollSpeed = 700;
			($(this).attr('data-easing').length > 0) ? easing = $(this).attr('data-easing') : easing = 'linear';
			
	    	$(this).carouFredSel({
	    		circular: true,
	    		responsive: true,
		        items       : {
					width : 353,
			        visible     : {
			            min         : 1,
			            max         : 3
			        }
			    },
			    scroll: {
			    	easing          : easing,
		            duration        : scrollSpeed
			    },
		        prev    : {
			        button  : function() {
			           return $that.parents('.carousel-wrap').prev(".carousel-heading").find('.carousel-prev');
			        }
		    	},
			    next    : {
		       		button  : function() {
			           return $that.parents('.carousel-wrap').prev(".carousel-heading").find('.carousel-next');
			        }
			    },
			    auto    : {
			    	play: true
			    }
			    
		    }).css('visibility','visible');
	    });
	    
	    piVertCenter();

    	
    });
    
    var resizeTimer = null;
    $(window).resize(function() {
        resizeTimer && clearTimeout(resizeTimer); 
        resizeTimer = setTimeout(function() {
          
             piVertCenter();
             
        }, 60);
    });
	
	
/*-------------------------------------------------------------------------*/
/*	2.	Helper Functions
/*-------------------------------------------------------------------------*/

	jQuery.fn.setCursorPosition = function(position){
	    if(this.lengh == 0) return this;
	    return $(this).setSelection(position, position);
	}
	
	jQuery.fn.setSelection = function(selectionStart, selectionEnd) {
	    if(this.lengh == 0) return this;
	    input = this[0];
	
	    if (input.createTextRange) {
	        var range = input.createTextRange();
	        range.collapse(true);
	        range.moveEnd('character', selectionEnd);
	        range.moveStart('character', selectionStart);
	        range.select();
	    } else if (input.setSelectionRange) {
	        input.focus();
	        input.setSelectionRange(selectionStart, selectionEnd);
	    }
	
	    return this;
	}
	
	
	$.belowthefold = function(element, settings) {
        var fold = $(window).height() + $(window).scrollTop();
        return fold <= $(element).offset().top - settings.threshold;
    };

    $.abovethetop = function(element, settings) {
        var top = $(window).scrollTop();
        return top >= $(element).offset().top + $(element).height() - settings.threshold;
    };
    
    $.rightofscreen = function(element, settings) {
        var fold = $(window).width() + $(window).scrollLeft();
        return fold <= $(element).offset().left - settings.threshold;
    };
    
    $.leftofscreen = function(element, settings) {
        var left = $(window).scrollLeft();
        return left >= $(element).offset().left + $(element).width() - settings.threshold;
    };
    
    $.inviewport = function(element, settings) {
        return !$.rightofscreen(element, settings) && !$.leftofscreen(element, settings) && !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
    };
    
    $.extend($.expr[':'], {
        "below-the-fold": function(a, i, m) {
            return $.belowthefold(a, {threshold : 0});
        },
        "above-the-top": function(a, i, m) {
            return $.abovethetop(a, {threshold : 0});
        },
        "left-of-screen": function(a, i, m) {
            return $.leftofscreen(a, {threshold : 0});
        },
        "right-of-screen": function(a, i, m) {
            return $.rightofscreen(a, {threshold : 0});
        },
        "in-viewport": function(a, i, m) {
            return $.inviewport(a, {threshold : 0});
        }
    });
	
	
	
/*-------------------------------------------------------------------------*/
/*	3.	Shortcode Stuff
/*-------------------------------------------------------------------------*/
	
/***************** Tabbed ******************/

	$('.tabbed ul li a').click(function(){
		var $id = $(this).attr('href');
		
		if(!$(this).hasClass('active-tab')){
			$('.tabbed ul li a').removeClass('active-tab');
			$(this).addClass('active-tab');
			
			$('.tabbed > div').hide();
			$('.tabbed > div'+$id).fadeIn(400);	
		}
		return false;
	});
	
	$('.tabbed ul li:first-child a').click();
	
	
/***************** Toggle ******************/

	$('.toggle h3 a').click(function(){
		$(this).parents('.toggle').find('> div').slideToggle(300);
		$(this).parents('.toggle').toggleClass('open');
		return false;
	});
	
	
/***************** Checkmarks ******************/

	$('ul.checks li').prepend('<span></span>');
	
	
	
/***************** 4 Col Grid in iPad ******************/

	$('.col.span_3').each(function(){
		var $currentDiv = $(this);
		var $nextDiv = $(this).next('div');
		if( $nextDiv.hasClass('span_3') && !$currentDiv.hasClass('one-fourths')) {
			$currentDiv.addClass('one-fourths clear-both');
			$nextDiv.addClass('one-fourths right-edge');
		}
	});
	
	
/***************** Bar Graph ******************/

	function animateBar(){
		
		$('.bar_graph li:in-viewport').each(function(i){
			var percent = $(this).find('span').attr('data-width');
			
				$(this).find('span').animate({
					'width' : percent + '%'
				},1700, 'easeOutCirc');
				
				$(this).find('span strong').animate({
					'opacity' : 1
				},1400);	
	
			////100% progress bar 
			if(percent == '100'){
				$(this).find('span strong').addClass('full');
			}
		});
	
	}
	
	if( $('.bar_graph').length > 0 ){
		animateBar();
		$(window).scroll(animateBar);	
	}	
	
	
/*-------------------------------------------------------------------------*/
/*	4.	Header + Search
/*-------------------------------------------------------------------------*/	


/***************** Search ******************/
	var $placeholder = $('#search input[type=text]').attr('data-placeholder');
	
	////search box event
	$('#search-btn').mousedown(function(){
		
		$(this).removeClass();
		
		$('#header-outer #search-outer').stop(true).fadeIn(700,'easeOutExpo');
		
		$('#search input[type=text]').focus();
		
		if($('#search input[type=text]').attr('value') == $placeholder){
			$('#search input[type=text]').setCursorPosition(0);	
		}

		return false;
	});
	
	$('#search input[type=text]').keydown(function(){
		if($(this).attr('value') == $placeholder){
			$(this).attr('value', '');
		}
	});
	
	$('#search input[type=text]').keyup(function(){
		if($(this).attr('value') == ''){
			$(this).attr('value', $placeholder);
			$(this).setCursorPosition(0);
		}
	});
	
	
	////close search btn event
	$('#close').click(function(){
		
		closeSearch();
		return false;
	});

	//if user clicks away from the search close it
	$('#search-box input[type=text]').blur(function(e){
		closeSearch();
	});
	
	
	function closeSearch(){
		$('#header-outer #search-outer').stop(true).fadeOut(400,'easeOutExpo');
	}
	
	
/***************** Nav ******************/
	
	
	////responsive nav
	$('#toggle-nav').click(function(){
		
		$('header#top .container .col.span_9 nav > ul').stop(true,true).slideToggle(500);
		return false;
	});
	
	
/*-------------------------------------------------------------------------*/
/*	5.	Page Specific
/*-------------------------------------------------------------------------*/	

	//recent work
	function piVertCenter() {
		$('.portfolio-items  > .col').each(function(){
			var $colHeight = $(this).find('.work-item').height();
			var $infoHeight = $(this).find('.vert-center').height();
			
			//30px away from being centered so we can transition to center point on hover
			$(this).find('.work-info .vert-center').css('margin-top', (($colHeight / 2) - ($infoHeight / 2 )) - 30 );
		});	
	}
	
	$(window).load(function(){
	 	 piVertCenter();
	});
	 
	$(window).resize(function(){
		 piVertCenter();
	});
	
	
	//portfolio sort
	$('#portfolio-filters').hover(function(){
		$(this).find('ul').stop(true,true).slideToggle(600,'easeOutExpo');
	});
	
	
	
	//blog love center
	function centerLove(){
		$('.post').each(function(){
			
			var $loveWidth = $(this).find('.post-meta .nectar-love').outerWidth();
			var $loveWrapWidth = $(this).find('.post-meta  .nectar-love-wrap').width();
			
			//center
			$(this).find('.post-meta .nectar-love').css('margin-left', $loveWrapWidth/2 - $loveWidth/2 + 'px' );
		});
	}
	
	$('.nectar-love').on('click',function(){
		centerLove();
	});
	
	centerLove();	
	
	
	//portfolio single comment order
	function portfolioCommentOrder(){
		
		if($('body').hasClass('mobile') && $('body').hasClass('single-portfolio') && $('#respond').length > 0){
			$('#sidebar').insertBefore('.comments-section');
		}
		
		else {
			$('#sidebar').insertAfter('#post-area');
		}
		
	}
	
	$(window).resize(portfolioCommentOrder);
	 portfolioCommentOrder();
	
/*-------------------------------------------------------------------------*/
/*	6.	Cross Browser Fixes
/*-------------------------------------------------------------------------*/	
	
	//Fix current class in menu
	if ($("body").hasClass("single-portfolio") || $('body').hasClass("error404") || $('body').hasClass("search-results")) {   
		$("li").removeClass("current_page_parent");   
	}
	
	//fix for IE8 nth-child
	$('.recent_projects_widget div a:nth-child(3n+3), #sidebar #flickr div:nth-child(3n+3) a, #footer-outer #flickr div:nth-child(3n+3) a').css('margin-right','0px');
	
	//remove br's from code tag
	$('code').find('br').remove();	
	
	//if a clear is the last div, remove the padding
	if($('.container.main-content > .row > div:last-child').hasClass('clear')) {
		$('.container.main-content > .row > div:last-child').css('padding-bottom','0');
	}
	
	//contact form
	$('.wpcf7-form p:has(input[type=submit])').css('padding-bottom','0px');
})
