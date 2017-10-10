(function () {
  'use strict';

  angular.module('dctv-video-list.directive', [])
    .directive('dctvVideoList', dctvVideoList);

  /** @ngInject */
  function dctvVideoList($sce, lodash, toastr, VideoFactory, LayoutService, API) {

    return {
      restrict: 'E',
      replace: true,
      scope: {
        limit: '='
      },
      controllerAs: 'controller',
      templateUrl: 'app/common/directive/dctv-video-list/dctv-video-list.tpl.html',
      link: function (scope, element, attrs) {
        var skip = 0;
        scope.waitingForResponse = false;

        scope.videos = [];

        scope.getConfigurations = function () {
          return {
            theme: "bower_components/videogular-themes-default/videogular.css",
            plugins: {
              poster: "http://www.videogular.com/assets/images/videogular.png"
            }
          }
        };

        scope.getVideoUrl = function (video) {
          return $sce.trustAsResourceUrl(API.URL + "/" + video.url);
        };

        scope.getVideoType = function (video) {
          return "video/" + (video.url.split('.')[video.url.split('.').length - 1]);
        };

        scope.getSourceVideo = function (video) {
          return [{src: scope.getVideoUrl(video), type: scope.getVideoType(video)}]
        };

        scope.playPauseVideo = function (video) {
          if (video.paused) {
            scope.playVideo(video);
          }
          else {
            scope.pauseVideo(video);
          }
        };

        scope.playVideo = function (video) {
          scope.stopAllVideos();
          if (!video.firstPlay) {
            video.firstPlay = true;
          }
          var videoElement = scope.getVideoElement(video);
          scope.centralizerOnVideo(video);
          videoElement.play();
          video.paused = false;
        };

        scope.getVideoRating = function (video) {
          var media = 0;
          var count = 0;
          while (count < video.ratings.length) {
            media += video.ratings[count];
            count++;
          }
          return (media / video.ratings.length);
        };

        scope.getVideoRatingStar = function (video, startNumber) {
          var media = scope.getVideoRating(video);
          if (media <= (startNumber - 1)) {
            return 'fa-star-o';
          } else if ((media <= (startNumber - 1) >= (startNumber - 0.5)) && (media <= (startNumber - 1) < (startNumber))) {
            return 'fa-star-half-empty';
          }
          else {
            return 'fa-star'
          }
        };

        scope.pauseVideo = function (video) {
          var videoElement = scope.getVideoElement(video);
          videoElement.pause();
          video.paused = true;
        }

        scope.setVolumeVideo = function (video) {
          var videoElement = scope.getVideoElement(video);
          videoElement.volume = video.volume;
        };
        scope.setFullScreenVideo = function (video) {
          var videoElement = scope.getVideoElement(video);
          videoElement = videoElement.parentElement.parentElement;
          if (videoElement.requestFullscreen) {
            if (!video.fullScreen) {
              videoElement.requestFullscreen();
            }
            else {
              document.exitFullscreen();
            }
          } else if (videoElement.mozRequestFullScreen) {
            if (!video.fullScreen) {
              videoElement.mozRequestFullScreen();
            }
            else {
              document.webkitExitFullscreen
            }
          } else if (videoElement.webkitRequestFullscreen) {
            if (!video.fullScreen) {
              videoElement.webkitRequestFullscreen();
            }
            else {
              document.webkitExitFullscreen();
            }
          }
          else if (videoElement.msRequestFullscreen) {
            if (!video.fullScreen) {
              videoElement.msRequestFullscreen();
            }
            else {
              document.msExitFullscreen();
            }
          }
          video.fullScreen = !video.fullScreen;
        };

        scope.exitFullScreen = function (videoelement) {
          var escape = angular.element.Event("keydown", {keyCode: 27});
          angular.element(videoelement).trigger(escape);
        };
        scope.getVideoElement = function (video) {
          var videoElement = angular.element('video[video-id="' + video._id + '"]')[0]
          return videoElement;
        };

        scope.getVideoDuration = function (video) {
          var videoElement = scope.getVideoElement(video);
          return angular.isNaN(videoElement.duration) ? 0 : videoElement.duration;
        };

        scope.setVideoLargeSize = function (video) {
          video.largeSize = !video.largeSize;
          scope.centralizerOnVideo(video);
        };

        scope.rateVideo = function (video, rating) {
          LayoutService.loader.show();
          VideoFactory.rateVideo(video._id, rating).then(function (response) {
            video.ratings.push(rating);
            LayoutService.loader.hide();
          }, function (error) {
            LayoutService.loader.hide();
          });
        };

        scope.getVideos = function () {
          scope.waitingForResponse = true;
          VideoFactory.getVideos(skip, scope.limit).then(function (response) {
            angular.element(response).each(function (iV, video) {
              video.paused = true;
              video.fullScreen = false;
              scope.whenVideoElementCreted(video, function (video, videoElement) {
                scope.onVideoDurationChange(video);
              });
            });
            skip += response.length;
            scope.videos = scope.videos.concat(response);
            scope.waitingForResponse = false;
          }, function (error) {
            scope.waitingForResponse = false;
          });
        };

        scope.whenVideoElementCreted = function (video, callback) {
          var videoElement = scope.getVideoElement(video);
          if (videoElement) {
            callback(video, videoElement);
          } else {
            setTimeout(function () {
              scope.whenVideoElementCreted(video, callback);
            }, 500);
          }
        };

        scope.onVideoDurationChange = function (video) {
          var videoElement = scope.getVideoElement(video);
          angular.element(videoElement).on("timeupdate", function (event) {
            scope.updateVideoProgressBar(video, videoElement);
          });
        };

        scope.setVideoCurrentTime = function (video) {
          var videoElement = scope.getVideoElement(video);
          videoElement.currentTime = video.currentTime;
        };

        scope.onVideoDurationClick = function (video) {
          angular.element(videoElement).on("timeupdate", function (event) {
            scope.updateVideoProgressBar(video, videoElement);
          });
        };


        scope.updateVideoProgressBar = function (video, videoElement) {
          video.duration = isNaN(videoElement.duration) ? 1 : videoElement.duration;
          video.currentTime = isNaN(videoElement.currentTime) ? 0 : videoElement.currentTime;
          angular.element('.video-progress[video-id="' + video._id + '"]').attr("max", video.duration);
          angular.element('.video-progress[video-id="' + video._id + '"]').val(video.currentTime);
        };

        scope.stopAllVideos = function () {
          var videosRunning = lodash.filter(scope.videos, function (video) {
            return video.paused == false;
          });
          angular.element(videosRunning).each(function (iV, video) {
            scope.pauseVideo(video);
          })
        };

        var start = function () {
          scope.videos = [];
          scope.getVideos();
        }
        start();

        scope.centralizerOnVideo = function (video) {
          var videoElement = scope.getVideoElement(video);
          setTimeout(function () {
            $('#layout-middle .conteudo').animate({
              scrollTop: $(videoElement).offset().top - $('.video-list').offset().top
            }, 2000);
          }, 400);
        };


        $('#layout-middle .conteudo').off('scroll');
        $('#layout-middle .conteudo').on('scroll', function () {
          var element = $("#layout-middle .conteudo");
          if (element.scrollTop() == element[0].scrollHeight - element.outerHeight() && !scope.waitingForResponse) {
            scope.getVideos();
          }
        });

      }
    }
  }
})();
