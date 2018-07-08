const gulp = require('gulp')
const rev = require('gulp-rev') // 文件添加版本号，根据内容生成hash
const revReplace = require('gulp-rev-replace') // 修改html下引用
const useref = require('gulp-useref') // 在html下，通过注释表示合并文件
const filter = require('gulp-filter') // 文件筛选，恢复
const uglify = require('gulp-uglify')
const csso = require('gulp-csso')

gulp.task('default',function() {
    const jsFilter = filter('**/*.js', {restore: true})
    const cssFilter = filter('**/*.css', {restore: true})
    const indexHtmlFilter = filter(['**/*','!**/index.html'], {restore: true})
    return gulp.src('src/index.html')
        .pipe(useref())
        .pipe(jsFilter)
        .pipe(uglify())
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        .pipe(csso())
        .pipe(cssFilter.restore)
        .pipe(indexHtmlFilter)
        .pipe(rev())
        .pipe(indexHtmlFilter.restore)
        .pipe(revReplace())
        .pipe(gulp.dest('dist'))
})