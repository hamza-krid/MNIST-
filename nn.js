// import Matrix from './matrix.js';
function softmax(x) {
    let value;
    let val = []
    let sum = 0;
    for (i = 0; i < x.length; i++) {
        sum += Math.exp(x[i]);
    }
    for (j = 0; j < x.length; j++) {
        value = Math.exp(x[j]) / sum
        val.push(value);
    }
    return val;
}
function sigmoid(x) {
    return 1 / (1 + Math.exp(-x))
}
function dsigmoid(x) {
    return x * (1 - x);
}

class NeuralNetwork {
    constructor(input_nodes, hidden_nodes, output_nodes) {
        this.input_nodes = input_nodes;
        this.hidden_nodes = hidden_nodes;
        this.output_nodes = output_nodes;
        this.weights_ih = new Matrix(this.hidden_nodes, this.input_nodes);
        this.weights_ho = new Matrix(this.output_nodes, this.hidden_nodes);
        this.weights_ih.randomize()
        this.weights_ho.randomize()


        this.bias_h = new Matrix(this.hidden_nodes, 1);
        this.bias_o = new Matrix(this.output_nodes, 1);
        this.bias_h.randomize();
        this.bias_o.randomize();
    }
    predict(input_array) {

        // generating the hidden output 
        let inputs = Matrix.fromArray(input_array);
        let hidden = Matrix.multiply(this.weights_ih, inputs);
        hidden.add(this.bias_h);

        // activation fuction
        hidden.map(sigmoid);


        let output = Matrix.multiply(this.weights_ho, hidden);
        output.add(this.bias_o);
        output.map(sigmoid);
        let output_arr = output.toArray();
        
        // let output_arrr = softmax(output_arr);
        return output_arr;
    };
    train(input_array, targets_array) {
        // Generating the Hidden Outputs
        let inputs = Matrix.fromArray(input_array);

        let hidden = Matrix.multiply(this.weights_ih, inputs);
        hidden.add(this.bias_h);

        // activation fuction
        hidden.map(sigmoid);


        let output = Matrix.multiply(this.weights_ho, hidden);
        output.add(this.bias_o);
        output.map(sigmoid);

        
        // Convert target array to matrix object
        let targets = Matrix.fromArray(targets_array);
        // Calculate the error
        // ERROR =  TARGET - GUESS
        let output_errors = Matrix.subtract(targets, output);

        // Calculate gradients

        // LEARNING RATE
        let learning_rate = 0.1;


        output.map(dsigmoid);
        output.multiply(output_errors);
        let gradient_ho = output.multiply(learning_rate);

        // adjust bias by deltas
        this.bias_o = this.bias_o.add(gradient_ho);


        // transpose hidden
        let hidden_transposed = hidden.transpose();
        // delta weights hidden_outputs
        let delta_weights_ho = Matrix.multiply(gradient_ho, hidden_transposed);

        // adjust weights by deltas
        this.weights_ho = this.weights_ho.add(delta_weights_ho);

        // Calculate hidden error
        let weights_transposed = this.weights_ho.transpose();
        let hidden_errors = Matrix.multiply(weights_transposed, output_errors);

        // delta weights input_hidden

        hidden.map(dsigmoid);
        hidden = hidden.multiply(hidden_errors);
        let gradient_ih = hidden.multiply(learning_rate);

        // adjust bias by deltas        
        this.bias_h = this.bias_h.add(gradient_ih);

        // transpose inputs
        let inputs_transposed = inputs.transpose();
        let delta_weights_ih = Matrix.multiply(gradient_ih, inputs_transposed);


        // adjust weights by deltas
        this.weights_ih = this.weights_ih.add(delta_weights_ih);

        // console.log("done");
    }
}
// export default NeuralNetwork;