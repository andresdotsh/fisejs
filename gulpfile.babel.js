import gulp from 'gulp';
import eslint from 'gulp-eslint';
import concat from 'gulp-concat';
import cleanCss from 'gulp-clean-css';
import uglify from 'gulp-uglify';
import pump from 'pump';

// minify js task
gulp.task('minjs', (cb) => {
  pump([
    gulp.src('src/assets-dev/js/rv-file-server.js'),
    concat('rv-file-server.min.js'),
    uglify(),
    gulp.dest('src/assets-dev/js')
  ],
  cb);
});

// css task
gulp.task('css', (cb) => {
  pump([
    gulp.src([
      'src/assets-dev/css/bootstrap.min.css',
      'src/assets-dev/css/font-awesome.min.css',
      'src/assets-dev/css/rv-file-server.css'
    ]),
    concat('styles.min.css'),
    cleanCss({
      advanced: false,
      aggressiveMerging: false
    }),
    gulp.dest('src/assets/css')
  ],
  cb);
});

// js task
gulp.task('js', (cb) => {
  pump([
    gulp.src([
      'src/assets-dev/js/jquery.min.js',
      'src/assets-dev/js/bootstrap.min.js',
      'src/assets-dev/js/bootbox.min.js',
      'src/assets-dev/js/rv-file-server.min.js'
    ]),
    concat('scripts.min.js'),
    gulp.dest('src/assets/js')
  ],
  cb);
});

// linter task
gulp.task('eslint', () => {
  gulp
    .src([
      'src/*.js',
      'src/assets-dev/js/rv-file-server.js',
      'src/controllers/*.js',
      'src/routes/*.js'
    ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});
