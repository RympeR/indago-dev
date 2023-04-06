import './Product.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

import Emoji from 'react-apple-emojis';

function Product({Title, Price, OldPrice, Currency, Image, Link}) {
  return (
    <a target="_blank" rel="noreferrer" href={Link} className="product-wrapper">
        <div className="product">
            <div className="image-wrapper">
                <LazyLoadImage
                alt=""
                effect="opacity"
                className="image"
                src={Image} />
            </div>
            <p className="title">{Title}</p>
            {/*<p className="price">*/}
            {/*    <strike className="old-price">{OldPrice} {Currency}</strike>*/}
            {/*    <span className="actual-price">{Price} {Currency}</span>*/}
            {/*    <span className="actual-price">{Price} {Currency}</span>*/}
            {/*</p>*/}
        </div>
    </a>
  );
}

export default Product;
