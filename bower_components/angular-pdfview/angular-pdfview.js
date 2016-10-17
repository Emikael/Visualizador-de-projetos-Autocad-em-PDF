/**
 * @preserve AngularJS PDF viewer directive using pdf.js.
 *
 * https://github.com/Emikael/angular-pdfviewer
 *
 * MIT License
 *
 * Copyright (c) 2016 Emikael Silveira
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

angular.module('angularPDFView', []).directive('pdfviewer', ['$parse', function ($parse) {
    var canvas = null;
    var instance_id = null;

    return {
        restrict: "E",
        template: '<canvas></canvas>',
        scope: {
            onPageLoad: '&',
            loadProgress: '&',
            src: '@',
            id: '='
        },
        controller: ['$scope', function ($scope) {
            $scope.pageNum = 1;
            $scope.pdfDoc = null;
            $scope.scale = 1.0;
            $scope.rotation = 0;

            $scope.documentProgress = function (progressData) {
                if ($scope.loadProgress) {
                    $scope.loadProgress({
                        state: "loading",
                        loaded: progressData.loaded,
                        total: progressData.total
                    });
                }
            };

            $scope.loadPDF = function (path) {
                console.log('loadPDF ', path);
                $scope.scale = 1.0;
                $scope.rotation = 0;
                PDFJS.getDocument(path, null, null, $scope.documentProgress).then(function (_pdfDoc) {
                    $scope.pdfDoc = _pdfDoc;
                    $scope.renderPage($scope.pageNum, function (success) {
                        if ($scope.loadProgress) {
                            $scope.loadProgress({
                                state: "finished",
                                loaded: 0,
                                total: 0
                            });
                        }
                    });
                }, function (message, exception) {
                    console.log("PDF load error: " + message);
                    if ($scope.loadProgress) {
                        $scope.loadProgress({
                            state: "error",
                            loaded: 0,
                            total: 0
                        });
                    }
                });
            };

            $scope.onRotation = function (callback) {
                console.log('Rotation in 90°');
                $scope.pdfDoc.getPage($scope.pageNum).then(function (page) {
                    var viewport = page.getViewport($scope.scale, $scope.rotation);
                    var context = canvas.getContext('2d');

                    canvas.height = viewport.height;
                    canvas.width = viewport.width;

                    page.render({
                        canvasContext: context,
                        viewport: viewport
                    }).then(
                        function () {
                            if (callback) {
                                callback(true);
                            }

                            $scope.$apply(function () {
                                $scope.onPageLoad({
                                    page: $scope.pageNum,
                                    total: $scope.pdfDoc.numPages
                                });
                            });
                        },
                        function () {
                            if (callback) {
                                callback(false);
                            }

                            $scope.$apply(function () {
                                console.log('Page Rotation failed.');
                            });
                        }
                    );
                });
            };

            $scope.setScale = function (scale, callback) {
                console.log('Set scale Page ' + scale);
                $scope.pdfDoc.getPage($scope.pageNum).then(function (page) {
                    var viewport = page.getViewport($scope.scale);
                    var context = canvas.getContext('2d');

                    canvas.height = viewport.height;
                    canvas.width = viewport.width;

                    page.render({
                        canvasContext: context,
                        viewport: viewport
                    }).then(
                        function () {
                            if (callback) {
                                callback(true);
                            }

                            $scope.$apply(function () {
                                $scope.onPageLoad({
                                    page: $scope.pageNum,
                                    total: $scope.pdfDoc.numPages
                                });
                            });
                        },
                        function () {
                            if (callback) {
                                callback(false);
                            }

                            $scope.$apply(function () {
                                console.log('Page render failed');
                            });
                        }
                    );
                });
            };

            $scope.renderPage = function (num, callback) {
                console.log('renderPage ', num);
                $scope.pdfDoc.getPage(num).then(function (page) {
                    var viewport = page.getViewport($scope.scale);
                    var ctx = canvas.getContext('2d');

                    canvas.height = viewport.height;
                    canvas.width = viewport.width;

                    page.render({
                        canvasContext: ctx,
                        viewport: viewport
                    }).then(
                        function () {
                            if (callback) {
                                callback(true);
                            }

                            $scope.$apply(function () {
                                $scope.onPageLoad({
                                    page: $scope.pageNum,
                                    total: $scope.pdfDoc.numPages
                                });
                            });
                        },
                        function () {
                            if (callback) {
                                callback(false);
                            }

                            console.log('page.render failed');
                        }
                    );
                });
            };

            $scope.$on('pdfviewer.nextPage', function (evt, id) {
                if (id !== instance_id) {
                    return;
                }

                if ($scope.pageNum < $scope.pdfDoc.numPages) {
                    $scope.pageNum++;
                    $scope.renderPage($scope.pageNum);
                }
            });

            $scope.$on('pdfviewer.prevPage', function (evt, id) {
                if (id !== instance_id) {
                    return;
                }

                if ($scope.pageNum > 1) {
                    $scope.pageNum--;
                    $scope.renderPage($scope.pageNum);
                }
            });

            $scope.$on('pdfviewer.gotoPage', function (evt, id, page) {
                if (id !== instance_id) {
                    return;
                }

                if (page >= 1 && page <= $scope.pdfDoc.numPages) {
                    $scope.pageNum = page;
                    $scope.renderPage($scope.pageNum);
                }
            });

            $scope.$on('pdfviewer.zoomIn', function (evt, id, page) {
                if (id !== instance_id) {
                    return;
                }
                $scope.scale += 0.1;
                $scope.setScale($scope.scale);
            });

            $scope.$on('pdfviewer.zoomOut', function (evt, id, page) {
                if (id !== instance_id) {
                    return;
                }
                var newScale = $scope.scale - 0.1;
                if (newScale <= 1.0) {
                    return;
                }

                $scope.scale = newScale;
                $scope.setScale($scope.scale);
            });

            $scope.$on('pdfviewer.scaleFit', function (evt, id, page) {
                if (id !== instance_id) {
                    return;
                }
                $scope.scale = 1.5;
                $scope.setScale($scope.scale);
            });

            $scope.$on('pdfviewer.onRotation', function (evt, id, page) {
                if (id !== instance_id) {
                    return;
                }

                $scope.rotation += 90;
                $scope.onRotation();
            });

        }],
        link: function (scope, iElement, iAttr) {
            canvas = iElement.find('canvas')[0];
            instance_id = iAttr.id;

            iAttr.$observe('src', function (v) {
                console.log('src attribute changed, new value is', v);
                if (v !== undefined && v !== null && v !== '') {
                    scope.pageNum = 1;
                    scope.loadPDF(scope.src);
                }
            });
        }
    };
}]).service("angularPDFViewerService", ['$rootScope', function ($rootScope) {

    var svc = {};
    svc.nextPage = function () {
        $rootScope.$broadcast('pdfviewer.nextPage');
    };

    svc.prevPage = function () {
        $rootScope.$broadcast('pdfviewer.prevPage');
    };

    svc.zoomIn = function () {
        $rootScope.$broadcast('pdfviewer.zoomIn');
    };

    svc.zoomOut = function () {
        $rootScope.$broadcast('pdfviewer.zoomOut');
    };

    svc.scaleFit = function () {
        $rootScope.$broadcast('pdfviewer.scaleFit');
    };

    svc.onRotation = function () {
        $rootScope.$broadcast('pdfviewer.onRotation');
    };

    svc.Instance = function (id) {
        var instance_id = id;

        return {
            prevPage: function () {
                $rootScope.$broadcast('pdfviewer.prevPage', instance_id);
            },
            nextPage: function () {
                $rootScope.$broadcast('pdfviewer.nextPage', instance_id);
            },
            gotoPage: function (page) {
                $rootScope.$broadcast('pdfviewer.gotoPage', instance_id, page);
            },
            zoomIn: function () {
                $rootScope.$broadcast('pdfviewer.zoomIn', instance_id);
            },
            zoomOut: function () {
                $rootScope.$broadcast('pdfviewer.zoomOut', instance_id);
            },
            scaleFit: function () {
                $rootScope.$broadcast('pdfviewer.scaleFit', instance_id);
            },
            onRotation: function () {
                $rootScope.$broadcast('pdfviewer.onRotation', instance_id);
            }
        };
    };

    return svc;
}]);