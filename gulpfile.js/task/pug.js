const data = require('gulp-data');
//* Pug processing
const pug = () => {
	return $.gulp.src($.path.pug.src)
		.pipe($.gul.plumber({
			errorHandler: $.gul.notify.onError(error => ({
				title: "PUG",
				message: error.message
			}))
		}))
		.pipe(data(function () {
			return JSON.parse($.fs.readFileSync($.path.json.readFile));
		}))
		.pipe($.gul.pug($.app.pug))
		.pipe($.gul.fileInclude())
		.pipe($.gul.webpHtml())
		.pipe($.gul.htmlmin($.app.htmlMin))
		.pipe($.gulp.dest($.path.pug.dest));
};
module.exports = pug;