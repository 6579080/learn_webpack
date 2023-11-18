// const path = require("path");
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const webpack = require('webpack');
import  webpack from 'webpack';
import  HtmlWebpackPlugin from "html-webpack-plugin";
import  path from "path";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

type Mode = 'production' | 'development';

interface EnvVariables {
    mode: Mode
    port: number
}

export default(env: EnvVariables) => {

    const isDev = env.mode === 'development';

    const config: webpack.Configuration = {



        mode: env.mode ?? 'development',
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        output: {
            filename: '[name][contenthash].js',
            path: path.resolve(__dirname, 'build'),
            clean: true,
        },
        plugins: [
            isDev && new MiniCssExtractPlugin({
                filename: 'css/[name][contenthash:8].css',
                chunkFilename: 'css/[name][contenthash:8].css',
                }
            ),
            new HtmlWebpackPlugin({template: path.resolve(__dirname, 'public', 'index.html')}),
            new webpack.ProgressPlugin(),
            // new HtmlWebpackPlugin()
        ].filter(Boolean),
        module: {
            rules: [
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        // Creates `style` nodes from JS strings
                        isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                        // Translates CSS into CommonJS
                        "css-loader",
                        // Compiles Sass to CSS
                        "sass-loader",
                    ],
                },
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
        devtool: isDev ? 'inline-source-map' : false,
        devServer: isDev ? {
            port: env.port ?? 3000,
            open: true,
        } : undefined,
    }
        return config;
    }