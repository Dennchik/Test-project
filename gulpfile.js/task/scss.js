//* JavaScript Processing
const scss = () => {
	return $.gulp.src($.path.scss.src)
		.pipe($.gul.plumber({
			errorHandler: $.gul.notify.onError(error => ({
				title: 'scss',
				message: error.message,
			})),
		}))
		.pipe($.gulpIf($.app.isDev, $.gul.sourcemaps.init({
			largeFile: true
		})))
		.pipe($.sass.sync({
			outputStyle: 'expanded',
		}).on('error', $.gul.notify.onError()))
		.pipe($.gulpIf($.app.isProd, $.gul.stripCssComments()))
		.pipe($.gulpIf($.app.isProd, $.gul.autoprefixer($.app.autoprefixer)))
		.pipe($.gulpIf($.app.isProd, $.gul.debug({ title: '(Autoprefixer)' })))
		.pipe($.gul.groupCssMediaQueries())
		.pipe($.gul.shorthand())
		.pipe($.gulpIf($.app.isProd, $.gul.webpCss()))
		.pipe($.gulpIf($.app.isProd, $.gul.size({
			title: 'До сжатия - (CSS):'
		})))
		.pipe($.gulpIf($.app.isProd, $.gulp.dest($.path.scss.dest)))
		.pipe($.gul.csso({
			restructure: true,
			sourceMap: true,
		}))
		.pipe($.gul.rename($.app.renameScss))
		.pipe($.gulpIf($.app.isProd, $.gul.size({
			title: 'После сжатия - (CSS):'
		})))
		.pipe($.gulpIf($.app.isDev, $.gul.sourcemaps.write('.')))
		.pipe($.gulpIf($.app.isDev, $.gul.debug({
			title: 'Source - Maps (WRITE)'
		})))
		.pipe($.gulp.dest($.path.scss.dest));
};
module.exports = scss;