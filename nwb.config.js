module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: false
  },
  karma: {
    extra: {
      client: {
        mocha: {
          timeout: 100000
        }
      },
    }
  }
}