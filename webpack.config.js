const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry : {
        bankapp : ['./app/entry/app-entry.js']
    },
    output : {
        path :  path.resolve(__dirname, 'static/js'),
        filename : '[name].js'
    },
    module : {
        rules : [
            {
                test : [/\.js$/, /\.jsx$/],
                loader : 'eslint-loader',
                enforce : 'pre',
                exclude : /node_modules/
            },
            {
                test : [/\.js$/, /\.jsx$/],
                loader : 'babel-loader',
                options : {
                    cacheDirectory : true,
                    babelrc : false,
                    presets : ['react', [ 'es2015', {'modules' : false }], 'stage-2']
                },
                exclude : /node_modules/
            }
        ]
    },
    resolve : {
        extensions : ['.js', '.jsx'],
        modules : [__dirname, 'node_modules']
    },
    plugins : [
        new webpack.optimize.CommonsChunkPlugin({
            name : 'vendor',
            minChunks: ({resource}) => /node_modules/.test(resource)
        })
    ]
};
