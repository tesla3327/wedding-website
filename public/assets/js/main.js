/* 
 * This code is terribly written and makes me sad :(
 * Why didn't I just use React for this...
 */

var _heights = [{
  id: 'home',
  top: 0
}];
var autoScrolling = false;
// CORS
var API_URL = 'http://manitobatoontario.wedding';

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

function addImages(num) {
  var photoList = document.getElementById('photo-list');

  for (var i = 0; i < num; i++) {
    var div = document.createElement('div');
    var link = document.createElement('a');

    var imageUrl = "assets/img-high-res/" + (i + 1) + ".jpg";
    var imageId = "img" + (i+1);

    link.href= '#' + imageId;
    div.style.backgroundImage = "url('" + imageUrl + "')";

    link.appendChild(div);
    photoList.appendChild(link);

    // Also create the lightbox holder
    link = document.createElement('a');
    link.href = "#_";
    link.classList.add('lightbox');
    link.id = imageId;

    var img = document.createElement('img');
    img.src = imageUrl;
    link.appendChild(img);

    photoList.appendChild(link);
  }
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

  addImages(10);
  highlightOnScroll();

});








