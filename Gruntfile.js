module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      stylus: {
        files: ['public/stylesheets/*.styl'],
        tasks: ['stylus']
      }
    },

    stylus: {
      compile: {
        files: {
          'public/stylesheets/app.css': ['public/stylesheets/*.styl']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['stylus', 'watch']);

  grunt.event.on('watch', function(action, filepath, target) {
    grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
  });
};