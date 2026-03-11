const path = require('path');
// const { ContainerPlugin } = require('webpack').container;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'root-config.js',
        libraryTarget: 'system',
        publicPath: '/',
    },
     module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react'],
                },
            },
        },]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
            inject: false
          }),
          new CopyWebpackPlugin({
            patterns: [
              { from: 'node_modules/systemjs/dist/system.js', to: 'system.js' }
            ]
          })
        // new ContainerPlugin({
        //     name: 'root',
        //     filename: 'remote-entry.js',
        //     exposes: {},
        //     remotes: {},
        //     shared: {
        //         react: { singleton: true },
        //         'react-dom': { singleton: true }
        //     }
        // }),
    ],
    devServer:{
        port: 8081,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
        },
        historyApiFallback: true,
        static: {
            directory: path.join(__dirname, 'public')
        }
    }
};