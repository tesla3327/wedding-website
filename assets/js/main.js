
$(function() {

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

});








