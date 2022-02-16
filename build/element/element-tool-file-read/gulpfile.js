const gulp = require("gulp");
const {src, series, parallel, dest, watch} = require("gulp");

const useref = require('gulp-useref');
const terser = require('gulp-terser');
const sourcemaps = require('gulp-sourcemaps');

const strip = require("gulp-strip-comments");
const removeLog = require("gulp-remove-logging");

const postcss = require("gulp-postcss");
const cssnano = require("cssnano");
const autoprefixer = require("autoprefixer");


//fonctions de copie de src vers dest
function concatJS(){
    return gulp.src("src/index.html")
    .pipe(useref())
    .pipe(gulp.dest("dest"))
}
function copyCSS(){
    return src('src/style/style.css')
    .pipe(gulp.dest('dest/style'));
}
function copyFont(){
    return src('src/style/font/*')
    .pipe(gulp.dest('dest/style/font'));
}
function copyImg(){
    return src('src/img/*')
    .pipe(gulp.dest('dest/img'));
}
function copyData(){
    return src('src/data/*')
    .pipe(gulp.dest('dest/data'));
}

//fonctions d'optimisations des fichiers finaux
function minimizeJS(){
    return gulp.src('dest/script.js')
    .pipe(strip())
    .pipe(removeLog())
    .pipe(terser())
    .pipe(gulp.dest('dest'));
}
function minimizeCSS(){
    return gulp.src('dest/style/style.css')
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(gulp.dest('dest/style'));
}

function watchTask(){
        //automatisation des fonctions : copyHTML, copyCSS et concatJS
        watch('src/style/style.css', copyCSS);
        watch('src/index.html', concatJS);
        watch('src/scripts/**/*', concatJS);
}

exports.default = parallel(series(concatJS, copyCSS, copyFont, copyImg, copyData), watchTask);
exports.copyBase = series(concatJS, copyCSS, copyData);
exports.copyContent = series(copyImg, copyFont);

exports.minimize = series(minimizeCSS, minimizeJS);
exports.minimizeJS = minimizeJS;
exports.minimizeCSS = minimizeCSS;


