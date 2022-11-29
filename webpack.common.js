/* eslint-disable prefer-destructuring */
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminWebpackPlugin = require('imagemin-webpack-plugin').default;
const ImageminMozjpeg = require('imagemin-mozjpeg');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const WebpackPwaManifest = require('webpack-pwa-manifest');

module.exports = {
    entry: {
        app: path.resolve(__dirname, 'src/scripts/index.js'),
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 20000,
            maxSize: 70000,
            minChunks: 1,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            automaticNameDelimiter: '~',
            enforceSizeThreshold: 50000,
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
            },
        },
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [{
                loader: 'style-loader',
            },
            {
                loader: 'css-loader',
            },
            ],
        }],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, 'src/templates/index.html'),
        }),
        new CopyWebpackPlugin({
            patterns: [{
                from: path.resolve(__dirname, 'src/public'),
                to: path.resolve(__dirname, 'dist'),
                globOptions: {
                    // CopyWebpackPlugin mengabaikan berkas yang berada di dalam folder images
                    ignore: ['**/images/**'],
                },
            }],
        }),
        new WorkboxWebpackPlugin.GenerateSW({
            swDest: 'sw.js',
            clientsClaim: true,
            skipWaiting: true,
        }),
        new ImageminWebpackPlugin({
            plugins: [
                ImageminMozjpeg({
                    quality: 40,
                    progressive: true,
                }),
            ],
        }),
        new BundleAnalyzerPlugin(),
        new WebpackPwaManifest({
            name: 'My Progressive Web App',
            short_name: 'MyPWA',
            description: 'My awesome Progressive Web App!',
            background_color: '#ffffff',
            crossorigin: '', // can be null, use-credentials or anonymous
            icons: [{
                src: path.resolve('src/public/icons/icons8-circled-s-24.png'),
                size: '24x24', // you can also use the specifications pattern
            },
            {
                src: path.resolve('src/public/icons/icons8-circled-s-96.png'),
                size: '96x96', // you can also use the specifications pattern
            },
            {
                src: path.resolve('src/public/icons/s.png'),
                size: '512x512',
            },
            ],
        }),
    ],
};
