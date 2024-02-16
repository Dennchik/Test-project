const recompress = require('imagemin-jpeg-recompress');
const pngquant = require('imagemin-pngquant');
const pugbem = require('gulp-pugbem');
const isProd = process.argv.includes('--production');
const isDev = !isProd;

module.exports = {
	isProd: isProd,
	isDev: isDev,

	webpack: {
		// mode: isProd ? 'production' : 'development',
		mode: 'production',
		entry: {
			// script: './#src/js/script.js',
			main: './#src/js/main.js'
		},
		output: {
			filename: '[name].min.js',
		},
		module: {
			rules: [
				{
					test: /\.css$/,
					use: ['style-loader', 'css-loader', 'js-loader'],
				},
			],
		},
	},
	svgSpr: {
		shape: {
			id: {
				separator: '--',
				pseudo: '~',
				whitespace: '_'
			},
			dimension: { // Set maximum dimensions
				maxWidth: 500,
				maxHeight: 500
			},
			spacing: { // Add padding
				padding: 0
			},
			transform: [{
				svgo: {
					plugins: [
						"cleanupAttrs",
						"convertColors",
						"removeEmptyAttrs"
					]
				}
			}],
		},
		mode: {
			defs: {
				dest: './svg',
				sprite: './sprite.svg',
			},
		},
	},
	pug: {
		pretty: true,
		plugins: [pugbem],
	},
	htmlMin: {
		collapseWhitespace: true
	},
	Js: {
		ext: {
			src: '.js',
			min: '.min.js'
		}
	},
	renameScss: {
		extname: '.css',
		suffix: '.min',
	},
	fonter: {
		formats: ['woff', 'ttf', 'svg', 'otf'],
	},
	svgMin: {
		js2svg: {
			indent: 4,
			pretty: true
		}
	},
	cheerio: {
		run: function ($) {
			$('[fill]').removeAttr('fill');
			$('[stroke]').removeAttr('stroke');
			$('[style]').removeAttr('style');
		},
		parserOptions: { xmlMode: true }
	},
	autoprefixer: {
		cascade: false,
		grid: 'auto-place',
		overrideBrowserslist: [
			'last 3 versions',
			'Android >= 5',
			'Firefox >= 24',
			'Safari >= 6',
			'Opera >= 12',
		],
	},
	imagemin: {
		verbose: true,
		interlaced: true,
		progressive: true,
		optimizationLevel: 5,
	}[
		recompress({
			loops: 6,
			min: 50,
			max: 90,
			quality: 'high',
			use: [
				pngquant({
					quality: [0.8, 1],
					strip: true,
					speed: 1,
				}),
			],
		})
	],
};
