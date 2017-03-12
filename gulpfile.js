var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    gulpts = require('gulp-typescript'),
    mocha = require('gulp-mocha'),
    browserify = require('gulp-browserify');
    
//create a tsproject varible for running task buildsrc
var tsProjectSrc = gulpts.createProject('tsconfig.json');


//buildsrc ts files with typescript
gulp.task('buildsrc', function() {
    
  var tsResult = gulp.src('src/app/**/*.ts')
        .pipe(tsProjectSrc());
    return tsResult.js.pipe( gulp.dest('build/') )
//    .on('end',function () { gulp.start('rununittest'); });
});


//watch src files and run buildsrc task
gulp.task('watchsrc', ['buildsrc'], function() {
    gulp.watch('./src/app/**/*.ts', ['buildsrc']);
    
});

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}
//run unit tests with mocha
gulp.task('rununittest',['buildsrc'], function() {
    
    return gulp.src(['src/test/**/*.spec.js'], { read: false })
        .pipe(mocha({ reporter: 'list' }))
        .on('error', handleError);
        
});

//watch unit js files and run rununittest
gulp.task('watchtest_unit', ['rununittest'], function() {
    gulp.watch('src/test/**/*.spec.js', ['rununittest']);
    
});
//watch output image.js for browserify
gulp.task('watch_output', ['buildsrc'], function() {
   // gulp.watch('build/image.js', ['runbrowserify']);
    
});

gulp.task('runbrowserify', function() {
    // Single entry point to browserify 
    gulp.src('build/image.js')
        .pipe(browserify({
          insertGlobals : true,
          debug : !gulp.env.production
        }))
        .pipe(gulp.dest('./build/browserify'))
});


//default tasks
gulp.task('default',['watchsrc','watchtest_unit','watch_output']);