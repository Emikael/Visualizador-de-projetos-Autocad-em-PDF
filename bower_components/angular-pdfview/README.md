# AngularJS PDF viewer directive

You need have node
``` js
$ node server.js 
```

In the browser
``` js
localhost:8000/demo/index.html
```

To install with bower
``` js
bower install angular-pdfview
```

# angular-pdfviewer

AngularJS PDF viewer directive using pdf.js.

``` html
<button class="btn btn-default" ng-click="gotoPage(1)">
    <span class="glyphicon glyphicon-fast-backward" aria-hidden="true"></span>
</button>

<button class="btn btn-default" ng-click="prevPage()">
    <span class="glyphicon glyphicon-backward" aria-hidden="true"></span>
</button>

<button class="btn btn-default" ng-click="nextPage()">
    <span class="glyphicon glyphicon-forward" aria-hidden="true"></span>
</button>

<button class="btn btn-default" ng-click="gotoPage(totalPages)">
    <span class="glyphicon glyphicon-fast-forward" aria-hidden="true"></span>
</button>

<button class="btn btn-default" ng-click="onRotation()">
    <span class="glyphicon glyphicon-repeat" aria-hidden="true"></span>
</button>

<button class="btn btn-default" ng-click="zoomIn()">
    <span class="glyphicon glyphicon-zoom-in" aria-hidden="true"></span>
</button>

<button class="btn btn-default" ng-click="zoomOut()">
    <span class="glyphicon glyphicon-zoom-out" aria-hidden="true"></span>
</button>

<button class="btn btn-default" ng-click="scaleFit()">
    <span class="glyphicon glyphicon-fullscreen" aria-hidden="true"></span>
</button>
<br>
<span>{{currentPage}}/{{totalPages}}</span>
<br>
<pdfviewer src="yourFilePDF.pdf" on-page-load='pageLoaded(page,total)' id="viewer"></pdfviewer>
```

and in your AngularJS code:

``` js

var app = angular.module('testApp', [ 'ngPDFViewer' ]);

app.controller('TestCtrl', [ '$scope', 'PDFViewerService', function($scope, pdf) {
	$scope.viewer = pdf.Instance("viewer");

	$scope.nextPage = function() {
    	$scope.instance.nextPage();
    };

    $scope.prevPage = function() {
        $scope.instance.prevPage();
    };

    $scope.gotoPage = function(page) {
        $scope.instance.gotoPage(page);
    };

    $scope.pageLoaded = function(curPage, totalPages) {
        $scope.currentPage = curPage;
        $scope.totalPages = totalPages;
    };

    $scope.onRotation = function () {
        $scope.instance.onRotation();
    };

    $scope.zoomIn = function () {
        $scope.instance.zoomIn();
    };

    $scope.zoomOut = function () {
        $scope.instance.zoomOut();
    };

    $scope.scaleFit = function () {
      $scope.instance.scaleFit();
    };
}]);
```

## Requirements

* AngularJS (http://angularjs.org/)
* PDF.js (http://mozilla.github.io/pdf.js/)

### pdf.js pdf.worker.js compatibility.js  --From github.com/mozilla/pdf.js
  In order to bundle all `src/` files into two productions scripts and build the generic
  viewer, issue:

  $ node make generic

  This will generate `pdf.js` and `pdf.worker.js` in the `build/generic/build/` directory.
  Both scripts are needed but only `pdf.js` needs to be included since `pdf.worker.js` will
  be loaded by `pdf.js`. If you want to support more browsers than Firefox you'll also need
  to include `compatibility.js` from `build/generic/web/`. The PDF.js files are large and
  should be minified for production.

## Usage

Include `angular-pdfview.js` as JavaScript file, along with `pdf.js` and `pdf.compat.js`.

Declare `angularPDFView` as dependency to your module.

You can now use the `pdfviewer` tag in your HTML source.

## License

MIT License

Copyright (c) 2016 Emikael Silveira

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Author
Emikael Silveira <emikael.silveira@gmail.com>
