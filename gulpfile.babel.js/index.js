global.$ = {
	//* Plugins
	gulp: require('gulp'),
	gul: require('gulp-load-plugins')(),
	browserSync: require('browser-sync').create(),
	sass: require('gulp-sass')(require('sass')),
	gulpSvgSprite: require('gulp-svg-sprite'),
	webPackStream: require('webpack-stream'),
	merge: require('gulp-merge-json'),
	gulpIf: require('gulp-if'),
	del: require('del'),
	fs: require('fs'),
	//* Configuration
	app: require('./config/app'),
};
//* Configuration
import path from './config/path.js';
import app from './config/app.js';
//* Tasks
import clear from './task/clear';
import pug from './task/pug';
import js from './task/js';
import json from './task/json';
import scss from './task/scss';
import image from './task/image';
import sprite from './task/sprite';
import server from './task/server';

import clearFonts from './task/clearFonts';
import fonts from './task/fonts';
import fontsStyle from './task/fontStyle';

const change = $.gulp.series(clearFonts, fonts, fontsStyle);
//* Observation
const watcher = () => {
	$.gulp.watch(path.js.watch, js).on('all', $.browserSync.reload);
	$.gulp.watch(path.pug.watch, pug).on('all', $.browserSync.reload);
	$.gulp.watch(path.json.watch, json).on('all', $.browserSync.reload);
	$.gulp.watch(path.json.readFile, pug).on('all', $.browserSync.reload);
	$.gulp.watch(path.scss.watch, scss).on('all', $.browserSync.reload);
	$.gulp.watch(path.image.watch, image).on('all', $.browserSync.reload);
	$.gulp.watch(path.sprite.watch, sprite).on('all', $.browserSync.reload);
	$.gulp.watch(path.fonts.watch, fonts).on('all', $.browserSync.reload);
	$.gulp.watch(path.fontsStyle.watch, change).on('all', $.browserSync.reload);
};
const end = $.gulp.series(
	clear, json,
	$.gulp.parallel(pug, image, sprite, scss, js, fonts), fontsStyle
);
const dev = $.gulp.series(end, $.gulp.parallel(watcher, server));
//* Call back
export { clear };
export { clearFonts };
export { pug };
export { json };
export { scss };
export { js };
export { image };
export { sprite };
export { fonts };
export { fontsStyle };
//* Assembly
export default app.isProd ? end : dev;