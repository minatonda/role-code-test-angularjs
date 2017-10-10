describe('video list directive', function () {


  var $element;
  var $scope;
  var $httpBackend;
  var $compile;
  var deferredResolution;
  var lodash;

  var videos = [
    {
      "_id": "5790d561e906f42c2f848adb",
      "name": "[0] Getting Started With ReactJs",
      "description": "React.js is a JavaScript library for building user interfaces. - Just the UI: Lots of people use React as the V in MVC. Since React makes no assumptions about the rest of your technology stack, its easy to try it out on a small feature in an existing project. - Virtual DOM: React uses a virtual DOM diff implementation for ultra-high performance. It can also render on the server using Node.js — no heavy browser DOM required. - Data flow: React implements one-way reactive data flow which reduces boilerplate and is easier to reason about than traditional data binding.",
      "url": "videos/Getting_Started_With_React.js.mp4",
      "__v": 4,
      "ratings": [1, 5, 5, 4, 3, 4, 2, 5, 5, 5, 5, 5]
    }, {
      "_id": "5790d561e906f42c2f848adc",
      "name": "[1] Google Cardboard Assembly",
      "description": "Google Cardboard Assembly Step by Step Instructions [HD]",
      "url": "videos/Google_Cardboard_Assembly.mp4",
      "__v": 12,
      "ratings": [4, 5, 5, 5, 3, 5, 4, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
    }, {
      "_id": "5790d561e906f42c2f848add",
      "name": "[2] How Does AngularJS Work Beginners Angular Tutorial",
      "description": "What you will learn in this course. How to use Angular.js to save time, create better projects and give your users a better experience. We’ll create a full SPA from scratch (client side). How to cloud-enable your SPA so that you can connect it to any kind of backend. Fully commented source code of the course project. Learn how to architecture a SPA: modules, controllers, services Learn how to add URL routes to your client-side SPA. We’ll be using Angular.js version 1.3.2. Access live examples at the end of each coding lesson. Learn how to use other great tools such as Boostrap 3, UnderscoreJS and Google Chrome’s Developer Tools!",
      "url": "videos/How_Does_AngularJS_Work_Beginners_Angular_Tutorial.mp4",
      "__v": 12,
      "ratings": [2, 4, 2, 2, 3, 1, 2, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5]
    }, {
      "_id": "5790d561e906f42c2f848ade",
      "name": "[3] How does Node.js work",
      "description": "New to Node.js? Check out this video that explains \"How does Node work?\"",
      "url": "videos/How_does_Node.js_work.mp4",
      "ratings": [3, 3, 3, 3, 3, 3, 3, 3]
    }, {
      "_id": "5790d561e906f42c2f848adf",
      "name": "[4] iPhone 7 Trailer 2016",
      "description": "iPhone 7 concept trailer 2016! with Bluetooth AirPods by Beats and ChargingPad, and much more!",
      "url": "videos/iPhone_7_Trailer_2016.mp4",
      "ratings": [4, 3, 4, 3, 4, 3, 4, 3]
    }, {
      "_id": "5790d561e906f42c2f848ae0",
      "name": "[5] What is the MEAN Stack",
      "description": "Do you know what the MEAN stack is? Watch our short intro video and get ready to kick your learning into shape with this full-stack development toolkit. Then head on over and play through our MEAN-related courses now.",
      "url": "videos/What_is_the_MEAN_Stack.mp4",
      "ratings": [1, 5, 5, 5, 3, 4, 5, 5]
    }, {
      "_id": "5790d561e906f42c2f848ae1",
      "name": "[6] Getting Started With ReactJs",
      "description": "React.js is a JavaScript library for building user interfaces. - Just the UI: Lots of people use React as the V in MVC. Since React makes no assumptions about the rest of your technology stack, its easy to try it out on a small feature in an existing project. - Virtual DOM: React uses a virtual DOM diff implementation for ultra-high performance. It can also render on the server using Node.js — no heavy browser DOM required. - Data flow: React implements one-way reactive data flow which reduces boilerplate and is easier to reason about than traditional data binding.",
      "url": "videos/Getting_Started_With_React.js.mp4",
      "ratings": [1, 5, 5, 4, 3, 4, 2, 5]
    }, {
      "_id": "5790d561e906f42c2f848ae2",
      "name": "[7] Google Cardboard Assembly",
      "description": "Google Cardboard Assembly Step by Step Instructions [HD]",
      "url": "videos/Google_Cardboard_Assembly.mp4",
      "ratings": [4, 5, 5, 5, 3, 5, 4, 5]
    }, {
      "_id": "5790d561e906f42c2f848ae3",
      "name": "[8] How Does AngularJS Work Beginners Angular Tutorial",
      "description": "What you will learn in this course. How to use Angular.js to save time, create better projects and give your users a better experience. We’ll create a full SPA from scratch (client side). How to cloud-enable your SPA so that you can connect it to any kind of backend. Fully commented source code of the course project. Learn how to architecture a SPA: modules, controllers, services Learn how to add URL routes to your client-side SPA. We’ll be using Angular.js version 1.3.2. Access live examples at the end of each coding lesson. Learn how to use other great tools such as Boostrap 3, UnderscoreJS and Google Chrome’s Developer Tools!",
      "url": "videos/How_Does_AngularJS_Work_Beginners_Angular_Tutorial.mp4",
      "ratings": [2, 4, 2, 2, 3, 1, 2, 5]
    }, {
      "_id": "5790d561e906f42c2f848ae4",
      "name": "[9] How does Node.js work",
      "description": "New to Node.js? Check out this video that explains \"How does Node work?\"",
      "url": "videos/How_does_Node.js_work.mp4",
      "ratings": [3, 3, 3, 3, 3, 3, 3, 3]
    }];

  var createDirective = function () {
    var elm = angular.element('<div><dctv-video-list limit="10"></dctv-video-list></div>');
    $compile(elm.contents())($scope);
    document.body.appendChild(elm[0]);
    $scope.$digest();
    return elm;
  };

  var $elementGetScope = function () {
    return $element.children().isolateScope();
  };

  var $elementWaitingForResponse = function () {
    return $element.children().isolateScope().waitingForResponse;
  };

  beforeEach(module("my.templates"));
  beforeEach(module('ngMockE2E'));
  beforeEach(module('front-end'));

  beforeEach(inject(function ($injector, $rootScope, _$compile_) {
    $httpBackend = $injector.get('$httpBackend');
    $scope = $rootScope.$new();
    $compile = _$compile_;
    lodash = $injector.get('lodash');
    $httpBackend.when('GET', 'http://localhost:3000/videos?sessionId=*/&skip=*/&limit=*/').respond(200, {});
  }));

  beforeEach(angular.mock.inject(function ($q, VideoFactory) {
    deferredResolution = $q.defer();
    spyOn(VideoFactory, 'getVideos').and.returnValue(deferredResolution.promise);
    $element = createDirective();
    jasmine.clock().install();
  }));

  it('Directive first video load is Ok', function () {
    deferredResolution.resolve(videos);
    $elementGetScope().$apply();
    expect($elementWaitingForResponse()).toBe(false);
    expect($element.find('video').length >= 0).toBeTruthy();
    expect($element.find('video').length).toBeLessThan(11);
  });

  it('Video Play Button is Ok!', function () {

    expect($elementWaitingForResponse()).toBe(true);

    deferredResolution.resolve(videos);
    $elementGetScope().$apply();

    expect($elementWaitingForResponse()).toBe(false);
    var plays = $element.find('[ng-click="playPauseVideo(video)"]');

    angular.element($element.find('[ng-click="playPauseVideo(video)"]')[0]).trigger('click');

    var videosRunning = lodash.filter($elementGetScope().videos, function (video) {
      return video.paused == false;
    });

    expect(videosRunning.length).toBe(1);

  });

  it('Video Stop Button is Ok!', function () {

    expect($elementWaitingForResponse()).toBe(true);

    deferredResolution.resolve(videos);
    $elementGetScope().$apply();

    expect($elementWaitingForResponse()).toBe(false);
    var plays = $element.find('[ng-click="playPauseVideo(video)"]');

    angular.element($element.find('[ng-click="playPauseVideo(video)"]')[0]).trigger('click');
    angular.element($element.find('[ng-click="playPauseVideo(video)"]')[0]).trigger('click');

    var videosRunning = lodash.filter($elementGetScope().videos, function (video) {
      return video.paused == false;
    });

    expect(videosRunning.length).toBe(0);

  });

  it('No more one video can be played!', function () {

    expect($elementWaitingForResponse()).toBe(true);

    deferredResolution.resolve(videos);
    $elementGetScope().$apply();

    expect($elementWaitingForResponse()).toBe(false);
    var plays = $element.find('[ng-click="playPauseVideo(video)"]');

    function getRandomPlayNumber() {
      return Math.floor((Math.random() * plays.length) + 1);
    }

    var count = 0;
    while (count <= 20) {
      angular.element($element.find('[ng-click="playPauseVideo(video)"]')[getRandomPlayNumber()]).trigger('click');
      count++;
    }

    var videosRunning = lodash.filter($elementGetScope().videos, function (video) {
      return video.paused == false;
    });
    expect(videosRunning.length).toBeLessThan(2);

  });

  it('Click of title is Ok!', function () {

    expect($elementWaitingForResponse()).toBe(true);

    deferredResolution.resolve(videos);
    $elementGetScope().$apply();

    expect($elementWaitingForResponse()).toBe(false);
    var videoTitles = $element.find('.video-title');

    for (var x = 0; x < videoTitles.length; x++) {
      angular.element($element.find('.video-title')[x]).trigger('click');
    }

    var videosRunning = lodash.filter($elementGetScope().videos, function (video) {
      return video.largeSize == true;
    });

    expect(videosRunning.length).toBe(videoTitles.length);

  });

  afterEach(function () {
    jasmine.clock().uninstall();
  });

});
