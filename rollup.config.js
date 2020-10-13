import path from 'path'
import commonjs from 'rollup-plugin-commonjs'
import ts from 'rollup-plugin-typescript2'
import buble from 'rollup-plugin-buble'
import resolve from 'rollup-plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'

const tsPlugin = ts({
  check: process.env.NODE_ENV === 'production',
  tsconfig: path.resolve(__dirname, 'tsconfig.json'),
  tsconfigOverride: {
    compilerOptions: {
      declaration: true,
      declarationMap: false,
    },
  },
})

export default {
  input: 'src/index.tsx',
  external: ['@vue/runtime-core'],
  output: {
    name: 'VueResizeObserver',
    file: path.resolve(__dirname, './dist/index.js'),
    format: 'es',
  },
  plugins: [
    tsPlugin,
    resolve(),
    commonjs(),
    buble({
      objectAssign: 'Object.assign',
    }),
    terser(),
  ],
}
