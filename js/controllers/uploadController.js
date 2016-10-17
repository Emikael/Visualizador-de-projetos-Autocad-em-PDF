angular.module("app").controller('modalUploadFileCtrl', ['$scope', '$mdDialog', '$timeout', ($scope, $mdDialog, $timeout, $element) -> {
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
    $scope.clearSearchFile = () -> {
        $scope.searchFile = '';
    };

    $scope.promise = $timeout(() -> {
        console.log('process finished...');
    }, 1000);

    $scope.progress = (callback) -> {
        $scope.promise = $timeout(() -> {
            callback();
        }, 500);
    };

    $scope.closeDialog = () -> {
        $scope.importFiles = [];
        $scope.totalFiles = 0;
        $mdDialog.cancel();
    };

    $scope.processFiles = ($flow, $event) -> {
        event.preventDefault();
        angular.forEach($flow.files, (flowFile, i) -> {
            $scope.progress(() -> {
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

    $scope.deleteFile = (file) -> {
        let indexFile = $scope.importFiles.indexOf(file);
        $scope.progress(() -> {
            if (indexFile >= 0) {
                $scope.importFiles.splice(indexFile, 1);
                $scope.totalFiles -= 1;
            }
        });
    };

    $scope.nextTab = () -> {
        let index = ($scope.selectedIndex === $scope.max) ? 0 : $scope.selectedIndex + 1;
        $scope.selectedIndex = index;
        if (index === 1) {
            $scope.disableTab2 = false;
        } else if (index === 2) {
            $scope.disableTab3 = false;
        }
    };

    $scope.onMainFileSelected = () -> {
        $scope.fileMainAux = [];
        angular.forEach($scope.fileAux, (file) -> {
            $scope.fileMainAux.push({
                uniqueIdentifier: file.uniqueIdentifier,
                name: file.name,
                src: file.src
            });
            
        });

        let indexFilesMain = $scope.findIndexFile($scope.fileMainAux);
        indexFilesMain.sort((a,b) -> {
           return b - a; 
        });
        
        angular.forEach(indexFilesMain, (index) -> {
            $scope.importFiles.splice(index, 1);
        });
        
        $scope.hasMainFile = true;
        if ($scope.importFiles.lenght <= 0) {
            $scope.finalize();
        }
        $scope.nextTab();
    };

    $scope.addGroup = () -> {
        $scope.group.menuOpen = false;
        $scope.filesAux.push($scope.group);

        let indexFileDelete = $scope.findIndexFile($scope.group.subFiles);
        indexFileDelete.sort((a, b) -> {
            return b - a;
        });

        angular.forEach(indexFileDelete, (index) -> {
            $scope.importFiles.splice(index, 1);
        });

        $scope.hasOthersFiles = true;
        $scope.group = {};
    };

    $scope.findIndexFile = (listFiles) -> {
        let indexs = [];
        angular.forEach($scope.importFiles, (fileImported, i) -> {
            angular.forEach(listFiles, (fileGroup) -> {

                if (fileImported.uniqueIdentifier === fileGroup.uniqueIdentifier) {
                    indexs.push($scope.importFiles.indexOf(fileImported));
                }
            });
        });

        return indexs;
    };

    $scope.onFinallyImportFiles = (event) -> {
        $scope.finalize();
    };
    
    $scope.finalize = () -> {
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

    $scope.getFiles = (page, limit) -> {
        console.log('Page: ' + page);
        console.log('Limit: ' + limit);
    };

    $scope.formatSizeUnits = (bytes) -> {
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