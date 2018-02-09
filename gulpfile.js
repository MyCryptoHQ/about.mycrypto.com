'use strict'

// packages
const autoprefixer       = require( 'gulp-autoprefixer'       )
const clean              = require( 'gulp-clean'              )
const concat             = require( 'gulp-concat'             )
const cssnano            = require( 'gulp-cssnano'            )
const file               = require( 'gulp-file'               )
const fs                 = require( 'fs'                      )
const gulp               = require( 'gulp'                    )
const notify             = require( 'gulp-notify'             )
const plumber            = require( 'gulp-plumber'            )
const rename             = require( 'gulp-rename'             )
const runSequence        = require( 'run-sequence'            )
const sass               = require( 'gulp-sass'               )
const uglify             = require( 'gulp-uglify'             )
const sitemap            = require( 'gulp-sitemap'            )

// custom variables
const srcFolder          = 'src/'
const dstFolder          = 'dist/'
const img_srcFolder      = srcFolder + 'images/'
const style_srcFolder    = srcFolder + 'styles/'
const scripts_srcFolder  = srcFolder + 'scripts/'


// Error / Success Handling
let onError = function(err) {
  notify.onError({
       title: "Error: " + err.plugin,
    subtitle: "<%= file.relative %>",
    message:  "<%= error.message %>",
      sound:  "Beep",
       icon:  "logo/logo.png",
  })( err )
  console.log( err.toString() )
  this.emit( 'end' )
}

function onSuccess(msg) {
  return {
    message: msg + " Complete! ",
       icon: "logo/logo.png",
     onLast: true
  }
}

function notifyFunc(msg) {
  return gulp.src( '.', { read: false } )
    .pipe( notify( onSuccess( msg ) ) )
}


// Copy
gulp.task('copy', function() {
    gulp.src( img_srcFolder + '**/*/' )
      .pipe(gulp.dest( dstFolder + 'images/' ))

    gulp.src( srcFolder + '**/*.html' )
      .pipe(gulp.dest( dstFolder ))

    return gulp.src( srcFolder + 'styleguide.html' )
      .pipe(gulp.dest( dstFolder ))

    .pipe(notify(onSuccess( 'Copy' )))
})


// styles: Compile and Minify style / CSS Files
const style_srcFile  = 'about-master.scss'
const style_destFile = 'about-master.min.css'

gulp.task('styles', function() {
  return gulp.src( style_srcFolder + style_srcFile )

    .pipe(      plumber({ errorHandler: onError                                       }) )
    .pipe(         sass(                                                               ) )
    .pipe( autoprefixer({     browsers: ['last 4 versions', 'iOS > 7'], remove: false }) )
    .pipe(      cssnano({ autoprefixer: false, safe: true                             }) )
    .pipe(       rename(                style_destFile                                )  )

    .pipe( gulp.dest( dstFolder ) )
})


// Rebuild JS
const scripts_destFile = 'about-master.min.js'

gulp.task( 'scripts', function() {
  return gulp.src( scripts_srcFolder + '**/*.js' )
    .pipe( plumber({ errorHandler: onError }))
    .pipe(  concat(  scripts_destFile      ) )
    .pipe(  uglify(                        ) )
    .pipe( gulp.dest( dstFolder ) )
})


gulp.task( 'watch_js',       function() { gulp.watch(scripts_srcFolder + '**/*.js',   ['scripts']) })

gulp.task( 'watch_styles',   function() { gulp.watch(style_srcFolder   + '**/*.scss', ['styles']) })

gulp.task( 'watch_content',  function() { gulp.watch(srcFolder + '**/*.html', ['copy']) })

gulp.task( 'watch',   ['watch_js', 'watch_styles', 'watch_content'] )

gulp.task( 'build',   ['scripts', 'styles', 'copy'] )

gulp.task( 'default', ['build', 'watch'] )
