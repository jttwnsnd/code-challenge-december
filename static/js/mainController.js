var myApp = angular.module("ronApp", ['ngRoute']);
myApp.controller('mainController', function($scope, $http, $route, $location){
	$scope.test = "Hello, Ron! In the search bar, search users. Don't be afraid. You can even search your name.";
	//having read the documentation, i believe i need a authentication of some sort.

	//allows for my query search
	var apiPath = "https://api.github.com/search/users?q="
	//limits my search to 10 results
	var pagination = '+?per_page=10'

	//========================
	// Search Function Logic
	//========================

	$scope.searchResults = function() {
		var isRon = $scope.search.search(/(ron)/g)
		if (isRon !== -1){
			//Call was successful
			if ($scope.search.length > 3){
				//needs refinement, but as of now, it prevents Aaron from being counted as "ron" however, it doesnt allow me to search for 'ron swanson', and it still turn up as a'ron'
				console.log('probably not Ron')
				$scope.results = $scope.search
				requestJSON(apiPath + $scope.search, function(json){
					var results = [];
					if(json.message == "Not Found"){
						$scope.results = "No User Info Found"
					}else{
						//this is the droid we are looking for, assign the pieces
						for(var i = 0; i < 10; i++){
							results.push({
								result_num: i,
								username: json.items[i].login,
								avatar: json.items[i].avatar_url,
								bio: json.items[i].bio,
								location: json.items[i].location,
								email: json.items[i].email
							})
						}
						console.log('found something')
						console.log(json)
						$scope.users = results;
						// $scope.avatar = json.avatar_url;
						// $scope.bio = json.bio;
						// $scope.location = json.location;
						// $scope.email = json.email
					}
					console.log('finished')
					//route them to our view
					routeChange();
				});
			}else{
				//got him, let's rick roll!
				console.log('it is ron!');
				$location.path('/ron')
			}
		}else{
			//call was not Ron
			console.log($scope.search)
			// $scope.results = $scope.search
			requestJSON(apiPath + $scope.search, function(json){
				var results = [];
				if(json.message == "Not Found"){
					$scope.results = "No User Info Found"
				}else{
					//this is the droid we are looking for, assign the pieces
					for(var i = 0; i < 10; i++){
						results.push({
							result_num: i,
							username: json.items[i].login,
							avatar: json.items[i].avatar_url,
							bio: json.items[i].bio,
							location: json.items[i].location,
							email: json.items[i].email
						})
					}
					console.log('found something')
					console.log(json)
					$scope.users = results;
					console.log(results);
				}
				console.log('finished')
				//route them to our view
				routeChange();
			});
		}
	}

	//=========================
	// Functions
	//=========================

	//get the info from github
	function requestJSON(url, callback) {
		$.ajax({
			url: url,
			complete: function(xhr) {
				callback.call(null, xhr.responseJSON);
			}
		})
	}

	//force my route change
	function routeChange() {
		$location.path('/search');
	}


})


//======================
// ROUTES
//======================
myApp.config(($routeProvider) => {
	$routeProvider.when('/', {
		templateUrl: "views/main.html",
		controller: 'mainController'
	}).when('/search', {
		templateUrl: "views/search.html",
		controller: "mainController"
	}).when('/ron', {
		templateUrl: "views/ron.html",
		controller: "mainController"
	})
})