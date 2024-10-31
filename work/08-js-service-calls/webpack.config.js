const path = require('path');
module.exports = {
    mode: 'development',
    entry: './src/app.js',
    devtool: 'source-map',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'public'),
    },
    devServer: {
        static: path.join(__dirname, 'public'),
        compress: true,
        port: 8000
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: { presets: ['@babel/preset-env'] },
                }
            }
        ],
    },
};