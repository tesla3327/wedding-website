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

const Lightbox = ({ url, id, max, handleClick }) => (
  <a href="#_" id={ id } className="lightbox">
    { id > 1 
        ? (<div style={ Object.assign({}, navBtnStyle, {left: '0'}) }>
            <a href={ `#${ id > 1 ? id - 1 : 1 }`} style={links} onClick={ () => handleClick(id - 1)}>
              {'<'}
            </a>
          </div>)
        : null
    }
    <img src={ url } />
    { id < max
        ? (<div style={ Object.assign({}, navBtnStyle, {right: '0'}) }>
            <a href={ `#${ id < max ? id + 1 : max }`} style={links} onClick={ () => handleClick(id + 1) }>
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
  }

  render() {
    const photos = [];
    const lightboxes = [];
    const links = [];

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

    for (let i = 1; i <= this.state.photos; i++) {
      const base = 'http://manitobatoontario.wedding/assets/img';
      const thumbUrl = `${base}/wedding-thumbs/m&g-${i}.JPG`;
      const resizedUrl = `${base}/wedding-resized/m&g-${i}.JPG`;

      photos.push(
        <Photo
          handleClick={ (id) => this.setState({ viewing: id }) }
          key={i}
          id={i}
          url={thumbUrl}
        />
      );
      lightboxes.push(
        <Lightbox
          key={i}
          handleClick={ (id) => this.setState({ viewing: id }) }
          url={ resizedUrl }
          id={i}
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
        <a style={{ textAlign: 'center', paddingTop: '20px' }} onClick={ () => this.setState({ photos: this.state.photos + 12 }) }>
          Load more
        </a>
      </div>
    );
  }
}

window.PhotoGallery = PhotoGallery;
