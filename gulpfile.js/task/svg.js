//* Svg processing
const svg = () => {
	return $.gulp.src($.path.svgSpr.src)
		.pipe($.gul.plumber({
			errorHandler: $.gul.notify.onError(error => ({
				title: "SVG",
				message: error.message
			}))
		}))
		.pipe($.gul.svgmin($.app.svgMin))
		.pipe($.gul.cheerio({
			run: function ($) {
				$('[fill]').removeAttr('fill');
				$('[stroke]').removeAttr('stroke');
				$('[style]').removeAttr('style');
			},
			parserOptions: { xmlMode: true }
		}))
		.pipe($.gul.replace('&gt;', '>'))
		.pipe($.gul.svgSprite($.app.svgSpr))
		.pipe($.gulp.dest($.path.svgSpr.dest));
};
module.exports = svg;