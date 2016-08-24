// stryker.conf.js
module.exports = function(config){
  config.set({
    files: [
        // Add your files here, this is just an example:
        { pattern: 'lib/**/**/*.js', mutated: true, included: false},
        { pattern: 'lib/**/*.js', mutated: true, included: false},
        { pattern: 'lib/*.js', mutated: true, included: false},
        'test/**/*.js',
        'test/**/**/*.js'
    ],
    testRunner: 'mocha',
    testFramework: 'mocha',
    reporter: ['html', 'progress']
  });
}
