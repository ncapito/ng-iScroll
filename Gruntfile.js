/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['Gruntfile.js', 'src/ng-iscroll.js']
    },
    connect: {
        options: {
            port: 9000,
            livereload: 35729,
            // Change this to '0.0.0.0' to access the server from outside
            hostname: 'localhost',
        },
        demo:{
          options:{
            livereload:true,
            open: {
              target: 'http://localhost:9000/demo/demo.html'
            }
          }
        }
    },
    watch:{
        all: {
              files: [ 'demo/**/*', 'src/**/*.js','!src/ng-iscroll.min.js'],
              options: { livereload: true },
              tasks:['jshint','uglify']
        }
    },
    concurrent: {
      all: [ 'watch'],
      options: {
        logConcurrentOutput: true
      }
    },
    uglify: {
      options: {
        // the banner is inserted at the top of the output
        banner:'/*!\n*  <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %> ' +
          '<%= pkg.website ? ("* " + pkg.website ) : "" %>' +
          '\n*  Author <%= pkg.author %> \n*  Original Author: <%= pkg.originalAuthor %>' +
          '\n*  License <%= pkg.license.type %>\n' +
          '\n<%= pkg.license.details %>*/\n',
        mangle: true
      },
      target: {
        files: {
          'src/ng-iscroll.min.js': ['src/ng-iscroll.js']
        }
      }
    }

  });

  // load Plugins
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-livereload');
  grunt.loadNpmTasks('grunt-contrib-connect');

  // Register tasks.
  grunt.registerTask('default', ['jshint','uglify']);

grunt.registerTask('demo', ['jshint', 'uglify', 'connect', 'concurrent']);

};
