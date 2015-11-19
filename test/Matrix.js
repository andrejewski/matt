
var assert = require('assert');
var Matrix = require('..').Matrix;

describe('Matrix', function() {
	beforeEach(function() {
		this.m1 = new Matrix(3, 3, [1,2,3,1,2,3,1,2,3]);
		this.m2 = new Matrix(2, 2, [1,2,3,4]);
	});

	describe('constructor(rows Number, cols Number, elements [Any]) Matrix', function() {
		it('should accept a multi-dimensional array', function() {
			var m3 = new Matrix([
				[1,2,3],
				[1,2,3],
				[1,2,3]
			]);
			assert(this.m1.equals(m3));

			var m4 = new Matrix([
				[1,2],
				[3,4]
			]);
			assert(this.m2.equals(m4));

			assert(this.m1.equals(new Matrix(this.m1.toTable())));
			assert(this.m2.equals(new Matrix(this.m2.toTable())));
		});
		it('should initialize with a rows Number property', function() {
			assert.equal(this.m1.rows, 3);
			assert.equal(this.m2.rows, 2);
		});

		it('should initialize with a cols Number property', function() {
			assert.equal(this.m1.cols, 3);
			assert.equal(this.m2.cols, 2);
		});

		it('should initialize with a size Number property', function() {
			assert.equal(this.m1.size, 9);
			assert.equal(this.m2.size, 4);
		});

		it('should initialize with an elements [Any] property', function() {
			assert.equal(this.m1.elements.length, 9);
			assert.equal(this.m2.elements.length, 4);

			assert.deepEqual(
				[1,2,3,1,2,3,1,2,3],
				this.m1.elements
			);

			assert.deepEqual(
				[1,2,3,4], this.m2.elements
			);
		});
	});

	describe('get(row Number, col Number) Any', function() {
		it('should return the element at the specified position', function() {
			assert(this.m1.get(0,0) === 1);
			assert(this.m2.get(0,0) === 1);

			assert(this.m1.get(2,2) === 3);
			assert(this.m2.get(1,1) === 4);

			assert(this.m1.get(1,0) === 1);
			assert(this.m2.get(1,0) === 3);
		});
	});

	describe('set(row Number, col Number, value Any) Matrix', function() {
		it('should return the element at the specified position', function() {
			assert(this.m1.set(0,0,1).get(0,0) === 1);
			assert(this.m2.set(0,0,1).get(0,0) === 1);

			assert(this.m1.set(2,2,3).get(2,2) === 3);
			assert(this.m2.set(1,1,4).get(1,1) === 4);

			assert(this.m1.set(1,0,1).get(1,0) === 1);
			assert(this.m2.set(1,0,3).get(1,0) === 3);
		});

		it('should return a new matrix', function() {
			assert(this.m1 !== this.m1.set(0,0,5));
			assert(this.m2 !== this.m2.set(2,2,5));
		});
	});

	describe('getRow(row Number) [Any]', function() {
		it('should return the matrix elements of a given row', function() {
			assert.deepEqual([1,2,3], this.m1.getRow(0));
			assert.deepEqual([1,2,3], this.m1.getRow(1));
			assert.deepEqual([1,2,3], this.m1.getRow(2));

			assert.deepEqual([1,2], this.m2.getRow(0));
			assert.deepEqual([3,4], this.m2.getRow(1));
		});
	});

	describe('setRow(row Number, elements [Any]) [Matrix]', function() {
		it('should return a new matrix with updated row', function() {
			var m3 = this.m1.setRow(0, [4,5,6]);
			assert.deepEqual([1,2,3], this.m1.getRow(0));
			assert.deepEqual([4,5,6], m3.getRow(0));
		});
		it('should throw if not enough elements are provided', function() {
			var m1 = this.m1;

			assert.throws(function() {
				m1.setRow(0, [4, 5]);
			})
		});
		it('should throw if more elements are provided', function() {
			var m1 = this.m1;

			assert.throws(function() {
				m1.setRow(0, [4, 5, 6, 7]);
			})
		});
	});

	describe('getColumn(col Number) [Any]', function() {
		it('should return the matrix elements of a given column', function() {
			assert.deepEqual([1,1,1], this.m1.getColumn(0));
			assert.deepEqual([2,2,2], this.m1.getColumn(1));
			assert.deepEqual([3,3,3], this.m1.getColumn(2));

			assert.deepEqual([1,3], this.m2.getColumn(0));
			assert.deepEqual([2,4], this.m2.getColumn(1));
		});
	});

	describe('setColumn(col Number, elements [Any]) [Matrix]', function() {
		it('should return a new matrix with updated column', function() {
			var m3 = this.m1.setColumn(0, [4,5,6]);
			assert.deepEqual([1,1,1], this.m1.getColumn(0));
			assert.deepEqual([4,5,6], m3.getColumn(0));
		});

		it('should throw if not enough elements are provided', function() {
			var m1 = this.m1;

			assert.throws(function() {
				m1.setColumn(0, [4, 5]);
			})
		});
		it('should throw if more elements are provided', function() {
			var m1 = this.m1;

			assert.throws(function() {
				m1.setColumn(0, [4, 5, 6, 7]);
			})
		});
	});

	describe('getDiagonal(<offset Number = 0>) [Any]', function() {
		it('should return the left diagonal elements of the matrix', function() {
			assert.deepEqual([1,2,3], this.m1.getDiagonal());
			assert.deepEqual([1,4], this.m2.getDiagonal());
		});
		it('should return the left diagonal elements right of given offset', function() {
			assert.deepEqual([1,2,3], this.m1.getDiagonal(0));
			assert.deepEqual([1,4], this.m2.getDiagonal(0));

			assert.deepEqual([2,3], this.m1.getDiagonal(1));
			assert.deepEqual([2], this.m2.getDiagonal(1));

			assert.deepEqual([3], this.m1.getDiagonal(2));
			assert.deepEqual([], this.m2.getDiagonal(2));
		});
	});

	describe('getRightDiagonal(<offset Number = 0>) [Any]', function() {
		it('should return the right diagonal elements of the matrix', function() {
			assert.deepEqual([3,2,1], this.m1.getRightDiagonal());
			assert.deepEqual([2,3], this.m2.getRightDiagonal());
		});
		it('should return the right diagonal elements left of given offset', function() {
			assert.deepEqual([3,2,1], this.m1.getRightDiagonal(0));
			assert.deepEqual([2,3], this.m2.getRightDiagonal(0));

			assert.deepEqual([2,1], this.m1.getRightDiagonal(1));
			assert.deepEqual([1], this.m2.getRightDiagonal(1));

			assert.deepEqual([1], this.m1.getRightDiagonal(2));
			assert.deepEqual([], this.m2.getRightDiagonal(2));
		});
	});

	describe('trace() Number', function() {
		it('should return the sum of left diagonal elements of the matrix', function() {
			assert.equal(6, this.m1.trace());
			assert.equal(5, this.m2.trace());
		});
	});

	describe('rightTrace() Number', function() {
		it('should return the sum of right diagonal elements of the matrix', function() {
			assert.equal(6, this.m1.rightTrace());
			assert.equal(5, this.m2.rightTrace());
		});
	});

	describe('add(matrix Matrix, <reduce Function(elementA Any, elementB Any) Any>) Matrix', function() {
		it('should return this matrix added to the given matrix', function() {
			var m1 = this.m1;
			assert(m1.add(m1).equals(m1.scale(2)));

			var m2 = this.m2;
			assert(m2.add(m2).equals(m2.scale(2)));
		});
		it('should add with the reduce function if provided', function() {
			function id(x,y) {
				return x;
			}

			var m1 = this.m1;
			var m2 = this.m2;
			assert(m1.equals(m1.add(m1, id)));
			assert(m2.equals(m2.add(m2, id)));
		});
		it('should throw if the matrices cannot be added', function() {
			var m1 = this.m1;
			var m2 = this.m2;

			assert.doesNotThrow(function() {
				m1.add(m1);
				m2.add(m2);
			});
			assert.throws(function() {
				m1.add(m2);
			});
			assert.throws(function() {
				m2.add(m1);
			});
		});
	});

	describe('subtract(matrix Matrix, <reduce Function(elementA Any, elementB Any) Any>) Matrix', function() {
		it('should return this matrix subtracted by the given matrix', function() {
			var m1 = this.m1;
			assert(m1.subtract(m1).equals(m1.scale(0)));

			var m2 = this.m2;
			assert(m2.subtract(m2).equals(m2.scale(0)));
		});
		it('should subtract with the reduce function if provided', function() {
			function id(x,y) {
				return x;
			}

			var m1 = this.m1;
			var m2 = this.m2;
			assert(m1.equals(m1.subtract(m1, id)));
			assert(m2.equals(m2.subtract(m2, id)));
		});
		it('should throw if the matrices cannot be subtracted', function() {
			var m1 = this.m1;
			var m2 = this.m2;

			assert.doesNotThrow(function() {
				m1.subtract(m1);
				m2.subtract(m2);
			});
			assert.throws(function() {
				m1.subtract(m2);
			});
			assert.throws(function() {
				m2.subtract(m1);
			});
		});
	});

	describe('multiply(matrix Matrix, <reduce Function(elementA Any, elementB Any) Any>) Matrix', function() {
		it('should return this matrix multipled by the given matrix', function() {
			var m1 = this.m1;
			var m2 = this.m2;
			var m3 = this.m1.multiply(m1);

			assert(m1.rows === m3.rows);
			assert(m1.cols === m3.cols);
			assert(m1.size === m3.size);
			assert(m3.equals(new Matrix(3,3, [
				30, 36, 42,
				66, 81, 96,
				102, 126, 150
			])));

			var m4 = this.m2.multiply(m2);

			assert(m2.rows === m4.rows);
			assert(m2.cols === m4.cols);
			assert(m2.size === m4.size);
			assert(m4.equals(new Matrix(2,2, [
				7, 10,
				15, 22
			])));

		});
		it('should add with the reduce function if provided', function() {
			function id(x,y) {
				return x;
			}

			var m1 = this.m1;
			var m2 = this.m2;
			assert(m1.equals(m1.multiply(m1, id)));
			assert(m2.equals(m2.multiply(m2, id)));
		});
		it('should throw if the matrices cannot be multiply', function() {
			var m1 = this.m1;
			var m2 = this.m2;

			assert.doesNotThrow(function() {
				m1.multiply(m1);
				m2.multiply(m2);
			});
			assert.throws(function() {
				m1.multiply(m2);
			});
			assert.throws(function() {
				m2.multiply(m1);
			});
		});
	});

	describe('joinHorizontal(matrix Matrix) Matrix', function() {
		it('should return this matrix joined horizontally by the given matrix', function() {
			var m3 = this.m1.joinHorizontal(this.m1);
			var m4 = new Matrix(3, 6, [
				1, 2, 3, 1, 2, 3,
				1, 2, 3, 1, 2, 3,
				1, 2, 3, 1, 2, 3
			]);
			assert(m3.equals(m4));

			var m5 = this.m2.joinHorizontal(this.m2);
			var m6 = new Matrix(2, 4, [
				1, 2, 1, 2,
				3, 4, 3, 4
			]);
			assert(m5.equals(m6));
		});
		it('should throw if the matrices cannot be joined horizontally', function() {
			var m1 = this.m1;
			var m2 = this.m2;

			assert.doesNotThrow(function() {
				m1.joinHorizontal(m1);
				m2.joinHorizontal(m2);
			});
			assert.throws(function() {
				m1.joinHorizontal(m2);
			});
			assert.throws(function() {
				m2.joinHorizontal(m1);
			});
		});
	});

	describe('joinVertical(matrix Matrix) Matrix', function() {
		it('should return this matrix joined vertically by the given matrix', function() {
			var m3 = this.m1.joinVertical(this.m1);
			var m4 = new Matrix(6, 3, [
				1, 2, 3,
				1, 2, 3,
				1, 2, 3,
				1, 2, 3,
				1, 2, 3,
				1, 2, 3
			]);
			assert(m3.equals(m4));

			var m5 = this.m2.joinVertical(this.m2);
			var m6 = new Matrix(4, 2, [
				1, 2,
				3, 4,
				1, 2,
				3, 4
			]);
			assert(m5.equals(m6));
		});
		it('should throw if the matrices cannot be joined vertically', function() {
			var m1 = this.m1;
			var m2 = this.m2;

			assert.doesNotThrow(function() {
				m1.joinVertical(m1);
				m2.joinVertical(m2);
			});
			assert.throws(function() {
				m1.joinVertical(m2);
			});
			assert.throws(function() {
				m2.joinVertical(m1);
			});
		});
	});

	describe('clone() Matrix', function() {
		it('should return a copy of this matrix', function() {
			assert(this.m1 !== this.m1.clone());
			assert(this.m1.equals(this.m1.clone()));
		});
	});

	describe('map(fn Function(element Any, row Number, col Number, matrix Matrix)) Matrix', function() {
		it('should return a transformed matrix', function() {
			var m3 = this.m2.map(function(x) {
				return x * 2;
			});
			var m4 = this.m2.scale(2);

			assert(m3 instanceof Matrix);
			assert(m3.equals(m4));
		});
	});

	describe('fmap(fn Function(element Any, row Number, col Number, matrix Matrix)) Matrix', function() {
		it('should return a transformed matrix', function() {
			var m3 = this.m2.fmap(function(x) {
				return x * 2;
			});
			var m4 = this.m2.scale(2);

			assert(m3 instanceof Matrix);
			assert(m3.equals(m4));
		});
		it('should map all (even undefined) indexes', function() {
			function f0() {return 0;}
			var z1 = this.m1.fmap(f0);

			var m3 = new Matrix(3, 3, []);
			var z3 = m3.fmap(f0);

			var z0 = new Matrix(3, 3, [
				0, 0, 0,
				0, 0, 0,
				0, 0, 0
			]);
			assert(z1.equals(z0));
			assert(z3.equals(z0));
			assert(z1.equals(z3));
		});
	});

	describe('forEach(fn Function(element Any, row Number, col Number, matrix Matrix)) void', function() {
		it('should call the given function with each element', function() {
			var m1 = this.m1;
			var m3 = new Matrix(3,3, new Array(9));
			var calls = 0;
			m1.forEach(function(val, row, col, mat) {
				calls++;
				m3.set(row, col, val);
			});

			assert.equal(calls, 9);
			assert(m3.equals(m1));
		});
	});

	describe('reduce(fn Function(acc Any, value Any, row Number, col Number, matrix Matrix), <memo Any = M(0,0)>) Matrix', function() {
		it('should return the accumulated value of fn on the matrix', function() {
			function add(x,y) {return x + y;}

			assert.equal(18, this.m1.reduce(add));
			assert.equal(10, this.m2.reduce(add));
		});
		it('should accept an initial accumulator value', function() {
			function add(x,y) {return x + y;}

			assert.equal(38, this.m1.reduce(add, 20));
			assert.equal(30, this.m2.reduce(add, 20));
		});
	});

	describe('scale(num Number) Matrix', function() {
		it('should return a new scaled matrix', function() {
			var m3 = new Matrix(2, 2, [2,4,6,8]);
			var m4 = this.m2.scale(2);

			assert(m4 instanceof Matrix);
			assert(m3.equals(m4));
		});
	});

	describe('transpose() Matrix', function() {
		it('should return the transposed form of this matrix', function() {
			var m1 = this.m1;
			var m2 = this.m2;
			var m3 = this.m1.transpose();

			assert(m1.size === m3.size);
			assert(m1.rows === m3.cols);
			assert(m1.cols === m3.rows);

			var m4 = this.m2.transpose();

			assert(m2.size === m4.size);
			assert(m2.rows === m4.cols);
			assert(m2.cols === m4.rows);

			// http://en.wikipedia.org/wiki/Transpose#Properties
			var A = new Matrix(2, 2, [4,5,6,7]);
			var B = new Matrix(2, 2, [8,9,10,11]);

			// (A`)` = A
			assert(A.transpose().transpose().equals(A));

			// (A+B)` = A` + B`
			assert(
				A.add(B).transpose().equals(
					A.transpose().add(B.transpose())
				)
			);

			// (AB)` = B`A`
			assert(
				A.multiply(B).equals(
					B.transpose().multiply(A.transpose())
				)
			);

		});
	});

	describe('identity() Matrix', function() {
		it('should return the identity matrix of the matrix', function() {
			var m3 = new Matrix(3,3, [
				1, 0, 0,
				0, 1, 0,
				0, 0, 1
			]);
			assert(this.m1.identity().equals(m3));

			var m4 = new Matrix(2,2, [1,0,0,1]);
			assert(this.m2.identity().equals(m4));
		});
		it('should throw if the matrix is not square', function() {
			var m1 = this.m1;
			var m2 = this.m2;
			var m3 = new Matrix(1,3, [1,2,3]);
			var m4 = new Matrix(3,4, [
				1, 2, 3, 4,
				5, 6, 7, 8,
				9,10,11,12
			]);

			assert.throws(function() {
				m3.invert();
			});
			assert.throws(function() {
				m4.invert();
			});
		});
	});

	describe('submatrix(topLeftRow Number, topLeftCol Number, bottomRightRow Number, bottomRightCol Number) Matrix', function() {
		it('should return the specified submatrix', function() {
			var m1s = this.m1.submatrix(0,0,2,2);
			assert(m1s.equals(new Matrix(2,2, [
				1, 2,
				1, 2
			])));

			var m2s = this.m2.submatrix(0,0,1,1);
			assert(m2s.equals(new Matrix(1,1,[1])));
		});
	});

	describe('minor(row Number, col Number) Matrix', function() {
		it('should return the specified minor of the matrix', function() {
			var m1 = this.m1;

			// top-left
			var min1 = m1.minor(0,0);
			assert(min1.equals(new Matrix(2,2, [
				2, 3,
				2, 3
			])));

			// bottom-left
			var min2 = m1.minor(2,0);
			assert(min2.equals(new Matrix(2,2, [
				2, 3,
				2, 3
			])));

			// top-right
			var min3 = m1.minor(0,2);
			assert(min3.equals(new Matrix(2,2, [
				1, 2,
				1, 2,
			])));

			// bottom-right
			var min4 = m1.minor(2,2);
			assert(min4.equals(new Matrix(2,2, [
				1, 2,
				1, 2
			])));

			// center
			var min5 = m1.minor(1,1);
			assert(min4.equals(new Matrix(2,2, [
				1, 3,
				1, 3
			])));
		});
	});

	describe('cofactor(row Number, col Number) Number', function() {
		it('should return the cofactor of the specified matrix element', function() {
			var m1 = this.m1;
			var c1 = new Matrix(3,3, [
				0, 0, 0,
				0, 0, 0,
				0, 0, 0
			]);
			m1.forEach(function(val, row, col) {
				assert.equal(
					m1.cofactor(row, col),
					c1.get(row, col)
				);
			});
		});
	});

	describe('cofactorMatrix() Matrix', function() {
		it('should return the matrix cofactors in a matrix', function() {
			var m1 = this.m1.cofactorMatrix();
			var c1 = new Matrix(3,3, [
				0, 0, 0,
				0, 0, 0,
				0, 0, 0
			]);
			assert(m1.equals(c1));
		});
	});

	describe('invert() Matrix', function() {
		it('should return the inversion of the matrix', function() {
			// 1x1
			assert(new Matrix(1,1,[1]).equals(
				new Matrix(1,1,[1]).invert()
			));
			assert(new Matrix(1,1,[0.5]).equals(
				new Matrix(1,1,[2]).invert()
			));
			// 2x2
			assert(new Matrix(2,2,[-2, 1, 3/2, (-1/2)]).equals(
				this.m2.invert()
			));
			// 3x3
			var n3 = new Matrix(3,3, [
				4, 2, 0,
				5, 6, 7,
				1, 3, 9
			]);
			var n3i = new Matrix(3,3, [
				33/56, 	-9/28, 1/4,
				-19/28, 9/14, -1/2,
				9/56, 	-5/28, 1/4
			]);
			assert(n3.invert().equals(n3i));
			// NxN
			var n4 = new Matrix(4, 4, [
				1, 3, 5, 7,
				2, 4, 6, 8,
				4, 6, 2, 8,
				7, 1, 3, 5
			]);
			var n4i = new Matrix(4, 4, [
				-3/8, 	1/4, 	0, 		1/8,
				-43/40, 19/20, 	1/10, 	-7/40,
				-29/40, 17/20, 	-1/5, 	-1/40,
				47/40, 	-21/20, 1/10, 	3/40
			]);
			assert(n4.invert().equals(n4i));
		});
		it('should throw if the matrix is not square', function() {
			var m1 = this.m1;
			var m2 = this.m2;
			var m3 = new Matrix(1,3, [1,2,3]);
			var m4 = new Matrix(3,4, [
				1, 2, 3, 4,
				5, 6, 7, 8,
				9,10,11,12
			]);

			assert.throws(function() {
				m3.invert();
			});
			assert.throws(function() {
				m4.invert();
			});
		});
		it('should throw if the determinant is zero', function() {
			var m1 = this.m1;
			var m2 = this.m2;

			assert.throws(function() {
				m1.invert();
			});
		});
	});

	describe('determinant() Number', function() {
		it('should return the determinant of the matrix', function() {
			// 1x1
			assert.equal(1, new Matrix(1,1,[1]).determinant());
			// 2x2
			assert.equal(-2, this.m2.determinant());
			// 3x3
			assert.equal(0, this.m1.determinant());
			// NxN
			var n4 = new Matrix(4, 4, [
				1, 3, 5, 7,
				2, 4, 6, 8,
				4, 6, 2, 8,
				7, 1, 3, 5
			]);
			assert.equal(160, n4.determinant());

			var n5 = new Matrix(5,5, [
				1, 3, 5, 7, 2,
				1, 6, 4, 2, 6,
				5, 7, 2, 1, 3,
				4, 2, 6, 1, 6,
				1, 1, 2, 5, 7
			]);
			assert.equal(7410, n5.determinant());

			var n6 = new Matrix(6,6,[
				1, 2, 3, 6, 5, 4,
				1, 2, 3, 6, 5, 4,
				1, 2, 3, 6, 5, 4,
				1, 2, 3, 6, 5, 4,
				1, 2, 3, 6, 5, 4,
				1, 2, 3, 6, 5, 4
			]);
			assert.equal(0, n6.determinant());

			var n8 = new Matrix(8,8, [
				1, 2, 3, 6, 5, 4, 8, 7,
				1, 2, 3, 6, 5, 4, 8, 7,
				1, 2, 3, 6, 5, 4, 8, 7,
				1, 2, 3, 6, 5, 4, 8, 7,
				1, 2, 3, 6, 5, 4, 8, 7,
				1, 2, 3, 6, 5, 4, 8, 7,
				1, 2, 3, 6, 5, 4, 8, 7,
				1, 2, 3, 6, 5, 4, 8, 7
			]);
			assert.equal(0, n8.determinant());
		});
		it('should throw if the matrix is not square', function() {
			var m1 = this.m1;
			var m2 = this.m2;
			var m3 = new Matrix(1,3, [1,2,3]);
			var m4 = new Matrix(3,4, [
				1, 2, 3, 4,
				5, 6, 7, 8,
				9,10,11,12
			]);

			assert.doesNotThrow(function() {
				m1.determinant();
				m2.determinant();
			});
			assert.throws(function() {
				m3.determinant();
			});
			assert.throws(function() {
				m4.determinant();
			});
		});
	});

	describe('isSquare() boolean', function() {
		it('should return whether the matrix\'s rows = cols', function() {
			assert(this.m1.isSquare());
			assert(this.m2.isSquare());

			var m3 = new Matrix(1, 3, [2, 4, 5]);
			assert(!m3.isSquare());
		});
	});

	describe('equals(matrix Matrix) boolean', function() {
		it('should return whether this equals the given matrix', function() {
			assert(this.m1.equals(this.m1));
			assert(this.m2.equals(this.m2));

			var m1 = new Matrix(3, 3, [1,2,3,1,2,3,1,2,3]);
			var m2 = new Matrix(2, 2, [1,2,3,4]);

			assert(m1.equals(this.m1));
			assert(m2.equals(this.m2));

			assert(!m1.equals(false));
			assert(!m1.equals({
				rows: 3,
				cols: 3,
				size: 9
			}));
			assert(!m1.equals(m2));
		});
	});

	describe('toArray() [Any]', function() {
		it('should return an array of matrix elements', function() {
			assert(typeof this.m1.toArray() === 'object');
			assert(Array.isArray(this.m1.toArray()));
		});
	});

	describe('toTable() [[Any]]', function() {
		it('should return a multi-dimensional array representation of the matrix', function() {
			assert.deepEqual(this.m1.toTable(), [
				[1,2,3],
				[1,2,3],
				[1,2,3]
			]);
		});
	});

	describe('toString() String', function() {
		it('should return a string representation of a matrix', function() {
			assert(typeof this.m1.toString() === 'string');
		});
	});

});
