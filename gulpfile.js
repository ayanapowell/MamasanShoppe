var gulp = require('gulp');
var plumber = require('gulp-plumber');
var cssGlobbing = require('gulp-css-globbing');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var autoPrefixer = require('gulp-autoprefixer');
var cssComb = require('gulp-csscomb');
var cmq = require('gulp-combine-media-queries');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var order = require("gulp-order");
var notify = require('gulp-notify');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
gulp.task('reload',function(){
	browserSync.reload();
});
var paths = {
	js: [
		'build/scripts/lib/*.js',
		'build/scripts/components/*.js',
		'build/scripts/pages/*.js'
	]
};
gulp.task('sass',function(){
	gulp.src(['build/scss/style.scss'])
		.pipe(plumber({
			handleError: function (err) {
				console.log(err);
				this.emit('end');
			}
		}))
		.pipe(cssGlobbing({ extensions: ['.scss'] }))
		// Let gulp know its sass, compile it as sass
		.pipe(sass())
		// Auto prefixer. automatically adds vendor prefixes do we dont have to. https://github.com/postcss/autoprefixer
		.pipe(autoPrefixer({'browsers': ['last 2 versions', 'Safari >= 8']}))
		.pipe(cssComb())
		// concat = combine. Combine into one fatty css file
		.pipe(concat('style.css'))
		// shrink that file
		.pipe(minifyCss())
		// Send that shrinked fatty css file to this location
		.pipe(gulp.dest('html/css'))
		// This lets browsersync know to inject the styles into your page, no refresh needed.
		.pipe(browserSync.stream())
		.pipe(notify('css task finished'));
});
gulp.task('js',function(){
	// paths.js is set up above on line 19. 
	gulp.src(paths.js)
		.pipe(plumber({
			handleError: function (err) {
				console.log(err);
				this.emit('end');
			}
		}))
		.pipe(sourcemaps.init())
		// Order is very important in javascript. jQuery needs to be loaded first for example.
		// This plugin will build out that order for us so we dont have to worry. We just have to put that order here.
		.pipe(order([
			// jquery first. comment in when ready
			'build/scripts/lib/jquery.js',
			// then everything else in our library folder which is made up of plugins we might use in other JS files. 
			'build/scripts/lib/*.js',
			// We may have a "helpers" file which contains small functions that are global. Something like device detection might go in helpers/
			// comment in when ready.
			// 'build/scripts/components/helpers.js',
			// then everything else in our components folders
			'build/scripts/components/*.js',
			// then everything else in our pages folders
			'build/scripts/pages/*.js'
		], { base: './' }))
		// combine all JS files into one
		.pipe(concat('app.min.js'))
		// uglify is the same as shrinking it but it also literally makes it ugly and unreadable. It saves space by turning your variables into 1 character for example.
		.pipe(uglify())
		// save that ugly file here
		.pipe(gulp.dest('html/js'))
		.pipe(notify('js task finished'));
});
// gulp watch will turn on gulp
gulp.task('watch',function(){
	browserSync.init({
        notify: true,
        server: {
            baseDir: "./html"
        }
    });
    // tell gulp to pay attention to all files we tell it to here.
	gulp.watch(paths.js,['js']);
	gulp.watch('build/scss/**/*.scss',['sass']);

});
// gulp will run all functions
gulp.task('default',['sass','js']);
