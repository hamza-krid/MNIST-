let mnist;
let train_index = 0;
let test_index = 0;
let total_test = 0;
let total_correct = 0;
let user_digit;

let nn = new NeuralNetwork(784, 64, 10)
function setup() {
    createCanvas(400, 200).parent('container')
    user_digit = createGraphics(200, 200);
    user_digit.pixelDensity(1);
    loadMnist(function (data) {
        mnist = data;
        console.log(mnist);
    });
}
function draw() {

    guessUserDigit();
    if (mnist) {
        background(0);
        for (let i = 0; i < 20; i++) {
            train();
        }
        // console.log('done')
        test();
    }
    image(user_digit, 0, 0);

    if (mouseIsPressed) {
        user_digit.stroke(255);
        user_digit.strokeWeight(16);
        user_digit.line(mouseX, mouseY, pmouseX, pmouseY);
    }
}


function guessUserDigit() {
    let img = user_digit.get();
    let inputs = [];
    img.resize(28, 28);
    img.loadPixels();
    for (let i = 0; i < 784; i++) {
        inputs[i] = img.pixels[i * 4];
    }
    let prediction = nn.predict(inputs)
    let guess = findMax(prediction);
    select('#user_guess').html(guess)
    return img;
}

// train the neural network
function train() {
    let inputs = [];
    let img = createImage(28, 28);
    img.loadPixels();
    for (let i = 0; i < 784; i++) {
        inputs[i] = mnist.train_images[i + (train_index * 784)] / 255;
        img.pixels[i * 4 + 0] = mnist.train_images[i + train_index * 784]
        img.pixels[i * 4 + 1] = mnist.train_images[i + train_index * 784]
        img.pixels[i * 4 + 2] = mnist.train_images[i + train_index * 784]
        img.pixels[i * 4 + 3] = 255
    }
    img.updatePixels();
    image(img, 200, 0, width / 2, height);


    let num = mnist.train_labels[train_index]
    let targets = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    targets[num] = 1;

    // let prediction = nn.predict(inputs)
    // let guess = findMax(prediction);
    // select('#label').html(num);
    // select('#guess').html(guess);

    nn.train(inputs, targets)

    train_index = (train_index + 1) % mnist.train_labels.length;
    // noLoop();
}
function test() {
    let inputs = []
    for (let i = 0; i < 784; i++) {
        inputs[i] = mnist.test_images[i + (test_index * 784)] / 255;
    }
    let num = mnist.test_labels[test_index]

    let prediction = nn.predict(inputs)
    let guess = findMax(prediction);
    total_test++;
    if (guess == num) {
        total_correct++;
    }

    let percent = 100 * (total_correct / total_test)
    select('#percentage').html(nf(percent, 2, 2) + '%');



    test_index = (test_index + 1) % mnist.test_labels.length;
}

function findMax(arr) {
    let record = 0;
    let index = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > record) {
            record = arr[i];
            index = i;
        }
    } return index;
}
function keyPressed() {
    if (key == ' ') {
        user_digit.background(0);
    }
}