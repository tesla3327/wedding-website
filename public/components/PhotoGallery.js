'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Photo = function Photo(_ref) {
  var url = _ref.url,
      id = _ref.id,
      handleClick = _ref.handleClick;
  return React.createElement(
    'a',
    { href: '#' + id, onClick: function onClick() {
        return handleClick(id);
      } },
    React.createElement('div', { style: { backgroundImage: 'url("' + url + '")' } })
  );
};

var navBtnStyle = {
  color: 'white',
  background: 'rgba(255,255,255,0.1)',
  fontSize: '40px',
  position: 'absolute',
  height: '100%',
  top: 0,
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
      max = _ref2.max,
      getNextPhoto = _ref2.getNextPhoto,
      getPrevPhoto = _ref2.getPrevPhoto,
      isNext = _ref2.isNext,
      isPrev = _ref2.isPrev,
      handleClick = _ref2.handleClick;
  return React.createElement(
    'a',
    { href: '#_', id: id, className: 'lightbox' },
    isPrev ? React.createElement(
      'div',
      { style: Object.assign({}, navBtnStyle, { left: '0' }) },
      React.createElement(
        'a',
        { href: '#' + getPrevPhoto(id), style: links, onClick: function onClick() {
            return handleClick(getPrevPhoto(id));
          } },
        '<'
      )
    ) : null,
    React.createElement('img', { src: url }),
    isNext ? React.createElement(
      'div',
      { style: Object.assign({}, navBtnStyle, { right: '0' }) },
      React.createElement(
        'a',
        { href: '#' + getNextPhoto(id), style: links, onClick: function onClick() {
            return handleClick(getNextPhoto(id));
          } },
        '>'
      )
    ) : null
  );
};

var PhotoGallery = function (_React$Component) {
  _inherits(PhotoGallery, _React$Component);

  function PhotoGallery(props) {
    _classCallCheck(this, PhotoGallery);

    var _this = _possibleConstructorReturn(this, (PhotoGallery.__proto__ || Object.getPrototypeOf(PhotoGallery)).call(this, props));

    _this.state = {
      photos: props.photos
    };

    // this.loadImages();
    return _this;
  }

  _createClass(PhotoGallery, [{
    key: 'loadImages',
    value: function loadImages() {
      var _this2 = this;

      var thumbs = this.loadImageType('http://manitobatoontario.wedding/assets/img/wedding-thumbs/');

      Promise.all(thumbs).then(function () {
        console.log('Loaded all thumbs');
        var resized = _this2.loadImageType('http://manitobatoontario.wedding/assets/img/wedding-resized/');

        Promise.all(resized).then(function () {
          return console.log('Loaded all resized');
        });
      });
    }
  }, {
    key: 'loadImageType',
    value: function loadImageType(urlPrepend) {
      var arr = [];
      for (var i = 1; i <= this.state.photos; i++) {
        var url = urlPrepend + 'm&g-' + i + '.JPG';
        arr.push(this.loadImage(url));
      }
      return arr;
    }
  }, {
    key: 'loadImage',
    value: function loadImage(url) {
      return new Promise(function (resolve, reject) {
        var img = new Image();
        img.onload = function () {
          resolve();
        };
        img.src = url;
        img.display = 'none';
        document.body.appendChild(img);
      });
    }
  }, {
    key: 'getNextPhoto',
    value: function getNextPhoto(id) {
      var index = this.props.photoList.indexOf(id);
      return this.props.photoList[index + 1];
    }
  }, {
    key: 'getPrevPhoto',
    value: function getPrevPhoto(id) {
      var index = this.props.photoList.indexOf(id);
      return this.props.photoList[index - 1];
    }
  }, {
    key: 'getMaxPhotos',
    value: function getMaxPhotos() {
      return Math.min(this.props.photoList.length, this.state.photos);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var photos = [];
      var lightboxes = [];

      console.log(this.state.viewing);

      for (var i = 0; i < this.getMaxPhotos(); i++) {
        var photoNum = this.props.photoList[i];

        var base = 'http://manitobatoontario.wedding/assets/img';
        var thumbUrl = base + '/wedding-thumbs/m&g-' + photoNum + '.JPG';
        var resizedUrl = base + '/wedding-resized/m&g-' + photoNum + '.JPG';

        photos.push(React.createElement(Photo, {
          handleClick: function handleClick(id) {
            return _this3.setState({ viewing: id || _this3.state.viewing });
          },
          key: photoNum,
          id: photoNum,
          url: thumbUrl
        }));
        lightboxes.push(React.createElement(Lightbox, {
          key: photoNum,
          getNextPhoto: this.getNextPhoto.bind(this),
          getPrevPhoto: this.getPrevPhoto.bind(this),
          isNext: i + 1 < this.getMaxPhotos(),
          isPrev: i > 0,
          handleClick: function handleClick(id) {
            return _this3.setState({ viewing: id || _this3.state.viewing });
          },
          url: this.state.viewing === photoNum ? resizedUrl : null,
          id: photoNum,
          max: this.state.photos
        }));
      }

      return React.createElement(
        'div',
        { style: { display: 'flex', flexFlow: 'column', alignContent: 'center' } },
        React.createElement(
          'div',
          null,
          photos,
          React.createElement(
            'div',
            { className: 'lightboxes' },
            lightboxes
          )
        ),
        this.state.photos < this.props.photoList.length ? React.createElement(
          'a',
          { style: { textAlign: 'center', paddingTop: '20px' }, onClick: function onClick() {
              return _this3.setState({ photos: _this3.state.photos + _this3.props.photos });
            } },
          'Load more'
        ) : null
      );
    }
  }]);

  return PhotoGallery;
}(React.Component);

window.PhotoGallery = PhotoGallery;
