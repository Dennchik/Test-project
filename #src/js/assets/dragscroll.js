function drag() {
	(function (root, factory) {
		if (typeof define === 'function' && define.amd) {
			define(['exports'], factory);
		} else if (typeof exports !== 'undefined') {
			factory(exports);
		} else {
			factory((root.dragscroll = {}));
		}
	}(this, function (exports) {
		let _window = window;
		let _document = document;
		let mousemove = 'mousemove';
		let mouseup = 'mouseup';
		let mousedown = 'mousedown';
		let EventListener = 'EventListener';
		let addEventListener = 'add' + EventListener;
		let removeEventListener = 'remove' + EventListener;
		let newScrollX, newScrollY;

		let dragged = [];
		let reset = function (i, el) {
			for (i = 0; i < dragged.length;) {
				el = dragged[i++];
				el = el.container || el;
				el[removeEventListener](mousedown, el.md, 0);
				_window[removeEventListener](mouseup, el.mu, 0);
				_window[removeEventListener](mousemove, el.mm, 0);
			}

			// cloning into array since HTMLCollection is updated dynamically
			dragged = [].slice.call(_document.getElementsByClassName('_scrolls'));
			for (i = 0; i < dragged.length;) {
				(function (el, lastClientX, lastClientY, pushed, scroller, cont) {
					(cont = el.container || el)[addEventListener](
						mousedown,
						cont.md = function (e) {
							if (!el.hasAttribute('nochilddrag') ||
								_document.elementFromPoint(
									e.pageX, e.pageY
								) == cont
							) {
								pushed = 1;
								lastClientX = e.clientX;
								lastClientY = e.clientY;

								e.preventDefault();
							}
						}, 0
					);

					_window[addEventListener](
						mouseup, cont.mu = function () { pushed = 0; }, 0
					);

					_window[addEventListener](
						mousemove,
						cont.mm = function (e) {
							if (pushed) {
								(scroller = el.scroller || el).scrollLeft -=
									newScrollX = (- lastClientX + (lastClientX = e.clientX));
								scroller.scrollTop -=
									newScrollY = (- lastClientY + (lastClientY = e.clientY));
								if (el == _document.body) {
									(scroller = _document.documentElement).scrollLeft -= newScrollX;
									scroller.scrollTop -= newScrollY;
								}
							}
						}, 0
					);
				})(dragged[i++]);
			}
		};


		if (_document.readyState == 'complete') {
			reset();
		} else {
			_window[addEventListener]('load', reset, 0);
		}

		exports.reset = reset;
	}));
}

export { drag };