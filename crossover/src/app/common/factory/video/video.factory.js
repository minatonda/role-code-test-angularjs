(function () {
  'use strict';

  angular.module('video.factory', [])
    .factory('VideoFactory', VideoFactory);

  /** @ngInject */
  function VideoFactory(API, $http, CredentialService) {

    var _factory = function (data) {
      angular.extend(this, data);
    };

    var getUrlVideo = function (nameMethod) {
      var _urlSufix = '';
      return API.URL + '/' + (_urlSufix ? +(_urlSufix + '/' + nameMethod) : nameMethod);
    };

    _factory.getVideos = function (skip, limit) {

      var sessionIdParameter = ('sessionId=' + CredentialService.GetFromLocalStorage().sessionId );
      var skipParameter = ('skip=' + skip);
      var limitParameter = ('limit=' + limit);

      return $http.get(getUrlVideo('videos') + '?' + sessionIdParameter + '&' + skipParameter + '&' + limitParameter).then(function (response) {
        return response.data.data;
      });

    };

    _factory.rateVideo = function (videoId, rating) {

      var sessionIdParameter = ('sessionId=' + CredentialService.GetFromLocalStorage().sessionId );
      var model = {videoId: videoId, rating: rating}
      return $http.post((getUrlVideo('video/ratings') + '?' + sessionIdParameter), model).then(function (response) {
        return response.data.data;
      });

    };

    return _factory;
  }

})();
