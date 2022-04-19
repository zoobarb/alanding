/*
|----------------------------------------------------------------------------
	ALanding - Responsive Multipurpose Landing Page Template main JS
	Author: MGScoder
	Author URL: https://themeforest.net/user/mgscoder
|----------------------------------------------------------------------------
*/
document.addEventListener("touchstart", function() {},false);
(function ($) {
	"use strict";
	var windw = $(window);
	
	if (navigator.userAgent.match(/msie/i) || navigator.userAgent.match(/trident/i) ){
		$('body').on("mousewheel", function () {
			event.preventDefault();
			var wheelDelta = event.wheelDelta;
			var currentScrollPosition = window.pageYOffset;
			window.scrollTo(0, currentScrollPosition - wheelDelta);
		});
	}

/*
|--------------------------------------------------------------------------
	Print Current Year in html footer copyright
|--------------------------------------------------------------------------
*/
	$('span#mgsYear').html( new Date().getFullYear() );
	
/*
|--------------------------------------------------------------------------
	carousel
|--------------------------------------------------------------------------
*/	
	//Main Slider
	$('#home-carousel').owlCarousel({
		items: 1,
		autoplay: true,
		dots: true,
		nav: false,
		navText: ["&#10094;", "&#10095;"],
		slideSpeed : 300,
		loop: true,
		smartSpeed:450
	});
	
	//Testimonial Carousel single column
	$('.testimonial-single .owl-carousel').owlCarousel({
	   items: 1,
	   autoplay: true,
	   margin: 30,
	   loop: true,
	   nav: false,
	   navText: ["&#10094;", "&#10095;"]
	});
	
	//gallery Carousel
	$('#gallery .owl-carousel').owlCarousel({
	   autoplay: true,
	   dots: false,
	   margin: 30,
	   loop: true,
	   nav: true,
	   navText: ["&#10094;", "&#10095;"],
	   responsive: {
				  0: {
					items: 1
				  },
				  480: {
					items: 2
				  },
				  768: {
					items: 3
				  },
				  992: {
					items: 4
				  }
				}
	});
	
/*
|--------------------------------------------------------------------------
	ACTIVE STICKY HEADER
|--------------------------------------------------------------------------
*/
	var navh = $('.nav-container');
	var scrollp = windw.scrollTop();		
	if (scrollp > 160) {
		navh.addClass("mgsfixed-nav");
	} else {
		navh.removeClass("mgsfixed-nav");
	}		
	windw.on('scroll', function() {
		if ($(this).scrollTop() > 160) {
			navh.addClass("mgsfixed-nav");
		} else {
			navh.removeClass("mgsfixed-nav");
		}
	});
			
/*
|--------------------------------------------------------------------------
	Change Active State on Scroll
|--------------------------------------------------------------------------
*/		
	var sections = $('section')
	  , nav = $('nav')
	  , nav_height = nav.outerHeight();
	 
	windw.on('scroll', function () {
	  var cur_pos = $(this).scrollTop();
	 
	  sections.each(function() {
		var top = $(this).offset().top - (nav_height-24),
			bottom = top + $(this).outerHeight();
	 
		if (cur_pos >= top && cur_pos <= bottom) {
		  nav.find('a').removeClass('active');
		  sections.removeClass('active');
	 
		  $(this).addClass('active');
		  nav.find('a[href="#'+$(this).attr('id')+'"]').addClass('active');
		}
	  });
	});
	
/*
|--------------------------------------------------------------------------
	Smoth Scroll
|--------------------------------------------------------------------------
*/
	$(document).on('click', 'a[href*="#"]:not([href="#"])', function(event){
	  if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
		var target = $(this.hash);
		target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
		
		var topBar_height = $('.TopBar').outerHeight() - 3;
		if(!topBar_height)
			topBar_height = 0;
		
		var header_height = 50 + topBar_height;
		
		if (target.length) {
		  $('html, body').animate({
			scrollTop: target.offset().top - header_height
		  }, 1000);
		  return false;
		}
	  }
	});

/*
|--------------------------------------------------------------------------
	Subscribe Form
|--------------------------------------------------------------------------
*/	
	//Change YOUR MAILCHIMP ACCOUNT LIST FORM ACTION URL
	$('#mc-form').ajaxChimp({
		url: 'http://YOUR MAILCHIMP ACCOUNT LIST FORM ACTION'
	});

/*
|--------------------------------------------------------------------------
	Contact Form
|--------------------------------------------------------------------------
*/	
	$("#contactForm").validator().on("submit", function (event) {
		if (event.isDefaultPrevented()) {
			//handle the invalid form...
			formError();
			submitContactMSG(false, "Please fill in the form properly!");
		} else {
			
			var filter = /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/;
			
			if (filter.test($("#phone").val())) {
				//everything looks good!
				event.preventDefault();
				submitcontactForm();
			}	
			else {	
				submitContactMSG(false, "Please enter valid phone");
				return false;
			}
			
		}
	});
	
	function submitcontactForm(){
		$.ajax({
			type: "POST",
			url: "contact-process.php",
			data: $( "#contactForm" ).serialize(),
			success : function(text){
				if (text == "success"){
					contactFormSuccess();
				} else {
					formError();
					submitContactMSG(false,text);
				}
			}
		});
	}
	
	function contactFormSuccess(){
		$("#contactForm")[0].reset();
		submitContactMSG(true, "Your Message Submitted Successfully!")
	}
	
	function formError(){
		$(".help-block.with-errors").removeClass('hidden');
	}
	
	function submitContactMSG(valid, msg){
		if(valid){
			var msgClasses = "h3 text-center text-success";
		} else {
			var msgClasses = "h3 text-center text-danger";
		}
		$("#msgContactSubmit").removeClass().addClass(msgClasses).text(msg);
		$('html,body').animate({
			scrollTop: $("#msgContactSubmit").offset().top - 80},
        'slow');
	}
	
/*
|--------------------------------------------------------------------------
	Typewrite
|--------------------------------------------------------------------------
*/	
	var TxtType = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    TxtType.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

        var that = this;
        var delta = 200 - Math.random() * 100;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
        }

        setTimeout(function() {
        that.tick();
        }, delta);
    };

    window.onload = function() {
        var elements = document.getElementsByClassName('typewrite');
        for (var i=0; i<elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-type');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
              new TxtType(elements[i], JSON.parse(toRotate), period);
            }
        }
        // INJECT CSS
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
        document.body.appendChild(css);
    };

/*
|--------------------------------------------------------------------------
	Accordion
|--------------------------------------------------------------------------
*/	
	function toggleChevron(e) {
		$('#mgsAccordion .panel-heading').toggleClass('highlight default-color');
		$(e.target).prev('.panel-heading').addClass('highlight');		
	}
	$('#mgsAccordion').on('hidden.bs.collapse', toggleChevron);
	$('#mgsAccordion').on('shown.bs.collapse', toggleChevron);

/*
|--------------------------------------------------------------------------
| CountUp
|--------------------------------------------------------------------------
*/
	$('.counter').counterUp({
		delay: 5,
		time: 1000
	});

/*
|--------------------------------------------------------------------------
	Scrollup
|--------------------------------------------------------------------------
*/
	var scrollup = $('.scrollup');
	windw.scroll(function () {
		if ($(this).scrollTop() > 100) {
			scrollup.fadeIn();
		} else {
			scrollup.fadeOut();
		}
	});
	scrollup.on('click', '', function(event){
		$("html, body").animate({
			scrollTop: 0
		}, 600);
		return false;
	});

})(jQuery);

	
/*
|--------------------------------------------------------------------------
	COMMON FUNCTION
|--------------------------------------------------------------------------
*/
	//Responsive menu
	function mgsChangeMenubar(xmgs) {
		xmgs.classList.toggle("mgschangemenu-bar");
	}
	
/*
|--------------------------------------------------------------------------
	End
|--------------------------------------------------------------------------
*/