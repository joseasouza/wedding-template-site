const path = require('path');
var webpack = require('webpack');
var PROD = process.env.NODE_ENV == "production";
module.exports = [{
        entry: './src/js/appGiftList.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            publicPath: 'dist/',
            filename: PROD ? 'main.min.js' : 'main.js'
        },
        devtool: PROD ? '' : 'source-map',
        resolve: {
            alias: {
                "src": path.resolve("./src"),
                "Categories": path.resolve("src/js/Categories"),
                "CategoriesArray": path.resolve("src/js/CategoriesArray"),

            },
            modules: ["node_modules"]
        },
        plugins: PROD ? [
            new webpack.optimize.UglifyJsPlugin({
                compress: {warnings: false},
                output: {
                    comments: false
                }
            }),

            new webpack.ProvidePlugin({
                Categories: "Categories",
                CategoriesArray: "CategoriesArray",
            })

        ] : [
            new webpack.ProvidePlugin({
                Categories: "Categories",
                CategoriesArray: "CategoriesArray",
            })
        ],
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['es2015']
                    }
                }
            ]
        }
    },

    {
        entry: './admin/appAdmin.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            publicPath: 'dist/',
            filename: PROD ? 'admin.min.js' : 'admin.js'
        },
        devtool: PROD ? '' : 'source-map',
        resolve: {
            alias: {
                "src": path.resolve("./src"),
                "Categories": path.resolve("src/js/Categories"),
                "CategoriesArray": path.resolve("src/js/CategoriesArray"),

            },
            modules: ["node_modules"]
        },
        plugins: PROD ? [
            new webpack.optimize.UglifyJsPlugin({
                compress: {warnings: false},
                output: {
                    comments: false
                }
            }),

            new webpack.ProvidePlugin({
                Categories: "Categories",
                CategoriesArray: "CategoriesArray",
            })

        ] : [
            new webpack.ProvidePlugin({
                Categories: "Categories",
                CategoriesArray: "CategoriesArray",
            })
        ],
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['es2015']
                    }
                }
            ]
        }
    }

];