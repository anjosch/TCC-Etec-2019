// O gulp é um script Node, a grosso modo, então tu acesso aos módulos node do NPM
var gulp = require('gulp')
  , browserify = require('browserify')
  , babelify = require('babelify')
  , source = require('vinyl-source-stream')
  , stylus = require('gulp-stylus')
  , concat = require('gulp-concat')
  , webserver = require('gulp-webserver')
  , opn = require('opn')
  ;

// Aqui eu estou declarando os caminhos para os diretórios e arquivos da aplicação que estou desenvolvendo
var path = {
  // O arquivo principal da aplicação, usado pelo browserify para gerar o APPLICATION_FILE
  ENTRY_POINT: './beer/js/index.jsx',
  // Diretório de distribuição do JS
  DEST_SRC: 'dist/js/',
  // o nome do arquivo de output onde ficarão todo o Javascript
  APPLICATION_FILE: 'bundle.js',
  
  // Diretório de distribuição
  DEST_INDEX: 'dist/',
  // Onde está o arquivo index.html de desenvolvimento
  INDEX: 'beer/index.html',
  
  // Diretório onde se encontram os arquivos stylus
  STYLUS: 'beer/stylus/**/*.styl',
  // Diretório de distribuição dos estilos
  DEST_CSS: 'dist/css/',
  // Nome do arquivo gerado, no final, para distribuição
  CSS_FILE: 'beer.css',
}

/**
 * Task para processar o React. Roda o Browserify e o Babel (ES6 to ES5) e
 * salva o resultado no arquivo 'bundle.js' dentro de dist/js
 */
gulp.task('react', function() {
  browserify({
    entries: path.ENTRY_POINT,
    extensions: ['jsx'],
    debug: true
  })
  .transform(babelify)
  .bundle()
  .pipe(source(path.APPLICATION_FILE))
  .pipe(gulp.dest(path.DEST_SRC));
});

/**
 * Tarefa para processar os arquivos stylus para css e salvá-los no diretório de distruição
 */
gulp.task('stylus', function() {
  gulp.src(path.STYLUS)
    .pipe(stylus({
      compress: true
    }))
    .pipe(concat(path.CSS_FILE))
    .pipe(gulp.dest(path.DEST_CSS));
});

// Simplesmente joga o index na pasta de distruibuição
gulp.task('html', function() {
  return gulp.src(path.INDEX)
    .pipe(gulp.dest(path.DEST_INDEX));
});

// A task de build consiste em rodar react, html e stylus
gulp.task('build', ['react', 'html', 'stylus']);

/**
 * Serve um servidor local para o código de distruição
 */
gulp.task('serve', function() {
  gulp.src('dist/')
    .pipe(webserver({
      host: 'localhost',
      port: '3001',
      livereload: true,
      directoryListing: false
    }));
});

// Task para abrir uma aba nova no browser
gulp.task('open', function() {
  opn('http://localhost:3001')
});

/**
 * Task para desenvolvimento. Faz o build, cria o servidor e abre a página no browser.
 * A cada mudança nos JSX ou nos Stylus, rodam-se suas respectivas tarefas e atualiza a página no browser
 */
gulp.task('develop', ['build', 'serve', 'open'], function() {
  gulp.watch('beer/js/**/*.jsx', ['react']);
  gulp.watch(path.STYLUS, ['stylus']);
})

// A tarefa padrão
gulp.task('default', ['build']);
