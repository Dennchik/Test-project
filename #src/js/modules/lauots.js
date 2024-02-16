export function modal() {
	const modal = document.querySelector('.modal');
	const span = modal.querySelector('span');
	const imgs = document.querySelectorAll('.page__img');
	let modalImg = modal.querySelector('.modal__image');
	for (let i = 0; i < imgs.length; i++) {
		const img = imgs[i];

		img.addEventListener('click', function (e) {
			let target = e.target;
			let sourse = target.closest('.page__image').querySelector('source').srcset;
			console.log(img.src);
			modal.style.display = "block";
			modalImg.src = img.src;
			modal.querySelector('source').srcset = sourse;
			// console.log();
		});

		span.onclick = function () {
			modal.style.display = "none";
		};
	}
}

