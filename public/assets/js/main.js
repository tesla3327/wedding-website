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

var photoList = [
  1,3,7,10,11,13,14,15,16,19,20,21,22,23,27,31,32,34,35,36,37,39,41,42,44,45,46,48,49,51,52,53,56,57,58,60,61,62,63,64,65,66,68,69,70,71,75,76,77,81,83,84,85,86,88,90,91,92,93,94,95,96,98,99,100,103,104,106,107,108,109,110,113,115,117,120,121,123,124,125,126,128,130,131,133,136,137,140,143,150,153,155,158,162,164,166,167,168,169,172,174,176,179,180,182,185,186,188,189,190,191,192,193,194,195,204,205,206,207,208,209,210,211,213,214,217,219,220,221,222,223,224,225,228,229,230,231,232,233,234,236,240,241,244,246,247,249,252,253,254,255,257,260,262,265,266,269,272,273,274,276,278,281,283,284,287,301,302,304,306,308,310,311,312,314,315,316,317,319,320,323,324,326,328,332,335,336,337,339,342,344,347,348,350,351,352,354,357,362,363,365,366,368,369,370,371,372,373,375,379,382,383,384,391,392,397,398,399,400,401,402,403,404,405,406,407,408,409,410,411,414,416,418,426,428,429,431,437,438,441,442,445,446,447,449,450
];

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

    highlightOnScroll();

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

  // addImages(10);
  // highlightOnScroll();

  // Mount our React component
  ReactDOM.render(
    React.createElement(PhotoGallery, { photos: 8, photoList: photoList }),
    document.getElementById('photo-list')
  );
});








