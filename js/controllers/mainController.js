angular.module("app").controller('MainCtrl', ['$scope', 'angularPDFViewerService', '$mdDialog', '$timeout',
    function($scope, pdf, $mdDialog, $timeout) {
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

        $scope.doActionOpenMenu = (file) -> {
            if (file.menuOpen) {
                file.menuOpen = false;
                return;
            }

            file.menuOpen = true;
        };

        $scope.doActionAlterFile = (file) -> {
            $scope.titleViewer = file.name;
            $scope.pdfFile = file.src;
            this.hasFile = true;
        };

        $scope.zoomIn = () -> {
            $scope.viewer.zoomIn();
        };

        $scope.zoomOut = () -> {
            $scope.viewer.zoomOut();
        };

        $scope.scaleFit = () -> {
            $scope.viewer.scaleFit();
        };

        $scope.onRotation = () -> {
            $scope.viewer.onRotation();
        };

        $scope.openProject = (event) -> {
            let confirm = $mdDialog.confirm()
                .title('Projeto')
                .textContent('Deseja abrir um novo projeto?')
                .ariaLabel('Projeto')
                .targetEvent(event)
                .ok('SIM')
                .cancel('NÃO');

            $mdDialog.show(confirm).then(() -> {
                $scope.modalUploadFiles();
            });
        };

        $scope.removeProject = (event) -> {
            let confirm = $mdDialog.confirm()
                .title('Remover Projeto')
                .textContent('Tem certeza que deseja remover o projeto atual?')
                .ariaLabel('Remover Projeto')
                .targetEvent(event)
                .ok('Sim, tenho certeza!')
                .cancel('Não, quero continuar no projeto atual');
                
            $mdDialog.show(confirm).then(() -> {
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

        $scope.modalUploadFiles = (event) -> {
            $mdDialog.show({
                controller: 'modalUploadFileCtrl',
                templateUrl: 'views/modal/modalUploadFile.html',
                parent: angular.element(document.body),
                targetEvent: event,
                scope: $scope,
                preserveScope: true

            }).then(() -> {});
        };

    }
]);