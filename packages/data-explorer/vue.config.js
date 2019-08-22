const webpack = require('webpack')

module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        Popper: ['popper.js', 'default']
      })
    ]
  },
  devServer: {
    // In CI mode, Safari cannot contact "localhost", so as a workaround, run the dev server using the jenkins agent pod dns instead.
    host: process.env.JENKINS_AGENT_NAME || 'localhost',
    proxy: process.env.NODE_ENV === 'production' ? undefined : {
      '^/api': {
        'target': 'https://data-v3.dev.molgenis.org',
        'keepOrigin': true
      },
      '^/css': {
        'target': 'https://data-v3.dev.molgenis.org',
        'keepOrigin': true
      },
      '^/fonts': {
        'target': 'https://data-v3.dev.molgenis.org',
        'keepOrigin': true
      },
      '^/img': {
        'target': 'https://data-v3.dev.molgenis.org',
        'keepOrigin': true
      },
      '^/app-ui-context': {
        'target': 'https://data-v3.dev.molgenis.org',
        'keepOrigin': true
      }
    }
  }
}
