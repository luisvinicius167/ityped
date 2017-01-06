module.exports = function (grunt) {
  require('time-grunt')(grunt);
  grunt.initConfig({
    babel: {
      options: {
        sourceMap: true,
        presets: ['babel-preset-es2015-script'],
        plugins: ["transform-object-assign"]
      },
      dist: {
        files: {
          'dist/ityped.js': 'src/ityped.js'
        }
      }
    },
    uglify: {
      my_target: {
        files: {
          'dist/ityped.min.js': ['dist/ityped.js']
        }
      },
    },
    watch: {
      scripts: {
        files: 'src/**/*.js', tasks: ['babel', 'uglify']
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-babel');
  grunt.registerTask('build', ['babel']);
  grunt.registerTask('default', ['babel', 'uglify']);
}