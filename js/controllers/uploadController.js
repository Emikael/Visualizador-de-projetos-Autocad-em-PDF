angular.module("app").controller('modalUploadFileCtrl', ['$scope', '$mdDialog', '$timeout', function ($scope, $mdDialog, $timeout, $element) {
    $scope.uploader = {};
    $scope.max = 3;
    $scope.selectedIndex = 0;
    $scope.disableTab2 = true;
    $scope.disableTab3 = true;
    $scope.fileMainAux = [];
    $scope.fileAux = [];
    $scope.filesAux = [];
    $scope.group = {};
    $scope.searchFile = '';
    $scope.clearSearchFile = function () {
        $scope.searchFile = '';
    };

    $scope.promise = $timeout(function () {
        console.log('process finished...');
    }, 1000);

    $scope.progress = function (callback) {
        $scope.promise = $timeout(function () {
            callback();
        }, 500);
    };

    $scope.closeDialog = function () {
        $scope.importFiles = [];
        $scope.totalFiles = 0;
        $mdDialog.cancel();
    };

    $scope.processFiles = function ($flow, $event) {
        event.preventDefault();
        angular.forEach($flow.files, function (flowFile, i) {
            $scope.progress(function () {
                $scope.totalFiles += 1;
                let fileName = flowFile.file.name;
                fileName = fileName.substring(0, fileName.indexOf('.pdf'));
                $scope.importFiles.push({
                    uniqueIdentifier: flowFile.uniqueIdentifier,
                    name: fileName,
                    path: flowFile.file.path,
                    size: flowFile.size
                });
                $scope.uploader.flow.removeFile(flowFile);
            });
        });
    };

    $scope.deleteFile = function (file) {
        let indexFile = $scope.importFiles.indexOf(file);
        $scope.progress(function () {
            if (indexFile >= 0) {
                $scope.importFiles.splice(indexFile, 1);
                $scope.totalFiles -= 1;
            }
        });
    };

    $scope.nextTab = function () {
        let index = ($scope.selectedIndex === $scope.max) ? 0 : $scope.selectedIndex + 1;
        $scope.selectedIndex = index;
        if (index === 1) {
            $scope.disableTab2 = false;
        } else if (index === 2) {
            $scope.disableTab3 = false;
        }
    };

    $scope.onMainFileSelected = function () {
        $scope.fileMainAux = [];
        angular.forEach($scope.fileAux, function (file) {
            $scope.fileMainAux.push({
                uniqueIdentifier: file.uniqueIdentifier,
                name: file.name,
                src: file.src
            });
            
        });

        let indexFilesMain = $scope.findIndexFile($scope.fileMainAux);
        indexFilesMain.sort(function (a,b) {
           return b - a; 
        });
        
        angular.forEach(indexFilesMain, function (index) {
            $scope.importFiles.splice(index, 1);
        });
        
        $scope.hasMainFile = true;
        if ($scope.importFiles.lenght <= 0) {
            $scope.finalize();
        }
        $scope.nextTab();
    };

    $scope.addGroup = function () {
        $scope.group.menuOpen = false;
        $scope.filesAux.push($scope.group);

        let indexFileDelete = $scope.findIndexFile($scope.group.subFiles);
        indexFileDelete.sort(function (a, b) {
            return b - a;
        });

        angular.forEach(indexFileDelete, function (index) {
            $scope.importFiles.splice(index, 1);
        });

        $scope.hasOthersFiles = true;
        $scope.group = {};
    };

    $scope.findIndexFile = function (listFiles) {
        let indexs = [];
        angular.forEach($scope.importFiles, function (fileImported, i) {
            angular.forEach(listFiles, function (fileGroup) {

                if (fileImported.uniqueIdentifier === fileGroup.uniqueIdentifier) {
                    indexs.push($scope.importFiles.indexOf(fileImported));
                }
            });
        });

        return indexs;
    };

    $scope.onFinallyImportFiles = function (event) {
        $scope.finalize();
    };
    
    $scope.finalize = function () {
        $scope.fileMain = $scope.fileMainAux;
        $scope.files = $scope.filesAux;
        $scope.titleViewer = $scope.fileMain[0].name;
        $scope.pdfFile = $scope.fileMain[0].src;
        $scope.hasProject = true;
        $scope.hasFile = true;
        $scope.closeDialog();
    };

    $scope.query = {
        order: 'name',
        limit: 5,
        page: 1
    };

    $scope.getFiles = function (page, limit) {
        console.log('Page: ' + page);
        console.log('Limit: ' + limit);
    };

    $scope.formatSizeUnits = function (bytes) {
        if (bytes >= 1073741824) {
            bytes = (bytes / 1073741824).toFixed(2) + ' GB';
            return bytes;
        }

        if (bytes >= 1048576) {
            bytes = (bytes / 1048576).toFixed(2) + ' MB';
            return bytes;
        }

        if (bytes >= 1024) {
            bytes = (bytes / 1024).toFixed(2) + ' KB';
            return bytes;
        }

        if (bytes > 1) {
            bytes = bytes + ' bytes';
            return bytes;
        }

        if (bytes == 1) {
            bytes = bytes + ' byte';
            return bytes;
        }

        bytes = '0 byte';
        return bytes;
    };
}]);