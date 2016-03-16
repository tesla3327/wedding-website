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

$(function() {

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

  function clearRSVP() {
    $('#found').addClass('hide');
    $('#not-invited').addClass('hide');
    $('#invited').addClass('hide');
    $('#additional-guests').addClass('hide');
    document.getElementById('list-of-guests').innerHTML = '';
  }

  function clearForm() {
    document.getElementById('first-name-input').value = '';
    document.getElementById('last-name-input').value = '';
    document.getElementById('email-input').value = '';
    document.getElementById('attending').checked = true;
    document.getElementById('not-attending').checked = false;
  }

  // Click for RSVP form popup
  $('.event-info__info__rsvp button').click(function() {
    $('.nav').animate({ top: '-60px' }, 200);
    $('.rsvp-form').removeClass('hide');
    $('body').css('overflow', 'hidden');
    clearRSVP();
  });

  // Remove pop up 
  $('.rsvp-form__window__close').click(function(e) {
    $('.nav').animate({ top: '0' }, 200);
    $('.rsvp-form').addClass('hide');
    $('body').css('overflow', 'auto');
    e.preventDefault();
  });

  $('#submit-rsvp').click(function() {
    var firstName = document.getElementById('first-name-input').value;
    var lastName = document.getElementById('last-name-input').value;
    var email = document.getElementById('email-input').value;
    var attending = document.getElementById('attending').checked ? true : false;

    // Create a list of guests
    var guests = [];
    guests.push({
      first: firstName,
      last: lastName,
      email: email,
      attending: attending
    });

    // Find all of the additional guests
    var labels = document.querySelectorAll('#list-of-guests label');
    labels = Array.from(labels);
    labels.forEach( function(label) {
      if (label.querySelector('input').checked) {
        var name = label.innerText.split(' ');
        guests.push({
          first: name[0],
          last: name[1],
          attending: attending,
          email: firstName + ' ' + lastName
        });
      }
    });

    clearRSVP();
    clearForm();

    // Send RSVPs for each person
    guests.forEach( rsvpForGuest );
  });

  function rsvpForGuest( guest ) {
    var request = $.ajax({
      method: 'POST',
      contentType: 'application/json',
      url: '/rsvp',
      data: JSON.stringify(guest)
    });

    request.done(function(data) {
      $('#invited').removeClass('hide');
    });

    request.fail(function(err) {
      console.log('Failed: ', err);

      // Not invited :/
      if (err.status === 401) {
        $('#not-invited').removeClass('hide');
      }
    });
  }

  // On Change check for name
  $('#first-name-input, #last-name-input').on('keyup', function() {
    var firstName = document.getElementById('first-name-input').value;
    var lastName = document.getElementById('last-name-input').value;

    var request = $.ajax({
      method: 'GET',
      url: 'http://127.0.0.1:3000/checkName?first=' + firstName + '&last=' + lastName,
    });

    request.done(function(data) {
      clearRSVP();

      // If there are any additional people, we want to add them
      // to the list
      if (data.isMatch) {
        $('#found').removeClass('hide');
      }

      if (data.additionalGuests.length > 0) {
        $('#additional-guests').removeClass('hide');

        data.additionalGuests.forEach(function(guest) {
          var newElem = document.createElement('label');
          newElem.innerHTML = '<input type="checkbox">' + guest.first + ' ' + guest.last;
          document.getElementById('list-of-guests').appendChild(newElem);
        });
      }

    });

    request.fail(function(err) {
      console.log('Failed: ', err);
    });
  });

  highlightOnScroll();

});








