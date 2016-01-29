'use strict';

angular.module('core').controller('SpaceGameController', function($scope){
	$scope.game = new Phaser.Game(800, 600, Phaser.AUTO, '', { 
		preload: preload, 
		create: create,
		update: update
	});


	function preload() {
		$scope.game.load.image('bkg', 'modules/core/img/nwts.png');
		$scope.game.load.spritesheet('dude', 'modules/core/img/dude.png', 75, 96, 10);
		
	}

	function create() {
		$scope.game.physics.startSystem(Phaser.Physics.ARCADE);
		$scope.game.add.sprite(0, 0, 'bkg');

		$scope.player = $scope.game.add.sprite(32, $scope.game.world.height - 150, 'dude');

		$scope.game.physics.arcade.enable($scope.player);

		$scope.player.body.bounce.y = 0.2;
	    $scope.player.body.gravity.y = 300;
	    $scope.player.body.collideWorldBounds = true;

	    $scope.player.animations.add('left', [0, 1, 2, 3], 10, true);
    	$scope.player.animations.add('right', [5, 6, 7, 8], 10, true);
	}

	function update() {
		$scope.cursors = $scope.game.input.keyboard.createCursorKeys();
		$scope.player.body.velocity.x = 0;
	    if ($scope.cursors.left.isDown)
	    {
	        $scope.player.body.velocity.x = -150;
	        $scope.player.animations.play('left');
	    }
	    else if ($scope.cursors.right.isDown)
	    {
	        $scope.player.body.velocity.x = 150;
	        $scope.player.animations.play('right');
	    }

	    else
	    {
	        //  Stand still
	        $scope.player.animations.stop();

	        $scope.player.frame = 1;
	    }

	    //  Allow the player to jump if they are touching the ground.
	    if ($scope.cursors.up.isDown && $scope.player.body.touching.down)
	    {
	        $scope.player.body.velocity.y = -350;
	    }
	}


});