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
							description: 'Take some rest',
			                image: "img/rest.png",							
						}),
					duration: workoutPlan.restBetweenExercise
				};

			startExercise(workoutPlan.exercises.shift());
		};

		var createWorkout = function(){
			var workout = new WorkoutPlan({
              name: "7minWorkout",
              title: "7 Minute Workout",
              restBetweenExercise: 5
          });

		workout.exercises.push({
			details: new Exercise({
				name: "jumpingJacks",
				title: "Jumping Jacks / Star Jumps",
				description: "Notes: This exercise can be performed as a timed exercise, completing as many reps as possible in a set time or, \
					in sets with a fixed number of repetitions per set.\
					To increase intensity, bend your arms slightly as you raise them to engage your biceps and triceps and squeezing them during each rep.",
				image: "img/JumpingJacks.png",
				videos: ["//www.youtube.com/embed/dmYwZH_BNd0", "//www.youtube.com/embed/BABOdJ-2Z6o", "//www.youtube.com/embed/c4DAnQ6DtF8"],
				procedure: "1. Stand with your feet together, arms fully extended with your hands by your sides. This is the start position.\
					2. Bend your knees slightly then straighten and push through the balls of your feet while straightening your your \
					knees to jump up spreading your legs to wider than hip width apart.\
					3. As you do so, raise both arms out and up in a smooth arc until your hands meet above your head.\
					4. As you return to the ground, bring your feet together and your hands back to your sides with your arms fully extended.\
					5. Continue without pause for the desired amount of time or repetitions."
				}),
				duration: 10
			});
		
		workout.exercises.push({
			details: new Exercise({
					name: "wallSit",
					title: "Wall Sit",
					description: "A wall sit, also known as a Roman Chair, is an exercise done to strengthen the quadriceps muscles.",
					image: "img/wallsit.png",
					videos: ["//www.youtube.com/embed/y-wV4Venusw", "//www.youtube.com/embed/MMV3v4ap4ro"],
					procedure: "1. Stand tall against a wall with your head and back touching the wall.\
						2. Position your feet so that they are shoulder-width apart and a few inches away from the wall.\
						3. Rest your arms at your sides.\
						4. Bend your knees and lower into a squat position until your thighs are parallel to the floor and hold the position\
						5. Return to starting position by straightening your knees and standing tall again."
				}),
				duration: 10
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