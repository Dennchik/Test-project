const pathSrc = './#src';
const pathDest = './build';
const pathEnd = './public';


module.exports = {
	root: pathDest,
	rootEnd: pathEnd,

	json: {
		fileName: 'data.json',
		src: pathSrc + '/data/*.json',
		watch: pathSrc + '/data/*.json',
		dest: pathSrc + '/data/temp',
		readFile: pathSrc + '/data/temp/data.json'
	},
	pug: {
		src: pathSrc + '/pug/pages/**/*{.pug,jade}',
		watch: pathSrc + '/pug/**/*.{pug,jade}',
		dest: pathDest
	},
	scss: {
		src: pathSrc + '/scss/*.{scss,sass}',
		watch: pathSrc + '/scss/**/*.{sass,scss}',
		dest: pathDest + '/css'
	},
	js: {
		src: pathSrc + '/js/*.js',
		watch: pathSrc + '/js/**/*.js',
		dest: pathDest + '/js'
	},
	image: {
		src: pathSrc + '/img/**/*.{png,jpg,jpeg,gif,svg,ico}',
		watch: pathSrc + '/img/**/*.{png,jpg,jpeg,gif,svg,ico}',
		dest: pathDest + '/img/'
	},
	svgSpr: {
		src: pathSrc + '/img-sprite/**/*.svg',
		watch: pathSrc + '/img-sprite/**/*.svg',
		dest: pathDest + '/img/',
		destJs: pathDest + '/js/',
	},
	fonts: {
		src: pathSrc + '/fonts/*.{eot,ttf,otf,otc,ttc,woff,woff2,svg}',
		watch: pathSrc + '/fonts/**/*.{eot,ttf,otf,otc,ttc,woff,woff2,svg}',
		dest: pathDest + '/fonts'
	},
	fontsStyle: {
		src: pathSrc + '/scss/core/_fonts.scss',
		watch: pathSrc + '/fonts/*.{eot,ttf,otf,otc,ttc,woff,woff2,svg}',
		dest: pathDest + '/fonts'
	},
	clearFonts: {
		watch: pathSrc + '/fonts/**/*.{eot,ttf,otf,otc,ttc,woff,woff2,svg}'
	},
	final: {
		src: pathDest + '/**/*.*',
		dest: pathEnd
	}
};
