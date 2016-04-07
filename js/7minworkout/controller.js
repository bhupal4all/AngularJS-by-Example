'use strict';

angular.module('7minworkout')
	.controller('WorkoutCtrl', ['$scope','$interval', function ($scope, $interval) {
		function WorkoutPlan(args) {
			this.exercises = [];
			this.name = args.name;
			this.title = args.title;
			this.restBetweenExercise = args.restBetweenExercise;
		};

		function Exercise(args) {
			this.name = args.name;
			this.title = args.title;
			this.description = args.description;
			this.image = args.image;
			this.related = {};
			this.related.videos = args.videos;
			this.nameSound = args.nameSound;
			this.procedure = args.procedure;
		};

		var workoutPlan;
		var restExercise;

		var init = function(){
			startWorkOut();
		};

		var startWorkOut = function(){
			workoutPlan = createWorkout();

			restExercise = {
					details: new Exercise({
							name: 'Rest',
							title: 'Relax !!!',
							description: 'Take some rest'
						}),
					duration: workoutPlan.restBetweenExercise
				};

			startExercise(workoutPlan.exercises.shift());
		};

		var createWorkout = function(){
			var workout = new WorkoutPlan({
              name: "7minWorkout",
              title: "7 Minute Workout",
              restBetweenExercise: 10
          });

			workout.exercises.push({
				details: new Exercise({
					name: 'one',
					title: 'Exercise 1',
					description: 'First Exercise'
				}),
				duration: 10
			});

			workout.exercises.push({
				details: new Exercise({
					name: 'two',
					title: 'Exercise 2',
					description: 'Second Exercise'
				}),
				duration: 15
			});

			return workout;
		};

		var startExercise = function(exerciseplan){
			$scope.currentExercise = exerciseplan;
			$scope.currentExerciseDuration = 0;

			$interval(function(){
				$scope.currentExerciseDuration++;
			}, 1000, $scope.currentExercise.duration);
		};

		var getNextExcercise = function(currentExcercise){
			var nextExcercise;

			if (currentExcercise === restExercise){
				nextExcercise = workoutPlan.exercises.shift();
			}else{
				if (workoutPlan.exercises.length != 0){
					nextExcercise = restExercise;
				}
			}

			return nextExcercise;
		};

		// Addining a Listerner on duration
		/*
		*  $scope.$watch(expression, listener);
		*/
		$scope.$watch('currentExerciseDuration', function(val){
			if (val == $scope.currentExercise.duration){
				console.log($scope.currentExercise.details.title + ' is Completed !!!');

				var nextExcercise = getNextExcercise($scope.currentExercise);

				if (nextExcercise){
					startExercise(nextExcercise);
				} else{
					console.log('Work Out completed !!!')
				}
			}
		});

		// start the module
		init();
	}]);