var gulp            = require('gulp'),
    $           = require("gulp-load-plugins")(),
    browserSync = require('browser-sync'),
    coffeelint  = require("gulp-coffeelint"),
    del         = require("del"),
    merge       = require('merge-stream'),
    path        = require('path'),
    reload      = browserSync.reload,
    runSequence = require('run-sequence'),
    tinylr      = require('tiny-lr'),
    sass        = require('gulp-sass'),
    server      = tinylr();

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./views"
        }
    });
});

gulp.task('coffee', function() {
    return gulp.src('src/scripts/*.coffee')
        .pipe($.plumber())
        .pipe(coffeelint())
        .pipe(coffeelint.reporter())
        .pipe($.coffee({bare: true}).on('error', $.util.log))
        .pipe(gulp.dest('views/scripts'))
        .pipe(browserSync.reload({stream: true}))
        .pipe($.livereload( server ));
});

gulp.task('clean-views', function(){
    return del(['views/**/*']);
});

gulp.task('compass', function() {
    return gulp.src('./src/stylesheets/*.sass')
        .pipe($.plumber())
        .pipe(browserSync.reload({stream: true}))
        .pipe($.compass({
            css: 'views/stylesheets',
            sass: 'src/stylesheets'
        }))
        .pipe(gulp.dest('views/stylesheets'))
        .pipe($.livereload( server ));;
});

gulp.task('components', function(){
    return gulp.src('bower_components/**/*.*')
        .pipe($.plumber())
        .pipe(gulp.dest('views/bower_components'))
        .pipe(browserSync.reload({stream: true}))
        .pipe($.livereload( server ));
});

gulp.task('demo', function() {
    var jadeDemo = gulp.src('demo/index.jade')
        .pipe($.plumber())
        .pipe($.jade({
            pretty: true
        }))
        .pipe(gulp.dest('views'))
        .pipe(browserSync.reload({stream: true}));
    var sassDemo = gulp.src('demo/main.sass')
        .pipe($.plumber())
        .pipe($.compass({
            css: 'views',
            sass: 'demo'
        }))
        .pipe(gulp.dest('views'))
        .pipe(browserSync.reload({stream: true}))
        .pipe( $.livereload( server ) );
    var coffeeDemo = gulp.src('demo/app.coffee')
        .pipe($.plumber())
        .pipe(coffeelint())
        .pipe(coffeelint.reporter())
        .pipe($.coffee({bare: true}).on('error', $.util.log))
        .pipe(gulp.dest('views'))
        .pipe(browserSync.reload({stream: true}))
        .pipe( $.livereload( server ) );
    var mocksDemo = gulp.src('demo/mocks/*.json')
        .pipe($.plumber())
        .pipe(gulp.dest('views/mocks'))
        .pipe(browserSync.reload({stream: true}))
        .pipe( $.livereload( server ) );
    var imageDemo = gulp.src('demo/images/*.*')
        .pipe($.plumber())
        .pipe(gulp.dest('views/images'))
        .pipe(browserSync.reload({stream: true}))
        .pipe( $.livereload( server ) );
    return merge(jadeDemo, sassDemo, coffeeDemo, mocksDemo, imageDemo)

});

gulp.task('jade', function () {
    return gulp.src('src/jade/*.jade')
        .pipe($.plumber())
        .pipe($.jade({
            pretty: true
        })).pipe( gulp.dest('views/templates'))
        .pipe(browserSync.reload({stream: true}))
        .pipe( $.livereload( server ) );
});

gulp.task('build', ['coffee', 'compass', 'components', 'demo', 'jade']);

gulp.task('server', function (callback) {
    runSequence('clean-views','build','browser-sync');
    gulp.watch('src/scripts/*.coffee',['coffee', reload]);
    gulp.watch('src/stylesheets/*.sass',['compass', reload]);
    gulp.watch('src/bower_components/**/*.*',['components', reload]);
    gulp.watch('demo/index.jade', ['demo', reload]);
    gulp.watch('demo/mocks/*.json', ['demo', reload]);
    gulp.watch('demo/main.sass', ['demo', reload]);
    gulp.watch('demo/app.coffee', ['demo', reload]);
    gulp.watch('src/jade/*.jade', ['jade', reload]);
    gulp.watch('src/images/*.*', ['images', reload]);
});

gulp.task('default', ['server']);