import { src, dest, } from 'gulp';
import sass from 'gulp-sass';

const scssDir = './scss';
const cssDir = './css';

const scssMask = `${scssDir}/styles.scss`;

const buildScss = () => src(scssMask).
                        pipe(sass().on('error', sass.logError)).
                        pipe(dest(cssDir));

exports.default = buildScss;
