'use strict';

angular.module('7minworkout').filter('secondsToTime', function(){
		return function(input){
			var sec = parseInt(input, 10);
			if (isNaN(sec)) return '00:00:00';

			var min = Math.floor(sec / 60);
			sec = Math.floor(sec % 60);

			var hour = Math.floor(min / 60);
			min = Math.floor(min % 60);

			return ('0' + hour).substr(-2) + ':' + ('0' + min).substr(-2) + ':' + ('0' + sec).substr(-2);
		}
	});