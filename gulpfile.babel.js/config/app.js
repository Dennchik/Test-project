import pugbem from "gulp-pugbem";
import imagemin from "gulp-imagemin";
const isProd = process.argv.includes("--production");
const isDev = !isProd;

export default {
	isProd: isProd,
	isDev: isDev,

	webpack: {
		// mode: isProd ? 'production' : 'development',
		mode: 'production',
		entry: {
			main: './#src/js/main.js'
		},
		output: {
			filename: '[name].min.js',
		},
		module: {
			rules: [
				{
					test: /\.css$/,
					use: ['style-loader', 'css-loader'],
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
				dest: './',
				sprite: './sprite.svg',
			},
		},
	},
	pug: {
		pretty: true,
		plugins: [pugbem]
	},
	htmlMin: {
		collapseWhitespace: true
	},
	renameScss: {
		extname: '.css',
		suffix: '.min',
	},
	fonter: {
		formats: ['ttf', 'woff', 'eot', 'svg'],
	},
	renameJs: {
		extname: '.js',
		suffix: '.min',
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
			"Android >= 4",
			"last 3 versions",
			"Firefox >= 24",
			"Safari >= 6",
			"Opera >= 12"
		]
	},
	imagemin: ([
		imagemin.svgo({
			plugins: [
				{ optimizationLevel: 5 },
				{ progessive: true },
				{ interlaced: true },
				{ removeViewBox: false },
				{ removeUselessStrokeAndFill: false },
				{ cleanupIDs: false }
			],
		}),
		imagemin.gifsicle(
			{ interlaced: true }
		),
		imagemin.optipng({
			optimizationLevel: 5
		}),
		imagemin.mozjpeg({
			quality: 75,
			progressive: true
		}),
	]),
	// imagemin: ({
	// 	verbose: true,
	// 	interlaced: true,
	// 	progressive: true,
	// 	optimizationLevel: 5,
	// }
	// [
	// 	recompress({
	// 		loops: 6,
	// 		min: 50,
	// 		max: 90,
	// 		quality: 'high',
	// 		use: [pngquant({
	// 			quality: [0.8, 1],
	// 			strip: true,
	// 			speed: 1
	// 		})],
	// 	})
	// ]
	// )
}

