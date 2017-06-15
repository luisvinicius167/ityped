import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';

const production = process.env.NODE_ENV === 'production';

export default {
  entry: 'src/ityped.js',
  dest: `dist/ityped${production ? '.min' : ''}.js`,
  format: 'umd',
  moduleName: 'ityped',
  sourceMap: true,
  banner: `/**
  * @name ityped
  * @description Dead simple Animated Typing with no dependencies
  * @author Luis Vinícius
  * @email luis@uilabs.me
  */`,
  plugins: [
    babel()
  ]
    .concat(production ? [
      uglify()
    ] : [])
}
