var gulp            = require('gulp'),
// this is an arbitrary object that loads all gulp plugins in package.json.
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
            baseDir: "./"
        }
    });
});

gulp.task('coffee', function() {
    return gulp.src('src/scripts/*.coffee')
        .pipe($.plumber())
        .pipe(coffeelint())
        .pipe(coffeelint.reporter())
        .pipe($.coffee({bare: true}).on('error', $.util.log))
        .pipe(gulp.dest('./scripts'))
        .pipe(browserSync.reload({stream: true}))
        .pipe($.livereload( server ));
});

gulp.task('compass', function() {
    return gulp.src('./src/stylesheets/*.sass')
        .pipe($.plumber())
        .pipe(browserSync.reload({stream: true}))
        .pipe($.compass({
            css: './stylesheets',
            sass: 'src/stylesheets'
        }))
        .pipe(gulp.dest('./stylesheets'))
        .pipe($.livereload( server ));;
});

gulp.task('demo', function() {
    var jadeDemo = gulp.src('demo/index.jade')
        .pipe($.plumber())
        .pipe($.jade({
            pretty: true
        }))
        .pipe(gulp.dest('./'))
        .pipe(browserSync.reload({stream: true}));
    var sassDemo = gulp.src('demo/main.sass')
        .pipe($.plumber())
        .pipe($.compass({
            css: './',
            sass: 'demo'
        }))
        .pipe(gulp.dest('./'))
        .pipe(browserSync.reload({stream: true}))
        .pipe( $.livereload( server ) );
    var coffeeDemo = gulp.src('demo/app.coffee')
        .pipe($.plumber())
        .pipe(coffeelint())
        .pipe(coffeelint.reporter())
        .pipe($.coffee({bare: true}).on('error', $.util.log))
        .pipe(gulp.dest('./'))
        .pipe(browserSync.reload({stream: true}))
        .pipe( $.livereload( server ) );
    var imagesDemo = gulp.src('demo/images/*.*')
        .pipe($.plumber())
        .pipe(gulp.dest('./images'))
        .pipe(browserSync.reload({stream: true}))
        .pipe( $.livereload( server ) );
    var mocksDemo = gulp.src('demo/mocks/*.json')
        .pipe($.plumber())
        .pipe(gulp.dest('./mocks'))
        .pipe(browserSync.reload({stream: true}))
        .pipe( $.livereload( server ) );
    return merge(jadeDemo, sassDemo, coffeeDemo, imagesDemo, mocksDemo)

});

gulp.task('jade', function () {
    var testJade = gulp.src('src/jade/*.jade')
        .pipe($.plumber())
        .pipe($.jade({
            pretty: true
        })).pipe( gulp.dest('./bower_components/dmk-carousel/templates/'))
        .pipe(browserSync.reload({stream: true}))
        .pipe( $.livereload( server ) );
    var jadeComponent = gulp.src('src/jade/*.jade')
        .pipe($.plumber())
        .pipe($.jade({
            pretty: true
        })).pipe( gulp.dest('templates/'))
        .pipe(browserSync.reload({stream: true}))
        .pipe( $.livereload( server ) );
    return merge(testJade, jadeComponent)
});

gulp.task('build', ['coffee', 'compass', 'demo', 'jade']);

gulp.task('server', function (callback) {
    runSequence('build','browser-sync');
    gulp.watch('src/scripts/*.coffee',['coffee', reload]);
    gulp.watch('src/stylesheets/*.sass',['compass', reload])
    gulp.watch('src/stylesheets/*.sass',['demo', reload]);
    gulp.watch('demo/**/*.*', ['demo', reload]);
    gulp.watch('src/jade/*.jade', ['jade', reload]);
});

gulp.task('default', ['server']);