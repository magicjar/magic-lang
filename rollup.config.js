import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'

export default {
    input: 'src/magic-lang.ts',
    output: [
        {
            file: 'dist/js/magic-lang.js',
            format: 'iife',
            name: 'MagicLang'
        }, {
            file: 'dist/js/magic-lang.min.js',
            format: 'iife',
            name: 'MagicLang',
            plugins: [terser()]
        }
    ],
    plugins: [
        typescript({
            typescript: require('typescript')
        })
    ]
}