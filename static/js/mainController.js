var myApp = angular.module("ronApp", ['ngRoute']);
myApp.controller('mainController', function($scope, $http, $route){
	$scope.test = "Hello, Ron";

})

myApp.config(($routeProvider) => {
	$routeProvider.when('/', {
		templateUrl: "views/main.html",
		controller: 'mainController'
	})
})