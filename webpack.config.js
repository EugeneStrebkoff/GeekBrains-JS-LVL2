const path = require('path');

module.exports = {
    entry: "./js/main.js",
    output: {
        path: path.resolve(__dirname, 'public/js'),
        filename: 'main.js'
    },
    module: {
        rules: [{
                test: /\.js$/,
                use: ['babel-loader']
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    }
}