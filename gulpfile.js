// dependencies

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    uglifyJs = require('gulp-uglifyjs'),
    rename = require('gulp-rename'),
    stripNgLog = require('gulp-strip-ng-log'),
    angularFilesort = require('gulp-angular-filesort'),
    gutil = require('gulp-util'),
    bower = require('bower'),
    concatCss = require('gulp-concat-css'),
    minifyCss = require('gulp-minify-css'),
    sh = require('shelljs'),
    addsrc = require('gulp-add-src'),
    concat_json = require("gulp-concat-json"),
    extend = require('gulp-extend'),
    inject = require('gulp-inject'),
    gfi = require("gulp-file-insert"),
    ngAnnotate = require('gulp-ng-annotate'),
    plumber = require('gulp-plumber');

// configuration

var conf = {
    jsDistDir: './Resources/public/dist/js',
    jsFilesShared: [
        "Resources/public/components/autobahn/autobahn.js",
        "Resources/public/components/angular-wamp/release/angular-wamp.js",
        "Resources/public/components/underscore.string/dist/underscore.string.min.js",
        "Resources/public/modules/**/*.js"
    ],
    jsFiles: [],
    i18nDistDir: './Resources/public/dist/i18n',
    i18nFilesEn: [
        './Resources/public/modules/**/en.json'
    ],
    i18nFilesDe: [
        './Resources/public/modules/**/de.json'
    ],
    cssDistDir: './Resources/public/dist/css',
    contrib_css: [

    ]
};

// default task (executed when calling gulp without parameters)
gulp.task('default', ['i18n-en','i18n-de','bundle-js', 'contrib_css']);
gulp.task('prod', ['i18n-en','i18n-de','bundle-js','bundle-prod-js', 'contrib_css']);

// subtasks
gulp.task('bundle-js', function () {
    return build('bricks-custom-acme-demo-angularjs.js',conf.jsFilesShared.concat(conf.jsFiles),false);
});

gulp.task('bundle-prod-js', function () {
    return build('bricks-custom-acme-demo-angularjs.prod.js',conf.jsFilesShared.concat(conf.jsFiles),true);
});

// combine and minify css of contrib

gulp.task('contrib_css', function(done) {
    gulp.src(conf.contrib_css)
        .pipe(concatCss("contrib.css",{rebaseUrls:false}))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest(conf.cssDistDir))
        .on('end', done);
});

gulp.task('i18n-de', function () {
    return gulp.src(conf.i18nFilesDe)
        .pipe(plumber())
        .pipe(extend("de_dist.json"))
        .pipe(gulp.dest(conf.i18nDistDir));
});

gulp.task('i18n-en', function () {
    return gulp.src(conf.i18nFilesEn)
        .pipe(plumber())
        .pipe(extend("en_dist.json"))
        .pipe(gulp.dest(conf.i18nDistDir));
});

// watch task (executed when calling gulp watch)
gulp.task('watch', function() {
    gulp.watch(conf.i18nFilesDe,['i18n-de']);
    gulp.watch(conf.i18nFilesEn,['i18n-en']);
    gulp.watch(conf.jsFilesShared.concat(conf.jsFiles),['bundle-js']);
});

// helper functions
function build(fileName, files, prod) {
    prod = prod || false;

    if (prod) {
        return gulp.src(files)
            .pipe(plumber())
            .pipe(stripNgLog())
            .pipe(angularFilesort())
            .pipe(concat(fileName))
            .pipe(rename(function (path) {
                if (path.extname === '.js') {
                    path.basename += '.min';
                }
            }))
            .pipe(ngAnnotate({add: true}))
            .pipe(uglify({mangle: false}))
            .pipe(gulp.dest(conf.jsDistDir));
    }

    return gulp.src(files)
        .pipe(plumber())
        .pipe(angularFilesort())
        .pipe(concat(fileName))
        .pipe(gulp.dest(conf.jsDistDir));
}