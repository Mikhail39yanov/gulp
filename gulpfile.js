import gulp from 'gulp'                           // Основной модуль
import { path } from './gulp/config/path.js'      // Импорт путей
import { plugins } from './gulp/config/plugins.js'// Импорт общих плагинов

// Передаем значения в глобальную переменную
global.app = {
  isBuild: process.argv.includes('--build'),
  isDev: !process.argv.includes('--build'),
  path: path,
  gulp: gulp,
  plugins: plugins,
}

// Импорт задач
import { copy } from './gulp/tasks/copy.js'
import { reset } from './gulp/tasks/reset.js'
import { server } from './gulp/tasks/server.js'
import { html } from './gulp/tasks/html.js'
import { scss } from './gulp/tasks/scss.js'
import { scripts } from './gulp/tasks/scripts.js'
import { images } from './gulp/tasks/images.js'
import { svgSprite } from './gulp/tasks/svgSprite.js'
import { otfToTtf, ttfToWoff, fontsStyle } from './gulp/tasks/fonts.js'
// import { zip } from './gulp/tasks/zip.js'
// import { ftp } from './gulp/tasks/ftp.js'

// Наблюдатель за изменениями в файлах
function watcher() {
  gulp.watch(path.watch.files, copy)
  gulp.watch(path.watch.html, html)
  gulp.watch(path.watch.scss, scss)
  gulp.watch(path.watch.js, scripts)
  gulp.watch(path.watch.images, images)
}

// Обработка шрифтов
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle)

// Основные задачи
const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, scss, scripts, images))

// Построение сценариев выполнения задач
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server))
const build = gulp.series(reset, mainTasks)
// const deployZip = gulp.series(reset, mainTasks, zip)
// const deployFtp = gulp.series(reset, mainTasks, ftp)

// Экспорт сценариев
export { dev }
export { build }
export { svgSprite }
// export { deployZip }
// export { deployFtp }

// Cценарий по умолчанию
gulp.task('default', dev)

// Такой момент.. Если в gulpfile.js добавить  const { task, watch, parallel, series, src, dest } = gulp  и указать их в global.arg = {  path,  task, watch,  parallel, series, src,  dest,}? то везде вместо например  app.gulp.parallel  писать  app.parallel  . Хотя это на любителя, мне норм.
