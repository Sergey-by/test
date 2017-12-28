const STEPS_NUMBER = 10;
const MATRIX_SIZE = 8;
const DIRECTIONS = {
	'UP': {
		x: -1,
		y: 0
	},
	'RIGHT': {
		x: 0,
		y: 1
	},
	'DOWN': {
		x: 1,
		y: 0
	},
	'LEFT': {
		x: 0,
		y: -1
	}
}

let itinStack = [];
let result = [];
let allResults = [];
let counderID = 0;
let startPoint = { 
	x: 5,
	y: 0
};

function getMatrix() {
	// let result = [];
	// let domElements = document.querySelectorAll('.snowclean-cell .g45-snow:not(.i45-player)');
	// domElements.forEach(function(item){result.push(convertMatrixItem(item.classList[1]))});
	// return chunk(result, 8);
	
	return [
	[1, -1, 1, 1, 1, 2, 1, 1],
	[1, 2, 2, 1, 2, 1, 1, 1],
	[1, 1, -1, 1, 1, -1, 1, 1],
	[2, 1, 1, 1, 2, 1, 1, -1],
	[2, -1, 1, 1, 1, -1, 2, 1],
	[0, 1, 1, 1, 1, 2, 1, 1],
	[-1, 1, 1, 1, 1, -1, 1, 1],
	[1, 1, -1, 1, 1, 1, 1, 1]
	]
}

Array.prototype.cloneArr = function() {
	let result = [];

	this.forEach(function(item) {
		result.push(item.slice());
	});

	return result;
}

function itinerary(matrix, position, stepNumber, route, count) {
	this.id = counderID++;
	this.matrix = matrix.slice().cloneArr();
	this.route = route.slice();
	this.position = Object.assign({}, position);
	this.stepNumber = stepNumber;
	this.count = count;

	this.makeStep = function(){
		let currDirection = route[route.length - 1];
		let tempX = this.position.x + DIRECTIONS[currDirection].x;
		let tempY = this.position.y + DIRECTIONS[currDirection].y;
		let tempCount = 0;

		if(tempX >= 0 && tempX < MATRIX_SIZE && tempY >= 0 && tempY < MATRIX_SIZE) {
			tempCount = this.matrix[tempX][tempY];
			if(tempCount != 'x') {
				this.position.x = tempX;
				this.position.y = tempY;
				this.count += tempCount;
				this.matrix[tempX][tempY] = 0;
	 			this.makeStep();
			} else {
				this.count--;
			}
		}
	}

	return this;
}

function helper() {
	while(itinStack.length > 0) {
		var itin = itinStack.pop();
		var stepNumber = itin.stepNumber;
		var matrix = itin.matrix.slice().cloneArr();
		var position = itin.position;
		if(stepNumber < STEPS_NUMBER) {


			let newRout = itin.route.slice();
			if(newRout[0] == 'RIGHT'){
				if(newRout[1] == 'DOWN'){
					if(newRout[2] == 'LEFT'){
						if(newRout[3] == 'UP'){
							if(newRout[4] == 'RIGHT'){
								if(newRout[5] == 'LEFT'){
									if(newRout[6] == 'DOWN'){
										if(newRout[7] == 'RIGHT'){
											if(newRout[8] == 'LEFT'){
												alert(1);
											}
										}
									}
								}
							}
						}
					}
				}
			}



			const directions = getDirections(position, matrix);
			for(var i = 0; i < directions.length; i++) {
				let newRout = itin.route.slice();
				newRout.push(directions[i]);
				var tempItem = new itinerary(matrix.slice(), itin.position, itin.stepNumber + 1, newRout, itin.count);
				tempItem.makeStep();
				itinStack.push(tempItem);
				
			}
		} else {
			checkMax(itin);
		}
	}
	console.log(result);
}

function checkMax(itin){
	allResults.push(itin);
	if(result.length) {
		if(itin.count > result[0].count) {
			result.length = 0;
			result.push(itin);
		} else if(itin.count == result[0].count) {
			result.push(itin);
		}
	} else {
		result.push(itin);
	}
}

function getDirections(position, matrix) {
	var directions = [];

	if(position.x > 0 && matrix[position.x + DIRECTIONS.UP.x][position.y] != 'x') directions.push('UP');
	if(position.y < MATRIX_SIZE -1 && matrix[position.x][position.y + DIRECTIONS.RIGHT.y] != 'x') directions.push('RIGHT');
	if(position.x < MATRIX_SIZE -1 && matrix[position.x + DIRECTIONS.DOWN.x][position.y] != 'x') directions.push('DOWN');
	if(position.y > 0 && matrix[position.x][position.y + DIRECTIONS.LEFT.y] != 'x') directions.push('LEFT');

	return directions;

}

function getMatrixDOM() {
	let result = '';
	const MATRIX = getMatrix();

	MATRIX.forEach(function(arr) {
		result += '<div>';
		arr.forEach(function(key) {
			result += '<span>' + key + '</span>';
		})
		result += '</div>';
	});
	return result;
}

var t = new itinerary(getMatrix(), startPoint, 0, [], 0);
itinStack.push(t);
helper();

function convertMatrixItem(element) {
	switch(element) {
	    case 'i45-snowdrift-big':
	        return 2;
	    case 'i45-snowdrift':
	        return 1;
	        case 'i45-clean':
	        return 0;
	    case 'i45-ice':
	        return -1;
	}
}

function chunk (arr, len) {
  var chunks = [], i = 0, n = arr.length;
  while (i < n) {
    chunks.push(arr.slice(i, i += len));
  }
  return chunks;
}