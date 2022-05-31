import fileInclude from 'gulp-file-include'         // соединяет файлы между собой
import webpHtmlNosvg from 'gulp-webp-html-nosvg'    // подключение форматов webp
import htmlMin from 'gulp-htmlmin'
// import versionNumber from 'gulp-version-number'     // решает проблему с кешированием
// import pug from 'gulp-pug'                          // работа с pug, нужно закоменить .pipe(fileInclude())

export const html = () => {
  return app.gulp.src(app.path.src.html)
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: 'HTML',
        message: 'Error: <%= error.message %>'
      })
    ))
    .pipe(fileInclude())
    // .pipe(pug({
    //   pretty:true,
    //   verbose:true,
    // }))
    .pipe(app.plugins.replace(/@img\//g, 'img/'))
    .pipe(app.plugins.if(app.isBuild, webpHtmlNosvg()))
    // .pipe(app.plugins.if(app.isBuild, versionNumber({
    //   'value': '%DT%',
    //   'append': {
    //     'key': '_v',
    //     'cover': 0,
    //     'to': ['css', 'js'],
    //   },
    //   'output': {
    //     'file': 'gulp/version.json'
    //   }
    // })))
    .pipe(app.plugins.if(app.isBuild, htmlMin({
      collapseWhitespace: true
    })))
    .pipe(app.gulp.dest(app.path.build.html))
    .pipe(app.plugins.browserSync.stream())
}
