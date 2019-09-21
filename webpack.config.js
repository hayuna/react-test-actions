const path = require('path');
const glob = require('glob');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const SafeParser = require('postcss-safe-parser');
const CompressionPlugin = require('compression-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

const getOptions = (env = {}) => ({
    src: path.resolve(__dirname, 'src'),
    dist: path.resolve(__dirname, 'dist'),
    public: path.resolve(__dirname, 'public'),
    entry: path.resolve(__dirname, 'src', 'main.tsx'),
    publicPath: '/',
    https: env.HTTPS || false,
    host: env.HOST || '0.0.0.0',
    port: env.PORT || 3000
});

const getStyleLoaders = isDevEnv => {
    if(isDevEnv) {
        return {
            test: /\.(sa|sc|c)ss$/,
            use: ['style-loader', 'css-loader', 'sass-loader']
        };
    }

    return {
        test: /\.(sa|sc|c)ss$/,
        use: [
            MiniCssExtractPlugin.loader, 
            {
                loader: 'css-loader',
                options: {
                    importLoaders: 1,
                    sourceMap: false
                }
            },
            {
                loader: 'postcss-loader',
                options: {
                    indent: 'postcss',
                    plugins: () => [
                        require('postcss-flexbugs-fixes'),
                        require('postcss-preset-env')({
                            autoprefixer: {
                                flexbox: 'no-2009'
                            },
                            stage: 3
                        })
                    ],
                    sourceMap: false
                }
            },
            {
                loader: 'sass-loader',
                options: {
                    sourceMap: false
                }
            }
        ]
    }
};

module.exports = (env, argv) => {
    const envName = argv.mode;
    const isDevEnv = envName === 'development';
    const options = getOptions(env);

    const config = {
        mode: isDevEnv ? 'development' : 'production',
        entry: options.entry,
        ouput: {
            filename: `static/js/[name]${isDevEnv ? '' : '.[contenthash:8]'}.js`,
            chunkFilename: `static/js/[name]${isDevEnv ? '' : '.[contenthash:8]'}.chunk.js`,
            path: options.dist,
            pathinfo: isDevEnv,
            publicPath: options.publicPath
        },
        module: {
            strictExportPresence: true,
            rules: [
                {
                    parser: {
                        requireEnsure: false
                    }
                },
                {
                    enforce: 'pre',
                    exclude: /node_modules/,
                    include: /src/,
                    test: /\.(j|t)sx?$/,
                    loader: 'eslint-loader'
                },
                {
                    oneOf: [
                        {
                            exclude: /node_modules/,
                            include: /src/,
                            test: /\.(j|t)sx?$/,
                            use: {
                                loader: 'babel-loader',
                                options: {
                                    envName
                                }
                            }
                        },
                        getStyleLoaders(isDevEnv),
                        {
                            test: /\.(bmp|git|jpe?g|png|svg)$/,
                            use: {
                                loader: 'url-loader',
                                options: {
                                    limit: 10000,
                                    name: 'static/media/[name].[contenthash:8].[ext]'
                                }
                            }
                        },
                        {
                            exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
                            use: {
                                loader: 'file-loader',
                                options: {
                                    name: 'static/media/[name].[contenthash:8].[ext]'
                                }
                            }
                        }
                    ]
                }
            ]
        },
        resolve: {
            modules: ['node_modules', 'src'],
            extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
        },
        target: 'web',
        bail: true,
        cache: true,
        plugins: [
            !isDevEnv && new CleanWebpackPlugin(),
            new webpack.ProgressPlugin(),
            new HtmlWebpackPlugin({
                inject: true,
                template: './public/index.html',
                baseUrl: options.publicPath,
                minify: isDevEnv 
                    ? false
                    : {
                        removeComments: true,
                        collapseWhitespace: true,
                        removeRedundantAttributes: true,
                        useShortDoctype: true,
                        removeEmptyAttributes: true,
                        removeStyleLinkTypeAttributes: true,
                        keepClosingSlash: true,
                        minifyJS: true,
                        minifyCSS: true,
                        minifyURLs: true
                    }
            }),
            new Dotenv({
                path: `./.nev.${envName}`,
                safe: true,
                systemvars: true,
                silent: true,
                defaults: './.env'
            }),
            !isDevEnv && new CopyPlugin([
                {
                    from: options.public,
                    to: options.dist,
                    ignore: ['index.html']
                }
            ]),
            new MiniCssExtractPlugin({
                filename: `static/css/[name]${isDevEnv ? '' : '.[contenthash:8]'}.css`,
                chunkFilename: `static/css/[name]${isDevEnv ? '' : '.[contenthash:8]'}.chunk.css`
            }),
            new PurgecssPlugin({
                paths: glob.sync(`${options.src}/**/*`, { nodir: true })
            }),
            isDevEnv && new webpack.NamedModulesPlugin(),
            isDevEnv && new webpack.HotModuleReplacementPlugin(),
            isDevEnv && new CaseSensitivePathsPlugin() ,
            isDevEnv && new BundleAnalyzerPlugin(),
            !isDevEnv && new CompressionPlugin({
                filename: '[path].gz[query]',
                algorithm: 'gzip',
                test: /\.(js|css|html)$/,
                threshold: 10240,
                minRatio: 0.99
            }),
            !isDevEnv && new BrotliPlugin({
                asset: '[path].br[query]',
                test: /\.(js|css|html)$/,
                threshold: 10240,
                minRatio: 0.99
            }),
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
            !isDevEnv && new WorkboxPlugin.GenerateSW({
                clientsClaim: true,
                exclude: [/\.map$/, /\.gz$/],
                importWorkboxFrom: 'cdn',
                navigateFallback: '/index.html',
                navigateFallbackBlacklist: [new Regex('^/_'), new Regex('/[^/]+\\.[^/]+$')],
                swDest: 'service-worker.js',
                skipWaiting: true,
                precacheManifestFilename: 'precache-manifest.[manifestHash].js'
            })
        ].filter(Boolean),
        stats: {
            color: true,
            errors: true,
            modules: false
        },
        persormance: false,
        optimization: {
            removeAvailableModules: true,
            removeEmptyChunks: true,
            mergeDuplicateChunks: true,
            minimize: !isDevEnv,
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        parse: {
                            ecma: 8
                        },
                        compress: {
                            ecma: 5,
                            warnings: false,
                            comparisons: false,
                            inline: 2
                        },
                        mangle: {
                            safari10: true
                        },
                        output: {
                            ecma: 5,
                            comments: false,
                            ascii_only: true
                        }
                    },
                    parallel: true,
                    cache: true,
                    sourceMap: false
                }),
                new OptimizeCssAssetsPlugin({
                    cssProcessorOptions: {
                        parser: SafeParser,
                        map: false,
                        discardComments: {
                            removeAll: true
                        }
                    }
                })
            ],
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /[\\\/]node_modules[\\\/]/,
                        name: 'vendors',
                        chunks: 'all',
                        reuseExistingChunk: true
                    }
                }
            },
            runtimeChunk: 'single'
        },
        node: {
            node: 'empty',
            module: 'empty',
            dgram: 'empty',
            dns: 'mock',
            fs: 'empty',
            http2: 'empty',
            net: 'empty',
            tls: 'empty',
            child_process: 'empty'
        }
    };

    if(isDevEnv) {
        config.devtool = 'cheap-module-source-map';
        config.output.devtoolModuleFilenameTemplate = info => 
            path.resolve(info.absoluteResourcePath).replace(/\\/g, '/');
        config.devServer = {
            compress: true,
            contentBase: options.src,
            disableHostCheck: true,
            https: options.https,
            host: options.highlightCode,
            hot: true,
            inline: true,
            open: true,
            overlay: true,
            port: options.port,
            public: `http://localhost:${options.port}`,
            publicPath: options.publicPath,
            stats: {
                colors: true,
                errors: true,
                modules: false
            },
            useLocalIp: true,
            watchContentBase: false 
        };
    }

    return config;
};