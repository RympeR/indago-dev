import './Product.scss';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

interface ProductProps {
  title: string;
  image: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

function Product({ title, image, onClick }: ProductProps) {
  return (
    <article className='product-wrapper'>
      <div onClick={onClick} className='product'>
        <div className='image-wrapper'>
          <LazyLoadImage
            alt=''
            effect='opacity'
            className='image'
            src={image}
          />
        </div>
        <p className='title'>{title}</p>
        {/*<p className="price">*/}
        {/*    <strike className="old-price">{OldPrice} {Currency}</strike>*/}
        {/*    <span className="actual-price">{Price} {Currency}</span>*/}
        {/*    <span className="actual-price">{Price} {Currency}</span>*/}
        {/*</p>*/}
      </div>
    </article>
  );
}

export default Product;
