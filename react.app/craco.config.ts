import path from 'path';

const config = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    resolve: {
      fallback: {
        url: require.resolve('url/')
      },
    },
  },
  devServer: {
    port: Number(process.env.REACT_APP_WEBPACK_DEV_PORT) || 3001,
    static: {
      watch: {
        ignored: '*.txt',
        usePolling: true,
      },
    },
  },
};

export default config;
