$(document).ready(function(){
  $(".owl-carousel").owlCarousel();
});

$('.owl-carousel').owlCarousel({
    loop: true,
    margin: 30,
    responsiveClass:true,
    nav: true,
    navContainer: '.slider-nav-container',
    navText: [''],
    responsive:{
        0:{
            items:1
        },
        769:{
            items:2,
            dots:true
        },
        1025:{
            items:3,
            dots:false
        }
    }
});

$(function(){
    const mobMenuBtn = $('.headbar__menu-btn_mobile');
    const recallBtn = $('.recall_btn');
    // left: 37, up: 38, right: 39, down: 40,
    // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
    const keys = {37: 1, 38: 1, 39: 1, 40: 1};

    function preventDefault(e) {
      e = e || window.event;
      if (e.preventDefault)
          e.preventDefault();
      e.returnValue = false;  
    }

    function preventDefaultForScrollKeys(e) {
        if (keys[e.keyCode]) {
            preventDefault(e);
            return false;
        }
    }

    function disableScroll() {
      if (window.addEventListener) // older FF
          window.addEventListener('DOMMouseScroll', preventDefault, false);

      console.log('modernizr', Modernizr.passiveeventlisteners);

      window.addEventListener('wheel', preventDefault,
          Modernizr.passiveeventlisteners ? {passive: false} : false); // modern standard
      document.addEventListener('mousewheel', preventDefault,
          Modernizr.passiveeventlisteners ? {passive: false} : false); // older browsers, IE
      window.addEventListener('mousewheel', preventDefault,
          Modernizr.passiveeventlisteners ? {passive: false} : false); // older browsers, IE
      window.addEventListener('touchmove', preventDefault,
          Modernizr.passiveeventlisteners ? {passive: false} : false); // mobile
      document.onkeydown  = preventDefaultForScrollKeys;
    }

    function enableScroll() {
        if (window.removeEventListener)
            window.removeEventListener('DOMMouseScroll', preventDefault, false);
        document.removeEventListener('mousewheel', preventDefault, false);
        window.removeEventListener('mousewheel', preventDefault, false);
        window.removeEventListener('wheel', preventDefault, false);
        window.removeEventListener('touchmove', preventDefault, false);
        document.onkeydown = null;
    }


    mobMenuBtn.click(function(){
        $('.popup__container').fadeIn(600);
        $('.dropdown-menu').animate({
            left: '0px',
        },  400);
    });

    recallBtn.click(function(event){
        event.preventDefault();
        $('.popup__container').css('background', 'linear-gradient(0deg, rgba(242, 101, 34, 0.9), rgba(250, 8, 145, 0.05))');
        $('.recall-form__container').css('display', 'flex');
        $('.popup__container').fadeIn(600, disableScroll);
        $('.recall-form__container').fadeIn(300);
    });

    $('.recall-form').submit(function(event) {
        var $form = $(this);

        $.post(
        $form.attr('action'), 
        $form.serialize()     
        );
        $('#client-name').val('');
        $('#client-email').val('');
        $('#client-phone-number').val('');
        $('#pdata-agreement').prop('checked', false);
        $('.recall-form__container').fadeOut(50);
        $('.form-submit-success').fadeIn();
        function clean() {
            $('.form-submit-success').fadeOut(200);
            $('.popup__container').css('background', '').fadeOut(200, enableScroll);
        }
        setTimeout(clean, 3000);
        return false
    });

    $('.popup__container').click(function(event){
        if(event.target == this) {
            $(this).fadeOut(400);
            $(this).css('background', '');
            $('.dropdown-menu').animate({
                left: '-220',
            },  400);
            $('.recall-form__container').fadeOut(200, enableScroll);
            $('.form-submit-success').fadeOut(200, enableScroll);
            $('#client-name').val('');
            $('#client-email').val('');
            $('#client-phone-number').val('');
            $('#pdata-agreement').prop('checked', false);
        }
    });
});






