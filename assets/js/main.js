var _heights = [{
  id: 'home',
  top: 0
}];
var autoScrolling = false;


function highlightOnScroll() {
  $('.anchor').each(function() {
    var top = $(this).position().top;
    var id = $(this).attr('id');
    _heights.push({ id: id, top: Math.floor(top) });
  });

  $(window).on('scroll', function() {
    if (!autoScrolling) {
      setActive();
    }
  });
}

function setActive() {
  var scrollTop = $('body').scrollTop();
  
  _heights.forEach(function(elem) {
    if (scrollTop >= (elem.top - 10)) {
      $('a.active').removeClass('active');
      $('.nav a[scroll="#' + elem.id + '"]').addClass('active');
    }
  });
}

function tiltLeft( elem, time ) {
  elem.classList.remove('tilt-right');
  elem.classList.add('tilt-left');

  window.setTimeout( tiltRight.bind(this, elem, time), time );
}

function tiltRight( elem, time ) {
  elem.classList.remove('tilt-left');
  elem.classList.add('tilt-right');

  window.setTimeout( tiltLeft.bind(this, elem, time), time );
}

$(function() {

  // smoothScroll.init({
  //     selector: '.nav__a', // Selector for links (must be a valid CSS selector)
  //     selectorHeader: '.nav', // Selector for fixed headers (must be a valid CSS selector)
  //     speed: 500, // Integer. How fast to complete the scroll in milliseconds
  //     easing: 'easeInOutCubic', // Easing pattern to use
  //     updateURL: true, // Boolean. Whether or not to update the URL with the anchor hash on scroll
  //     offset: -70, // Integer. How far to offset the scrolling anchor location in pixels
  //     callback: function(anchor, toggle) {
  //       // setActive();
  //     }
  // });

  $('.nav a').click(function(e) {
    e.preventDefault();

    $('.nav a').removeClass('active');
    var top = 0;
    var href = $(this).attr('scroll');
    console.log(href);

    _heights.forEach(function(elem) {
      if ('#' + elem.id === href) {
        top = elem.top;
      }
    });

    autoScrolling = true;
    $('html, body').animate({ scrollTop : top }, 500, function() {
      autoScrolling = false;
    });
  });

  // Click for RSVP form popup
  $('button').click(function() {
    $('.rsvp-form').removeClass('hide');
    // $('body').css('overflow', 'hidden');
  });

  // Remove pop up 
  $('.rsvp-form__window__close').click(function(e) {
    $('.rsvp-form').addClass('hide');
    // $('body').css('overflow', 'auto');
    e.preventDefault();
  });

  highlightOnScroll();

  // Tilting animation
  // tiltLeft( document.querySelector('.title'), 2000 );

});








