const Path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, options) => {
    return {
        entry : {
            blue : { import : './resources/blue.js', layer : 'blue' },
            gray : { import : './resources/gray.js', layer : 'gray' },
        },
        devtool : false,
        mode : 'development',
        module : {
            rules : [
                {
                    test : /\.js$/,
                    exclude : /node_modules/,
                    loader : 'babel-loader',
                    options : {
                        presets : ['@babel/preset-env'],
                    },
                },
                {
                    test : /\.css$/,
                    oneOf : [
                        {
                            issuerLayer: 'blue',
                            use : [
                                { loader : MiniCssExtractPlugin.loader },
                                { loader : 'css-loader', options : { url : false, sourceMap : false } },
                                { loader : 'postcss-loader', options : { sourceMap : false, postcssOptions : { plugins : [['postcss-custom-properties', { preserve : false, importFrom : { customProperties: { '--color': 'blue' } } }]] } } },
                            ],
                        },
                        {
                            issuerLayer: 'gray',
                            use : [
                                { loader : MiniCssExtractPlugin.loader },
                                { loader : 'css-loader', options : { url : false, sourceMap : false } },
                                { loader : 'postcss-loader', options : { sourceMap : false, postcssOptions : { plugins : [['postcss-custom-properties', { preserve : false, importFrom : { customProperties: { '--color': 'gray' } } }]] } } },
                            ],
                        },
                    ]
                },
            ],
        },
        output : {
            path : Path.resolve(__dirname, 'public'),
            filename : '[name].js',
        },
        plugins : [
            new MiniCssExtractPlugin({ filename : '[name].css' }),
        ],
        experiments: {
            layers : true,
        },
        stats : {
            assets : false,
            modules : false,
            entrypoints : false,
            hash : false,
            version : false,
            builtAt : false,
            colors : true,
        },
    };
};
