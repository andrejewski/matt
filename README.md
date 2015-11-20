Matt
====

Matt is a JavaScript DSL for Matrices. Determinate, transpose, and invert immutable, ES6-ready matrices with ease.

Matt is available on [NPM](https://www.npmjs.org/package/matt).

```sh
npm install matt
```

Matt is pretty intuitive to use if already familiar with common matrix operations and transforms. It looks like this, required in Node.js:

```js
var Matt = require('matt');
var Matrix = Matt.Matrix;
var assert = require('assert');

// list-style (1D Array)
var A = new Matrix(3, 3, [
	1, 2, 3,
	4, 5, 6,
	7, 8, 9
]);

// table-style (2D Array)
var B = new Matrix([
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 9]
]);

assert(A.equals(B));
assert(A.transpose().transpose().equals(A));
assert.equal(A.trace(), B.trace());
```

Also see **[Seth](https://github.com/andrejewski/seth)**, my other mathematical DSL for Set Theory.

## Features

Matt exposes one core `Matrix` ES6 written and ready class with tons of matrix methods. Methods include `get`, `set`, `getRow`, `setRow`, `getColumn`, `setColumn`, `getDiagonal`, `getRightDiagonal`, `trace`, `rightTrace`, `add`, `subtract`, `multiply`, `joinHorizontal`, `joinVertical`, `clone`, `map`, `fmap`, `forEach`, `reduce`, `scale`, `transpose`, `identity`, `submatrix`, `minor`, `cofactor`, `cofactorMatrix`, `invert`, `determinant`, `isSquare`, `equals`, `toArray`, `toTable`, and `toString`.

All methods are tested and throw appropriate errors when the operation is impossible. For example, `determinant` will throw when called on a non-square matrix.

Matrices are immutable. All methods that mutate a matrix will return a new matrix. This means variables will not be overwritten with new data and operations can be chained and composed more functionally.

## Documentation

The method signatures of the Matrix class are listed.

```
constructor(rows Number, cols Number, elements [Any]) Matrix
get(row Number, col Number) Any
set(row Number, col Number, value Any) Matrix
getRow(row Number) [Any]
setRow(row Number, elements [Any]) Matrix
getColumn(col Number) [Any]
setColumn(col Number, elements [Any]) Matrix
getDiagonal(<offset Number = 0>) [Any]
getRightDiagonal(<offset Number = 0>) [Any]
trace() Number
rightTrace() Number
add(matrix Matrix, <reduce Function(elementA Any, elementB Any) Any>) Matrix
subtract(matrix Matrix, <reduce Function(elementA Any, elementB Any) Any>) Matrix
multiply(matrix Matrix, <reduce Function(elementA Any, elementB Any) Any>) Matrix
joinHorizontal(matrix Matrix) Matrix
joinVertical(matrix Matrix) Matrix
clone() Matrix
map(fn Function(element Any, row Number, col Number, matrix Matrix)) Matrix
fmap(fn Function(element Any, row Number, col Number, matrix Matrix)) Matrix
forEach(fn Function(element Any, row Number, col Number, matrix Matrix)) void
reduce(fn Function(acc Any, value Any, row Number, col Number, matrix Matrix), <memo Any = M(0,0)>) Matrix
scale(num Number) Matrix
transpose() Matrix
identity() Matrix
submatrix(topLeftRow Number, topLeftCol Number, bottomRightRow Number, bottomRightCol Number) Matrix
minor(row Number, col Number) Matrix
cofactor(row Number, col Number) Number
cofactorMatrix() Matrix
invert() Matrix
determinant() Number
isSquare() boolean
equals(matrix Matrix) boolean
toArray() [Any]
toTable() [[Any]]
toString() String
```

For complete documentation, please refer to the tests as they double as documentation quite well. In the `matt` directory run:

```sh
npm install && npm run build && npm test
```

## Performance

Every effort has been and will be made to keep Matt performant. As JavaScript is a higher-level language, Matt's performance will not rival the C family's any time soon. However with V8 optimizations, new primitive [data types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), and projects such as [asm.js](http://asmjs.org/), performance will get better over time.

Matt was designed to be ready to embrace these changes. Unlike most matrix implementations, Matt deals with one-dimensional instead of two-dimensional arrays. This decision was made for multiple reasons.

- JavaScript arrays are not really arrays, just objects with some array-like methods. Thus, there is really not much reason to deal with arrays in arrays for the sake of performance.

- Since V8 and others optimize for array methods, Matt uses built-in functions, initializes arrays where possible, and runs for loops wherever possible to gain those speed boosts. Arrays also enjoy faster lookup than tables (2D arrays) while being less messy.

- Typing. It is faster and easier to write `2, 2, [1, 2, 3, 4]` than `[[1,2],[3,4]]`; more with larger and nested matrices. It is also better for the new ES6 destructuring syntax we all will be using soon enough.

These decisions and details are really only important to contributors. The bottom-line is: expect Matt to be just as fast as any other JavaScript matrix library (I know, not setting the bar very high) and to continue seeing more improvements as they become possible in the language.

The places where performance is worst is the same as all other implementations: determinants and inversions when `N` (i.e. `N * N` matrices) is large and anything when `N` is very, very, very large.

## Contributing

I have never taken a class on advanced linear algebra or matrices (heck I'm still in high school). I did read the [Wikipedia page](http://en.wikipedia.org/wiki/Matrix_(mathematics)) a few dozen times. This is just an interest of mine that I saw was lacking in implementation in the open-source JavaScript community at large, so I wanted to attempt to fill the gap.

If you are a professional linear algebraist or even an amateur like me, if there is a bug please open an issue. If there is a feature this DSL should have, more common operations or methods, please point me to them or be hardcore and send me the pull request.

Contributions are incredibly welcome as long as they are standardly applicable and pass the tests (or break bad ones). Tests are written in Mocha and assertions are done with the Node.js core `assert` module.

```bash
# generating source
npm run build
# running tests
npm test
```

Follow me on [Twitter](https://twitter.com/compooter) for updates or just for the lolz and please check out my other [repositories](https://github.com/andrejewski) if I have earned it. I thank you for reading.

