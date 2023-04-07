import { Link, Element } from 'react-scroll';

import './Landing.scss';
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
import { Dialog } from './components/Dialog';
import { TextInput } from './components/TextInput';
import { Button } from './components/Button';
import { TextArea } from './components/TextArea';
import { IContactForm } from './interfaces/IContactForm';
import { LoadingOverlay } from './components/LoadingOverlay';
import { ValidationTools } from './tools/ValidationTools';
import { AsyncForm } from './components/AsyncForm';
import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-hot-toast';

function Landing() {
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [contactFormVisible, setContactFormVisible] = useState<boolean>(false);
  const [contactFormValue, setContactFormValue] = useState<IContactForm>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [contactFormLoading, setContactFormLoading] = useState<boolean>(false);
  const [contactFormSubmitted, setContactFormSubmitted] =
    useState<boolean>(false);

  const isContactFormValid =
    ValidationTools.isEmailValid(contactFormValue.email) &&
    contactFormValue.message.length > 0 &&
    contactFormValue.name.length > 0 &&
    contactFormValue.subject.length > 0;

  const windowSize = useWindowSize();

  function easeInExpo(t: number) {
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

  async function handleOnContactFormSubmit() {
    setContactFormSubmitted(true);

    if (isContactFormValid) {
      setContactFormLoading(true);

      try {
        let formData = new FormData();

        formData.append('name', contactFormValue.name);
        formData.append('email', contactFormValue.email);
        formData.append('subject', contactFormValue.subject);
        formData.append('message', contactFormValue.message);

        const response = await axios
          .post(`${process.env.REACT_APP_BACKEND_URI}/send.php`, formData)
          .then((response) => {
            return response.data;
          });

        if (response) {
          toast.success(t('contactForm.messageSendedSuccessfuly'));
          setContactFormValue({
            name: '',
            email: '',
            subject: '',
            message: '',
          });
        } else {
          toast.error(t('contactForm.messageSendedWithError'));
        }
      } catch (error) {
        toast.error(t('contactForm.messageSendedWithError'));
      }

      setContactFormVisible(false);
      setContactFormSubmitted(false);

      setContactFormLoading(false);
    } else {
    }
  }

  return (
    <section className='landing'>
      <header className='landing-header'>
        <div className='brand-logo'>
          <Link to='slide-1' smooth={true} duration={1500}>
            <img
              alt='IndagoDev logo'
              src={Logo}
              style={{
                opacity: easeInExpo(
                  Math.min(1, scrollPosition / (windowSize?.height ?? 0))
                ),
              }}
            />
          </Link>
        </div>
        <Link
          className='nav-link'
          offset={-50}
          activeClass='active'
          to='slide-1'
          spy={true}
          smooth={true}
          duration={1500}
        >
          {t('nav.home')}
        </Link>
        <Link
          className='nav-link'
          offset={-50}
          activeClass='active'
          to='slide-2'
          spy={true}
          smooth={true}
          duration={1500}
        >
          {t('nav.projects')}
        </Link>
        <Link
          className='nav-link'
          offset={-50}
          activeClass='active'
          to='slide-3'
          spy={true}
          smooth={true}
          duration={1500}
        >
          {t('nav.services')}
        </Link>
        <div
          className='action-button'
          role='button'
          onClick={() => setContactFormVisible(true)}
        >
          {t('cta.email')}
        </div>
      </header>

      <Element name='slide-1' className='slide full'>
        <LazyLoadImage
          effect='opacity'
          alt='Landing background'
          className='background'
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
          sizes='
              (max-width: 480px) 480px,
              (max-width: 720px) 720px,
              (max-width: 1366px) 1366px,
              (max-width: 1920px) 1920px,
              (max-width: 2560px) 2560px,
              (max-width: 3564px) 3564px,
            '
        />
        <div className='big-text'>
          <div>
            <img className='logo' alt='IndagoDev logo' src={Logo} />
            <p>{t('landing.section1.text1')}</p>
            <Button onClick={() => setContactFormVisible(true)} icon='headset' text={t('cta.email') ?? ''} />
            <Link to='slide-2' offset={-50} smooth={true} duration={1500}>
              <div className='call-to-scroll-label'>
                <img alt='Arrow down' src={ArrowDown} />
                <span>{t('landing.section1.cta')}</span>
              </div>
            </Link>
          </div>
        </div>
      </Element>
      <Element name='slide-2' className='slide'>
        <div className='slide-content'>
          <h2>{t('landing.section2.heading')}</h2>
          <section className='projects'>
            <Project
              title={t('landing.section2.project1')}
              link='https://detibudushego.club'
              image={Project_1}
            />
          </section>
        </div>
      </Element>
      <Element name='slide-3' className='slide last'>
        <div className='slide-content'>
          <h2>{t('landing.section3.heading')}</h2>
          <div className='products'>
            <Product
              title={t('landing.section3.service1')}
              image={Product_1}
              onClick={(e) => {
                e.preventDefault();
                setContactFormValue((prevValue) => ({
                  ...prevValue,
                  subject: t('landing.section3.service1'),
                }));
                setContactFormVisible(true);
              }}
            />
            <Product
              title={t('landing.section3.service2')}
              image={Product_2}
              onClick={(e) => {
                e.preventDefault();
                setContactFormValue((prevValue) => ({
                  ...prevValue,
                  subject: t('landing.section3.service2'),
                }));
                setContactFormVisible(true);
              }}
            />
            <Product
              title={t('landing.section3.service3')}
              image={Product_3}
              onClick={(e) => {
                e.preventDefault();
                setContactFormValue((prevValue) => ({
                  ...prevValue,
                  subject: t('landing.section3.service3'),
                }));
                setContactFormVisible(true);
              }}
            />
            <Product
              title={t('landing.section3.service4')}
              image={Product_4}
              onClick={(e) => {
                e.preventDefault();
                setContactFormValue((prevValue) => ({
                  ...prevValue,
                  subject: t('landing.section3.service4'),
                }));
                setContactFormVisible(true);
              }}
            />
          </div>
        </div>
      </Element>
      <footer className='landing-footer'>
        <div className='copyright'>© IndagoDev {new Date().getFullYear()}</div>
        <div className='links'>
          <a
            target='_blank'
            rel='noreferrer'
            href='/assets/pdf/indago-privacy-policy.pdf'
          >
            Privacy policy
          </a>
          <span style={{ opacity: 0.5 }}>|</span>
          <a
            target='_blank'
            rel='noreferrer'
            href='/assets/pdf/indago-terms-of-use.pdf'
          >
            Terms of use
          </a>
        </div>
        <div className='social-links'>
          <a target='_blank' rel='noreferrer' href='https://t.me/indagodev'>
            <img alt='Telegram' src={Social_Icon_Telegram} />
          </a>
        </div>
      </footer>
      <Dialog
        className='contact-dialog'
        onClose={() => {
          setContactFormVisible(false);
          setContactFormSubmitted(false);
        }}
        active={contactFormVisible}
      >
        <AsyncForm onSubmit={handleOnContactFormSubmit}>
          <TextInput
            value={contactFormValue.name}
            required={true}
            isValid={ValidationTools.isRequiredFieldValueValid(
              contactFormValue.name,
              contactFormSubmitted
            )}
            validationError={t('validationError.required') ?? ''}
            onChange={(e) =>
              setContactFormValue((prevValue) => ({
                ...prevValue,
                name: e.target.value,
              }))
            }
            icon='person'
            type='text'
            placeholder={t('contactForm.namePlaceholder') ?? ''}
            label={t('contactForm.nameLabel') ?? ''}
          />
          <TextInput
            value={contactFormValue.email}
            required={true}
            isValid={ValidationTools.isEmailFieldValueValid(
              contactFormValue.email,
              contactFormSubmitted
            )}
            validationError={
              contactFormValue.email.length === 0
                ? t('validationError.required') ?? ''
                : t('validationError.invalidEmail') ?? ''
            }
            onChange={(e) =>
              setContactFormValue((prevValue) => ({
                ...prevValue,
                email: e.target.value,
              }))
            }
            type='email'
            icon='envelope'
            placeholder={t('contactForm.emailPlaceholder') ?? ''}
            label={t('contactForm.emailLabel') ?? ''}
          />
          <TextInput
            value={contactFormValue.subject}
            required={true}
            isValid={ValidationTools.isRequiredFieldValueValid(
              contactFormValue.subject,
              contactFormSubmitted
            )}
            validationError={t('validationError.required') ?? ''}
            onChange={(e) =>
              setContactFormValue((prevValue) => ({
                ...prevValue,
                subject: e.target.value,
              }))
            }
            type='text'
            icon='box'
            placeholder={t('contactForm.subjectPlaceholder') ?? ''}
            label={t('contactForm.subjectLabel') ?? ''}
          />
          <TextArea
            value={contactFormValue.message}
            required={true}
            isValid={ValidationTools.isRequiredFieldValueValid(
              contactFormValue.message,
              contactFormSubmitted
            )}
            validationError={t('validationError.required') ?? ''}
            onChange={(e) =>
              setContactFormValue((prevValue) => ({
                ...prevValue,
                message: e.target.value,
              }))
            }
            rows={5}
            maxLength={250}
            icon='file-text'
            placeholder={t('contactForm.messagePlaceholder') ?? ''}
            label={t('contactForm.messageLabel') ?? ''}
          />
          <Button
            iconPosition='right'
            icon='send'
            className='submit'
            primary={isContactFormValid}
            text={t('common.submit') ?? ''}
            type='submit'
          />
        </AsyncForm>

        <LoadingOverlay active={contactFormLoading} />
      </Dialog>
    </section>
  );
}

export default Landing;
