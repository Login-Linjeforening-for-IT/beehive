const path = require('path')

module.exports = {
  //...
  watch: true,
  watchOptions: {
    aggregateTimeout: 600,
    poll: 1000,
    ignored: /node_modules/
  },
};
