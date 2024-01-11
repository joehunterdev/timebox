let mix = require('laravel-mix');

mix.js('resources/js/App.jsx', 'public/js')
  .sass('resources/sass/app.scss', 'public/css').options({
    hmrOptions: {
      host: 'localhost',   
      port: 8080,
    },
  }).sourceMaps();

if (mix.inProduction()) {
  mix.copy('node_modules/@fortawesome/fontawesome-free/css/all.min.css', 'public/css');
  mix.copyDirectory('resources/fonts/titillium', 'public/fonts');
  mix.copyDirectory('resources/fonts/titillium', 'public/fonts');
}

mix.disableNotifications();
