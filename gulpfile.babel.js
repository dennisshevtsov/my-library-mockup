import { src, dest, watch, } from 'gulp';
import sass from 'gulp-sass';

const scssDir = './scss';
const cssDir = './css';

const scssMask = `${scssDir}/*.scss`;
const stylesMask = `${scssDir}/styles.scss`;

const buildScss = () => src(stylesMask).
                        pipe(sass().on('error', sass.logError)).
                        pipe(dest(cssDir));

const watchScss = () => watch(scssMask, buildScss);

exports.default = buildScss;
exports.watch = watchScss;
