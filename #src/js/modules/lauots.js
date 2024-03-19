import isMobile from "../assets/Js-devise.js";
import ItcCollapse from "../assets/collapse.js";
import Rellax from 'rellax';
// -----------------------------------------------------------------------------
const $ = {
	menuDown: document.querySelector('.menu-doun__btn-icon'),
	mediaMenu: document.querySelector('.media__menu'),
	middleRowMenu: document.querySelectorAll('.middle-row__menu'),
	menuList: document.querySelector('.middle-row'),
	burgerBttns: document.querySelector('.burger-bottom'),
	burgerMenu: document.querySelector('.burger-menu')
};
// -----------------------------(Paralax Element)-------------------------------
function animItems() {
	const animItems = document.querySelectorAll('._rellax');
	const rellaxWrapper = document.querySelector('._rellax-wrapper');
	if (animItems.length > 0) {
		function startHieght() {
			const lastElement = Object.values(animItems).pop();
			const contenBlockHeight = rellaxWrapper.offsetHeight;
			rellaxWrapper.style.height = contenBlockHeight;
			let lastHeight = lastElement.offsetHeight;

			function gettHieght() {
				const rellaxWrapperTop = offsets(rellaxWrapper).top;
				const lastElementTop = offsets(lastElement).top;

				rellaxWrapper.style.height = lastElementTop - rellaxWrapperTop + lastHeight + 'px';
			}
			return gettHieght;
		}

		let _startHieght = startHieght();

		let animeRellax = new Rellax('._rellax', {
		});
		animeRellax.refresh();

		window.addEventListener('scroll', function () {
			_startHieght();
		});

		function offsets(el) {
			const rect = el.getBoundingClientRect(),
				scrollLeft = window.scrollX || document.documentElement.scrollLeft,
				scrollTop = window.scrollY || document.documentElement.scrollTop;
			return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
		}
	}
}
// -------------------------------(Show Menu)-----------------------------------
function _showEMenu() {
	let prevScrollpos = window.scrollY;
	window.onscroll = function () {
		const scrollmenu = document.querySelector('.header');
		let currentScrollPos = window.scrollY;
		if (prevScrollpos > currentScrollPos) {
			scrollmenu.style.top = "16px";
		} else {
			scrollmenu.style.top = "-250px";
		}
		prevScrollpos = currentScrollPos;
	};
}
// -----------------------------(Show Element)----------------------------------
function _showElement() {
	document.addEventListener('DOMContentLoaded', function () {
		let showElement = document.querySelectorAll('.show-element');
		function checkBlocksVisibility() {
			let windowHeight = window.innerHeight;
			let elementVisible = 0;
			showElement.forEach((item) => {
				let blockPosition = item.getBoundingClientRect().top;
				if (blockPosition < windowHeight - elementVisible) {
					item.style.opacity = "1";
					item.style.transform = "translateY(0)";
				}
				else if (blockPosition > windowHeight - elementVisible) {
					item.style.opacity = "0";
					item.style.transform = "translateY(100px)";
				}
			});
		}
		checkBlocksVisibility();
		window.addEventListener('scroll', checkBlocksVisibility);
	});
}
// ----------------------------(Collapse Media)---------------------------------
function _collapseMenuFooter() {
	if (isMobile.any()) {
		$.middleRowMenu.forEach((item) => {
			const trigger = item.querySelector('.middle-row__button');
			trigger.addEventListener('click', () => {
				const opened_item = $.menuList.querySelector('._open');
				_toggleItem(item);
				if (opened_item && opened_item !== item) {
					_toggleItem(opened_item);
				}
			});
		});
		const _toggleItem = (item) => {
			const collapse = new ItcCollapse(item.querySelector('._collapse'));
			if (item.classList.contains('_open')) {
				item.classList.remove('_open');
				collapse.toggle();
			} else {
				item.classList.add('_open');
				collapse.toggle();
			}
		};
	}
}
// ----------------------------(Collapse Media)---------------------------------
function _collapseMedia() {
	if (isMobile.any()) {
		const items = document.querySelectorAll('.menu-media__button');
		items.forEach((item) => {
			item.addEventListener('click', () => {
				$.mediaMenu.classList.toggle('_active');
				const opened_item = document.querySelector('._open');
				_toggleItem(item);
				if (opened_item && opened_item !== item) {
					_toggleItem(opened_item);
				}
			});
		});
		const _toggleItem = (item) => {
			const collapse = new ItcCollapse(document.querySelector('._collapse'));
			if (item.classList.contains('_open')) {
				item.classList.remove('_open');
				collapse.toggle();
			} else {
				item.classList.add('_open');
				collapse.toggle();
			}
		};
	}
}
// -----------------------(isMobile - Side Bar Menu)----------------------------
function _sideBarMenu() {
	$.burgerBttns.addEventListener('click', () => {
		document.body.classList.toggle('_heading');
		$.burgerBttns.classList.toggle('_open');
		$.burgerMenu.classList.toggle('_open');
	});
}

// -----------------------------------------------------------------------------
function _responsive() {
	$.menuDown.addEventListener('click', () => {
		let tabLink = $.menuDown.closest('.menu-doun ');
		console.log(tabLink);
		tabLink.classList.toggle('_responsive');
		$.menuDown.classList.toggle("_active");

	});
}
// -----------------------------------------------------------------------------
function _loop(els, elClosest, md) {
	for (let i = 0; i < els.length; i++) {
		let item = els[i];
		item.addEventListener('click', () => {
			switch (true) {
				case item.classList.contains(elClosest):
					item.classList.toggle(md);
					break;
				default:
					item.closest(elClosest).classList.toggle(md);
					break;
			}
		});
	}
}

// -----------------------------------------------------------------------------
export { _responsive, _collapseMedia, _collapseMenuFooter, _sideBarMenu, _showEMenu, animItems, _showElement };