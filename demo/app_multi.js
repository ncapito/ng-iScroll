var App = angular.module('App', ['ng-iscroll']);

App.controller('Controller', function ($scope)
{
    $scope.myScrollControls = {};
    $scope.myScrollOptions = {
        'testWrap2': {
            snap: false,
            vScrollbar:true,
            onScrollEnd: function ()
            {
            }},
        'wrapper3': {
            snap: false,
            vScrollbar:true,
            onScrollEnd: function ()
            {
            }}
    };

    $scope.refreshiScroll3 = function ()
    {
        alert('refresh refreshiScroll3');
        $scope.myScrollControls.wrapper3.refresh();
    };


    $scope.refreshiScroll2 = function ()
    {
        alert('refresh refreshiScroll2');
        $scope.myScrollControls.testWrap2.refresh();
    };
});
