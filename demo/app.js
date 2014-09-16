var App = angular.module('App', ['ng-iscroll']);

App.controller('Controller', function ($scope)
{
  $scope.myScrollOptions = {
        snap: false,
        onScrollEnd: function ()
        {
            alert('finshed scrolling');
        }
    };
    $scope.refreshiScroll = function(){
      alert("refresh");
    };
});
