
import det from './determinant';
import inv from './invert';

export default class Matrix {
	constructor(rows, cols, elements) {
		if(cols === void 0 && elements === void 0) {
			return fromTable(rows);
		}

		this.rows = rows;
		this.cols = cols;
		this.size = rows * cols;
		this.elements = elements;
	}

	_index(row, col) {
		return (row * this.cols) + col;
	}

	_reverseIndex(index) {
		return [
			Math.floor(index / this.rows),
			index % this.rows
		];
	}

	get(row, col) {
		var index = this._index(row, col);
		return this.elements[index];
	}

	set(row, col, value) {
		var elems = this.elements.slice(0);
		elems[this._index(row, col)] = value;
		return new Matrix(this.rows, this.cols, elems);
	}

	getRow(row) {
		var lead = row * this.cols;
		return this.elements.slice(lead, lead + this.cols);
	}

	setRow(row, elements) {
		if (!elements || elements.length !== this.rows) {
			throw new Error(`Length of provided elements should be ${this.rows}`);
		}
		return this.map((x, r, c) => {
			return (r === row) ? elements[c] : x;
		});
	}

	getColumn(col) {
		var elems = new Array(this.rows);
		for(var i = this.rows - 1; i >= 0; i--) {
			elems[i] = this.get(i, col);
		}
		return elems;
	}

	setColumn(col, elements) {
		if (!elements || elements.length !== this.cols) {
			throw new Error(`Length of provided elements should be ${this.cols}`);
		}
		return this.map((x, r, c) => {
			return (c === col) ? elements[r] : x;
		});
	}

	getDiagonal(offset = 0) {
		var elems = new Array(this.rows - offset);
		for(var i = this.rows - (offset + 1); i >= 0; i--) {
			elems[i] = this.get(i, i + offset);
		}
		return elems;
	}

	getRightDiagonal(offset = 0) {
		var elems = new Array(this.rows - offset);
		for(var i = this.rows - (offset + 1); i >= 0; i--) {
			elems[i] = this.get(i, this.cols - (i + 1) - offset);
		}
		return elems;
	}

	trace() {
		return this.getDiagonal().reduce((x,y) => x + y);
	}

	rightTrace() {
		return this.getRightDiagonal().reduce((x,y) => x + y);
	}

	add(matrix, operation = (x,y) => x + y) {
		if(!(
			this.size === matrix.size &&
			this.rows === matrix.rows &&
			this.cols === matrix.cols
		)) {
			throw new Error('Cannot add matrices of different dimensions', this, matrix);
		}
		var elems = new Array(this.size);
		for(var i = elems.length - 1; i >= 0; i--) {
			elems[i] = operation(this.elements[i], matrix.elements[i]);
		}
		return new Matrix(this.rows, this.cols, elems);
	}

	subtract(matrix, operation) {
		return this.add(matrix.scale(-1), operation);
	}

	multiply(matrix, operation = (x,y) => x * y) {
		if(this.cols !== matrix.rows) {
			throw new Error('Cannot multiply matrices as rows != cols', this, matrix);
		}
		var size = this.rows * matrix.cols;
		var elems = new Array(size);
		var ret = new Matrix(this.rows, matrix.cols, elems);

		for(var i = 0; i < size; i++) {
			var [row, col] = ret._reverseIndex(i);
			var sum = 0;
			for(var k = this.cols - 1; k >= 0; k--) {
				sum += operation(this.get(row, k), matrix.get(k, col));
			}
			elems[i] = sum;
		}
		return ret;
	}

	joinHorizontal(matrix) {
		if(this.rows !== matrix.rows) {
			throw new Error('Cannot join matrices with different row sizes', this, matrix);
		}
		var elems = [];
		for(var i = this.rows - 1; i >= 0; i--) {
			var left = this.getRow(i);
			var right = matrix.getRow(i);
			elems = elems.concat(left, right);
		}
		return new Matrix(
			this.rows,
			this.cols + matrix.cols,
			elems
		);
	}

	joinVertical(matrix) {
		if(this.cols !== matrix.cols) {
			throw new Error('Cannot join matrices with different column sizes', this, matrix);
		}
		return new Matrix(
			this.rows + matrix.rows,
			this.cols,
			this.elements.concat(matrix.elements)
		);
	}

	clone() {
		return new Matrix(
			this.rows,
			this.cols,
			this.elements
		);
	}

	map(fn) {
		var elems = this.elements.map(function(x, i) {
			var [r,c] = this._reverseIndex(i);
			return fn(x, r, c, this);
		}, this);
		return new Matrix(this.rows, this.cols, elems);
	}

	fmap(fn) {
		/*
			Full map calls fn on every element whereas
			map() ignores undefined indexes
		*/
		var elems = new Array(this.size);
		for(var i = this.size - 1; i >= 0; i--) {
			var [r,c] = this._reverseIndex(i);
			elems[i] = fn(this.elements[i], r, c, this);
		}
		return new Matrix(this.rows, this.cols, elems);
	}

	forEach(fn) {
		var elems = this.elements.forEach(function(x, i) {
			var [r,c] = this._reverseIndex(i);
			fn(x, r, c, this);
		}, this);
	}

	reduce(fn, memo) {
		this.forEach(function(val, row, col, matrix) {
			if(row + col === 0 && memo === void 0) {
				return memo = val;
			}
			memo = fn(memo, val, row, col, matrix);
		});
		return memo;
	}

	scale(scalar) {
		return new Matrix(
			this.rows,
			this.cols,
			this.elements.map(x => x * scalar)
		);
	}

	transpose() {
		var m = new Matrix(this.cols, this.rows, new Array(this.size));
		this.forEach(function(val, row, col) {
			m.set(col, row, val);
		});
		return m;
	}

	identity() {
		if(!this.isSquare()) {
			throw new Error('Cannot invert a non-square matrix', this);
		}
		return this.map((v, r, c) => r - c ? 1 : 0);
	}

	submatrix(tlr, tlc, brr, brc) {
		var rows = brr - tlr;
		var cols = brc - tlc;
		var elems = [];
		this.forEach(function(val, row, col) {
			if(
				(tlr <= row && row < brr) ||
				(tlc <= col && col < brc)
			) {
				elems.push(val);
			}
		});
		return new Matrix(rows, cols, elems);
	}

	minor(row, col) {
		var elems = [];
		this.forEach(function(val, vrow, vcol) {
			if(vrow !== row && vcol !== col) {
				elems.push(val);
			}
		});
		return new Matrix(this.rows-1, this.cols-1, elems);
	}

	cofactor(row, col) {
		var n = this.minor(row, col).determinant();
		return (row+col) % 2 ? n : -n;
	}

	cofactorMatrix() {
		return this.map((_, row, col, mat) => mat.cofactor(row, col));
	}

	invert() {
		if(!this.isSquare()) {
			throw new Error('Cannot invert a non-square matrix', this);
		}
		var det = this.determinant();
		if(det === 0) {
			throw new Error('Cannot invert a square matrix whose det = 0', this);
		}
		return inv(this, det);
	}

	determinant() {
		if(!this.isSquare()) {
			throw new Error('Cannot get the determinant of a non-square matrix', this);
		}
		return det(this);
	}

	isSquare() {
		return this.rows === this.cols;
	}

	equals(matrix) {
		return (
			matrix &&
			this.size === matrix.size &&
			this.rows === matrix.rows &&
			this.cols === matrix.cols &&
			matrix.elements &&
			this.elements.valueOf === matrix.elements.valueOf
		);
	}

	toArray() {
		return this.elements;
	}

	toTable() {
		var table = new Array(this.rows);
		for(var i = this.rows - 1; i >= 0; i--) {
			var lead = i * this.cols;
			table[i] = this.elements.slice(lead, lead + this.cols);
		}
		return table;
	}

	toString() {
		if(this.rows === 1) {
			return '['+this.elements.join(' ')+']';
		}

		var nums = this.elements.map(x => x.toString());
		var maxl = nums.reduce(
			((s,c) => s > c.length ? s : c.length), []);

		nums = nums.map(n =>
			(new Array(maxl - n.length).join(" "))+(n || '-')+" "
		);

		var str = "";
		for(var i = 0; i < this.rows; i++) {
			var lead = this.cols * i;
			var inner = nums
				.slice(lead, lead + this.cols)
				.join('');
			if(i === 0) {
				str += '⎡ '+inner+'⎤\n';
			} else if(i === this.rows - 1) {
				str += '⎣ '+inner+'⎦';
			} else {
				str += '⎜ '+inner+'⎟\n';
			}
		}
		return str;
	}

}

function fromTable(table) {
	var rows = table.length;
	var cols = table[0].length;
	var elems = new Array(rows * cols);
	for(var r = rows - 1; r >= 0; r--) {
		for(var c = cols - 1; c >= 0; c--) {
			elems[(r * cols) + c] = table[r][c];
		}
	}
	return new Matrix(rows, cols, elems);
}

