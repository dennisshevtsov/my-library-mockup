import { src, dest, watch, series, } from 'gulp';
import sass from 'gulp-sass';

const scssDir = './scss';
const cssDir = './css';
const fontsSourceDir = './node_modules/@fortawesome/fontawesome-free/webfonts';
const fontsDestDir = './webfonts';

const scssMask = `${scssDir}/*.scss`;
const stylesMask = `${scssDir}/styles.scss`;
const fontsMask = `${fontsSourceDir}/*`;

const buildScss = () => src(stylesMask).
                        pipe(sass().on('error', sass.logError)).
                        pipe(dest(cssDir));

const watchScss = () => watch(scssMask, buildScss);

const copyFonts = () => src(fontsMask).
                        pipe(dest(fontsDestDir));

exports.default = series(buildScss, copyFonts);
exports.watch = watchScss;
exports.copyFonts = copyFonts;
