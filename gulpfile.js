const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
/*
gulp.task - Define task
gulp.src - point to files to use
gulp.dest - points to folder to output
gulp.watch - watch files and folders for change
*/

//Logs Message

    gulp.task('message',function(){

        return console.log('Gulp is running');
    });

    gulp.task('copyHtml' , function(){
        gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
    });


    //optimize images
    gulp.task('imageMin', ()=>
        gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
    );

    //compile sass
    gulp.task('sass',function(){
        gulp.src('src/sass/*.scss')
        .pipe( sass().on('error',sass.logError))
        .pipe(gulp.dest('dist/css'))
    });

    
    //scripts

    gulp.task('scripts', function(){
        gulp.src('src/js/*.js')
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
    });

    gulp.task('default',['message','imageMin','sass','copyHtml','scripts']);

    gulp.task('watch', function(){
        gulp.watch('src/js/*.js',['scripts']);
        gulp.watch('src/images/*',['imageMin']);
        gulp.watch('src/sass/*.scss',['sass']);
        gulp.watch('src/*.html',['copyHtml']);
    })