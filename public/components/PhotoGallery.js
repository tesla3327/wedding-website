'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Photo = function Photo(_ref) {
  var url = _ref.url,
      id = _ref.id;
  return React.createElement(
    'a',
    { href: '#' + id },
    React.createElement('div', { style: { backgroundImage: 'url("' + url + '")' } })
  );
};

var navBtnStyle = {
  color: 'white',
  background: 'rgba(255,255,255,0.1)',
  fontSize: '40px',
  position: 'absolute',
  height: '100%',
  width: '50px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};

var links = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'white',
  height: '100%',
  width: '100%'
};

var Lightbox = function Lightbox(_ref2) {
  var url = _ref2.url,
      id = _ref2.id,
      max = _ref2.max;
  return React.createElement(
    'a',
    { href: '#_', id: id, className: 'lightbox' },
    React.createElement(
      'div',
      { style: Object.assign({}, navBtnStyle, { left: '0' }) },
      React.createElement(
        'a',
        { href: '#' + (id > 1 ? id - 1 : 1), style: links },
        '<'
      )
    ),
    React.createElement('img', { src: url }),
    React.createElement(
      'div',
      { style: Object.assign({}, navBtnStyle, { right: '0' }) },
      React.createElement(
        'a',
        { href: '#' + (id < max ? id + 1 : max), style: links },
        '>'
      )
    )
  );
};

var PhotoGallery = function (_React$Component) {
  _inherits(PhotoGallery, _React$Component);

  function PhotoGallery() {
    _classCallCheck(this, PhotoGallery);

    return _possibleConstructorReturn(this, (PhotoGallery.__proto__ || Object.getPrototypeOf(PhotoGallery)).apply(this, arguments));
  }

  _createClass(PhotoGallery, [{
    key: 'render',
    value: function render() {
      var photos = [];
      var lightboxes = [];

      for (var i = 1; i <= this.props.photos; i++) {
        var url = 'assets/img-high-res/' + i + '.jpg';
        photos.push(React.createElement(Photo, {
          key: i,
          id: i,
          url: url
        }));
        lightboxes.push(React.createElement(Lightbox, {
          key: i,
          url: url,
          id: i,
          max: this.props.photos
        }));
      }

      return React.createElement(
        'div',
        null,
        photos,
        React.createElement(
          'div',
          { className: 'lightboxes' },
          lightboxes
        )
      );
    }
  }]);

  return PhotoGallery;
}(React.Component);

window.PhotoGallery = PhotoGallery;