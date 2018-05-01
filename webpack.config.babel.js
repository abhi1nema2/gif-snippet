
import webpack from 'webpack';
import path from 'path';
import  ExtractTextPlugin from'extract-text-webpack-plugin';
const BUILD_DIR = path.resolve(__dirname, 'public');
const APP_DIR = path.resolve(__dirname, 'src');

const config = {
	entry: ['babel-polyfill', './index.js', './src/components/app.scss'],
	output: {
		path: BUILD_DIR,
		filename: 'bundle.js'
	},
	resolve: {
		// This is so that you don't have to write the file extension while importing it.
		// Instead of import HomeComponent from './HomeComponent.jsx'
		// you can do import HomeComponent from './HomeComponent'
		extensions: ['*', '.js', '.jsx','.json']
	},
	module : {
		loaders : [
			{
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ["babel-polyfill", "es2015", "es2017", "stage-0", "react"],
          },
        },
      },
			{
				test: /\.scss$/,
				include: APP_DIR,
				loader: ExtractTextPlugin.extract({ use: ['css-loader', 'sass-loader'] })
			}
		]
	},
	plugins: [
		new ExtractTextPlugin({
		  filename: 'gif-bundle.css',
		  allChunks: true,
		}),
	],
};

module.exports = config;
