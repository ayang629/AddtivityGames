'use strict';

angular.module('articles').controller('SpaceGameController', function($scope){

	$scope.game = new Phaser.Game(907.5, 600, Phaser.AUTO, 'SpaceGame', { 
		preload: preload, 
		create: create,
		update: update
	});

	function preload() {
		$scope.game.load.image('volcano', '/modules/articles/img/volcanoBG.jpg');
		$scope.game.load.spritesheet('hao', '/modules/articles/img/dude.png', 75, 96, 10);

	}
	
	function create(){
		$scope.game.physics.startSystem(Phaser.Physics.ARCADE);

		$scope.game.add.sprite(0,0, 'volcano');
		$scope.player = $scope.game.add.sprite(32, $scope.game.world.height-150, 'hao');
		$scope.game.physics.arcade.enable($scope.player);

		//  Player physics properties. Give the little guy a slight bounce.
	    $scope.player.body.bounce.y = 0.2;
	    $scope.player.body.gravity.y = 300;
	    $scope.player.body.collideWorldBounds = true;

	    //  Our two animations, walking left and right.
	    $scope.player.animations.add('left', [0, 1, 2, 3], 10, true);
	    $scope.player.animations.add('right', [5, 6, 7, 8], 10, true);
	    $scope.player.animations.add('up', [4], 10, true);
	}

	function update(){
		$scope.cursors = $scope.game.input.keyboard.createCursorKeys();
		//  Reset the players velocity (movement)
	    $scope.player.body.velocity.x = 0;

	    if ($scope.cursors.left.isDown)
	    {
	        //  Move to the left
	        $scope.player.body.velocity.x = -150;

	        $scope.player.animations.play('left');
	    }
	    else if ($scope.cursors.right.isDown)
	    {
	        //  Move to the right
	        $scope.player.body.velocity.x = 150;

	        $scope.player.animations.play('right');
	    }
	    else if($scope.cursors.up.isDown)
	    {
	        //  Move up
	        $scope.player.body.velocity.y = 700;
	        $scope.player.animations.play('up');
	    }
	    else
	    {
	        //  Stand still
	        $scope.player.animations.stop();

	        $scope.player.frame = 4;
	    }
	    //  Allow the $scope.player to jump if they are touching the ground.
	    if ($scope.cursors.up.isDown && $scope.player.body.touching.down)
	    {
	        $scope.player.body.velocity.y = -350;
	    }
	}

});