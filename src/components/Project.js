import './Artist.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

function Project({Title, Image, ListenLink}) {
  return (
    <a rel="noreferrer" target="_blank" href={ListenLink} className="artist-wrapper">
        <div className="artist">
            <div className="poster-wrapper">
                <LazyLoadImage
                alt=""
                effect="opacity"
                className="poster"
                src={Image} />
            </div>
            <h3>{Title}</h3>
        </div>
    </a>
  );
}

export default Project;
