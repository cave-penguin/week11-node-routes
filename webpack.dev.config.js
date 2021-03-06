const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

const config = {
    entry: './client/main.jsx',
    mode: 'development',
    output: {
        filename: 'js/[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    devServer: {
        hot: true,
        open: true,
        static: {
            directory: path.join(__dirname, 'dist')
        },
        port: 8087,
        proxy: {
            context: ['/api'],
            target: `http://localhost:${process.env.PORT || 8090}`
            // ws: true
        },
        host: 'localhost',
        historyApiFallback: true,
        client: {
            overlay: {
                errors: true,
                warnings: false
            }
        }
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    {
                        loader: MiniCSSExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        }
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new ESLintPlugin({
            extensions: ['js', 'jsx'],
            exclude: 'node_modules'
        }),
        new MiniCSSExtractPlugin({
            filename: 'css/main.css'
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: `${__dirname}/client/index.html`,
                    to: 'index.html'
                }
            ]
        })
    ]
}

module.exports = config
