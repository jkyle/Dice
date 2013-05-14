
require.config({
  paths: {
    zepto: '../components/zepto/zepto',
    lodash: '../components/lodash/dist/lodash'
  },

  shim: {
    zepto: {
      exports: '$'
    }
  }
});
