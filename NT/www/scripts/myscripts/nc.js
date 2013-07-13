function ncControl($scope) {

    $scope.nc = {};
    $scope.Recert = {};
    $scope.Contacts = [];
    $scope.Boom = "";
    $scope.Bang = ""


    var d = new Date();
    $scope.nc.Month = d.getMonth();
    $scope.nc.Year = d.getFullYear();
    $scope.nc.Day = d.getDate();

    $scope.months = getMonths();
    $scope.years = getYears();
    $scope.days = getDays();

   
    

    $scope.Update = function() {
        $scope.days = getDays();
        
        //Resert Dates
        var includeToday = 1;
        var firstCert = 90 - includeToday;
        var signCert = firstCert - 15 + includeToday;
        var secondCert = firstCert + 1;
        var endSignCert = firstCert * 2 + includeToday;
        var secondSignCert = endSignCert - 15 + includeToday;
        var faceToFace = endSignCert - 30 + includeToday;

        $scope.Recert.StartFirstCertificationPeriod = selectedDate().Format_MDY();
        $scope.Recert.EndFirstCertificationPeriod = selectedDate().AddDays(firstCert).Format_MDY();
        $scope.Recert.SignFirstCertification = selectedDate().AddDays(signCert).Format_MDY();
        $scope.Recert.StartSecondCertificationPeriod = selectedDate().AddDays(secondCert).Format_MDY();
        $scope.Recert.EndSecondCertificationPeriod = selectedDate().AddDays(endSignCert).Format_MDY();
        $scope.Recert.SignSecondCertification = selectedDate().AddDays(secondSignCert).Format_MDY();
        $scope.Recert.FaceToFace = selectedDate().AddDays(faceToFace).Format_MDY();

    };

    function selectedDate() {
        return (new Date($scope.nc.Year, $scope.nc.Month, $scope.nc.Day));
    }

    function getDays() {

        var days = (new Date($scope.nc.Year, $scope.nc.Month + 1, 1)).AddDays(-1).getDate();
        var dArray = [];
        for (var i = 0; i < days; i++) {
            dArray[i] = { "value": i + 1, "name": i + 1 };
        };
        return dArray;
    };

    function getMonths() {
        var dArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        for (var i = 0; i < dArray.length; i++) {
            dArray[i] = { "value": i, "name": dArray[i] };
        };
        return dArray;
    };

    function getYears() {
        var years = (new Date()).getFullYear();
        var dArray = [];
        var j = 0;
        for (var i = (years - 10); i <= (years + 10); i++) {
            dArray[j] = { "value": i, "name": i };
            j++;
        };
        return dArray;
    };



    document.addEventListener("deviceready", onDeviceReady, false);

    function onDeviceReady() {
        var options = new ContactFindOptions();
        var fields = ["*"];
        navigator.contacts.find(fields, onSuccess, onError, {filter:"", multiple:true});
    };

    function onSuccess(contacts)
    {

        $scope.Boom = "Boom-Boom";
        $scope.Contacts = contacts;
        $scope.Bang = "Bang-Bang";

        $scope.$apply();
    };

    function onError(error)
    {
        $scope.Error = error;
    };


    $scope.Update();
}