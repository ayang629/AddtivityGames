'use strict';

angular.module('users').filter('range', [
	function() {
		return function(input, min, max) {
			min = parseInt(min); //Make string input int
		    max = parseInt(max);
		    if (min > max){
		    	for(var i = min; i >= max; i--)
		    		input.push(i);
		    }else{
			    for (var j=min; j<=max; j++)
			      input.push(j);
			}
		    return input;
		};
	}
]);