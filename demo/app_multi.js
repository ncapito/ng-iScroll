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
        $scope.myScrollControls.wrapper3.refresh();
    };


    $scope.refreshiScroll2 = function ()
    {
        $scope.myScrollControls.testWrap2.refresh();
    };
});
