module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json')
    }),
    jshint: {
        all: ['Gruntfile.js', 'app/**/*.js']
      }
}
