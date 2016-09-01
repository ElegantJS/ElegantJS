var webpack = require('webpack');

module.exports = {
    entry: './src/index.jsx',
    output: {
        path:'./dist',
        publicPath: "./",
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ["", ".js", ".jsx"]
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel', // 'babel-loader' is also a legal name to reference
            query: {
                presets: ['es2015','react']
            }
        },
        {
                test: /\.s?css$/,
                loaders: [
                    "style",
                    "css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]",
                    "postcss"
                ]
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png)\w*/,
                loader:'file-loader?name=fonts/[hash].[ext]'
            }
        ]
    }
};