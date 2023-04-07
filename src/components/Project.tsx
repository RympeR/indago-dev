import "./Project.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";

interface ProjectProps {
  title: string;
  image: string;
  link: string;
}

function Project({ title, image, link }: ProjectProps) {
  return (
    <a rel="noreferrer" target="_blank" href={link} className="project-wrapper">
      <div className="project">
        <div className="poster-wrapper">
          <LazyLoadImage
            alt=""
            effect="opacity"
            className="poster"
            src={image}
          />
        </div>
        <h3>{title}</h3>
      </div>
    </a>
  );
}

export default Project;
