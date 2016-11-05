const Photo = ({ url, id }) => (
  <a href={ `#${id}`}>
    <div style={{ backgroundImage: `url("${url}")` }}></div>
  </a>
);

const navBtnStyle = {
  color: 'white',
  background: 'rgba(255,255,255,0.1)',
  fontSize: '40px',
  position: 'absolute',
  height: '100%',
  width: '50px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const links = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'white',
  height: '100%',
  width: '100%',
};

const Lightbox = ({ url, id, max }) => (
  <a href="#_" id={ id } className="lightbox">
    <div style={ Object.assign({}, navBtnStyle, {left: '0'}) }>
      <a href={ `#${ id > 1 ? id - 1 : 1 }`} style={links}>
        {'<'}
      </a>
    </div>
    <img src={ url } />
    <div style={ Object.assign({}, navBtnStyle, {right: '0'}) }>
      <a href={ `#${ id < max ? id + 1 : max }`} style={links}>
        {'>'}
      </a>
    </div>
  </a>
);

class PhotoGallery extends React.Component {
  render() {
    const photos = [];
    const lightboxes = [];

    for (let i = 1; i <= this.props.photos; i++) {
      const url = `assets/img-high-res/${i}.jpg`;
      photos.push(
        <Photo
          key={i}
          id={i}
          url={url}
        />
      );
      lightboxes.push(
        <Lightbox
          key={i}
          url={url}
          id={i}
          max={this.props.photos}
        />
      );
    }

    return (
      <div>
        { photos }
        <div className="lightboxes">
          { lightboxes }
        </div>
      </div>
    );
  }
}

window.PhotoGallery = PhotoGallery;
