import swiperLayout from "../assets/swiper-layout";
swiperLayout('.direct-slide__item');
//* import Swiper bundle with all modules installed 
import Swiper from 'swiper/bundle';

//* import styles bundle 
export default function directSlide(
	mainslide = '.direct-slide__item',
) {
	if (mainslide) {
		new Swiper(mainslide, {
			slidesPerView: 1,
			spaceBetween: 8,
			grabCursor: true,
			speed: 500,
			navigation: {
				nextEl: '.direction-btn-next',
				prevEl: '.direction-btn-prew',
			},
			breakpoints: {
				320: {
					slidesPerView: 1,
				},
				490: {
					slidesPerView: 2,
				},
				860: {
					slidesPerView: 3,
				}
			}
		});
	}
}




