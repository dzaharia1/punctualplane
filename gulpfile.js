var gulp = require('gulp') ,
csv2json = require('gulp-csv2json') ,
rename = require('gulp-rename') ,
sass = require('gulp-sass') ,
scsslint = require('gulp-scss-lint') ,
autoprefixer = require('gulp-autoprefixer') ,
browserSync = require('browser-sync') ,
plumber = require('gulp-plumber') ,
reload = browserSync.reload;

var SOURCE = {
	scss: 'scss/**/*.scss',
	css: 'public/css',
	hbs: 'views/**/*.hbs',
	js: ['/*.js', 'routes/**/*.js', 'public/js/*.js'],
	images: 'public/images/icon-library/svg/*'
};

// var dest = {
// 	data: 'data'
// };

var AUTOPREFIXER_BROWSERS = [
'ie >= 10',
'ie_mob >= 10',
'ff >= 30',
'chrome >= 34',
'safari >= 7',
'opera >= 23',
'ios >= 7',
'android >= 4.4',
'bb >= 10'
];

gulp.task('convertcsv', function() {
	gulp.src('./csv/On_Time_On_Time_Performance_2015_3.csv')
		.pipe(csv2json())
		.pipe(rename({extname: '.js'}))
		.pipe(gulp.dest('data'));
});

gulp.task('browser-sync', function(){
	browserSync({
		proxy: 'localhost:3333'
	});
});

gulp.task('bs-reload', function(){
	browserSync.reload();
});

gulp.task('scss-lint', function(){
	gulp.src('/' + SOURCE.js)
	.pipe(scsslint());
});

gulp.task('sass', ['scss-lint'], function () {
	gulp.src(SOURCE.scss)
	.pipe(plumber())
	.pipe(sass())
	.pipe(autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
	.pipe(gulp.dest(SOURCE.css))
	.pipe(reload({stream:true}));
});

gulp.task('default', ['sass', 'browser-sync'], function(){
	gulp.watch(SOURCE.scss, ['sass']);
	gulp.watch([SOURCE.hbs, SOURCE.js], ['bs-reload']);
});
