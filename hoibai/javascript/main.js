/**
  * isMobile
  * responsiveMenu
  * headerFixed
  * flatIconboxCarousel
  * blogCarousel
  * ClientCarousel
  * flatTeam
  * googleMap
  * portfolioIsotope
  * goTop
  * parallax
*/

;(function($) {

   'use strict'

    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

	var responsiveMenu = function() {
        var menuType = 'desktop';

        $(window).on('load resize', function() {
            var currMenuType = 'desktop';

            if ( matchMedia( 'only screen and (max-width: 991px)' ).matches ) {
                currMenuType = 'mobile';
            }

            if ( currMenuType !== menuType ) {
                menuType = currMenuType;

                if ( currMenuType === 'mobile' ) {
                    var $mobileMenu = $('#mainnav').attr('id', 'mainnav-mobi').hide();
                    var hasChildMenu = $('#mainnav-mobi').find('li:has(ul)');

                    $('#header').after($mobileMenu);
                    hasChildMenu.children('ul').hide();
                    hasChildMenu.children('a').after('<span class="btn-submenu"></span>');
                    $('.btn-menu').removeClass('active');
                } else {
                    var $desktopMenu = $('#mainnav-mobi').attr('id', 'mainnav').removeAttr('style');

                    $desktopMenu.find('.submenu').removeAttr('style');
                    $('#header').find('.nav-wrap').append($desktopMenu);
                    $('.btn-submenu').remove();
                }
            }
        });

        $('.btn-menu').on('click', function() {         
            $('#mainnav-mobi').slideToggle(300);
            $(this).toggleClass('active');
        });

        $(document).on('click', '#mainnav-mobi li .btn-submenu', function(e) {
            $(this).toggleClass('active').next('ul').slideToggle(300);
            e.stopImmediatePropagation()
        });
    }

    var headerFixed_s1 = function() {
        var nav = $('.header.bg-color');
            if ( nav.size() !== 0 ) {

            $(window).on('load', function(){
            var header = $('.header.bg-color');           
            var offsetTop = $('.header.bg-color').offset().top;
            var headerHeight = $('.header.bg-color').height();
            var buffer  = $('<div>', { height: headerHeight }).insertAfter(header);   
                buffer.hide();                 

                $(window).on('load scroll', function(){
                    if ( $(window).scrollTop() > offsetTop  ) {
                        $('.header.bg-color').addClass('fixed-header');
                        buffer.show();
                    } else {
                        $('.header.bg-color').removeClass('fixed-header');
                        buffer.hide();
                    }
                })
           
            }); // headerFixed style1
        }
    };

    var showLogin = function() {
        var showLogin = $('.button-login a');
        var deleteLogin = $('.login-user .delete-login')
        showLogin.on('click',function(e) {
            e.stopPropagation();
            $(this).closest('.boxed').children('.login-user').addClass('open');
            $('body').append('<div class="modal-backdrop fade show"></div>');
        });
        deleteLogin.on('click', function(){
            $(this).closest('.boxed').children('.login-user').removeClass('open');
            $('.modal-backdrop.fade.show').remove();
        })
        $('.login-user').on('click', function(e){
            e.stopPropagation();
        });
        $('body').on('click', function(){
           $('.login-user').removeClass('open');
            $('.modal-backdrop.fade.show').remove();
        });
    }; // Show Search Button
    
    var goTop = function() {
        $(window).scroll(function() {
            if ( $(this).scrollTop() > 800 ) {
                $('.go-top').addClass('show');
            } else {
                $('.go-top').removeClass('show');
            }
        }); 

        $('.go-top').on('click', function() {            
            $("html, body").animate({ scrollTop: 0 }, 1000 , 'easeInOutExpo');
            return false;
        });
    }; 
    
    var topSearch = function () {
      $(document).on('click', function(e) {   
            var clickID = e.target.id;   
            if ( ( clickID !== 's' ) ) {
                $('.top-search').removeClass('show');                
            } 
        });

        $('.show-search').on('click', function(event){
            event.stopPropagation();
        });

        $('.search-form').on('click', function(event){
            event.stopPropagation();
        });        

        $('.show-search').on('click', function (event) {
            if(!$('.top-search').hasClass( "show" )) {
                $('.top-search').addClass('show');  
                event.preventDefault();                
            }
                
            else
                $('.top-search').removeClass('show');
                event.preventDefault();

            if( !$('.show-search' ).hasClass( "active" ) )
                $( '.show-search' ).addClass( 'active' );
            else
                $( '.show-search' ).removeClass( 'active' );
        });   
   
    } 

    var swClick = function () {
        function activeLayout () {
             
            $(".switcher-container" ).on( "click", "a.sw-light", function() {
                $(this).toggleClass( "active" );
                $('body').addClass('home-boxed');  
                $('body').css({'background': '#f6f6f6' });                
                $('.sw-pattern.pattern').css ({ "top": "100%", "opacity": 1, "display": "block",  "z-index": "10"});
            }).on( "click", "a.sw-dark", function() {
                $('.sw-pattern.pattern').css ({ "top": "98%", "opacity": 0, "display": "none", "z-index": "-1"});
                $(this).removeClass('active').addClass('active');
                $('body').removeClass('home-boxed');
                $('body').css({'background': '#fff' });
                return false;
            })       
        }        

        function activePattern () {
            $('.sw-pattern').on('click', function () {
                $('.sw-pattern.pattern a').removeClass('current');
                $(this).addClass('current');
                $('body').css({'background': 'url("' + $(this).data('image') + '")', 'background-size' : '30px 30px', 'background-repeat': 'repeat' });
                return false
            })
        }

        activeLayout(); 
        activePattern();
    }

    var tabs = function() {
        $('.flat-tabs').each(function() {
            $(this).children('.content-tab').children().hide();
            $(this).children('.content-tab').children().first().show();
            $(this).find('.menu-tab').children('li').on('click', function(e) {  
                var liActive = $(this).index(), contentActive = $(this).siblings().removeClass('active').parents('.flat-tabs').children('.content-tab').children().eq(liActive);
                contentActive.addClass('active').fadeIn('slow');
                contentActive.siblings().removeClass('active');
                $(this).addClass('active').parents('.flat-tabs').children('.content-tab').children().eq(liActive).siblings().hide();
                e.preventDefault();
            });
        });
    };

    var countdown = function() { 
            var sec = 59;
            var timer = setInterval(function() { 
               $('.number-seconds').text(sec--);
               if (sec == -1) {
                  if (sec < 0) {sec = 0};
               } 
            }, 1000);
    };

    var full_height = function(){   
        if ($('.boxed').hasClass('page-full-screen')) {    
            var get_full_height = $( window ).height();
            $(".page-full-screen .full-screen").css({'height': get_full_height+'px', 'padding-top': get_full_height/5+'px'});
            if ( matchMedia( 'only screen and (max-width: 767px)' ).matches ) {
                $(".page-full-screen .full-screen").css({'height': get_full_height+'px', 'padding-top': get_full_height/15+'px'});
            }
        } 
    }

    var call_function = function(){
        var args = {duration: 600};
        $('.call-tabs').each(function() {
            $(this).children('.content-tab-call').hide();
            $(this).children('.content-tab-call.active').show();            

            // if ( $(this).find('.menu-tab').children('li').hasClass('active') ) {
            //     var liActive = $(this).find('.menu-tab').children('li.active').data('call');
            //     //alert(liActive);
            // }
            

        //     $(this).find('.menu-tab').children('li').on('click', function(e) { 
        //         if( !$(this).is('.active') ) {
        //             $(this).toggleClass('active');
        //         } else {
        //             $(this).toggleClass('active');
        //         } 

        //         if ( $(this).is('.active') ) {
        //             var liActive = $(this).data('call');
        //             // var hasclass = $(this).hasClass('call-voice');
        //             // alert(hasclass);
        //             if (liActive === 'call-voice-active' && $(this).hasClass('call-voice') ) {                        
        //                 $(this).closest('.call-tabs').each(function() {
        //                     $(this).children('.content-tab-voice').show();
        //                     $(this).children('.content-tab-no-voice').hide();
        //                 });
        //             }
        //         }else{
        //             $(this).closest('.call-tabs').each(function() {
        //                 $(this).children('.content-tab-voice').hide();
        //                 $(this).children('.content-tab-no-voice').show();
        //             });
        //         }
        //         e.preventDefault();
        //     });
        // });

        

        });

        var btn_video_value, btn_voice_value, btn_end_value;        
        $(".btn-call-video").on('click', function(e) {
            btn_video_value = $(".btn-call-video").is(":checked");            
            if (btn_video_value === true) {

            }else{

            }
        });

        $(".btn-call-voice").on('click', function(e) {
            btn_voice_value = $(".btn-call-voice").is(":checked");
            if (btn_voice_value == true) {                
                $('.content-tab-voice').show();
                $('.content-tab-no-voice').hide();           
            }else{
                $('.content-tab-voice').hide();
                $('.content-tab-no-voice').show(); 
            }

        });

        $(".btn-call-end").on('click', function(e) {
            btn_end_value = $(".btn-call-end").is(":checked");
            if (btn_end_value == true) {

            }else{

            }
        });

    }

    var edit_account = function(){
        $(".input-change-password").hide();
        $("#checkbox-change-password").on('click', function(){
            var checked = $("#checkbox-change-password").is(":checked");
            if (checked == true) {
                $(".input-change-password").show(500);
            }else {
                $(".input-change-password").hide(500);
            }
        });

    }

    var removePreloader = function() { 
        $(window).load(function() { 
            $('.preloader').css('opacity', 0);
            setTimeout(function() {
                $('.preloader').hide(); }, 1000           
            ); 
        }); 
         
    };

    

   	// Dom Ready
	$(function() { 
        if ( matchMedia( 'only screen and (min-width: 991px)' ).matches ) {
            headerFixed_s1();
        }          
        responsiveMenu();
        showLogin();
        swClick();
        goTop();
        topSearch();
        tabs();        
        countdown();
        full_height(); 
        call_function();
        edit_account();
        removePreloader();
   	});

})(jQuery);