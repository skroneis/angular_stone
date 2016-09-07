mainModule.controller("StoneController", function ($scope, viewModelHelper, $http) {
    $scope.Sepp = "Sepp Forcher";

    var initialize = function () {
        console.log("initialize");
        $scope.getInfos();
    }

    $scope.init = function () {
        console.log("init");
        initialize();
    };

$scope.getInfos = function () {
        //alert("getInfos");
        console.log("getInfos");
        $scope.isLoading = true;
        $http.defaults.headers.common["RequestVerificationToken"] = $scope.token;
        return $http.get(MyApp.rootPath + 'api/getInfos', null).then(function (response) {
            console.log(response.data);
            $scope.infos = response.data;
            $scope.isLoading = false;
        });
        // $scope.isLoading = false;
    };
});