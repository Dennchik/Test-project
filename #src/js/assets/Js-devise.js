// === Определение устройства вывода ===
"use strict";
let isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: () => {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: () => {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: () => {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: () => {
		return navigator.userAgent.match(/IEMobile/i);
	},

	any: () => {
		return (
			isMobile.Android() ||
			isMobile.BlackBerry() ||
			isMobile.iOS() ||
			isMobile.Opera() ||
			isMobile.Windows());
	}
};
export default isMobile;