const path = require("path");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	mode: "development",
	entry: {
		index: "./src/js/index.js",
	},
	devtool: "inline-source-map",
	devServer: {
		static: "./dist",
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/index.html",
		}),
		new MiniCssExtractPlugin(),
		new FaviconsWebpackPlugin("./src/img/favicon.png"),
	],
	output: {
		filename: "[name].js",
		path: path.resolve(__dirname, "dist"),
		clean: true,
	},
	module: {
		rules: [
			{
				test: /\.html$/i,
				loader: "html-loader",
			},
			{
				test: /\.(s(a|c)ss)$/i,
				use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
			},
			{
				test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
				type: "asset/resource",
				generator: {
					filename: "assets/[name][ext][query]",
				},
			},
		],
	},
	optimization: {
		runtimeChunk: "single",
		minimizer: [new CssMinimizerPlugin()],
	},
};
