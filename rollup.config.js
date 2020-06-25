export default {
    input: 'src/js/magic-lang.js',
    output: [
        {
            file: 'dist/js/cjs/magic-lang.js',
            format: 'cjs',
            name: 'MagicLang'
        }, {
            file: 'dist/js/esm/magic-lang.mjs',
            format: 'es',
            name: 'MagicLang'
        }, {
            file: 'dist/js/umd/magic-lang.js',
            format: 'umd',
            name: 'MagicLang'
        }
    ],
    plugins: [
    ]
}