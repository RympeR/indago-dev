import { Link, Element } from 'react-scroll';

import './Landing.css';
import Logo from './assets/kodo-sound.svg';

import LandingBG_480 from './assets/images/landing-bg-480.jpg';
import LandingBG_720 from './assets/images/landing-bg-720.jpg';
import LandingBG_1366 from './assets/images/landing-bg-1366.jpg';
import LandingBG_1920 from './assets/images/landing-bg-1920.jpg';
import LandingBG_2560 from './assets/images/landing-bg-2560.jpg';
import LandingBG_3840 from './assets/images/landing-bg-3840.jpg';

import Poster_Artist_IE from './assets/images/artists/ie.png';
import Poster_Artist_WertogProd from './assets/images/artists/wertog-prod.jpg';
import Poster_Artist_KilledByPain from './assets/images/artists/killed-by-pain.jpg';

import Product_Image_1 from './assets/images/products/kodo-product-0.svg';
import Product_Image_2 from './assets/images/products/kodo-product-1.svg';
import Product_Image_3 from './assets/images/products/kodo-product-2.svg';

import Social_Icon_VK from './assets/social/vk.svg';
import Social_Icon_Telegram from './assets/social/telegram.svg';

import { useEffect, useState } from 'react';
import Project from './components/Project';
import Product from './components/Product';

import Emoji from 'react-apple-emojis';

import ArrowDown from './assets/arrow-down.svg';

import './Adaptive.css';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

function Landing() {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
      const position = window.pageYOffset;

      //const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      //const percent = Math.round((document.documentElement.scrollTop / height) * 100);
    
      setScrollPosition(position);
  };

  useEffect(() => {
      window.addEventListener('scroll', handleScroll, { passive: true });

      return () => {
          window.removeEventListener('scroll', handleScroll);
      };
  }, []);
  return (
    <section className="landing">
      <header className="landing-header">
        <div className="brand-logo">
          <Link to="slide-1" smooth={true} duration={1500}>
            <img alt="KODO SOUND logo" src={Logo}/>
          </Link>
        </div>
        <Link className="nav-link" offset={-50} activeClass="active" to="slide-1" spy={true} smooth={true} duration={1500}>
          Главная
        </Link>
        <Link className="nav-link" offset={-50} activeClass="active" to="slide-2" spy={true} smooth={true} duration={1500}>
          Проекты
        </Link>
        <Link  className="nav-link" offset={-50} activeClass="active" to="slide-3" spy={true} smooth={true} duration={1500}>
          Услуги
        </Link>
        <a href="mailto:kodosound@gmail.com" className="action-button" rel="noreferrer" target="_blank">Написать на почту</a>
      </header>

      
      <Element name="slide-1" className="slide full">
        <LazyLoadImage
            effect="opacity"
            alt="Landing background"
            className="background"
            style={{top: scrollPosition / 3}}
            src={LandingBG_480}
            srcSet={`
              ${LandingBG_480} 480w,
              ${LandingBG_720} 720w,
              ${LandingBG_1366} 1366w,
              ${LandingBG_1920} 1920w,
              ${LandingBG_2560} 2560w,
              ${LandingBG_3840} 3840w
            `}
            sizes="
              (max-width: 480px) 480px,
              (max-width: 720px) 720px,
              (max-width: 1366px) 1366px,
              (max-width: 1920px) 1920px,
              (max-width: 2560px) 2560px,
              (max-width: 3840px) 3840px,
            "  
          />
        <div className="big-text">
          <div>
            <h1>INDAGO DEV</h1>
            <p>Indago Dev : A full-cycle development firm committed to personalized service, exceptional quality, and lasting partnerships. Join us in creating the future.</p>
            <Link to="slide-2" offset={-50} smooth={true} duration={1500}>
              <div className="call-to-scroll-label">
                <img alt="Arrow down" src={ArrowDown} />
                <span>Подробнее</span>
              </div>
            </Link>
          </div>
        </div>
      </Element>
      <Element name="slide-2" className="slide">
        <div className="slide-content">
          <h2>Наши проекты</h2>
          <section className="artists">
          <Project Title="иероглиф" ListenLink="https://ie.kodo.fun" Image={Poster_Artist_IE} />
          <Project Title="KilledByPain" ListenLink="https://musi.to/killedBypain" Image={Poster_Artist_KilledByPain} />
          <Project Title="WeRtOG Prod." ListenLink="https://soundcloud.com/wertogprod" Image={Poster_Artist_WertogProd}  />
        </section>
        </div>
      </Element>
      <Element name="slide-3" className="slide last">
        <div className="slide-content">
          <h2>Наши услуги</h2>
          <div className="products">
            <Product
              Title={"Дизайн продукта"}
              OldPrice="1 700" Price="1 500" Currency="₽" Image={Product_Image_1}
              Link="mailto:kodosound@gmail.com?subject=Товар: KODO-000001"
            />
            <Product
              Title="Разработка продукта"
              OldPrice="1 550" Price="1 250" Currency="₽" Image={Product_Image_2}
              Link="mailto:kodosound@gmail.com?subject=Товар: KODO-000002"
            />
            <Product
              Title="Веб скраппинг"
              OldPrice="600" Price="450" Currency="₽" Image={Product_Image_3}
              Link="mailto:kodosound@gmail.com?subject=Товар: KODO-000003"
            />
            <Product
              Title="Анализ данных и построение интерактивных дашбордов"
              OldPrice="600" Price="450" Currency="₽" Image={Product_Image_3}
              Link="mailto:kodosound@gmail.com?subject=Товар: KODO-000003"
            />
          </div>
        </div>
      </Element>
      <footer className="landing-footer">
        <div className="copyright">
          © KODO SOUND {new Date().getFullYear()}
        </div>
        <div className="social-links">
          <a target="_blank" rel="noreferrer" href="https://vk.com/kodosound">
            <img alt="VK" src={Social_Icon_VK} />
          </a>
          <a target="_blank" rel="noreferrer" href="https://t.me/kodosound">
            <img alt="Telegram" src={Social_Icon_Telegram} />
          </a>
        </div>
      </footer>
    </section>
  );
}

export default Landing;
