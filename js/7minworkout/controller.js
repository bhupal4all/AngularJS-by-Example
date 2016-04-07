'use strict';

angular.module('7minworkout')
	.controller('WorkoutCtrl', ['$scope', function ($scope) {
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
		};

		// start the module
		init();
	}]);