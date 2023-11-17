// const path = require("path");
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const webpack = require('webpack');
import  webpack from 'webpack';
import  HtmlWebpackPlugin from "html-webpack-plugin";
import  path from "path";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";

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
            new HtmlWebpackPlugin({template: path.resolve(__dirname, 'public', 'index.html')}),
            new webpack.ProgressPlugin(),
            // new HtmlWebpackPlugin()
        ],
        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: ["style-loader", "css-loader"],
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