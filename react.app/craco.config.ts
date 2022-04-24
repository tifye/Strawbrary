import path from 'path';

const config = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  devServer: {
    port: 3001,
    static: {
      watch: {
        ignored: '*.txt',
        usePolling: true,
      },
    },
  },
};

export default config;
