// const path = require("path");
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const webpack = require('webpack');
import  webpack from 'webpack';
import  HtmlWebpackPlugin from "html-webpack-plugin";
import  path from "path";


export default(env: any) => {

    const config: webpack.Configuration = {

        mode: env.mode ?? 'development',
        entry: path.resolve(__dirname, 'src', 'index.ts'),
        output: {
            filename: '[name][contenthash].js',
            path: path.resolve(__dirname, 'build'),
            clean: true,
        },
        plugins: [
            new HtmlWebpackPlugin({template: path.resolve(__dirname, 'public', 'index.html')}),
            new webpack.ProgressPlugin(),
            // new HtmlWebpackPlugin()
        ],
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
    }
        return config;
    }