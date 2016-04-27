var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require("webpack");
var dist_dir = __dirname + '/dist';

module.exports = [
    {
        entry: {
            app: [
                './src/index.jade',
                './src/scripts/index.tsx',
                './src/styles/loader.js',
                'webpack/hot/dev-server'
            ]
        },
        output: {
            path: dist_dir + '/scripts',
            publicPath: '/scripts/',
            filename: "app.js"
        },
        module: {
            loaders: [
                { test: /\.jade$/, loader: "jade-loader" },
                { test: /\.tsx?$/, loader: "ts-loader" },
                { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader') },
                { test: /\.scss$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader') },
            ]
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new ExtractTextPlugin('app.css')
        ]
    }, {
        entry: {
            styles: './src/styles/loader.js'
        },
        output: {
            path: dist_dir + '/styles',
            publicPath: '/styles/',
            filename: 'app.css'
        },
        module: {
            loaders: [
                { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader') },
                { test: /\.scss$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader') },
            ]
        },
        plugins: [
            new ExtractTextPlugin('app.css')
        ]
    }];
