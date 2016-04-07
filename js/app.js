'use strict';

angular.module('app', ['ngRoute','7minworkout'])
	.config(function($routeProvider){
		$routeProvider.when('/start', {
			templateUrl: 'partials/start.xhtml'
		});
		$routeProvider.when('/workout', {
			templateUrl: 'partials/workout.xhtml'
		});
		$routeProvider.when('/relax', {
			templateUrl: 'partials/relax.xhtml'
		});
		$routeProvider.when('/end', {
			templateUrl: 'partials/end.xhtml'
		});

		$routeProvider.otherwise({ redirectTo: '/start' });
	});


angular.module('7minworkout', []);

