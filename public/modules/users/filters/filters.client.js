'use strict';

angular.module('users').filter('range', function() {
  return function(input, a, b) {
    a = parseInt(a); //Make string input int
    b = parseInt(b);
    if(a <= b){
	    for (var i=a; i<=b; i++){
	        input.push(i);
	    }
	}
	else{
		for(var j=b; j>=a; j--){
			input.push(j);
		}
	}
    return input;
  };
});
