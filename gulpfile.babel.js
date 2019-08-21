import { src, dest, watch, series, } from 'gulp';
import sass from 'gulp-sass';
import clean from 'gulp-clean-css';
import concat from 'gulp-concat';
import del from 'del';

const stylesFileName = 'styles';

const cssDir = './css';
const sassDir = './sass';
const fontsDir = './node_modules/@fortawesome/fontawesome-free/webfonts';

const cssMask = [`${cssDir}/reset.css`, `${cssDir}/${stylesFileName}.css`];
const sassMask = `${sassDir}/*.scss`;
const sassStylesMask = `${sassDir}/${stylesFileName}.scss`;
const fontsMask = `${fontsDir}/fa-solid-900.woff2`;

const buildDir = './build';
const buildCssDir = `${buildDir}/css`;
const buildCssFile = `${stylesFileName}.css`;
const buildFontsDir = `${buildDir}/fonts`;

const buildSass = () => src(sassStylesMask).
                        pipe(sass().on('error', sass.logError)).
                        pipe(dest(cssDir));

const copyFonts = () => src(fontsMask).
                        pipe(dest(buildFontsDir));

const buildCss = () => src(cssMask).
                       pipe(concat(buildCssFile)).
                       pipe(clean()).
                       pipe(dest(buildCssDir));

const cleanBuild = () => del(buildDir);

const build = () => series(cleanBuild, buildSass, buildCss, copyFonts);
const watchSass = () => watch(sassMask, build());

exports.buildSass = buildSass;
exports.watchSass = watchSass;
exports.copyFonts = copyFonts;
exports.buildCss = buildCss;
exports.default = series(cleanBuild, buildSass, buildCss, copyFonts);
