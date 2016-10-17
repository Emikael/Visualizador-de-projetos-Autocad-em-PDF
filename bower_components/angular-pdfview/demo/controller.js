var app = angular.module('testApp', [ 'angularPDFView' ]);

app.controller('TestController', [ '$scope', 'angularPDFViewerService', function($scope, pdf) {
	console.log('TestController: new instance');

	$scope.pdfURL = "test.pdf";

	$scope.instance = pdf.Instance("viewer");

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

	$scope.loadProgress = function(loaded, total, state) {
		console.log('loaded =', loaded, 'total =', total, 'state =', state);
	};
}]);
