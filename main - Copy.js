const STEPS_NUMBER = 1;
const MATRIX_SIZE = 5;
const DIRECTIONS = {
	'TOP': {
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

let test = [];
let results = [];
let counderID = 0;

var startPoint = { 
	x: 3,
	y: 0
};

function itinerary (matrix, position, stepNumber, route, count){
	this.id = counderID ++;
	this.matrix = matrix.slice();
	this.position = position;
	this.stepNumber = stepNumber;
	this.route = route;
	this.count = count;

	this.makeStep = function(){
		let currDirection = route[route.length - 1]
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
				generateItineraries(this);
			}
		} else {
			generateItineraries(this);
		}
	};
};

function generateItineraries(itin) {
	console.log(itin.id, itin.matrix)
	if (itin.stepNumber < STEPS_NUMBER){
		var position = itin.position;
		var matrix = itin.matrix.slice();
		var directions = [];

		if(position.x > 0 && matrix[position.x + DIRECTIONS.TOP.x][position.y] != 'x') directions.push('TOP');
		if(position.y < MATRIX_SIZE -1 && matrix[position.x][position.y + DIRECTIONS.RIGHT.y] != 'x') directions.push('RIGHT');
		if(position.x < MATRIX_SIZE -1 && matrix[position.x + DIRECTIONS.DOWN.x][position.y] != 'x') directions.push('DOWN');
		if(position.y > 0 && matrix[position.x][position.y + DIRECTIONS.LEFT.y] != 'x') directions.push('LEFT');


		directions.forEach(function(direction){
			let newRout = itin.route.slice();
			var newMatrix = Array.from(matrix);
			console.log('nm: ',newMatrix[0]);
			newRout.push(direction);
			
			let newItin = new itinerary(newMatrix, itin.position, itin.stepNumber + 1, newRout, itin.count);
			newItin.makeStep();
		});
	} else {
		console.log('Finished: ', itin);
		results.push({id: itin.id, count: itin.count, route: itin.route});
	}
}

let xxx = new itinerary(getMatrix(), startPoint, 0, [], 0);
generateItineraries(xxx);

function getMatrix() {
	return [[5, 2, 2, 7, 'x'], 
			[3, 1, 2, 1, 3], 
			[1, 'x', 'x', 1, 1], 
			[1, 1, 'x', 3, 3], 
			[1, 1, 1, 'x', 1]];
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

setTimeout(function(){console.log(results)}, 300);

function apple(col) {
    this.arr = [];
    this.color = col;
    this.getInfo = function (xxx) {
        this.arr.push(xxx);
    };
    return this;
}

var t1 = new apple('red');
var t2 = new apple('green');
var t3 = new apple('blue');