
export default function det(matrix) {
	switch(matrix.rows) {
		case 1: return det1(matrix);
		case 2: return det2(matrix);
		case 3: return det3(matrix);
		default: return detN(matrix);
	}
}

// http://en.wikipedia.org/wiki/Determinant#Definition

function det1(matrix) {
	return matrix.get(0,0);
}

function det2(m) {
	/* 	
		| a b |
		| c d | = ad - bc
	*/
	var [a,b,c,d] = m.elements;
	return (a * d) - (b * c);
}

function det3(m) {
	/* 	
		| a b c |
		| d e f | = aei + bfg + cdh - ceg - bdi - afh
		| g h i |
	*/
	var [a,b,c,d,e,f,g,h,i] = m.elements;
	return (
		(a * e * i) +
		(b * f * g) +
		(c * d * h) - 
		(c * e * g) - 
		(b * d * i) -
		(a * f * h)
	);
}

/*
	Speed boosts could be made by deriving more
	literal solving functions.
*/

function detN(m) {
	/*
		| a b c d |
		| e f g h |
		| i j k l | = idk lol
		| m n o p |
	*/
	return m.getRow(0)
		.map((v, i) => v * det(m.minor(0, i)) * Math.pow(-1, i))
		.reduce((x,y) => x + y);
	// ^ need to put this one on my resume
}
