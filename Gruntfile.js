module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    coffee: {
      compile: {
        files: {
          "dist/<%= pkg.name %>-<%= pkg.version %>.js": ["src/logger.coffee", "src/*/*.coffee"],
          'spec/js/specs.js' : ['spec/loggerSpec.coffee', 'spec/*AppenderSpec.coffee']
        }
      }
    },

    uglify: {
      options: {
        banner: "/*! <%= pkg.name %> <%= grunt.template.today('dd-mm-yyyy') %> */\n"
      },
      dist: {
        files: {
          "dist/<%= pkg.name %>-<%= pkg.version %>.min.js" : ["dist/<%= pkg.name %>-<%= pkg.version %>.js"]
        }
      }
    },

    jasmine: {
      pivotal: {
        src: 'dist/<%= pkg.name %>-<%= pkg.version %>.js',
        options: {
          vendor: 'lib/*.js',
          keepRunner: true,
          specs: 'spec/js/specs.js',
          '--web-security' : false,
          '--local-to-remote-url-access' : true,
          '--ignore-ssl-errors' : true
        }
      }
    }

  });

  grunt.loadNpmTasks("grunt-contrib-coffee");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  
  grunt.registerTask("test", ["jasmine"]);
  grunt.registerTask("default", ["coffee", "uglify", "jasmine"]);
};