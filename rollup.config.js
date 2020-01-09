// import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

module.exports = {
    input: 'index.js',
    output: {
        file: 'build/index.js',
        format: 'umd',
        name: 'SearchParams'
    },
    plugins: [
        // resolve(),
        babel({
            exclude: 'node_modules/**' // 只编译我们的源代码
        })
    ]
};