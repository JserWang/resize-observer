import path from 'path'
import commonjs from 'rollup-plugin-commonjs';
import ts from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'

const tsPlugin = ts({
  check: process.env.NODE_ENV === 'production',
  tsconfig: path.resolve(__dirname, 'tsconfig.json'),
  tsconfigOverride: {
    compilerOptions: {
      declaration: true,
      declarationMap: false
    }
  }
})

export default {
  input: 'src/index.tsx',
  external: ['vue'],
  output: {
    file: path.resolve(__dirname, './dist/index.js'),
    format: 'cjs'
  },
  plugins: [
    commonjs(),
    tsPlugin,
    terser()
  ]
}
