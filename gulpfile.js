var gulp = require('gulp');
var postcss = require('gulp-postcss');
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var connect = require('gulp-connect');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var postcssFontMagician = require('postcss-font-magician');
var postcssColorblind = require('postcss-colorblind');
var postcssFlexbugsFixes = require('postcss-flexbugs-fixes');


gulp.task('default', ['connect','css', 'js', 'img','html', 'watch']);// default task

gulp.task('css', function () {
    var processors = [
        autoprefixer,
        cssnano,
        postcssFontMagician,
        postcssColorblind,
        postcssFlexbugsFixes

    ];

    gulp.src('source/scss/**/*.scss')

        .pipe(plumber(plumberErrorHandler))

        .pipe(sass({
         outputStyle: 'compressed',
         includePaths: ['node_modules/susy/sass']
        }).on('error', sass.logError))
        .pipe(postcss(processors))

        .pipe(gulp.dest('public/assets/css'))

        .pipe(connect.reload());

});//css task

gulp.task('js', function () {

gulp.src('source/javascript/**/*.js')

.pipe(plumber(plumberErrorHandler))

.pipe(jshint())

.pipe(jshint.reporter('fail'))

.pipe(concat('scripts.js'))

.pipe(gulp.dest('public/assets/js'))

.pipe(connect.reload());

}); //jshint


gulp.task('img', function() {

  gulp.src('./asstes/images/*.{png,jpg,gif}')

    .pipe(plumber(plumberErrorHandler))

    .pipe(imagemin({

      optimizationLevel: 7,

      progressive: true

    }))

    .pipe(gulp.dest('img'))

    .pipe(connect.reload());

}); // images optimization task

gulp.task('watch', function() {



  gulp.watch('source/javascript/**/*.js', ['js']);
  gulp.watch('source/scss/**/*.scss', ['css']);
  gulp.watch(['*.html'], ['html']);
  gulp.watch('./assets/images/*.{png,jpg,gif}', ['img']);

}); //watch task

gulp.task('connect', function() {
connect.server({
  root: '',
  livereload: true
});
}); // connect task

gulp.task('html', function () {
  gulp.src('*.html')
    .pipe(connect.reload());
}); // html reload

var plumberErrorHandler = { errorHandler: notify.onError({

    title: 'Gulp',

    message: 'Error: <%= error.message %>'

  })

}; //plumberErrorHandler
