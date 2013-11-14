module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    coffee: {
      compile: {
        files: {
          "dist/<%= pkg.name %>-<%= pkg.version %>.js": ["src/logger.coffee", "src/common.coffee", "src/*/*.coffee"],
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
      coverage: {
        src: 'dist/<%= pkg.name %>-<%= pkg.version %>.js',
        options: {
          specs: 'spec/js/specs.js',
          vendor: 'lib/*.js',
          keepRunner: true,
          template: require('grunt-template-jasmine-istanbul'),
          templateOptions: {
            coverage: 'coverage/coverage.json',
            report: 'coverage',
            thresholds: {
              lines: 5,
              statements: 5,
              branches: 5,
              functions: 5
            }
          }
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