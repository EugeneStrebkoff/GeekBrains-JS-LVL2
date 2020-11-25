const path = require('path');

module.exports = {
    entry: "./js/main.js",
    output: {
        path: path.resolve(__dirname, 'public/js'),
        filename: 'main.js'
    },
    watch: true,
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    { loader: 'babel-loader' },
                ]
            }
        ]
    }
}