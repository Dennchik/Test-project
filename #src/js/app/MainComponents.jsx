import React, { useEffect, useState, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { isWebpSupported } from 'react-image-webp/dist/utils/index.js';
import { Element, Link } from 'react-scroll';
// --------------------------------- Modules -----------------------------------
import ScrollToElement from '../assets/ScrollToElement.jsx';
import isMobile from "../libraries/Js-devise.js";
import swiperLayout from '../assets/swiper-layout.js';
import mainSlide from '../modules/main-slide.js';
import servicesSlide from '../modules/services-slide.js';
import AudioPlayer from '../layouts/AudioPlayer.jsx';
// ------------------------------- Components ----------------------------------
import { fadeInSlide, timeLineHeaderItem, animationSvgLine, animationSvgText } from '../modules/anime-js.js';

import { smoother, applyParallaxEffects, applyEffectsColumn, animateTitles, tlServices1, tlServices2, tlFooterParallel, tlFooterContacts, initSectionTriggerMove } from "../animations/animation-index.jsx";
// -----------------------------------------------------------------------------
const baseUrl = '.';
// --------------------------------- Header ------------------------------------
export function Header({ baseUrl }) {
	// const dataMoveEl = [{ 'bp-max': 920.99, 'index': 1, 'target': '.bp-1' }];
	useEffect(() => {
		timeLineHeaderItem();
		// const fadeIn = document.querySelector('.page__fade-in');
		const handleScroll = () => {
			const header = document.querySelector('.header');
			const mainContent = document.querySelector('.page__main-content');
			const mainContentTop = mainContent.getBoundingClientRect().top;

			if (mainContentTop < 0) {
				header.classList.add('with-border');
				// fadeIn.classList.add('with-border');
			} else {
				header.classList.add('without-border');
				header.classList.remove('with-border');
				// fadeIn.classList.remove('with-border');
			}
			if (mainContentTop < 0) {
				header.classList.remove('without-border');
			}
		};
		window.addEventListener('scroll', handleScroll);
		// Очистка слушателя событий при размонтировании компонента
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	const getPath = (fileName) => {
		return `${baseUrl}/${fileName}`;
	};

	return (
		<header className="header key-object">
			<div className="header__container">
				<div className="header__column el-logo">
					<a href={getPath('index.html')}>
						<div className="header__logo"></div></a>
					<div className="header__text">
						<h1>Media-Studio</h1>
						<p><span>Group</span><span>Obninsk</span></p>
					</div>
				</div>
				<div className="header__column">
					<div className="header__menu">
						<a href={getPath('index.html')} className="header__item header__item--home">HOME
						</a>
						<div className="header__item header__item--services">
							<Link className='link-key key-services'
								to='services'
								duration={700}
								offset={-100}
								smooth='easeInCubic'
							>SERVICES</Link>
						</div>
						<div className="header__item">
							<a href={getPath('pages/videos.html')}>VIDEOS</a></div>
						<div className="header__item">
							<a href={getPath('pages/about.html')}>BIO</a>
						</div>
						<div className="header__item">
							<a href={getPath('pages/news.html')}>NEWS</a>
						</div>
						<div className="header__item header__item--contacts">
							<Link className='link-key key-services'
								to='footer'
								duration={700}
								offset={-100}
								smooth='easeInQuad'
							>CONTACTS</Link>
						</div>
					</div>
					<div className="header__bookmark">

					</div>
				</div>
				<div className="header__column el-community">
					<a href='tel:++79106044424' className="el-community__phone">
						<i className='icon-phone-ringing'></i>
						<div className="el-community__content">
							<h5 className='el-community__title'>GIVE US A CALL</h5>
							<span>+7 910 604-44-24</span>
						</div>
					</a>
				</div>
			</div>
		</header >
	);
};
// -------------------------------- Mainslide ----------------------------------
const Mainslide = ({ baseUrl }) => {
	useEffect(() => {
		// swiperLayout('._swiper');
		swiperLayout();
		mainSlide();
	}, []);

	useEffect(() => {
		const slideWrappers = document.querySelectorAll('.main-slide__slide-wrapper');
		if (!slideWrappers.length) return; // Проверка, что слайд-контейнеры существуют

		// Проверяем активен ли первый слайд при загрузке страницы
		const firstSlideWrapper = slideWrappers[0];
		const isActive = firstSlideWrapper.classList.contains('swiper-slide-active');

		if (isActive) {
			// Если первый слайд активен, запускаем анимацию
			fadeInSlide();
		}

		// Начинаем отслеживать изменения в слайд-контейнерах
		slideWrappers.forEach((slideWrapper) => {
			const observer = new MutationObserver((mutations) => {
				mutations.forEach((mutation) => {
					if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
						const isActive = slideWrapper.classList.contains('swiper-slide-active');
						if (isActive) {
							// Если слайд-контейнер содержит класс 'swiper-slide-active', запускаем анимацию
							fadeInSlide();
						}
					}
				});
			});

			observer.observe(slideWrapper, { attributes: true });
			// Отключение наблюдателя при размонтировании компонента
			return () => {
				observer.disconnect();
			};
		});
	}, []);

	const getPath = (fileName) => {
		return `${baseUrl}/${fileName}`;
	};

	return (
		<div className="main-slide" name='main-slide'>
			<div className="main-slide__body _swiper">
				<div className="main-slide__slide-wrapper">
					<div className="main-slide__slide-image _img">
						<picture> {
							isWebpSupported()
								? <img src={getPath("@@webRoot/img/main/slides/slide_1.webp")} alt="slide-1" />
								: <img src={getPath("@@webRoot/img/main/slides/slide_1.jpg")} alt="slide-1" />
						}
						</picture>
					</div>
					<div className="main-slide__content">
						<div className="main-slide__title el-slidetitle"><span>Профессиональная </span>Студия Звукозаписи
						</div>
						<div className="main-slide__text">Мы - современная студия звукозаписи, в которой работают лучшие российские специалисты в области записи и продюсирования музыки, предоставляющие самый лучший сервис и удобства для современных артистов, как подписанных, так и независимых.
						</div>
					</div>
				</div>
				<div className="main-slide__slide-wrapper">
					<div className="main-slide__slide-image _img">
						<picture>
							{isWebpSupported()
								? <img src={getPath("@@webRoot/img/main/slides/slide_4.webp")} alt="slide-4" />
								: <img src={getPath("@@webRoot/img/main/slides/slide_4.jpg")} alt="slide-4" />}
						</picture>
					</div>
					<div className="main-slide__content">
						<div className="main-slide__title el-slidetitle"><span>Атмосфера Звука </span>Музыкального Пространства
						</div>
						<div className="main-slide__text">Мы создаем звуковые шедевры, где каждая нота оживает и звучит волшебно. Наша команда гарантирует, что ваше музыкальное произведение будет звучать так же эмоционально и мощно, как в самом сердце концертного зала. Доверьте нам ваше творчество и ощутите магию звука в каждой ноте.
						</div>
					</div>
				</div>
				<div className="main-slide__slide-wrapper">
					<div className="main-slide__slide-image _img">
						<picture>
							{isWebpSupported()
								? <img src={getPath("@@webRoot/img/main/slides/slide_2.webp")} alt="slide-2" />
								: <img src={getPath("@@webRoot/img/main/slides/slide_2.jpg")} alt="slide-2" />}
						</picture>
					</div>
					<div className="main-slide__content">
						<div className="main-slide__title el-slidetitle"><span>Индивидуальный  подход  </span>к Нашим Клиентам
						</div>
						<div className="main-slide__text">В нашей студии мы всегда стараемся делать все возможное, чтобы процесс записи был вдохновляющим и творческим. Мы индивидуально подбираем подход к каждому клиенту, с которым работаем.
						</div>
					</div>
				</div>
				<div className="main-slide__slide-wrapper">
					<div className="main-slide__slide-image _img">
						<picture>
							{isWebpSupported()
								? <img src={getPath("@@webRoot/img/main/slides/slide_3.webp")} alt="slide-3" />
								: <img src={getPath("@@webRoot/img/main/slides/slide_3.jpg")} alt="slide-3" />}
						</picture>
					</div>
					<div className="main-slide__content">
						<div className="main-slide__title el-slidetitle"><span>Все виды  </span> Микширования Звука
						</div>
						<div className="main-slide__text">Если вы ищете качественное сведение звука, то в нашей студии есть все, что вам нужно! Помимо первоклассных решений для микширования и мастеринга, мы также предлагаем полный цикл услуг по созданию музыки.
						</div>
					</div>
				</div>
			</div>
			<div className="main-slide__pagination"></div>
			<div className="main-slide__media">
				<AudioPlayer />
			</div>
		</div>

	);
};
// -------------------------------- Services -----------------------------------
const Services = () => {
	useEffect(() => {
		ScrollToElement;
	});

	useEffect(() => {
		const initSwiper = document.querySelector('.content-box__body');
		if (isMobile.any()) {
			initSwiper.classList.add('_swiper');
			swiperLayout();
			servicesSlide();
			if (initSwiper.classList.contains('_swiper')) {
			} else {
				console.log('нет класс swiper');
			}
		} else {
			console.log('no mobyle');
		}
	}, []);

	const boxImagesRef = useRef([]);
	useEffect(() => {
		const handleMouseOver = (event) => {
			const target = event.currentTarget;
			animationSvgLine(target, false); // Запускаем анимацию при наведении
			animationSvgText(target, false);
		};
		const handleMouseLeave = (event) => {
			const target = event.currentTarget;
			setTimeout(() => {
				animationSvgLine(target, true); // Запускаем анимацию в обратном направлении с задержкой при уходе мыши 
				animationSvgText(target, true);
			}, 500);
		};
		const boxImages = document.querySelectorAll('.content-box__image');
		boxImagesRef.current = boxImages; // Сохраняем ссылку на элементы в useRef 
		boxImages.forEach(boxImage => {
			boxImage.addEventListener('mouseover', handleMouseOver);
			boxImage.addEventListener('mouseleave', handleMouseLeave);
		});

		return () => {
			boxImages.forEach(boxImage => {
				boxImage.removeEventListener('mouseover', handleMouseOver);
				boxImage.removeEventListener('mouseleave', handleMouseLeave);
			});
		};
	}, []);
	useEffect(() => {
		if (isMobile.any()) {
		} else {
			applyEffectsColumn(smoother, '.content-box__column');
		}
		applyParallaxEffects(smoother, '.material-parallax');
		tlServices1();
		tlServices2();
		animateTitles('.services__title', '.services', '.services', '=150', '=0');
		animateTitles('.offer-container__title', '.services__offer', '.services', '=150', '=0');
		initSectionTriggerMove('.main-slide', '.header__item--home');
		initSectionTriggerMove('.services', '.header__item--services');
		initSectionTriggerMove('#footer', '.header__item--contacts');
	}, []);

	return (
		<Element className="services key-object" id='target-services'>
			<div className="material-parallax parallax">
				<div className="parallax__image">
					<picture>{isWebpSupported() ? (
						<source srcSet="@@webRoot/img/main/body/parallax_bg.webp" type="image/webp" />
					) : null}
						<img src="@@webRoot/img/main/body/parallax_bg.png " alt="bg-image" />
					</picture>
				</div>
			</div>
			<div className="services__body _container">
				<div className="services__title">Наши услуги</div>
				<div className="services__content">
					<div className="content-box">
						<div className="content-box__body">
							<div className="content-box__column line">
								<div className="content-box__image el">
									<div className="content-box__svg">
										<svg viewBox="0 0 700 430">
											<g fill="none" fill-rule="evenodd" stroke="currentColor" stroke-width="8" className="lines">
												<style type="text/css">
													{`.el{fill:none;stroke:#fff;stroke-width:8;stroke-miterlimit:10;}`}
												</style>
												<path class="el" d="M11.6,12.2c69.8,144.5,138.5,245,178.9,277.9c29.8,24.2,60.5,32.7,60.5,32.7c5.6,1.5,31.8,8.4,65.9,3.4c28.1-4.1,47.3-14.2,68-25c34.2-17.9,55.5-37.6,61.9-43.7c13.8-13.2,27.2-26.1,37.4-47.3c3.1-6.4,21.9-46.7,8.9-57.9c-11.3-9.7-41.2,7.2-56.1,18.7c-6.2,4.7-28.1,22.4-41.7,57.6c-16.1,41.8-19.9,107.1,19.3,150.7c6.9,7.7,22.9,23.3,47.8,31.8c36.1,12.3,68.2,1.9,85.1-3.6c6.2-2,28.7-9.7,56-30.5c42.8-32.6,66.8-74.1,79.8-103.9" />
											</g>
										</svg>
									</div>
									<a href="#">
										<picture>
											{isWebpSupported()
												? <img src="@@webRoot/img/main/body/img_1.webp" />
												: <img src="@@webRoot/img/main/body/img_1.png" alt="image-1" />}
										</picture>
										<picture>
											{isWebpSupported()
												? <img className='content-box__bg-img' src="@@webRoot/img/main/body/bg_img.webp" />
												: <img className='content-box__bg-img' src=".@@webRoot/img/main/body/bg_img.png" alt="bg-image" />
											}
										</picture>
									</a>
									<div className="content-box__text">
										<svg viewBox="0 0 250 40">
											<defs>
												<linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
													<stop offset="0%" style={{ stopColor: 'rgb(57, 255, 20)', stopOpacity: 1 }} />
													<stop offset="100%" style={{ stopColor: 'rgb(204, 255, 0)', stopOpacity: 1 }} />
												</linearGradient>
											</defs>
											<g fill="none" fill-rule="evenodd" stroke="currentColor" stroke-width="1" className="lines-text">
												<path class="st0" d="M91.3,19.4c-0.5,0-0.7,0.2-0.7,0.6s0.2,0.6,0.7,0.6c1.3,0,2.4,0.4,3.3,1.3c0.9,0.9,1.3,2,1.3,3.3c0,1.3-0.4,2.4-1.3,3.3c-0.9,0.9-2,1.3-3.3,1.3c-1.3,0-2.4-0.4-3.3-1.3c-0.9-0.9-1.3-2-1.3-3.3v-1.5c0-0.4-0.2-0.7-0.6-0.7s-0.6,0.2-0.6,0.7v6.7c0,0.7-0.2,1.2-0.7,1.7c-0.4,0.4-1,0.7-1.7,0.7h-0.9v-1.7H83c0.4,0,0.7-0.2,0.7-0.6v-6.7c0-0.7,0.2-1.3,0.6-1.7c0.4-0.4,1-0.6,1.7-0.6c0.7,0,1.3,0.2,1.7,0.6c0.4,0.4,0.6,1,0.6,1.7v1.5c0,1.2,0.4,2,1.3,2.5c0.5,0.3,1,0.4,1.5,0.4c0.6,0,1.1-0.1,1.6-0.4c0.9-0.5,1.3-1.3,1.3-2.5c0-1.2-0.4-2-1.3-2.5c-0.5-0.3-1-0.4-1.5-0.4c-0.7,0-1.3-0.2-1.7-0.6c-0.4-0.4-0.6-1-0.6-1.7c0-0.7,0.2-1.3,0.6-1.7c0.4-0.4,1-0.6,1.7-0.6c0.5,0,1.1-0.1,1.6-0.4c0.9-0.5,1.3-1.3,1.3-2.5c0-1.2-0.4-2-1.3-2.5c-0.5-0.3-1-0.4-1.6-0.4c-0.5,0-1,0.1-1.5,0.4c-0.9,0.5-1.3,1.3-1.3,2.5v0.7c0,0.7-0.2,1.2-0.7,1.7c-0.4,0.4-1,0.7-1.7,0.7s-1.2-0.2-1.7-0.7c-0.4-0.4-0.7-1-0.7-1.7v-0.7c0-2.7,0.9-4.7,2.8-6c1.4-1,3-1.5,4.8-1.5c1.8,0,3.4,0.5,4.8,1.5c1.9,1.4,2.8,3.4,2.8,6c0,2.1-0.6,3.9-1.9,5.2c1.2,1.2,1.9,3,1.9,5.2c0,2.6-0.9,4.5-2.6,5.9h4.1v1.7h-9.1v-1.7c1,0,2-0.3,3-0.8c1.9-1,2.8-2.7,2.8-5.1c0-2.4-1.1-4.1-3.2-5.2c2.1-1.1,3.2-2.8,3.2-5.2c0-2.4-0.9-4.1-2.8-5.1c-1-0.5-2-0.8-3-0.8c-1,0-2,0.3-3,0.8c-1.9,1-2.8,2.7-2.8,5.1v0.7c0,0.4,0.2,0.6,0.6,0.6s0.6-0.2,0.6-0.6v-0.7c0-1.3,0.4-2.4,1.3-3.3c0.9-0.9,2-1.3,3.3-1.3c1.3,0,2.4,0.4,3.3,1.3c0.9,0.9,1.3,2,1.3,3.3C95.8,17.6,94.3,19.1,91.3,19.4z" />
												<path class="st0" d="M114.6,7.2c1.3,0,2.4,0.4,3.4,1.1c1.3,1,2,2.4,2,4.2c0,1.9-0.7,3.3-2,4.3c-1,0.7-2.1,1.1-3.4,1.1h-7.5c-0.4,0-0.7,0.2-0.7,0.6c0,0.4,0.2,0.7,0.7,0.7h7.5c1.3,0,2.4,0.4,3.4,1.1c1.3,1,2,2.4,2,4.3c0,1.9-0.7,3.3-2,4.3c-1,0.7-2.1,1.1-3.4,1.1h-7.5c-0.4,0-0.7,0.2-0.7,0.6s0.2,0.6,0.7,0.6h15.8v1.7h-15.8c-0.7,0-1.2-0.2-1.7-0.7c-0.4-0.4-0.7-1-0.7-1.7s0.2-1.2,0.7-1.7c0.4-0.4,1-0.7,1.7-0.7h7.5c0.7,0,1.3-0.2,2-0.5c1.1-0.6,1.7-1.7,1.7-3.1c0-1.5-0.6-2.5-1.7-3.1c-0.6-0.3-1.3-0.5-2-0.5h-7.5c-0.7,0-1.2-0.2-1.7-0.7c-0.4-0.4-0.7-1-0.7-1.7c0-0.7,0.2-1.2,0.7-1.7c0.5-0.4,1-0.7,1.7-0.7h7.5c0.7,0,1.3-0.2,2-0.5c1.1-0.6,1.7-1.6,1.7-3.1c0-1.5-0.6-2.5-1.7-3.1c-0.6-0.3-1.2-0.5-2-0.5h-11.1v21.6c0,0.7-0.2,1.2-0.7,1.7c-0.4,0.4-1,0.7-1.7,0.7h-0.9v-1.7h0.8c0.4,0,0.7-0.2,0.7-0.6V7.2H114.6z" />
												<path class="st0" d="M144,20c0,4.1-1.6,6.9-4.9,8.5c-1.7,0.9-3.3,1.3-4.9,1.3h-4.6c-0.4,0-0.7,0.2-0.7,0.6s0.2,0.6,0.7,0.6h15.8v1.7h-15.8c-0.7,0-1.2-0.2-1.7-0.7c-0.4-0.4-0.7-1-0.7-1.7c0-0.7,0.2-1.3,0.6-1.7c0.4-0.4,1-0.6,1.7-0.6h4.5c1.4,0,2.8-0.4,4.2-1.1c2.6-1.3,3.9-3.7,3.9-7.1V9.5c0-0.4-0.2-0.6-0.7-0.6c-0.4,0-0.6,0.2-0.6,0.6V17c0,1.1-0.4,2-1.1,2.8s-1.6,1.1-2.8,1.1h-5.3c-3-0.3-4.5-1.8-4.5-4.5V9.5c0-0.4-0.2-0.6-0.6-0.6c-0.4,0-0.6,0.2-0.6,0.6v6.8c0,2.4,1,4.1,2.9,5.1c1,0.5,2,0.8,3,0.8h2.2c0.7,0,1.3,0.2,1.7,0.6c0.4,0.4,0.6,1,0.6,1.7c0,0.7-0.2,1.2-0.7,1.7c-0.4,0.4-1,0.7-1.7,0.7h-4.6c-0.7,0-1.3,0.2-2,0.5c-1.1,0.6-1.7,1.7-1.7,3.1c0,0.7-0.2,1.3-0.6,1.7s-1,0.6-1.7,0.6h-0.8v-1.7h0.8c0.4,0,0.6-0.2,0.6-0.6c0-1.9,0.7-3.3,2-4.3c1-0.7,2.1-1.1,3.4-1.1h4.5c0.4,0,0.7-0.2,0.7-0.6c0-0.4-0.2-0.6-0.7-0.6h-2.2c-1.8,0-3.4-0.5-4.8-1.5c-1.9-1.4-2.8-3.4-2.8-6V9.5c0-0.7,0.2-1.2,0.7-1.7c0.4-0.4,1-0.7,1.7-0.7c0.7,0,1.2,0.2,1.7,0.7c0.4,0.4,0.7,1,0.7,1.7v6.7c0,1.1,0.4,2,1.3,2.5c0.5,0.3,1,0.4,1.6,0.4h5.2c0.6,0,1.2-0.2,1.6-0.6c0.4-0.4,0.6-0.9,0.6-1.5V9.5c0-0.7,0.2-1.2,0.7-1.7c0.5-0.4,1-0.7,1.7-0.7c0.7,0,1.2,0.2,1.7,0.7c0.4,0.4,0.7,1,0.7,1.7V20z" />
												<path class="st0" d="M167.9,32.8h-4.7l-9.2-7.2c-0.9-0.7-1.4-1.5-1.5-2.6c-0.1-0.8,0.2-1.7,0.8-2.8l6.9-10.3c0.3-0.4,0.2-0.7-0.2-0.9c-0.4-0.2-0.7-0.2-0.9,0.2l-8.3,12.3h-1V9.5c0-0.4-0.2-0.6-0.6-0.6c-0.4,0-0.7,0.2-0.7,0.6v20.9c0,0.7-0.2,1.2-0.7,1.7s-1,0.7-1.7,0.7h-0.9v-1.7h0.8c0.4-0.1,0.7-0.3,0.7-0.7V9.5c0-0.7,0.2-1.2,0.7-1.7c0.4-0.4,1-0.7,1.7-0.7s1.2,0.2,1.7,0.7c0.4,0.4,0.7,1,0.7,1.7v7.9l6.2-9.2c0.4-0.6,0.9-0.9,1.5-1c0.5-0.1,0.9,0,1.4,0.2c0.9,0.4,1.3,1.1,1.3,2c0,0.5-0.1,0.9-0.4,1.3l-6.9,10.4c-0.3,0.5-0.5,1-0.5,1.3c0,0.6,0.3,1.2,0.9,1.7l8.8,6.8h4V32.8z" />
											</g>
										</svg>
									</div>
								</div>
							</div>
							<div className="content-box__column line">
								<div className="content-box__image el">
									<div className="content-box__svg">
										<svg viewBox="0 0 700 430">
											<g fill="none" fill-rule="evenodd" stroke="currentColor" stroke-width="1" className="lines">
												<style type="text/css">
													{`.el{fill:none;stroke:#fff;stroke-width:8;stroke-miterlimit:10;}`}
												</style>
												<path class="el" d="M696.2,7.5c-34.2,148.6-72,277.8-101.4,275c-33.3-3.2-35.5-173-68.4-175c-43.1-2.6-78.4,285.7-134.4,285C352.4,392,352.9,248,282.5,221.2c-71.8-27.3-181.8,81-278.7,201.2" />
											</g>
										</svg>
									</div>
									<a href="">
										<picture>
											{isWebpSupported()
												? <img src="@@webRoot/img/main/body/img_2.webp" />
												: <img src="@@webRoot/img/main/body/img_2.png" alt="image-2" />}
										</picture>
										<picture>
											{isWebpSupported()
												? <img className='content-box__bg-img' src="@@webRoot/img/main/body/bg_img.webp" />
												: <img className='content-box__bg-img' src="@@webRoot/img/main/body/bg_img.png" alt="bg-img" />
											}
										</picture>
									</a>
									<div className="content-box__text">
										<svg viewBox="0 0 250 40">
											<g fill="none" fill-rule="evenodd" stroke="currentColor" stroke-width="1" className="lines-text">
												<path class="st0" d="M79.7,7.2c1.3,0,2.4,0.4,3.4,1.1c1.3,1,2,2.4,2,4.2c0,1.9-0.7,3.3-2,4.3c-1,0.7-2.1,1.1-3.4,1.1h-7.5c-0.4,0-0.7,0.2-0.7,0.6c0,0.4,0.2,0.7,0.7,0.7h7.5c1.3,0,2.4,0.4,3.4,1.1c1.3,1,2,2.4,2,4.3c0,1.9-0.7,3.3-2,4.3c-1,0.7-2.1,1.1-3.4,1.1h-7.5c-0.4,0-0.7,0.2-0.7,0.6s0.2,0.6,0.7,0.6H88v1.7H72.2c-0.7,0-1.2-0.2-1.7-0.7c-0.4-0.4-0.7-1-0.7-1.7s0.2-1.2,0.7-1.7c0.4-0.4,1-0.7,1.7-0.7h7.5c0.7,0,1.3-0.2,2-0.5c1.1-0.6,1.7-1.7,1.7-3.1c0-1.5-0.6-2.5-1.7-3.1c-0.6-0.3-1.3-0.5-2-0.5h-7.5c-0.7,0-1.2-0.2-1.7-0.7c-0.4-0.4-0.7-1-0.7-1.7c0-0.7,0.2-1.2,0.7-1.7c0.5-0.4,1-0.7,1.7-0.7h7.5c0.7,0,1.3-0.2,2-0.5c1.1-0.6,1.7-1.6,1.7-3.1c0-1.5-0.6-2.5-1.7-3.1c-0.6-0.3-1.2-0.5-2-0.5H68.6v21.6c0,0.7-0.2,1.2-0.7,1.7c-0.4,0.4-1,0.7-1.7,0.7h-0.9v-1.7h0.8c0.4,0,0.7-0.2,0.7-0.6V7.2H79.7z" />
												<path class="st0" d="M94.1,28.4l10.6-21.2h1.3v23.2c0,0.4,0.2,0.7,0.7,0.7h0.8v1.7h-0.9c-0.7,0-1.2-0.2-1.7-0.7c-0.4-0.4-0.7-1-0.7-1.7V11.6L93.7,32.8h-1.3V9.6c0-0.4-0.2-0.7-0.6-0.7c-0.4,0-0.7,0.2-0.7,0.7v20.8c0,1.5-0.8,2.3-2.3,2.4h-0.9v-1.7h0.9c0.4,0,0.7-0.2,0.7-0.7V9.6c0-0.7,0.2-1.3,0.6-1.7c0.4-0.4,1-0.6,1.7-0.6c0.7,0,1.2,0.2,1.7,0.7c0.4,0.4,0.7,1,0.7,1.7V28.4z" />
												<path class="st0" d="M133.2,25.1h0.9c0.7,0,1.2,0.2,1.7,0.7c0.4,0.4,0.7,1,0.7,1.7c0,0.7-0.2,1.2-0.7,1.7c-0.5,0.4-1,0.7-1.7,0.7h-0.9c-0.4,0-0.7,0.2-0.7,0.7c0,0.4,0.2,0.6,0.7,0.6h4.8v1.7h-4.8c-0.7,0-1.2-0.2-1.7-0.7c-0.4-0.4-0.7-1-0.7-1.7s0.2-1.2,0.7-1.7s1-0.7,1.7-0.7h0.9c0.4,0,0.7-0.2,0.7-0.6c0-0.4-0.2-0.7-0.7-0.7h-0.9c-0.7,0-1.2-0.2-1.7-0.7s-0.7-1-0.7-1.7V8.9h-6.6c-1.7,0-3.3,0.4-5,1.2c-3.1,1.6-4.7,4.4-4.6,8.4v6c0,0.7-0.2,1.2-0.7,1.7c-0.4,0.4-1,0.7-1.7,0.7h-0.9c-0.4,0-0.7,0.2-0.7,0.7c0,0.4,0.2,0.6,0.7,0.6h0.9c0.7,0,1.2,0.2,1.7,0.7c0.4,0.4,0.7,1,0.7,1.7s-0.2,1.2-0.7,1.7c-0.4,0.4-1,0.7-1.7,0.7h-4.8v-1.7h4.8c0.4,0,0.7-0.2,0.7-0.6s-0.2-0.6-0.7-0.6h-0.9c-0.7,0-1.2-0.2-1.7-0.7c-0.5-0.4-0.7-1-0.7-1.7c0-0.7,0.2-1.2,0.7-1.7c0.4-0.4,1-0.7,1.7-0.7h0.9c0.4,0,0.7-0.2,0.7-0.6v-6c0-4.7,1.9-7.9,5.6-9.8c1.9-1,3.8-1.5,5.7-1.5h8.3v17.3C132.5,24.9,132.7,25.1,133.2,25.1z" />
												<path class="st0" d="M155.2,7.2c0.7,0,1.2,0.2,1.7,0.7c0.4,0.4,0.7,1,0.7,1.7c0,0.7-0.2,1.2-0.7,1.7c-0.4,0.4-1,0.7-1.7,0.7h-9c-0.6,0-1.2,0.2-1.6,0.6c-0.4,0.4-0.6,0.9-0.6,1.6c0,0.6,0.2,1.2,0.6,1.6c0.4,0.4,0.9,0.6,1.6,0.6h6c0.7,0,1.2,0.2,1.7,0.7c0.4,0.4,0.7,1,0.7,1.7c0,0.7-0.2,1.3-0.6,1.7s-1,0.6-1.7,0.6h-6c-0.6,0-1.2,0.2-1.6,0.6c-0.4,0.4-0.6,0.9-0.6,1.6c0,1.4,0.7,2.1,2.1,2.1h9c0.7,0,1.2,0.2,1.7,0.7c0.4,0.4,0.7,1,0.7,1.7c0,0.7-0.2,1.2-0.7,1.7c-0.5,0.4-1,0.7-1.7,0.7h-10.4c-0.4,0-0.7,0.2-0.7,0.6s0.2,0.6,0.7,0.6H159v1.7h-14.3c-0.7,0-1.2-0.2-1.7-0.7c-0.4-0.4-0.7-1-0.7-1.7s0.2-1.2,0.7-1.7c0.4-0.4,1-0.7,1.7-0.7h10.4c0.4,0,0.7-0.2,0.7-0.6c0-0.4-0.2-0.7-0.7-0.7h-9c-1.1,0-2-0.4-2.8-1.1c-0.7-0.7-1.1-1.6-1.1-2.8s0.4-2,1.1-2.7c0.7-0.7,1.6-1.1,2.8-1.1h6c0.4,0,0.6-0.2,0.6-0.7c0-0.4-0.2-0.6-0.6-0.6h-6c-1.1,0-2-0.4-2.8-1.1c-0.7-0.7-1.1-1.6-1.1-2.8c0-1.1,0.4-2,1.1-2.8c0.7-0.7,1.6-1.1,2.8-1.1h9c0.4,0,0.7-0.2,0.7-0.6c0-0.4-0.2-0.6-0.7-0.6h-14.1v21.6c0,0.7-0.2,1.2-0.7,1.7c-0.4,0.4-1,0.7-1.7,0.7h-0.9v-1.7h0.8c0.4,0,0.7-0.2,0.7-0.6V7.2H155.2z" />
												<path class="st0" d="M160.5,18.4c0-3.2,1.1-5.9,3.3-8.1c2.2-2.2,4.9-3.3,8-3.3c3.2,0,5.9,1.1,8.1,3.3c2.2,2.2,3.3,4.9,3.3,8.1c0,2.7-0.8,5-2.5,7.1c-1.7,2.1-3.9,3.4-6.5,4v1.6h10.5v1.7h-12.2v-4.7l0.7-0.1c2.4-0.3,4.3-1.4,5.9-3.2c1.6-1.8,2.4-4,2.4-6.4c0-2.7-0.9-5-2.8-6.9c-1.9-1.9-4.2-2.8-6.9-2.8c-2.7,0-5,0.9-6.8,2.8c-1.9,1.9-2.8,4.2-2.8,6.9c0,2.4,0.8,4.5,2.4,6.4c1.6,1.8,3.6,2.9,5.9,3.2l0.7,0.1v4.7H159v-1.7h10.5v-1.6c-2.6-0.6-4.8-1.9-6.5-4C161.3,23.5,160.5,21.1,160.5,18.4z" />
											</g>
										</svg>
									</div>
								</div>
							</div>
							<div className="content-box__column line">
								<div className="content-box__image el">
									<div className="content-box__svg">
										<svg viewBox="0 0 700 430">
											<g fill="none" fill-rule="evenodd" stroke="currentColor" stroke-width="1" className="lines">
												<style type="text/css">
													{`.el{fill:none;stroke:#fff;stroke-width:8;stroke-miterlimit:10;}`}
												</style>
												<path class="el" d="M685.8,108.5c-14.3,4.6-36.4,10.1-63.7,10c-34.6-0.1-61.2-9.1-81-16C496,86.8,493,75,454.9,67.2c-15.6-3.2-34.7-6.9-58.6-1.8c-10,2.1-35.5,7.9-56.8,30c-19.6,20.3-24.8,42.9-28.1,58.9c-2.2,10.5-11.1,58.7,11.6,100.5c3.7,6.8,22.1,40.7,55.1,44c4.3,0.4,29.8,2.4,51-22.4c4.5-5.2,18.1-22.5,21.8-51.1c1.1-8.3,4.7-36.3-8.8-59.2c-3.5-5.9-7.4-10.3-11.3-13.6c-2-1.7-7.2-5.9-16.5-9.7c-7-2.8-25.6-10.3-48.3-5.6c-20.8,4.3-33.7,16.6-41.1,23.7c-19.8,19.2-26.7,40.6-36.8,73.7c-8.9,28.8-7.8,37.4-20.5,76.3c-4.3,13.1-8.7,25.2-17.9,38.7c-6.4,9.3-15.3,22-31.6,30.5c-15.6,8.2-30,8.1-39.6,8.5c-36.8,1.6-63.5-17.6-70-22.4c-28.6-21.5-42.4-51.3-54.4-77.2c-19.6-42.2-25.5-77.6-32.6-118.4c-5-28.5-10.2-67.3-12.2-114" />
											</g>
										</svg>
									</div>
									<a href="">
										<picture>
											{isWebpSupported()
												? <img src="@@webRoot/img/main/body/img_3.webp" />
												: <img src="@@webRoot/img/main/body/img_3.png" alt="image-3" />}
										</picture>
										<picture>
											{isWebpSupported()
												? <img className='content-box__bg-img' src="@@webRoot/img/main/body/bg_img.webp" />
												: <img className='content-box__bg-img' src="@@webRoot/img/main/body/bg_img.png" alt="bg-img" />
											}
										</picture>
									</a>
									<div className="content-box__text">
										<svg viewBox="0 0 250 40">
											<g fill="none" fill-rule="evenodd" stroke="currentColor" stroke-width="1" className="lines-text">
												<path className="st0" d="M67.9,9.5c0-0.7,0.2-1.3,0.6-1.7c0.4-0.4,1-0.6,1.7-0.6h17.9c0.7,0,1.3,0.2,1.7,0.6c0.4,0.4,0.6,1,0.6,1.7c0,0.7-0.2,1.3-0.6,1.7c-0.4,0.4-1,0.6-1.7,0.6h-6.6V29c0,1.4,0.7,2.1,2.1,2.1H92v1.7h-8.3c-1.1,0-2-0.4-2.8-1.1s-1.1-1.6-1.1-2.8V10.2h8.3c0.4,0,0.7-0.2,0.7-0.6c0-0.4-0.2-0.6-0.7-0.6H70.3c-0.4,0-0.7,0.2-0.7,0.6c0,0.4,0.2,0.6,0.7,0.6h8.3V29c0,1.1-0.4,2.1-1.1,2.8c-0.7,0.7-1.6,1.1-2.8,1.1h-8.3v-1.7h8.3c1.4,0,2.1-0.7,2.1-2.1V11.9h-6.6c-0.7,0-1.2-0.2-1.7-0.7C68.1,10.8,67.9,10.2,67.9,9.5z" />
												<path className="st0" d="M109.2,7.2c0.7,0,1.2,0.2,1.7,0.7c0.4,0.4,0.7,1,0.7,1.7c0,0.7-0.2,1.2-0.7,1.7c-0.4,0.4-1,0.7-1.7,0.7h-9c-0.6,0-1.2,0.2-1.6,0.6c-0.4,0.4-0.6,0.9-0.6,1.6c0,0.6,0.2,1.2,0.6,1.6c0.4,0.4,0.9,0.6,1.6,0.6h6c0.7,0,1.2,0.2,1.7,0.7c0.4,0.4,0.7,1,0.7,1.7c0,0.7-0.2,1.3-0.6,1.7c-0.4,0.4-1,0.6-1.7,0.6h-6c-0.6,0-1.2,0.2-1.6,0.6c-0.4,0.4-0.6,0.9-0.6,1.6c0,1.4,0.7,2.1,2.1,2.1h9c0.7,0,1.2,0.2,1.7,0.7c0.4,0.4,0.7,1,0.7,1.7c0,0.7-0.2,1.2-0.7,1.7c-0.5,0.4-1,0.7-1.7,0.7H98.8c-0.4,0-0.7,0.2-0.7,0.6s0.2,0.6,0.7,0.6h14.3v1.7H98.8c-0.7,0-1.2-0.2-1.7-0.7c-0.4-0.4-0.7-1-0.7-1.7s0.2-1.2,0.7-1.7c0.4-0.4,1-0.7,1.7-0.7h10.4c0.4,0,0.7-0.2,0.7-0.6c0-0.4-0.2-0.7-0.7-0.7h-9c-1.1,0-2-0.4-2.8-1.1c-0.7-0.7-1.1-1.6-1.1-2.8s0.4-2,1.1-2.7c0.7-0.7,1.6-1.1,2.8-1.1h6c0.4,0,0.6-0.2,0.6-0.7c0-0.4-0.2-0.6-0.6-0.6h-6c-1.1,0-2-0.4-2.8-1.1c-0.7-0.7-1.1-1.6-1.1-2.8c0-1.1,0.4-2,1.1-2.8c0.7-0.7,1.6-1.1,2.8-1.1h9c0.4,0,0.7-0.2,0.7-0.6c0-0.4-0.2-0.6-0.7-0.6H95.2v21.6c0,0.7-0.2,1.2-0.7,1.7c-0.4,0.4-1,0.7-1.7,0.7H92v-1.7h0.8c0.4,0,0.7-0.2,0.7-0.6V7.2H109.2z" />
												<path className="st0" d="M135.5,32.8h-4.7l-9.2-7.2c-0.9-0.7-1.4-1.5-1.5-2.6c-0.1-0.8,0.2-1.7,0.8-2.8l6.9-10.3c0.3-0.4,0.2-0.7-0.2-0.9s-0.7-0.2-0.9,0.2l-8.3,12.3h-1V9.5c0-0.4-0.2-0.6-0.6-0.6c-0.4,0-0.7,0.2-0.7,0.6v20.9c0,0.7-0.2,1.2-0.7,1.7c-0.4,0.4-1,0.7-1.7,0.7H113v-1.7h0.8c0.4-0.1,0.7-0.3,0.7-0.7V9.5c0-0.7,0.2-1.2,0.7-1.7c0.4-0.4,1-0.7,1.7-0.7s1.2,0.2,1.7,0.7c0.4,0.4,0.7,1,0.7,1.7v7.9l6.2-9.2c0.4-0.6,0.9-0.9,1.5-1c0.5-0.1,0.9,0,1.4,0.2c0.9,0.4,1.3,1.1,1.3,2c0,0.5-0.1,0.9-0.4,1.3l-6.9,10.4c-0.3,0.5-0.5,1-0.5,1.3c0,0.6,0.3,1.2,0.9,1.7l8.8,6.8h4V32.8z" />
												<path className="st0" d="M141.8,8.5c1.7-0.9,3.3-1.3,4.9-1.3c1.6,0,3.3,0.4,5,1.3c3.2,1.6,4.9,4.5,4.9,8.5c0,0.7-0.2,1.2-0.7,1.7c-0.4,0.4-1,0.7-1.7,0.7c-0.7,0-1.2-0.2-1.7-0.7c-0.4-0.4-0.7-1-0.7-1.7c0-0.9-0.3-1.8-0.7-2.7c-0.9-1.7-2.3-2.5-4.4-2.5s-3.6,0.8-4.4,2.5c-0.4,0.9-0.7,1.8-0.7,2.7v3c0,0.9,0.2,1.8,0.7,2.7c0.9,1.6,2.3,2.5,4.4,2.5h4.5c1.3,0,2.4,0.4,3.4,1.1c1.3,1,2,2.4,2,4.3c0,0.4,0.2,0.6,0.6,0.6h0.8v1.7h-0.8c-0.7,0-1.3-0.2-1.7-0.6s-0.6-1-0.6-1.7c0-1.5-0.6-2.5-1.7-3.1c-0.6-0.3-1.3-0.5-2-0.5h-4.5c-2.4,0-4.2-0.8-5.4-2.5c-0.9-1.3-1.4-2.7-1.4-4.3v-3c0-1.6,0.5-3.1,1.4-4.3c1.2-1.7,3-2.5,5.5-2.5c2.4,0,4.2,0.8,5.5,2.5c0.9,1.2,1.4,2.7,1.4,4.3c0,0.4,0.2,0.7,0.7,0.7c0.4,0,0.6-0.2,0.6-0.6c0-3.3-1.3-5.7-3.9-7.1c-1.4-0.7-2.8-1.1-4.2-1.1s-2.8,0.4-4.2,1.1c-2.6,1.3-3.9,3.7-3.9,7.1v3c0,3.4,1.3,5.7,3.9,7.1c1.4,0.7,2.8,1.1,4.2,1.1h4.5c0.7,0,1.3,0.2,1.7,0.6c0.4,0.4,0.6,1,0.6,1.7c0,0.7-0.2,1.2-0.7,1.7c-0.5,0.4-1,0.7-1.7,0.7h-15.8v-1.7h15.8c0.4,0,0.7-0.2,0.7-0.6s-0.2-0.6-0.7-0.6h-4.5c-1.6,0-3.2-0.4-4.9-1.3c-3.2-1.6-4.9-4.5-4.9-8.5v-3C137,13,138.6,10.1,141.8,8.5z" />
												<path className="st0" d="M159.5,9.5c0-0.7,0.2-1.3,0.6-1.7c0.4-0.4,1-0.6,1.7-0.6h17.9c0.7,0,1.3,0.2,1.7,0.6c0.4,0.4,0.6,1,0.6,1.7c0,0.7-0.2,1.3-0.6,1.7s-1,0.6-1.7,0.6h-6.6V29c0,1.4,0.7,2.1,2.1,2.1h8.3v1.7h-8.3c-1.1,0-2-0.4-2.8-1.1c-0.7-0.7-1.1-1.6-1.1-2.8V10.2h8.3c0.4,0,0.7-0.2,0.7-0.6c0-0.4-0.2-0.6-0.7-0.6h-17.9c-0.4,0-0.7,0.2-0.7,0.6c0,0.4,0.2,0.6,0.7,0.6h8.3V29c0,1.1-0.4,2.1-1.1,2.8c-0.7,0.7-1.6,1.1-2.8,1.1H158v-1.7h8.3c1.4,0,2.1-0.7,2.1-2.1V11.9h-6.6c-0.7,0-1.2-0.2-1.7-0.7C159.8,10.8,159.5,10.2,159.5,9.5z" />
											</g>
										</svg>
									</div>
								</div>
							</div>
							<div className="content-box__column line">
								<div className="content-box__image el">
									<div className="content-box__svg">
										<svg viewBox="0 0 700 430">
											<g fill="none" fill-rule="evenodd" stroke="currentColor" stroke-width="1" className="lines">
												<style type="text/css">
													{`.el{fill:none;stroke:#fff;stroke-width:8;stroke-miterlimit:10;}`}
												</style>
												<path class="el" d="M7.4,413.8c7.5-80,18-147.2,27.3-198.3c0,0,28.1-154.7,81.2-198.3c2.1-1.7,8-6.6,13-4.3c8.5,3.8,8.5,25.8,8.5,33.9c0,59.8-60.8,301.8-81.6,293.5c-9.8-3.9,1.4-66.6,9.3-97.4c9.6-37.8,22.2-58.8,33.5-72.8c1.8-2.3,27.3-33.5,37.2-26.7c6.3,4.4,1.7,21.2-0.6,51.9c-0.7,10-1.9,48.8,1.9,82.2c0.7,6.5,8.6,67.6,47.1,90.2c19.8,11.6,40.8,7.4,65.1,2.9c4.9-0.9,25-4.9,51.4-18.8c17.3-9.1,52.6-27.6,80.7-68.2c23.7-34.2,40.7-81.8,32.7-89c-7.2-6.5-36.7,17.4-53.9,47.6c-17.9,31.3-29.5,80.7-18,103.9c16.1,32.4,91.5,41.4,350.7-59.9" />
											</g>
										</svg>
									</div>
									<a href="">
										<picture>
											{isWebpSupported()
												? <img src="@@webRoot/img/main/body/img_4.webp" />
												: <img src="@@webRoot/img/main/body/img_4.png" alt="image-4" />}
										</picture>
										<picture>
											{isWebpSupported()
												? <img className='content-box__bg-img' src="@@webRoot/img/main/body/bg_img.webp" />
												: <img className='content-box__bg-img' src="@@webRoot/img/main/body/bg_img.png" alt="bg-img" />
											}
										</picture>
									</a>
									<div className="content-box__text">
										<svg viewBox="0 0 250 40">
											<g fill="none" fill-rule="evenodd" stroke="currentColor" stroke-width="1" className="lines-text">
												<path className="st0" d="M29.4,31.1h0.8v1.7h-0.9c-0.7,0-1.2-0.2-1.7-0.7c-0.4-0.4-0.7-1-0.7-1.7V10.6l-8.1,10.8l-8.1-10.8v19.8c0,0.7-0.2,1.2-0.7,1.7c-0.4,0.4-1,0.7-1.7,0.7H7.6v-1.7h0.8c0.4,0,0.7-0.2,0.7-0.6V7.2h1.2l8.6,11.4l8.6-11.4h1.2v23.3C28.7,30.9,28.9,31.1,29.4,31.1z" />
												<path className="st0" d="M47.4,7.2c0.7,0,1.2,0.2,1.7,0.7c0.4,0.4,0.7,1,0.7,1.7c0,0.7-0.2,1.2-0.7,1.7c-0.4,0.4-1,0.7-1.7,0.7h-9c-0.6,0-1.2,0.2-1.6,0.6c-0.4,0.4-0.6,0.9-0.6,1.6c0,0.6,0.2,1.2,0.6,1.6c0.4,0.4,0.9,0.6,1.6,0.6h6c0.7,0,1.2,0.2,1.7,0.7c0.4,0.4,0.7,1,0.7,1.7c0,0.7-0.2,1.3-0.6,1.7c-0.4,0.4-1,0.6-1.7,0.6h-6c-0.6,0-1.2,0.2-1.6,0.6c-0.4,0.4-0.6,0.9-0.6,1.6c0,1.4,0.7,2.1,2.1,2.1h9c0.7,0,1.2,0.2,1.7,0.7c0.4,0.4,0.7,1,0.7,1.7c0,0.7-0.2,1.2-0.7,1.7c-0.5,0.4-1,0.7-1.7,0.7H37c-0.4,0-0.7,0.2-0.7,0.6s0.2,0.6,0.7,0.6h14.3v1.7H37c-0.7,0-1.2-0.2-1.7-0.7c-0.4-0.4-0.7-1-0.7-1.7s0.2-1.2,0.7-1.7c0.4-0.4,1-0.7,1.7-0.7h10.4c0.4,0,0.7-0.2,0.7-0.6c0-0.4-0.2-0.7-0.7-0.7h-9c-1.1,0-2-0.4-2.8-1.1C35,25,34.6,24.1,34.6,23s0.4-2,1.1-2.7c0.7-0.7,1.6-1.1,2.8-1.1h6c0.4,0,0.6-0.2,0.6-0.7c0-0.4-0.2-0.6-0.6-0.6h-6c-1.1,0-2-0.4-2.8-1.1C35,16,34.6,15.1,34.6,14c0-1.1,0.4-2,1.1-2.8c0.7-0.7,1.6-1.1,2.8-1.1h9c0.4,0,0.7-0.2,0.7-0.6c0-0.4-0.2-0.6-0.7-0.6H33.3v21.6c0,0.7-0.2,1.2-0.7,1.7c-0.4,0.4-1,0.7-1.7,0.7h-0.9v-1.7H31c0.4,0,0.7-0.2,0.7-0.6V7.2H47.4z" />
												<path className="st0" d="M62.5,7.2c1.6,0,3,0.5,4.3,1.4c1.7,1.2,2.5,3.1,2.5,5.4c0,2.4-0.8,4.2-2.5,5.4c-1.3,0.9-2.7,1.4-4.3,1.4H58c-0.4,0-0.7,0.2-0.7,0.7v9.6h13.5v1.7H55.7V21.5c0-0.7,0.2-1.2,0.7-1.7c0.4-0.4,1-0.7,1.7-0.7h4.5c0.9,0,1.7-0.2,2.7-0.7c1.6-0.9,2.5-2.3,2.5-4.4c0-2.1-0.8-3.6-2.5-4.4c-0.9-0.4-1.8-0.7-2.7-0.7h-8.1v21.6c0,0.7-0.2,1.2-0.7,1.7c-0.4,0.4-1,0.7-1.7,0.7h-0.9v-1.7H52c0.4,0,0.7-0.2,0.7-0.6V7.2H62.5z" />
												<path className="st0" d="M72.3,18.4c0-3.2,1.1-5.9,3.3-8.1c2.2-2.2,4.9-3.3,8-3.3c3.2,0,5.9,1.1,8.1,3.3c2.2,2.2,3.3,4.9,3.3,8.1c0,2.7-0.8,5-2.5,7.1c-1.7,2.1-3.9,3.4-6.5,4v1.6h10.5v1.7H84.3v-4.7L85,28c2.4-0.3,4.3-1.4,5.9-3.2c1.6-1.8,2.4-4,2.4-6.4c0-2.7-0.9-5-2.8-6.9c-1.9-1.9-4.2-2.8-6.9-2.8c-2.7,0-5,0.9-6.8,2.8c-1.9,1.9-2.8,4.2-2.8,6.9c0,2.4,0.8,4.5,2.4,6.4c1.6,1.8,3.6,2.9,5.9,3.2l0.7,0.1v4.7H70.8v-1.7h10.5v-1.6c-2.6-0.6-4.8-1.9-6.5-4C73.1,23.5,72.3,21.1,72.3,18.4z" />
												<path className="st0" d="M115.3,7.2c0.7,0,1.2,0.2,1.7,0.7c0.4,0.4,0.7,1,0.7,1.7v20.9c0,0.4,0.2,0.6,0.7,0.6h0.8v1.7h-0.8c-0.7,0-1.3-0.2-1.7-0.7c-0.4-0.4-0.7-1-0.7-1.7V9.5c0-0.4-0.2-0.6-0.7-0.6h-14.9c-0.4,0-0.6,0.2-0.6,0.6v20.9c0,0.7-0.2,1.2-0.7,1.7c-0.4,0.4-1,0.7-1.7,0.7h-0.9v-1.7h0.8c0.4,0,0.7-0.2,0.7-0.6V9.5c0-0.7,0.2-1.2,0.7-1.7c0.4-0.4,1-0.7,1.7-0.7H115.3z" />
												<path className="st0" d="M130.3,7.2c1.6,0,3,0.5,4.3,1.4c1.7,1.2,2.5,3.1,2.5,5.4c0,2.4-0.8,4.2-2.5,5.4c-1.3,0.9-2.7,1.4-4.3,1.4h-4.5c-0.4,0-0.7,0.2-0.7,0.7v9.6h13.5v1.7h-15.2V21.5c0-0.7,0.2-1.2,0.7-1.7c0.4-0.4,1-0.7,1.7-0.7h4.5c0.9,0,1.7-0.2,2.7-0.7c1.6-0.9,2.5-2.3,2.5-4.4c0-2.1-0.8-3.6-2.5-4.4c-0.9-0.4-1.8-0.7-2.7-0.7h-8.1v21.6c0,0.7-0.2,1.2-0.7,1.7c-0.4,0.4-1,0.7-1.7,0.7H119v-1.7h0.8c0.4,0,0.7-0.2,0.7-0.6V7.2H130.3z" />
												<path className="st0" d="M144.8,28.4l10.6-21.2h1.3v23.2c0,0.4,0.2,0.7,0.7,0.7h0.8v1.7h-0.9c-0.7,0-1.2-0.2-1.7-0.7c-0.4-0.4-0.7-1-0.7-1.7V11.6l-10.6,21.2h-1.3V9.6c0-0.4-0.2-0.7-0.6-0.7c-0.4,0-0.7,0.2-0.7,0.7v20.8c0,1.5-0.8,2.3-2.3,2.4h-0.9v-1.7h0.9c0.4,0,0.7-0.2,0.7-0.7V9.6c0-0.7,0.2-1.3,0.6-1.7c0.4-0.4,1-0.6,1.7-0.6c0.7,0,1.2,0.2,1.7,0.7c0.4,0.4,0.7,1,0.7,1.7V28.4z" />
												<path className="st0" d="M160.2,31.1l10.3-10.3h-4c-1.6,0-3-0.5-4.3-1.4c-1.7-1.2-2.5-3.1-2.5-5.4c0-2.4,0.8-4.2,2.5-5.4c1.3-0.9,2.7-1.4,4.3-1.4h9.8v23.3c0,0.4,0.2,0.6,0.7,0.6h0.8v1.7h-0.9c-0.7,0-1.2-0.2-1.7-0.7c-0.4-0.4-0.7-1-0.7-1.7V8.9h-8.1c-0.9,0-1.8,0.2-2.7,0.7c-1.6,0.9-2.5,2.3-2.5,4.4c0,2.1,0.8,3.6,2.5,4.4c0.9,0.5,1.8,0.7,2.7,0.7h6.5v1.5l-12.1,12.1h-2.7v-1.7H160.2z" />
												<path className="st0" d="M179.2,9.5c0-0.7,0.2-1.3,0.6-1.7c0.4-0.4,1-0.6,1.7-0.6h17.9c0.7,0,1.3,0.2,1.7,0.6c0.4,0.4,0.6,1,0.6,1.7c0,0.7-0.2,1.3-0.6,1.7s-1,0.6-1.7,0.6h-6.6V29c0,1.4,0.7,2.1,2.1,2.1h8.3v1.7H195c-1.1,0-2-0.4-2.8-1.1c-0.7-0.7-1.1-1.6-1.1-2.8V10.2h8.3c0.4,0,0.7-0.2,0.7-0.6c0-0.4-0.2-0.6-0.7-0.6h-17.9c-0.4,0-0.7,0.2-0.7,0.6c0,0.4,0.2,0.6,0.7,0.6h8.3V29c0,1.1-0.4,2.1-1.1,2.8c-0.7,0.7-1.6,1.1-2.8,1.1h-8.3v-1.7h8.3c1.4,0,2.1-0.7,2.1-2.1V11.9h-6.6c-0.7,0-1.2-0.2-1.7-0.7C179.5,10.8,179.2,10.2,179.2,9.5z" />
												<path className="st0" d="M209.5,28.4l10.6-21.2h1.3v23.2c0,0.4,0.2,0.7,0.7,0.7h0.8v1.7h-0.9c-0.7,0-1.2-0.2-1.7-0.7c-0.4-0.4-0.7-1-0.7-1.7V11.6l-10.6,21.2h-1.3V9.6c0-0.4-0.2-0.7-0.6-0.7c-0.4,0-0.7,0.2-0.7,0.7v20.8c0,1.5-0.8,2.3-2.3,2.4h-0.9v-1.7h0.9c0.4,0,0.7-0.2,0.7-0.7V9.6c0-0.7,0.2-1.3,0.6-1.7c0.4-0.4,1-0.6,1.7-0.6c0.7,0,1.2,0.2,1.7,0.7c0.4,0.4,0.7,1,0.7,1.7V28.4z" />
												<path className="st0" d="M224.8,31.1l10.3-10.3h-4c-1.6,0-3-0.5-4.3-1.4c-1.7-1.2-2.5-3.1-2.5-5.4c0-2.4,0.8-4.2,2.5-5.4c1.3-0.9,2.7-1.4,4.3-1.4h9.8v23.3c0,0.4,0.2,0.6,0.7,0.6h0.8v1.7h-0.9c-0.7,0-1.2-0.2-1.7-0.7c-0.4-0.4-0.7-1-0.7-1.7V8.9h-8.1c-0.9,0-1.8,0.2-2.7,0.7c-1.6,0.9-2.5,2.3-2.5,4.4c0,2.1,0.8,3.6,2.5,4.4c0.9,0.5,1.8,0.7,2.7,0.7h6.5v1.5l-12.1,12.1h-2.7v-1.7H224.8z" />
											</g>
										</svg>
									</div>
								</div>
							</div>
							<div className="content-box__column line">
								<div className="content-box__image el">
									<div className="content-box__svg">
										<svg viewBox="0 0 700 430">
											<g fill="none" fill-rule="evenodd" stroke="currentColor" stroke-width="1" className="lines">
												<style type="text/css">
													{`.el{fill:none;stroke:#fff;stroke-width:8;stroke-miterlimit:10;}`}
												</style>
												<path class="el" d="M17.8,295.9c39,14.8,99.1,35.6,175.3,53.7c20,4.7,107.6,25.5,111.1,15.3c2.6-7.8-46.7-25.3-110-66.8c-59.2-38.8-126-82.5-118.9-106.3c17.2-58.3,452.1,86.9,532.6,122.6c8.2,3.6,21.6,10.1,22.1,19.5c1.5,29.5-126.9,62.8-132.1,51.1c-3.1-7,39.2-25.7,108.9-89.5c22.3-20.4,44.7-43,57.9-78.4c4.8-13,7-24.1,9.5-40.5c4.5-30.4,9.1-75.4,7.9-133.7" />
											</g>
										</svg>
									</div>
									<a href="">
										<picture>
											{isWebpSupported()
												? <img src="@@webRoot/img/main/body/img_5.webp" />
												: <img src="@@webRoot/img/main/body/img_5.png" alt="image-5" />}
										</picture>
										<picture>
											{isWebpSupported()
												? <img className='content-box__bg-img' src="@@webRoot/img/main/body/bg_img.webp" />
												: <img className='content-box__bg-img' src="@@webRoot/img/main/body/bg_img.png" alt="bg-img" />
											}
										</picture>
									</a>
									<div className="content-box__text">
										<svg viewBox="0 0 250 40">
											<g fill="none" fill-rule="evenodd" stroke="currentColor" stroke-width="0.8" className="lines-text">
												<path class="st0" d="M78.7,20c0,4.1-1.6,6.9-4.9,8.5c-1.7,0.9-3.3,1.3-4.9,1.3h-4.6c-0.4,0-0.7,0.2-0.7,0.6s0.2,0.6,0.7,0.6h15.8v1.7H64.3c-0.7,0-1.2-0.2-1.7-0.7c-0.4-0.4-0.7-1-0.7-1.7c0-0.7,0.2-1.3,0.6-1.7c0.4-0.4,1-0.6,1.7-0.6h4.5c1.4,0,2.8-0.4,4.2-1.1c2.6-1.3,3.9-3.7,3.9-7.1V9.5c0-0.4-0.2-0.6-0.7-0.6c-0.4,0-0.6,0.2-0.6,0.6V17c0,1.1-0.4,2-1.1,2.8c-0.7,0.7-1.6,1.1-2.8,1.1h-5.3c-3-0.3-4.5-1.8-4.5-4.5V9.5c0-0.4-0.2-0.6-0.6-0.6c-0.4,0-0.6,0.2-0.6,0.6v6.8c0,2.4,1,4.1,2.9,5.1c1,0.5,2,0.8,3,0.8h2.2c0.7,0,1.3,0.2,1.7,0.6c0.4,0.4,0.6,1,0.6,1.7c0,0.7-0.2,1.2-0.7,1.7c-0.4,0.4-1,0.7-1.7,0.7h-4.6c-0.7,0-1.3,0.2-2,0.5c-1.1,0.6-1.7,1.7-1.7,3.1c0,0.7-0.2,1.3-0.6,1.7s-1,0.6-1.7,0.6h-0.8v-1.7h0.8c0.4,0,0.6-0.2,0.6-0.6c0-1.9,0.7-3.3,2-4.3c1-0.7,2.1-1.1,3.4-1.1h4.5c0.4,0,0.7-0.2,0.7-0.6c0-0.4-0.2-0.6-0.7-0.6h-2.2c-1.8,0-3.4-0.5-4.8-1.5c-1.9-1.4-2.8-3.4-2.8-6V9.5c0-0.7,0.2-1.2,0.7-1.7c0.4-0.4,1-0.7,1.7-0.7c0.7,0,1.2,0.2,1.7,0.7c0.4,0.4,0.7,1,0.7,1.7v6.7c0,1.1,0.4,2,1.3,2.5c0.5,0.3,1,0.4,1.6,0.4h5.2c0.6,0,1.2-0.2,1.6-0.6c0.4-0.4,0.6-0.9,0.6-1.5V9.5c0-0.7,0.2-1.2,0.7-1.7c0.5-0.4,1-0.7,1.7-0.7c0.7,0,1.3,0.2,1.7,0.7c0.4,0.4,0.7,1,0.7,1.7V20z" />
												<path class="st0" d="M86.5,8.5c1.7-0.9,3.3-1.3,4.9-1.3c1.6,0,3.3,0.4,5,1.3c3.2,1.6,4.9,4.5,4.9,8.5c0,0.7-0.2,1.2-0.7,1.7c-0.4,0.4-1,0.7-1.7,0.7c-0.7,0-1.2-0.2-1.7-0.7c-0.4-0.4-0.7-1-0.7-1.7c0-0.9-0.3-1.8-0.7-2.7c-0.9-1.7-2.3-2.5-4.4-2.5c-2.1,0-3.6,0.8-4.4,2.5c-0.4,0.9-0.7,1.8-0.7,2.7v3c0,0.9,0.2,1.8,0.7,2.7c0.9,1.6,2.3,2.5,4.4,2.5h4.5c1.3,0,2.4,0.4,3.4,1.1c1.3,1,2,2.4,2,4.3c0,0.4,0.2,0.6,0.6,0.6h0.8v1.7h-0.8c-0.7,0-1.3-0.2-1.7-0.6s-0.6-1-0.6-1.7c0-1.5-0.6-2.5-1.7-3.1c-0.6-0.3-1.3-0.5-2-0.5h-4.5c-2.4,0-4.2-0.8-5.4-2.5C85,23,84.6,21.6,84.6,20v-3c0-1.6,0.5-3.1,1.4-4.3c1.2-1.7,3-2.5,5.5-2.5c2.4,0,4.2,0.8,5.5,2.5c0.9,1.2,1.4,2.7,1.4,4.3c0,0.4,0.2,0.7,0.7,0.7c0.4,0,0.6-0.2,0.6-0.6c0-3.3-1.3-5.7-3.9-7.1c-1.4-0.7-2.8-1.1-4.2-1.1c-1.4,0-2.8,0.4-4.2,1.1c-2.6,1.3-3.9,3.7-3.9,7.1v3c0,3.4,1.3,5.7,3.9,7.1c1.4,0.7,2.8,1.1,4.2,1.1H96c0.7,0,1.3,0.2,1.7,0.6s0.6,1,0.6,1.7c0,0.7-0.2,1.2-0.7,1.7c-0.5,0.4-1,0.7-1.7,0.7H80.1v-1.7h15.8c0.4,0,0.7-0.2,0.7-0.6s-0.2-0.6-0.7-0.6h-4.5c-1.6,0-3.2-0.4-4.9-1.3c-3.2-1.6-4.9-4.5-4.9-8.5v-3C81.6,13,83.2,10.1,86.5,8.5z" />
												<path class="st0" d="M116.6,7l12,24.1h0.8v1.7h-1.9L116,9.8l-11.5,23h-1.9v-1.7h0.8L115.6,7H116.6z" />
												<path class="st0" d="M150.5,20c0,4.1-1.6,6.9-4.9,8.5c-1.7,0.9-3.3,1.3-4.9,1.3h-4.6c-0.4,0-0.7,0.2-0.7,0.6s0.2,0.6,0.7,0.6H152v1.7h-15.8c-0.7,0-1.2-0.2-1.7-0.7c-0.4-0.4-0.7-1-0.7-1.7c0-0.7,0.2-1.3,0.6-1.7s1-0.6,1.7-0.6h4.5c1.4,0,2.8-0.4,4.2-1.1c2.6-1.3,3.9-3.7,3.9-7.1V9.5c0-0.4-0.2-0.6-0.7-0.6c-0.4,0-0.6,0.2-0.6,0.6V17c0,1.1-0.4,2-1.1,2.8s-1.6,1.1-2.8,1.1h-5.3c-3-0.3-4.5-1.8-4.5-4.5V9.5c0-0.4-0.2-0.6-0.6-0.6s-0.6,0.2-0.6,0.6v6.8c0,2.4,1,4.1,2.9,5.1c1,0.5,2,0.8,3,0.8h2.2c0.7,0,1.3,0.2,1.7,0.6c0.4,0.4,0.6,1,0.6,1.7c0,0.7-0.2,1.2-0.7,1.7c-0.4,0.4-1,0.7-1.7,0.7h-4.6c-0.7,0-1.3,0.2-2,0.5c-1.1,0.6-1.7,1.7-1.7,3.1c0,0.7-0.2,1.3-0.6,1.7c-0.4,0.4-1,0.6-1.7,0.6h-0.8v-1.7h0.8c0.4,0,0.6-0.2,0.6-0.6c0-1.9,0.7-3.3,2-4.3c1-0.7,2.1-1.1,3.4-1.1h4.5c0.4,0,0.7-0.2,0.7-0.6c0-0.4-0.2-0.6-0.7-0.6h-2.2c-1.8,0-3.4-0.5-4.8-1.5c-1.9-1.4-2.8-3.4-2.8-6V9.5c0-0.7,0.2-1.2,0.7-1.7c0.4-0.4,1-0.7,1.7-0.7s1.2,0.2,1.7,0.7c0.4,0.4,0.7,1,0.7,1.7v6.7c0,1.1,0.4,2,1.3,2.5c0.5,0.3,1,0.4,1.6,0.4h5.2c0.6,0,1.2-0.2,1.6-0.6c0.4-0.4,0.6-0.9,0.6-1.5V9.5c0-0.7,0.2-1.2,0.7-1.7c0.5-0.4,1-0.7,1.7-0.7c0.7,0,1.3,0.2,1.7,0.7c0.4,0.4,0.7,1,0.7,1.7V20z" />
												<path class="st0" d="M169.2,7.2c0.7,0,1.2,0.2,1.7,0.7c0.4,0.4,0.7,1,0.7,1.7c0,0.7-0.2,1.2-0.7,1.7c-0.4,0.4-1,0.7-1.7,0.7h-9c-0.6,0-1.2,0.2-1.6,0.6c-0.4,0.4-0.6,0.9-0.6,1.6v17.1H173v1.7h-16.6V14c0-1.1,0.4-2,1.1-2.8c0.7-0.7,1.6-1.1,2.8-1.1h9c0.4,0,0.7-0.2,0.7-0.6c0-0.4-0.2-0.6-0.7-0.6h-14.1v21.6c0,0.7-0.2,1.2-0.7,1.7c-0.4,0.4-1,0.7-1.7,0.7h-0.9v-1.7h0.8c0.4,0,0.7-0.2,0.7-0.6V7.2H169.2z" />
												<path class="st0" d="M179.2,28.4l10.6-21.2h1.3v23.2c0,0.4,0.2,0.7,0.7,0.7h0.8v1.7h-0.9c-0.7,0-1.2-0.2-1.7-0.7c-0.4-0.4-0.7-1-0.7-1.7V11.6l-10.6,21.2h-1.3V9.6c0-0.4-0.2-0.7-0.6-0.7c-0.4,0-0.7,0.2-0.7,0.7v20.8c0,1.5-0.8,2.3-2.3,2.4H173v-1.7h0.9c0.4,0,0.7-0.2,0.7-0.7V9.6c0-0.7,0.2-1.3,0.6-1.7c0.4-0.4,1-0.6,1.7-0.6c0.7,0,1.2,0.2,1.7,0.7c0.4,0.4,0.7,1,0.7,1.7V28.4z" />
											</g>
										</svg>
									</div>
								</div>
							</div>
						</div>

					</div>
				</div>
				<div className="services__offer offer-container">
					<div className="offer-container__title">Специальное предложение</div>
					<div className="offer-container__body">
						<div className="offer-container__column sr-1">
							<div className="offer-container__wrapper">
								<a className='offer-container__link' href="#">
									<div className="offer-container__title-box">
										<span>Пакет Домашний</span>
										<span>5 000<i className='icon-rub'> </i></span>
									</div>
								</a>
								<div className="offer-container__text">
									Включает час звукозаписи сведение и мастеринг.
								</div>
							</div>
							<div className="offer-container__thumbnail"></div>
						</div>
						<div className="offer-container__column sr-2">
							<div className="offer-container__wrapper">
								<a className='offer-container__link' href="#">
									<div className="offer-container__title-box">
										<span>Пакет Комфорт</span>
										<span>8 000<i className='icon-rub'></i></span>
									</div>
								</a>
								<div className="offer-container__text">
									Час звукозаписи, Продюсирование, отбор лучших дублей, нотная коррекция, сведение и мастеринг.
								</div>
							</div>
							<div className="offer-container__thumbnail"></div>
						</div>
						<div className="offer-container__column sr-3">
							<div className="offer-container__wrapper">
								<a className='offer-container__link' href="#">
									<div className="offer-container__title-box">
										<span>Пакет Профи</span>
										<span>12 000<i className='icon-rub'></i></span>
									</div>
								</a>
								<div className="offer-container__text">
									Час звукозаписи, Педагог по вокалу поможет раскрыть ваш голос присутствуя на звукозаписи, Продюсирование, отбор лучших дублей, нотная коррекция, сведение и мастеринг.
								</div>
							</div>
							<div className="offer-container__thumbnail"></div>
						</div>
						<div className="offer-container__column sr-4">
							<div className="offer-container__wrapper">
								<a className='offer-container__link' href="#">
									<div className="offer-container__title-box">
										<span>Съемка клипа в студии</span>
										<span>от 5 000<i className='icon-rub'></i></span>
									</div>
								</a>
								<div className="offer-container__text">
									При заказе клипа в нашей студии вы получаете не только профессиональное видео высокого качества, но и дополнительные преимущества! Мы рады предоставить вам скидку в размере 10% на ваш заказ.
								</div>
							</div>
							<div className="offer-container__thumbnail"></div>
						</div>
					</div>
				</div>
			</div>
		</Element>
	);
};
// --------------------------------- footer ------------------------------------
const Footer = ({ baseUrl }) => {
	useEffect(() => {
		if (isMobile.any()) {
		} else {
			tlFooterParallel();
			tlFooterContacts();
		}
	}, []);
	const getPath = (fileName) => {
		return `${baseUrl}/${fileName}`;
	};
	return (
		<footer className='footer' name='footer'>
			<div className="footer__content">
				<div className="footer__info _container">
					<div className="about">
						<div className="about__column el-1">
							<div className="about__body">
								<div className="about__title">ABOUT OUR STUDIO</div>
								<div className="about__text">
									<p>Наша медиа-группа представляет собой превосходную студию звукозаписи и продюсерскую компанию. Мы специализируемся на создании текстов, продюсировании, звукозаписи и развитии талантов. Готовы к сотрудничеству с вами в любое время.</p>
									<p>Мы признаём и ценим значимость каждого проекта. Наше обязательство - обеспечить высочайшее качество звукозаписи, гибкость и терпение, необходимые для достижения вами высокого уровня в конкурентной среде современного рынка.</p>
									<p>В нашей студии вас ждёт дружелюбная и уютная атмосфера, создающая идеальное окружение для раскрытия вашего таланта и создания ваших лучших произведений.</p>
								</div>
							</div>
							<div className='about__footer'>
								<a href={getPath('pages/about.html')} className='about__button'>Read more</a>
							</div>
						</div>
						<div className="about__column el-2">
							<div className='about__body'>
								<div className="about__title">SERVICES</div>
								<div className="about__item-services">
									<i className='icon-microphone'></i>
									<span>Мы предлагаем услуги аналоговой и цифровой записи, а также микширования в широком спектре жанров.</span>
								</div>
								<div className="about__item-services">
									<i className='icon-fast-forward'></i>
									<span>Наша студия привлекает великолепным интерьером и оборудованными комфортабельными помещениями, идеально подходящими для создания лучших произведений.</span>
								</div>
								<div className="about__item-services">
									<i className='icon-music'></i>
									<span>В нашей студии мы внедряем передовое оборудование и программное обеспечение для микширования, обеспечивая высочайшее качество звучания ваших треков. Ваше творчество - наш приоритет.</span>
								</div>
							</div>
							<div className='about__footer'>
								<a className='about__button' href="#" type='button'>Read more</a>
							</div>
						</div>
						<div className="about__column el-3">
							<div className='about__body'>
								<div className="about__title">OUR TEAM</div>
								<div className="team-mates about__team-items">
									<ul className="team-mates__list">
										<li>
											<div className="team-mates__image">
												<img src="@@webRoot/img/footer/team-1.png" alt="image" />
											</div>
										</li>
										<li>
											<div className="team-mates__name">
												<a href="#">Ryan Gosling</a>
											</div>
											<div className="team-mates__text">
												<p>Райан - основатель студии и ведущий звукорежиссер. Engineer.</p>
											</div>
										</li>
									</ul>
									<ul className="team-mates__list">
										<li>
											<div className="team-mates__image">
												<img src="@@webRoot/img/footer/team-2.png" alt="image" />
											</div>
										</li>
										<li>
											<div className="team-mates__name">
												<a href="#">Ryan Gosling</a>
											</div>
											<div className="team-mates__text">
												<p>Райан - ассистент звукорежиссера в студии звукозаписи.</p>
											</div>
										</li>
									</ul>
									<ul className="team-mates__list">
										<li>
											<div className="team-mates__image">
												<img src="@@webRoot/img/footer/team-3.png" alt="image" />
											</div>
										</li>
										<li>
											<div className="team-mates__name">
												<a href="#">Ryan Gosling</a>
											</div>
											<div className="team-mates__text">
												<p>Райан - ассистент звукорежиссера в студии звукозаписи.</p>
											</div>
										</li>
									</ul>
									<ul className="team-mates__list">
										<li>
											<div className="team-mates__image">
												<img src="@@webRoot/img/footer/team-4.png" alt="image" />
											</div>
										</li>
										<li>
											<div className="team-mates__name">
												<a href="#">Ryan Gosling</a>
											</div>
											<div className="team-mates__text">
												<p>Adam is the studio’s founder and leading sound engineer.</p>
											</div>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>

					<div className="footer__help el-4">
						<a href={getPath("pages/about.html")}><i className='icon-achievements'></i></a>
						<a href={getPath("pages/about.html")}><i className='icon-services'></i></a>
						<a href={getPath("pages/about.html")}><i className='icon-reviews'></i></a>
						<a href={getPath("pages/about.html")}><i className='icon-contacts'></i></a>
					</div>
				</div>
				<div className="contacts footer__contacts el-5">
					<div className="contacts__container">
						<div className="contacts__items">
							<div className="contacts__item">
								<i className='icon-location'></i>
								<div className='contacts__text'>
									<p>Россия, Калужская область, г. Обнинск,</p>
									<p>Проспект Ленина, 137, к. 4, подъезд 3, оф. 260</p>
								</div>
							</div>
							<div className="contacts__item">
								<a href="tel:+79106044424">
									<i className="icon-phone-call"></i>
									<span>+7 910 604-44-24</span>
								</a>
							</div>
							<div className="contacts__item">
								<a href="mailto:mailto:studio@obninsk-gusli.ru">
									<i className="icon-enve-mail"></i>
									<span>studio@obninsk-gusli.ru</span>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="footer__community _container">
				<div className="community">
					<div className="community__items">
						<div className="community__title">
							<span>Media-Studio GROUP ©  2024.</span>
							<a className='community__link' href="">Privacy Policy.
								<i className='icon-angles-right-solid'></i>
							</a>
						</div>
						<div className="community__icons">
							<div className="community__icon">
								<a class="wa" title="WhatsApp" target="blank" href="https://wa.me/79106044424">
									<i className="icon-whatsapp"></i>
								</a>
							</div>
							<div className="community__icon">
								<a class="wa" title="VK" target="blank" href="https://vk.com/studio_gusli">
									<i className="icon-vk-brand"></i>
								</a>
							</div>
							<div className="community__icon">
								<a class="wa" title="TG" target="blank" href="https://t.me/gusli_studio">
									<i className="icon-telegram-fly"></i>
								</a>
							</div>
							<div className="community__icon">
								<a class="wa" title="youtube" target="blank" href="https://youtube.com/@guslistudio6257?si=36fe20TYpLAJyB3m">
									<i className="icon-youtube-logo"></i>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};
// ------------------------------- Menufloat -----------------------------------
const Menufloat = ({ baseUrl }) => {
	const [offset, setOffset] = useState(-100);
	useEffect(() => {
		function handleResize() {
			const screenWidth = window.innerWidth;
			//todo: Настроить логику для установки различных значений offset в зависимости от ширины экрана
			if (screenWidth < 768) {
				setOffset(-150);
			} else {
				setOffset(-100);
			}
		}
		//todo: Вызываем функцию handleResize сразу после монтирования компонента, чтобы установить начальное значение 
		handleResize();

		//todo: Убираем слушатель события изменения размера окна при размонтировании компонента
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	useEffect(() => {
		document.querySelector('.burger-button').addEventListener('click', function () {
			this.classList.toggle('_active');
			const menuFloattop = document.querySelector('.menu-float__top');
			console.log(menuFloattop);
			menuFloattop.classList.toggle('_is-open');
		});
	}, []);

	useEffect(() => {
		initSectionTriggerMove('.main-slide', '.menu-float__menu-link--home');
		initSectionTriggerMove('.services', '.menu-float__menu-link--services');
		initSectionTriggerMove('#footer', '.menu-float__menu-link--footer');
	});
	const getPath = (filename) => {
		return `${baseUrl}/${filename}`;
	};

	return (
		<nav className="menu-float">
			<div className="menu-float__body">
				<div className="menu-float__inner">
					<div className="menu-float__wrapper">
						<div className="menu-float__top">
							<div className="menu-float__top-content">
								<div className="main-menu">
									<div className="main-menu__menu-wrapper">
										<div className="main-menu__column">
											<ul className="main-menu__menu-nav">
												<li className="main-menu__title">
													<h4>Inspiration</h4>
												</li>
												<li className="main-menu__menu-link">
													<a className="main-menu__menu-link" href="">Видео</a>
												</li>
												<li className="main-menu__menu-link">
													<a className="main-menu__menu-link" href="">Звук</a>
												</li>
												<li className="main-menu__menu-link">
													<a className="main-menu__menu-link" href="">Текст</a>
												</li>
												<li className="main-menu__menu-link">
													<a className="main-menu__menu-link" href="">Ивенты</a>
												</li>
												<li className="main-menu__menu-link">
													<a className="main-menu__menu-link" href="">Услуги</a>
												</li>
											</ul>
										</div>
										<div className="main-menu__column">
											<ul className="main-menu__menu-nav">
												<div className="main-menu__title">
													<h4>w.</h4>
												</div>
												<li className="main-menu__menu-link">
													<a className="main-menu__menu-link"
														href={getPath('pages/about.html')}>Биография</a>
												</li>
												<li className="main-menu__menu-link"><a className="main-menu__menu-link" href="">С кем работали</a>
												</li>
												<li className="main-menu__menu-link"><a className="main-menu__menu-link" href="">Отзывы клиентов</a>
												</li>
												<li className="main-menu__menu-link"><a className="main-menu__menu-link" href="">Галерея</a></li>
												<li className="main-menu__menu-link"><a className="main-menu__menu-link" href="">Контакты</a></li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="menu-float__bottom">
							<div className="menu-float__layout menu-float__layout--primary">
								<div className="menu-float__content"><a className="menu-float__mail" href="tel:+79106044424">
									<div className="menu-float__logo"><i className="icon-phone-call"></i></div>
									<div className="menu-float__breadcrumb"><strong className="menu-float__title">G.студия</strong></div>
								</a>
								</div>
							</div>
							<div className="menu-float__layout menu-float__layout--secondary">
								<div className="menu-float__content">
									<div className="menu-float__nav">
										<div className="menu-float__menu-link menu-float__menu-link--home">
											<Link to='main-slide' duration={700} smooth={true} offset={0}>Home</Link>
										</div>
										<div className="menu-float__menu-link menu-float__menu-link--services">
											<Link to='services' duration={700} smooth={true} offset={-80}>
												Services
											</Link>
										</div>
										<div className="menu-float__menu-link menu-float__menu-link--footer">
											<Link to='footer' duration={700} smooth={true} offset={-80}>
												Contacts
											</Link>
										</div>
									</div>
								</div>
							</div>
							<div className="menu-float__layout menu-float__layout--button">
								<div className="menu-float__content">
									<div className="burger-button">
										<div className="burger-button__items"><svg viewBox="10 6 44 36">
											<path d="M19,15 L45,15 C70,15 58,-2 49.0177126,7 L19,37"></path>
											<path d="M19,24 L45,24 C61.2371586,24 57,49 41,33 L32,24"></path>
											<path d="M45,33 L19,33 C-8,33 6,-2 22,14 L45,37"></path>
										</svg></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};
//! ----------------------------------------------------------------------------

//! ----------------------------------------------------------------------------
//? -----------------------------Render Header ---------------------------------
createRoot(document.querySelector('.page__header')).render(<Header baseUrl={baseUrl} />);
//? ---------------------------Render Mainslide --------------------------------
createRoot(document.querySelector('.main-content__slide')).render(<Mainslide baseUrl={baseUrl} />);
//? ---------------------------Render Services ---------------------------------
createRoot(document.querySelector('.main-content__services')).render(<Services baseUrl={baseUrl} />);
//? ----------------------------Render Footer ----------------------------------
createRoot(document.querySelector('.main-content__footer')).render(<Footer baseUrl={baseUrl} />);
//? ---------------------------Render Menufloat --------------------------------
createRoot(document.querySelector('.page__menu-float')).render(<Menufloat baseUrl={baseUrl} />);
// -----------------------------------------------------------------------------
