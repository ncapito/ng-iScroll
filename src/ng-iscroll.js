/*!
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/
angular.module('ng-iscroll', []).directive('ngIscroll', ['$q', '$timeout', function ($q,$timeout)
{
  return {
    replace: false,
    restrict: 'A',
    link: function (scope, element, attr)
    {
      // default timeout
      var ngiScroll_timeout = 5;

      // default options
      var ngiScroll_opts = {
        snap: true,
        momentum: true,
        hScrollbar: false
      };

      // scroll key /id
      var scroll_key = attr.ngIscroll;

      if (scroll_key === '') {
        scroll_key = attr.id;
      }

      // if ng-iscroll-form='true' then the additional settings will be supported
      if (attr.ngIscrollForm !== undefined && attr.ngIscrollForm == 'true') {
        ngiScroll_opts.useTransform = false;
        ngiScroll_opts.onBeforeScrollStart = function (e)
        {
          var target = e.target;
          while (target.nodeType != 1) target = target.parentNode;

          if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA')
            e.preventDefault();
          };
        }
        var initialized = {}, options, controls;
        initialized.options =  $q.defer();
        initialized.controls =  $q.defer();

        var iScrollControls = {};
        if (attr.IscrollControls) {
          var controllWatch = scope.$watch(attr.IscrollControls, function(newVal){
            if(!newVal){
              return;
            }
            iScrollControls = newVal;
            controllWatch();
            initialized.controls.resolve();

          });
        }else{
          initialized.controls.resolve();
        }

        var iScrollOptions = {};

        if (attr.IscrollOptions) {
          var optionsWatch = scope.$watch(attr.IscrollOptions, function(newVal){
            if(!newVal){
              return;
            }
            optionsWatch();
            iScrollOptions = newVal;

            for (var i in iScrollOptions) {
              //if this thing is not an object just assign it to default properties
              if(typeof(iScrollOptions[i])!=="object"){
                ngiScroll_opts[i] = iScrollOptions[i];
              } else if (i === scroll_key) {
                //if the key is an object and the property name matches mine
                //copy all properties from the object to the defaults
                for (var k in iScrollOptions[i]) {
                  ngiScroll_opts[k] = iScrollOptions[i][k];
                }
              }
            }
            initialized.options.resolve();

          });

        }else{
            initialized.options.resolve();
        }

        // iScroll initialize function
        function setScroll()
        {
          iScrollControls[scroll_key] = new iScroll(element[0], ngiScroll_opts);
        }

        // new specific setting for setting timeout using: ng-iscroll-timeout='{val}'
        if (attr.ngIscrollDelay !== undefined) {
          ngiScroll_timeout = attr.ngIscrollDelay;
        }


        $q.all(initialized).then(function(){
          $timeout(setScroll, ngiScroll_timeout);
        });

        // add ng-iscroll-refresher for watching dynamic content inside iscroll
        if(attr.ngIscrollRefresher !== undefined) {
          scope.$watch(attr.ngIscrollRefresher, function ()
          {
            if(scope.iScrollControls[scroll_key] !== undefined) {
              scope.iScrollControls[scroll_key].refresh();
            }
          });
        }
      }
    };
  }]);
