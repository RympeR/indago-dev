import { Link, Element } from 'react-scroll';

import './Landing.css';
import Logo from './assets/indago-logo-web.svg';

import LandingBG_480 from './assets/images/landing-bg-480.jpg';
import LandingBG_720 from './assets/images/landing-bg-720.jpg';
import LandingBG_1366 from './assets/images/landing-bg-1366.jpg';
import LandingBG_1920 from './assets/images/landing-bg-1920.jpg';
import LandingBG_2560 from './assets/images/landing-bg-2560.jpg';
import LandingBG_3564 from './assets/images/landing-bg-3564.jpg';

import Project_1 from './assets/images/projects/kidsofthefuture.svg';

import { useTranslation } from 'react-i18next';

import Social_Icon_Telegram from './assets/social/telegram.svg';

import { useEffect, useState } from 'react';
import Project from './components/Project';
import Product from './components/Product';

import Product_1 from './assets/images/products/1.svg';
import Product_2 from './assets/images/products/2.svg';
import Product_3 from './assets/images/products/3.svg';
import Product_4 from './assets/images/products/4.svg';

import ArrowDown from './assets/arrow-down.svg';

import './Adaptive.css';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import { useWindowSize } from './tools/WindowSize';

function Landing() {
  const [scrollPosition, setScrollPosition] = useState(0);

  const windowSize = useWindowSize();

  function easeInExpo(t) {
    return (Math.pow(2, 8 * t) - 1) / 255;
  }

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

  const { t } = useTranslation();

  return (
    <section className="landing">
      <header className="landing-header">
        <div className="brand-logo">
          <Link to="slide-1" smooth={true} duration={1500}>
            <img alt="IndagoDev logo" src={Logo} style={{ opacity: easeInExpo(Math.min(1, scrollPosition / (windowSize?.height ?? 0))) }} />
          </Link>
        </div>
        <Link className="nav-link" offset={-50} activeClass="active" to="slide-1" spy={true} smooth={true} duration={1500}>
          {t('nav.home')}
        </Link>
        <Link className="nav-link" offset={-50} activeClass="active" to="slide-2" spy={true} smooth={true} duration={1500}>
          {t('nav.projects')}
        </Link>
        <Link className="nav-link" offset={-50} activeClass="active" to="slide-3" spy={true} smooth={true} duration={1500}>
          {t('nav.services')}
        </Link>
        <a href="mailto:indagodev@gmail.com" className="action-button" rel="noreferrer" target="_blank">{t('cta.email')}</a>
      </header>


      <Element name="slide-1" className="slide full">
        <LazyLoadImage
          effect="opacity"
          alt="Landing background"
          className="background"
          style={{ top: scrollPosition / 3 }}
          src={LandingBG_480}
          srcSet={`
              ${LandingBG_480} 480w,
              ${LandingBG_720} 720w,
              ${LandingBG_1366} 1366w,
              ${LandingBG_1920} 1920w,
              ${LandingBG_2560} 2560w,
              ${LandingBG_3564} 3564w
            `}
          sizes="
              (max-width: 480px) 480px,
              (max-width: 720px) 720px,
              (max-width: 1366px) 1366px,
              (max-width: 1920px) 1920px,
              (max-width: 2560px) 2560px,
              (max-width: 3564px) 3564px,
            "
        />
        <div className="big-text">
          <div>
            <img className="logo" alt="IndagoDev logo" src={Logo} />
            <p>{t('landing.section1.text1')}</p>
            <Link to="slide-2" offset={-50} smooth={true} duration={1500}>
              <div className="call-to-scroll-label">
                <img alt="Arrow down" src={ArrowDown} />
                <span>{t('landing.section1.cta')}</span>
              </div>
            </Link>
          </div>
        </div>
      </Element>
      <Element name="slide-2" className="slide">
        <div className="slide-content">
          <h2>{t('landing.section2.heading')}</h2>
          <section className="projects">
            <Project Title={t('landing.section2.project1')} rel={"noreferrer"} target={"_blank"} Link="https://detibudushego.club" Image={Project_1} />
          </section>
        </div>
      </Element>
      <Element name="slide-3" className="slide last">
        <div className="slide-content">
          <h2>{t('landing.section3.heading')}</h2>
          <div className="products">
            <Product
              Title={t('landing.section3.service1')}
              OldPrice="1 700" Price="1 500" Currency="₽" Image={Product_1}
              Link="mailto:indagodev@gmail.com?subject=Товар: indago-000001"
            />
            <Product
              Title={t('landing.section3.service2')}
              OldPrice="1 550" Price="1 250" Currency="₽" Image={Product_2}
              Link="mailto:indagodev@gmail.com?subject=Товар: indago-000002"
            />
            <Product
              Title={t('landing.section3.service3')}
              OldPrice="600" Price="450" Currency="₽" Image={Product_3}
              Link="mailto:indagodev@gmail.com?subject=Товар: indago-000003"
            />
            <Product
              Title={t('landing.section3.service4')}
              OldPrice="600" Price="450" Currency="₽" Image={Product_4}
              Link="mailto:indagodev@gmail.com?subject=Товар: indago-000003"
            />
          </div>
        </div>
      </Element>
      <footer className="landing-footer">
        <div className="copyright">
          © IndagoDev {new Date().getFullYear()}
        </div>
        <span style={{opacity: .5}}>•</span>
        <div className="links">
          <a href="#">Privacy policy</a>
        </div>
        <div className="social-links">
          <a target="_blank" rel="noreferrer" href="https://t.me/indagodev">
            <img alt="Telegram" src={Social_Icon_Telegram} />
          </a>
        </div>
      </footer>
    </section>
  );
}

export default Landing;
