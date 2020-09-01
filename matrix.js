class Matrix {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.matrix = [];


        for (let i = 0; i < this.rows; i++) {
            this.matrix[i] = [];
            for (let j = 0; j < this.cols; j++) {
                this.matrix[i][j] = 0;
            }
        }
    };
    static fromArray(arr) {
        this.arr = new Matrix(arr.length, 1);
        for (let i = 0; i < this.arr.rows; i++) {
            for (let j = 0; j < this.arr.cols; j++) {
                this.arr.matrix[i][j] = arr[i];
            }
        } return this.arr;
    };
    toArray() {
        let arr = [];
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                arr.push(this.matrix[i][j])
            }
        } return arr;
    };
    map(fn) {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                let val = this.matrix[i][j];
                this.matrix[i][j] = fn(val)
            }
        } return this;
    };
    static multiply(b, n) {
        if (b.cols === n.rows) {
            // matrix product
            let result = new Matrix(b.rows, n.cols);
            for (let i = 0; i < result.rows; i++) {
                for (let j = 0; j < result.cols; j++) {
                    let sum = 0;
                    for (let k = 0; k < b.cols; k++) {
                        sum += b.matrix[i][k] * n.matrix[k][j]
                    }
                    result.matrix[i][j] = sum;
                }
            }
            return result;
        }
        else if (b.cols !== n.rows) {
            console.log('Columns of A must match rows of B');
            return undefined;
        }
    }
    multiply(n) {
        if (n instanceof Matrix) {
            if (this.rows === n.rows && this.cols === n.cols) {
                // hadamard prodoct
                for (let i = 0; i < this.rows; i++) {
                    for (let j = 0; j < this.cols; j++) {
                        this.matrix[i][j] *= n.matrix[i][j];
                    }
                } return this;
            }
            else {
                console.log("both matrices should have same rows and columns");
            }
        } else {
            // scalar multiplication
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    this.matrix[i][j] *= n;
                }
            } return this;
        }
    };
    randomize() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.matrix[i][j] = Math.random() * 2 - 1;
            }
        } return this;
    };

    add(n) {
        if (n instanceof Matrix) {
            // element wise
            if (this.rows === n.rows && this.cols === n.cols) {
                for (let i = 0; i < this.rows; i++) {
                    for (let j = 0; j < this.cols; j++) {
                        this.matrix[i][j] += n.matrix[i][j];
                    }
                } return this;
            }
            else {
                console.log("both matrices should have same rows and columns");
            }

        } else {
            // scalar
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    this.matrix[i][j] += n;
                }
            } return this;
        }
    };
    transpose() {
        let matrix_transposed = new Matrix(this.cols, this.rows)
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                matrix_transposed.matrix[j][i] = this.matrix[i][j];
            }
        }
        return matrix_transposed;
    };
    static subtract(m, n) {
        // element wise
        if (m.rows === n.rows && m.cols === n.cols) {
            let result = new Matrix(m.rows, m.cols);
            for (let i = 0; i < result.rows; i++) {
                for (let j = 0; j < result.cols; j++) {
                    // result.matrix[i][j] = 
                    result.matrix[i][j] = m.matrix[i][j] - n.matrix[i][j];
                }
            }
            return result;
        }
        else {
            console.log("both matrices should have same rows and columns");
        }

    };
}
//     subtract(n) {
//         // scalar
//         for (let i = 0; i < this.rows; i++) {
//             for (let j = 0; j < this.cols; j++) {
//                 this.matrix[i][j] -= n;
//             }
//         } return this;
//     }
// };
// export default Matrix;
// // if (typeof module !== 'undefined') {
// //     module.exports = Matrix;
// //   }