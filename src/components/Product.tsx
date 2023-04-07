import "./Product.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";

interface ProductProps {
  title: string;
  image: string;
  link?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

function Product({ title, image, link, onClick }: ProductProps) {
  return (
    <a
      target={link ? "_blank" : undefined}
      rel={link ? "noreferrer" : undefined}
      href={link ?? "#"}
      onClick={onClick}
      className="product-wrapper"
    >
      <div className="product">
        <div className="image-wrapper">
          <LazyLoadImage
            alt=""
            effect="opacity"
            className="image"
            src={image}
          />
        </div>
        <p className="title">{title}</p>
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
