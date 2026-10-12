const browser = process.env.KARMA_BROWSER || 'FirefoxHeadless'

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    plugins: [
      require('karma-jasmine'),
      require('karma-firefox-launcher'),
      require('karma-chrome-launcher'),
      require('karma-webpack'),
      require('karma-sourcemap-loader'),
    ],
    files: [{ pattern: 'test/**/*.test.js', watched: false }],
    preprocessors: {
      'test/**/*.test.js': ['webpack', 'sourcemap'],
    },
    webpack: {
      mode: 'development',
      devtool: 'inline-source-map',
      resolve: {
        extensions: ['.js', '.jsx'],
      },
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-env', { modules: false }],
                  ['@babel/preset-react', { runtime: 'automatic' }],
                ],
              },
            },
          },
        ],
      },
    },
    webpackMiddleware: {
      stats: 'errors-only',
    },
    customLaunchers: {
      BraveHeadless: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
      },
    },
    browsers: [browser],
    reporters: ['progress'],
    client: {
      clearContext: false,
    },
    singleRun: true,
    browserNoActivityTimeout: 120000,
  })
}
