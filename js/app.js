'use strict';

angular.module('app', ['ngRoute','ngSanitize','7minworkout','mediaPlayer'])
	.config(function($routeProvider, $sceDelegateProvider){
		$sceDelegateProvider.resourceUrlWhitelist([
			// Allowed Urls
			'self',
			'http://*.youtube.com/**'
			]);

		$routeProvider.when('/start', {
			templateUrl: 'partials/start.xhtml'
		});
		$routeProvider.when('/workout', {
			templateUrl: 'partials/workout.xhtml',
			controller: 'WorkoutCtrl'
		});
		$routeProvider.when('/end', {
			templateUrl: 'partials/end.xhtml'
		});

		$routeProvider.otherwise({ redirectTo: '/start' });
	});

angular.module('7minworkout', []);

