const path = require('path');
merge = require('gulp-merge-json');

const json = () => {
	return $.gulp.src($.path.json.src)
		.pipe(merge({
			fileName: 'data.json',
			edit: (json, file) => {
				// Extract the filename and strip the extension
				var filename = path.basename(file.path),
					primaryKey = filename.replace(path.extname(filename), '');
				// Set the filename as the primary key for our JSON data
				var data = {};
				data[primaryKey.toLowerCase()] = json;
				return data;
			}
		}))
		.pipe($.gulp.dest($.path.json.dest));
};
module.exports = json;