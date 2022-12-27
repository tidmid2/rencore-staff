const path = require('path')
const nodeExternals = require('webpack-node-externals')
const Dotenv = require('dotenv-webpack');

module.exports = {
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    entry: "./server.js",
    output: {
            filename: '[name].js',
            path: path.resolve(__dirname, 'build_server'), // Все компилируем в папку server
    },
    target: 'node', 
    externals: [nodeExternals()],
    plugins: [
        new Dotenv({
			path: path.resolve(__dirname, `.env`)
		}),
    ]
    // plugins: [
    //     new NodemonPlugin({
    //         watch: path.resolve(__dirname, './dist'),
    //     })
    // ]

}