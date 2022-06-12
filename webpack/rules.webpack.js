module.exports = [
    {
        test: /\.node$/,
        use: 'node-loader',
    },
    {
        test: /\.(m?js|node)$/,
        parser: {amd: false},
        use: {
            loader: '@marshallofsound/webpack-asset-relocator-loader',
            options: {
                outputAssetBase: 'native_modules',
            },
        },
    },
    {
        test: /\.m?js/,
        resolve: {
            fullySpecified: false,
        }
    },
    {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader'
        }
    },
    {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
            name: '[path][name].[ext]',
        },
    },
    {
        test: /\.s[ac]ss$/i,
        use: [
            { loader: "style-loader" },  // to inject the result into the DOM as a style block
            { loader: "css-modules-typescript-loader"},  // to generate a .d.ts module next to the .scss file (also requires a declaration.d.ts with "declare modules '*.scss';" in it to tell TypeScript that "import styles from './styles.scss';" means to load the module "./styles.scss.d.td")
            { loader: "css-loader", options: { modules: true } },  // to convert the resulting CSS to Javascript to be bundled (modules:true to rename CSS classes in output to cryptic identifiers, except if wrapped in a :global(...) pseudo class)
            { loader: "sass-loader" },  // to convert SASS to CSS
        ],
    },
    {
        test: /\.svg$/,
        use: [
            {
                loader: 'svg-url-loader',
                options: {
                    limit: 10000,
                },
            },
        ],
    },
    {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
    }
]