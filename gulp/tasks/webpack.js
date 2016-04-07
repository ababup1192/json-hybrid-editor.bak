var gulp = require('gulp');
var gutil = require('gulp-util')
var config = require('../config');
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");


gulp.task('webpack-dev-server', function() {
    var webpackConfig = require('../../webpack.config.js');
    var compiler = webpack(webpackConfig);

    new WebpackDevServer(compiler, {
        contentBase: "./dist/",
        hot: true,
        stats: {
            colors: true
        }
    }).listen(8080, "localhost", function(err) {
        if (err) throw new gutil.PluginError("webpack-dev-server", err);
        setTimeout(function() {
            gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/");
        }, 4000);
    });
});
