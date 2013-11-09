module.exports = function(grunt) {
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		concat: {
			scripts: {
				src: ['src/*/*.js', 'src/*.js'],
				dest: 'dist/<%= pkg.name %>-<%= pkg.version %>.js'
			}
		},

		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			dist: {
				files: {
					'dist/<%= pkg.name %>-<%= pkg.version %>.min.js': ['dist/<%= pkg.name %>-<%= pkg.version %>.js']
				}
			}
		},

		jasmine: {
			pivotal: {
				src: 'dist/<%= pkg.name %>-<%= pkg.version %>.js',
				options: {
					vendor: 'lib/*.js',
					keepRunner: true,
					specs: 'spec/*Spec.js', 
					'--web-security' : false,
					'--local-to-remote-url-access' : true,
					'--ignore-ssl-errors' : true
				}
			},

			coverage: {
				src: 'dist/<%= pkg.name %>-<%= pkg.version %>.js',
				options: {
					specs: 'spec/*Spec.js',
					vendor: 'lib/*.js',
					keepRunner: true,
					template: require('grunt-template-jasmine-istanbul'),
					templateOptions: {
						coverage: 'coverage/coverage.json',
						report: 'coverage',
						thresholds: {
							lines: 75,
							statements: 75,
							branches: 75,
							functions: 90
						}
					}
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.registerTask('default', ['concat', 'uglify', 'jasmine']);
};