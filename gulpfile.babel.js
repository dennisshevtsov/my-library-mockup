import { src, dest, watch, series, } from 'gulp';
import sass from 'gulp-sass';
import clean from 'gulp-clean-css';
import concat from 'gulp-concat';

const cssDirName = 'css';
const fontDirName = 'fonts';

const scssDir = './scss';
const cssDir = `./${cssDirName}`;
const fontsSourceDir = './node_modules/@fortawesome/fontawesome-free/webfonts';
const fontsDestDir = `./${fontDirName}`;

const prodDir = './prod';
const prodCssDir = `${prodDir}/${cssDirName}`;
const prodFontDir = `${prodDir}/${fontDirName}`;
const prodCssFileName = 'styles.css';

const scssMask = `${scssDir}/*.scss`;
const cssMask = `${cssDir}/*.css`;
const stylesMask = `${scssDir}/styles.scss`;
const fontsMask = `${fontsSourceDir}/fa-solid-900.woff2`;

const buildScss = () => src(stylesMask).
                        pipe(sass().on('error', sass.logError)).
                        pipe(dest(cssDir));

const watchScss = () => watch(scssMask, buildScss);

const copyFonts = () => src(fontsMask).
                        pipe(dest(fontsDestDir));

const buildCssProd = () => src(cssMask).
                           pipe(concat(prodCssFileName)).
                           pipe(clean()).
                           pipe(dest(prodCssDir));

const copyFontsProd = () => src(fontsMask).
                            pipe(dest(prodFontDir));

exports.default = series(buildScss, copyFonts);
exports.watch = watchScss;
exports.copyFonts = copyFonts;

exports.buildCssProd = buildCssProd;
exports.copyFontsProd = copyFontsProd;
exports.buildProd = series(buildCssProd, copyFontsProd);
