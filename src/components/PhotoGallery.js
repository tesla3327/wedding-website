const Photo = ({ url, id, handleClick }) => (
  <a href={ `#${id}`} onClick={() => handleClick(id) }>
    <div style={{ backgroundImage: `url("${url}")` }}></div>
  </a>
);

const navBtnStyle = {
  color: 'white',
  background: 'rgba(255,255,255,0.1)',
  fontSize: '40px',
  position: 'absolute',
  height: '100%',
  top: 0,
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

const Lightbox = ({ url, id, max, getNextPhoto, getPrevPhoto, isNext, isPrev, handleClick }) => (
  <a href="#_" id={ id } className="lightbox">
    { isPrev
        ? (<div style={ Object.assign({}, navBtnStyle, {left: '0'}) }>
            <a href={ `#${ getPrevPhoto(id) }`} style={links} onClick={ () => handleClick(getPrevPhoto(id))}>
              {'<'}
            </a>
          </div>)
        : null
    }
    <img src={ url } />
    { isNext
        ? (<div style={ Object.assign({}, navBtnStyle, {right: '0'}) }>
            <a href={ `#${ getNextPhoto(id) }`} style={links} onClick={ () => handleClick(getNextPhoto(id)) }>
              {'>'}
            </a>
          </div>)
        : null
    }
  </a>
);

class PhotoGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: props.photos
    };

    // this.loadImages();
  }

  loadImages() {
    const thumbs = this.loadImageType('http://manitobatoontario.wedding/assets/img/wedding-thumbs/');

    Promise.all(thumbs).then( () => {
      console.log('Loaded all thumbs');
      const resized = this.loadImageType('http://manitobatoontario.wedding/assets/img/wedding-resized/');

      Promise.all(resized).then( () => console.log('Loaded all resized') );
    });
  }

  loadImageType(urlPrepend) {
    const arr = [];
    for (let i = 1; i <= this.state.photos; i++) {
      const url = `${urlPrepend}m&g-${i}.JPG`;
      arr.push(this.loadImage(url));
    }
    return arr;
  }

  loadImage(url) {
    return new Promise( (resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        resolve();
      };
      img.src = url;
      img.display = 'none';
      document.body.appendChild(img);
    });
  }

  getNextPhoto(id) {
    const index = this.props.photoList.indexOf(id);
    return this.props.photoList[index + 1];
  }

  getPrevPhoto(id) {
    const index = this.props.photoList.indexOf(id);
    return this.props.photoList[index - 1];
  }

  getMaxPhotos() {
    return Math.min(this.props.photoList.length, this.state.photos);
  }

  render() {
    const photos = [];
    const lightboxes = [];

    console.log(this.state.viewing);

    for (let i = 0; i < this.getMaxPhotos(); i++) {
      const photoNum = this.props.photoList[i];

      const base = 'http://manitobatoontario.wedding/assets/img';
      const thumbUrl = `${base}/wedding-thumbs/m&g-${photoNum}.JPG`;
      const resizedUrl = `${base}/wedding-resized/m&g-${photoNum}.JPG`;

      photos.push(
        <Photo
          handleClick={ (id) => this.setState({ viewing: id || this.state.viewing }) }
          key={photoNum}
          id={photoNum}
          url={thumbUrl}
        />
      );
      lightboxes.push(
        <Lightbox
          key={photoNum}
          getNextPhoto={ this.getNextPhoto.bind(this) }
          getPrevPhoto={ this.getPrevPhoto.bind(this) }
          isNext={ i + 1 < this.getMaxPhotos() }
          isPrev={ i > 0 }
          handleClick={ (id) => this.setState({ viewing: id || this.state.viewing }) }
          url={ this.state.viewing === photoNum ? resizedUrl : null }
          id={photoNum}
          max={this.state.photos}
        />
      );
    }

    return (
      <div style={{ display: 'flex', flexFlow: 'column', alignContent: 'center' }}>
        <div>
          { photos }
          <div className="lightboxes">
            { lightboxes }
          </div>
        </div>
        { this.state.photos < this.props.photoList.length
          ? (<a style={{ textAlign: 'center', paddingTop: '20px' }} onClick={ () => this.setState({ photos: this.state.photos + this.props.photos }) }>
              Load more
            </a>)
          : null }
      </div>
    );
  }
}

window.PhotoGallery = PhotoGallery;
