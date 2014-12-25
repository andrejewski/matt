
// import Matrix from './Matrix';
// ^ bug with dependencies *shock*

function MatrixClass(m) {
	return m.constructor;
}

// http://en.wikipedia.org/wiki/Invertible_matrix#Methods_of_matrix_inversion
export default function inv(matrix, det) {
	switch(matrix.rows) {
		case 1: return inv1(matrix, det);
		case 2: return inv2(matrix, det);
		case 3: return inv3(matrix, det);
		default: return invN(matrix, det);
	}
}



function inv1(m, det) {
	var Matrix = MatrixClass(m);
	return new Matrix(1, 1, [1/det]);
}

function inv2(m, det) {
	var Matrix = MatrixClass(m);
	/*
		( a b )^-1	 ___1__ (  d -b )
		( c d )    = det(A) ( -c  a )
	*/
	var [a,b,c,d] = m.elements;
	var B = new Matrix(2, 2, [d, -b, -c, a]);
	return B.scale(1/det);
}

function inv3(m, det) {
	var Matrix = MatrixClass(m);
	/*
		lol, I ain't deriving this
	*/
	var [a,b,c,d,e,f,g,h,i] = m.elements;
	return new Matrix(3, 3, [
		(e*i)-(f*h), -((b*i)-(c*h)), (b*f)-(c*e),
		-((d*i)-(f*g)), (a*i)-(c*g), -((a*f)-(c*d)),
		(d*h)-(e*g), -((a*h)-(b*g)), (a*e)-(b*d)
	]).scale(1/det);
}

function invN(m, det) {
	return m
		.cofactorMatrix()
		.transpose()
		.scale(1/det);
}
