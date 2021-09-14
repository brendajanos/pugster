module.exports = {
  mongodbMemoryServerOptions: {
    binary: {
      version: '4.4.8',
      skipMD5: true
    },
    autoStart: false,
    instance: {
      dbName: 'pugster'
    }
  },
};