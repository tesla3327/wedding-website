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
      handleClick = _ref2.handleClick;
  return React.createElement(
    'a',
    { href: '#_', id: id, className: 'lightbox' },
    id > 1 ? React.createElement(
      'div',
      { style: Object.assign({}, navBtnStyle, { left: '0' }) },
      React.createElement(
        'a',
        { href: '#' + (id > 1 ? id - 1 : 1), style: links, onClick: function onClick() {
            return handleClick(id - 1);
          } },
        '<'
      )
    ) : null,
    React.createElement('img', { src: url }),
    id < max ? React.createElement(
      'div',
      { style: Object.assign({}, navBtnStyle, { right: '0' }) },
      React.createElement(
        'a',
        { href: '#' + (id < max ? id + 1 : max), style: links, onClick: function onClick() {
            return handleClick(id + 1);
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
    return _this;
  }

  _createClass(PhotoGallery, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var photos = [];
      var lightboxes = [];
      var links = [];

      // console.log(this.state.viewing);

      // for (let i = 1; i <= this.state.photos; i++) {
      //   const base = 'http://manitobatoontario.wedding/assets/img';
      //   const resizedUrl = `${base}/wedding-resized/m&g-${i}.JPG`;

      //   links.push({"rel": "prefetch", "href": resizedUrl});
      // }

      // links.forEach(link => {
      //   const elem = document.createElement('link');
      //   elem.rel = link.rel;
      //   elem.href = link.href;

      //   document.head.appendChild(elem);
      // });

      for (var i = 1; i <= this.state.photos; i++) {
        var base = 'http://manitobatoontario.wedding/assets/img';
        var thumbUrl = base + '/wedding-thumbs/m&g-' + i + '.JPG';
        var resizedUrl = base + '/wedding-resized/m&g-' + i + '.JPG';

        photos.push(React.createElement(Photo, {
          handleClick: function handleClick(id) {
            return _this2.setState({ viewing: id });
          },
          key: i,
          id: i,
          url: thumbUrl
        }));
        lightboxes.push(React.createElement(Lightbox, {
          key: i,
          handleClick: function handleClick(id) {
            return _this2.setState({ viewing: id });
          },
          url: resizedUrl,
          id: i,
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
        React.createElement(
          'a',
          { style: { textAlign: 'center', paddingTop: '20px' }, onClick: function onClick() {
              return _this2.setState({ photos: _this2.state.photos + 12 });
            } },
          'Load more'
        )
      );
    }
  }]);

  return PhotoGallery;
}(React.Component);

window.PhotoGallery = PhotoGallery;
