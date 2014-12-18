module.exports = function(grunt) {

    var PROJ_ROOT  = __dirname;
    var PROJ_JS    = PROJ_ROOT + '/static/js';
    var PROJ_SCSS  = PROJ_ROOT + '/static/scss';
    var PROJ_LIBS  = PROJ_ROOT + '/static/bower_components';
    var BUILD_ROOT = PROJ_ROOT + '/build';
    var BUILD_JS   = BUILD_ROOT + '/static/js';
    var BUILD_CSS  = BUILD_ROOT + '/static/css';
    var BUILD_IMG  = BUILD_ROOT + '/static/img';

    var pkg = grunt.file.readJSON('package.json');
    var pkgDependencies = Object.keys(pkg.dependencies).map(function(val) {
        return 'node_modules/' + val + '/**';
    });

    grunt.initConfig({

        // Define the app's package.json file.
        pkg: pkg,

        // Tasks to run concurrently (speeds up build process).
        concurrent: {
            build: [
                'copy',
                'uglify:libs',
                'compass',
                'browserify'
            ]
        },

        // Delete the /build directory.
        clean: [BUILD_ROOT],

        // Copy everything into /build. The tasks are broken out
        // so we can re-run later through our watch tasks.
        copy: {
            appDependencies: {
                expand: true,
                cwd: PROJ_ROOT,
                src: pkgDependencies,
                dest: BUILD_ROOT
            },
            app: {
                expand: true,
                cwd: PROJ_ROOT,
                src: ['index.js', 'src/**', 'config/**'],
                dest: BUILD_ROOT
            },
            views: {
                expand: true,
                cwd: PROJ_ROOT,
                src: ['views/**'],
                dest: BUILD_ROOT
            },
            images: {
                expand: true,
                cwd: PROJ_ROOT,
                src: ['static/img/**'],
                dest: BUILD_ROOT
            }
        },

        // Third-party JavaScript libraries are treated the same way.
        // Once they've been munged they can be tossed in build and never
        // looked at again.
        uglify: {
            libs: {
                src: [
                    PROJ_LIBS + '/modernizr/modernizr.js',
                    PROJ_LIBS + '/jquery/dist/jquery.js',
                    // PROJ_LIBS + '/angular/angular.min.js',
                    // PROJ_LIBS + '/jquery.cookie/jquery.cookie.js',
                    // PROJ_LIBS + '/jquery-placeholder/jquery.placeholder.js',
                    // PROJ_LIBS + '/fastclick/lib/fastclick.js',
                    PROJ_LIBS + '/foundation/js/foundation.js'
                ],
                dest: BUILD_JS + '/libs.min.js'
            }
        },

        // The project's own SCSS files are the ones we really care
        // about. We'll run this task any time a .scss file is saved.
        compass: {
            source: {
                options: {
                    sassDir: PROJ_SCSS,
                    cssDir: BUILD_CSS,
                    outputStyle: 'compressed',
                    noLineComments: true,
                }
            }
        },

        // Ditto for the project's own JS files. Here we're using 
        // browserify to take advantage of the CommonJS module syntax.
        browserify: {
            source: {
                src: PROJ_JS + '/**/*.js',
                dest: BUILD_JS + '/scripts.min.js'
            }
        },

        // Watch for changes to src files and run the relevant
        // build commands. Only livereload when /build changes.
        watch: {
            app: {
                files: [
                    PROJ_ROOT + '/index.js',
                    PROJ_ROOT + '/src/**/*.js',
                    PROJ_ROOT + '/config/**/*'
                ],
                tasks: ['copy:app', 'express:dev'],
                options: {
                    spawn: false
                }
            },
            views: {
                files: [PROJ_ROOT + '/views/**/*.handlebars'],
                tasks: ['copy:views']
            },
            images: {
                files: [PROJ_ROOT + '/static/img/**'],
                tasks: ['copy:images']
            },
            scss: {
                files: [PROJ_SCSS + '/**/*.scss'],
                tasks: ['compass']
            },
            js: {
                files: [PROJ_JS + '/**/*.js'],
                tasks: ['browserify']
            },
            livereload: {
                options: { livereload: true },
                files: [
                    BUILD_ROOT + '/index.js',
                    BUILD_ROOT + '/static/**/*',
                    BUILD_ROOT + '/src/**/*',
                    BUILD_ROOT + '/views/**/*',
                    BUILD_ROOT + '/config/**/*'
                ]
            }
        },

        // Run the server from /build.
        express: {
            dev: {
                options: {
                    script: BUILD_ROOT + '/index.js',
                    port: 8080,
                    debug: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-express-server');

    grunt.registerTask('default', [
        'clean',
        'build',
        'run'
    ])

    grunt.registerTask('build', [
        'concurrent:build'
    ]);

    grunt.registerTask('run', [
        'express:dev', 'watch'
    ]);
};