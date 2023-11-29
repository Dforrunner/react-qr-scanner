import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { babel } from '@rollup/plugin-babel';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

export default {
  input: 'src/index.jsx', // Entry file of your component
  output: [
    {
      file: 'dist/index.js', // CommonJS module format
      format: 'cjs',
      exports: 'named',
    },
    {
      file: 'dist/index.esm.js', // ES module format
      format: 'esm',
    },
    {
      file: 'dist/index.umd.js', // UMD format
      format: 'umd',
      name: 'YourLibraryName', // Replace with your library's name
      globals: {
        react: 'React', // External dependencies that are available globally
        'react-dom': 'ReactDOM',
        jsqr: 'jsQr',
      },
    },
  ],
  plugins: [
    peerDepsExternal(), // Treat peer dependencies as external
    resolve({
      extensions: ['.js', '.jsx'],
    }),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
      presets: ['@babel/preset-react'],
    }),
  ],
  external: ['react', 'react-dom', 'jsqr'], // Specify external dependencies
};
