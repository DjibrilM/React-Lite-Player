const resolve = require('@rollup/plugin-node-resolve');
const typescript = require('@rollup/plugin-typescript');
const commonjs = require('@rollup/plugin-commonjs')
const { dts } = require('rollup-plugin-dts');
const packageJson = require('./package.json');
const postcss = require('rollup-plugin-postcss');
const external = require('rollup-plugin-peer-deps-external')
const eslint = require("@rollup/plugin-eslint");
const svg = require("rollup-plugin-svg")


module.exports = [
    {
        input: './src/index.ts',
        output: [
            {
                file: packageJson.main,
                format: "cjs",
                sourcemap: true
            },
            {
                file: packageJson.module,
                format: "esm",
                sourcemap: true
            }
        ],
        plugins: [
            external(),
            svg(),
            resolve(),
            typescript({ tsconfig: './tsconfig.json' }),
            commonjs(),
            postcss(),
            eslint({
                include: ['src/**/*.js', 'src/**/*.jsx', 'src/**/*.tsx'], // Include React and JS files
                exclude: ['node_modules/**'], // Exclude node_modules
                throwOnError: true, // Throw errors during build if ESLint finds issues
                throwOnWarning: false, // Optionally throw warnings as errors
            })
        ],
        external: ["react", "react-dom"],
    },

    {
        input: 'dist/esm/types/index.d.ts',
        output: [{ file: 'dist/index.d.ts', format: 'esm' }],
        plugins: [dts()],
        external: [/\.css$/]
    }
]