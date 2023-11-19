// const path = require("path");
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const webpack = require('webpack');
import  webpack from 'webpack';
import  HtmlWebpackPlugin from "html-webpack-plugin";
import  path from "path";

import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {buildWebpack} from "./config/build/buildWebpack";
import {BuildMode, BuildPaths} from "./config/build/types/types";



interface EnvVariables {
    mode: BuildMode,
    port: number,
}

export default(env: EnvVariables) => {
    const paths: BuildPaths = {
        output: path.resolve(__dirname,'build'),
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        html: path.resolve(__dirname, 'public', 'index.html'),

    }
    const config: webpack.Configuration = buildWebpack({
        port: env.port ?? 3000,
        mode: env.mode ?? 'development',
        paths,


    })
    return config;
    }