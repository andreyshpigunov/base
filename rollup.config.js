import json from '@rollup/plugin-json';
import {terser} from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import babel from 'rollup-plugin-babel';

export default {
  input: 'src/js/base.js',
  output: [
//    {
//      file: 'js/base.js',
//      format: 'iife',
//      name: 'Base'
//    },
    {
      file: 'js/base.js',
      format: 'iife',
      name: 'Base',
      plugins: [
        terser()
      ]
    }
  ],
  plugins: [ 
    json(),
    resolve(),
    babel({
      exclude: 'node_modules/**' // only transpile our source code
    })
  ]
};