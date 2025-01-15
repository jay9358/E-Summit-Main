module.exports = {
  // ... other config settings
  resolve: {
    fallback: {
      "crypto": require.resolve("crypto-browserify"),
      "stream": require.resolve("stream-browserify"),
      "assert": require.resolve("assert"),
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "url": require.resolve("url"),
      "buffer": require.resolve("buffer"),
      "util": require.resolve("util"),
      "zlib": require.resolve("browserify-zlib")
    }
  },
  plugins: [
    // ... other plugins
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer']
    })
  ]
}; 