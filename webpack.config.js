const path = require('path');
module.exports = {
    mode: 'production',
    entry: './public/javascripts/index.js',
    output: {
        path: path.resolve('public/dist'),
        filename: 'bundle.js'
    },
    watch: true,
    module: {
        rules: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
        ],
    }
}