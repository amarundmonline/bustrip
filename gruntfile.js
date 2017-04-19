module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json')
        , copy: {
            t1: {
                src: "public/**"
                , dest: "server/"
            }
            , t2: {
                src: "public/*"
                , dest: "server/"
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.registerTask('default', 'copy:t1');
}