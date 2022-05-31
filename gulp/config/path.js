import * as nodePath from 'path'
const rootFolder = nodePath.basename(nodePath.resolve()) // Получим имя корневой папки проекта
const buildFolder = './dist'
const srcFolder = './src'

export const path = {
  build: {
    js: `${buildFolder}/js/`,
    css: `${buildFolder}/css/`,
    html: `${buildFolder}/`,
    images: `${buildFolder}/img/`,
    fonts: `${buildFolder}/fonts/`,
    files: `${buildFolder}/files/`,
  },
  src: {
    js: `${srcFolder}/js/index.js`,
    scss: `${srcFolder}/scss/style.scss`,
    html: `${srcFolder}/*.html`,         // интересуют файлы html в папке с исходниками
    images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`,
    svg: `${srcFolder}/img/**/*.svg`,
    svgicons: `${srcFolder}/svgicons/*.svg`,
    files: `${srcFolder}/files/**/*.*`,  // интересуют абсолютно все файлы в ./src/files/
  },
  watch: {
    js: `${srcFolder}/js/**/*.js`,
    scss: `${srcFolder}/scss/**/*.scss`,
    html: `${srcFolder}/**/*.html`,     // интересуют файлы html в папке с исходниками и в других подпапках src
    images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp,svg,ico}`,
    files: `${srcFolder}/files/**/*.*`, // слежка за любыми файлами в папке с исходниками
  },
  clean: buildFolder,
  buildFolder: buildFolder, // папка с результатом
  srcFolder: srcFolder,     // папка с исходниками
  rootFolder: rootFolder,   // корневая папка проекта
  ftp: `test`,                  // папка на удаленном сервере
}
