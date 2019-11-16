const path = require('path')
const rootPath = path.resolve(__dirname, '../src')

module.exports = ({ config }) => {
	config.module.rules.push({
    test: /\.scss$/,
    sideEffects: true,
		use: [
			'vue-style-loader',
			'css-loader',
			{
				loader: 'sass-loader',
				options: {
					prependData: `@import "@/assets/scss/imports";
					`
				}
			}
		],
	})

	config.module.rules.push({
    test: /\.ts$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
          transpileOnly: true
        },
      }
    ],
	})

	config.resolve.alias['@'] = rootPath
	config.resolve.alias['~'] = rootPath

	return config
}
