angular.module("app", []).controller("mainCtrl", function ($scope) {
  $scope.page = "register"; // default page

  $scope.users = [];
  $scope.user = {};
  $scope.login = {};
  $scope.currentUser = {};

  // REGISTER
  $scope.register = function () {
    if (!$scope.user.name || !$scope.user.email || !$scope.user.password) {
      alert("Fill all fields");
      return;
    }

    $scope.users.push({ ...$scope.user });
    alert("Registered");

    $scope.user = {}; // clear form
    $scope.page = "login";
  };

  // LOGIN
  $scope.loginUser = function () {
    let found = $scope.users.find(
      (u) =>
        u.email === $scope.login.email && u.password === $scope.login.password,
    );

    if (found) {
      $scope.currentUser = found;
      $scope.page = "profile";
      $scope.login = {}; // clear form
    } else {
      alert("Invalid Login");
    }
  };

  // LOGOUT
  $scope.logout = function () {
    $scope.page = "login";
  };
});
