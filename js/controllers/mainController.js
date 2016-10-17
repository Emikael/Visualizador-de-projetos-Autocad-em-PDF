angular.module("app").controller('MainCtrl', ['$scope', 'angularPDFViewerService', '$mdDialog', '$timeout',
    function ($scope, pdf, $mdDialog, $timeout) {
        $scope.hasProgress = false;
        $scope.hasProject = false;
        $scope.hasFile = false;
        $scope.isOpen = false;
        $scope.importFiles = [];
        $scope.totalFiles = 0;
        $scope.hasMainFile = false;
        $scope.hasOthersFiles = false;
        $scope.fileMain = [];
        $scope.titleViewer = '';
        $scope.pdfFile = '';
        $scope.viewer = pdf.Instance('viewer');
        $scope.files = [];

        $scope.doActionOpenMenu = function (file) {
            if (file.menuOpen) {
                file.menuOpen = false;
                return;
            }

            file.menuOpen = true;
        };

        $scope.doActionAlterFile = function (file) {
            $scope.titleViewer = file.name;
            $scope.pdfFile = file.src;
            this.hasFile = true;
        };

        $scope.zoomIn = function () {
            $scope.viewer.zoomIn();
        };

        $scope.zoomOut = function () {
            $scope.viewer.zoomOut();
        };

        $scope.scaleFit = function () {
            $scope.viewer.scaleFit();
        };

        $scope.onRotation = function () {
            $scope.viewer.onRotation();
        };

        $scope.openProject = function (event) {
            var confirm = $mdDialog.confirm()
                .title('Projeto')
                .textContent('Deseja abrir um novo projeto?')
                .ariaLabel('Projeto')
                .targetEvent(event)
                .ok('SIM')
                .cancel('NÃO');

            $mdDialog.show(confirm).then(function () {
                $scope.modalUploadFiles();
            });
        };

        $scope.removeProject = function (event) {
            var confirm = $mdDialog.confirm()
                .title('Remover Projeto')
                .textContent('Tem certeza que deseja remover o projeto atual?')
                .ariaLabel('Remover Projeto')
                .targetEvent(event)
                .ok('Sim, tenho certeza!')
                .cancel('Não, quero continuar no projeto atual');

            $mdDialog.show(confirm).then(function () {
                $scope.fileMain = {};
                $scope.titleViewer = '';
                $scope.pdfFile = '';
                $scope.files = [];
                $scope.hasProject = false;
                $scope.hasFile = false;
                $scope.hasMainFile = false;
                $scope.hasOthersFiles = false;
            });
        };

        $scope.modalUploadFiles = function (event) {
            $mdDialog.show({
                controller: 'modalUploadFileCtrl',
                templateUrl: 'views/modal/modalUploadFile.html',
                parent: angular.element(document.body),
                targetEvent: event,
                scope: $scope,
                preserveScope: true

            }).then(function () {
            });
        };

    }
]);