// Karma configuration
// Generated on Thu Jul 21 2016 19:27:12 GMT-0300 (Hora oficial do Brasil)

module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'tests/karma-utils.js',
      // bower:js
      "bower_components/jquery/dist/jquery.js",
      "bower_components/angular/angular.js",
      "bower_components/angular-mocks/angular-mocks.js",
      "bower_components/angular-cookies/angular-cookies.js",
      "bower_components/angular-touch/angular-touch.js",
      "bower_components/angular-sanitize/angular-sanitize.js",
      "bower_components/angular-messages/angular-messages.js",
      "bower_components/angular-aria/angular-aria.js",
      "bower_components/angular-ui-router/release/angular-ui-router.js",
      "bower_components/bootstrap/dist/js/bootstrap.js",
      "bower_components/bootstrap/dist/css/bootstrap.css",
      "bower_components/angular-bootstrap/ui-bootstrap-tpls.js",
      "bower_components/malarkey/dist/malarkey.min.js",
      "bower_components/angular-toastr/dist/angular-toastr.tpls.js",
      "bower_components/angular-toastr/dist/angular-toastr.css",
      "bower_components/moment/moment.js",
      "bower_components/animate.css/animate.css",
      "bower_components/ui-select/dist/select.js",
      "bower_components/ui-select/dist/select.css",
      "bower_components/angular-local-storage/dist/angular-local-storage.js",
      "bower_components/components-font-awesome/css/font-awesome.css",
      "bower_components/angular-responsive-tables/release/angular-responsive-tables.js",
      "bower_components/angular-responsive-tables/release/angular-responsive-tables.css",
      "bower_components/angular-bootstrap-contextmenu/contextMenu.js",
      "bower_components/ng-lodash/build/ng-lodash.js",
      "bower_components/angular-md5/angular-md5.js",
      "bower_components/angular-tooltips/dist/angular-tooltips.min.js",
      "bower_components/angular-tooltips/dist/angular-tooltips.min.css",
      "bower_components/angular-animate/angular-animate.js",
      // endinject

      // inject:js
      "src/app/index.module.js",
      "src/app/index.config.js",
      "src/app/index.constants.js",
      "src/app/index.route.js",
      "src/app/index.run.js",
      "src/app/common/common.module.js",
      "src/app/components/components.module.js",
      "src/app/view/view.module.js",
      "src/app/common/directive/common-directive.module.js",
      "src/app/common/factory/common-factory.module.js",
      "src/app/common/service/common-service.module.js",
      "src/app/components/layout/layout.module.js",
      "src/app/view/credential/credential.module.js",
      "src/app/view/main/main.module.js",
      "src/app/view/credential/authentication/authentication.module.js",
      "src/app/components/layout/layout.service.js",
      "src/app/common/service/configuration/configuration.service.js",
      "src/app/common/service/credential/credential.service.js",
      "src/app/common/service/state/state.service.js",
      "src/app/common/service/user/user.service.js",
      "src/app/common/factory/credential/credential.factory.js",
      "src/app/common/factory/prototype/prototype.factory.js",
      "src/app/common/factory/user/user.factory.js",
      "src/app/common/factory/video/video.factory.js",
      "src/app/view/credential/credential.route.js",
      "src/app/view/main/main.controller.js",
      "src/app/common/directive/dctv-video-list/dctv-video-list.directive.js",
      "src/app/components/layout/layout-header/layout-header.controller.js",
      "src/app/components/layout/layout-left/layout-left.controller.js",
      "src/app/components/layout/layout-right/layout-right.controller.js",
      "src/app/view/credential/authentication/authentication.controller.js",
      "src/app/view/credential/authentication/authentication.route.js",
      // endinject

      // spec:js
      "tests/dctv-video-list.directive.controller.spec.js",
      // endinject


      "src/app/**/*.tpl.html"
    ],

    // list of files to exclude
    exclude: [],


    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-ng-html2js-preprocessor',
      'karma-chrome-launcher',
    ],


    preprocessors: {
      "src/app/**/*.tpl.html": ["ng-html2js"]
    },

    ngHtml2JsPreprocessor: {
      // If your build process changes the path to your templates,
      // use stripPrefix and prependPrefix to adjust it.
      stripPrefix: "src/",

      // the name of the Angular module to create
      moduleName: "my.templates"
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
