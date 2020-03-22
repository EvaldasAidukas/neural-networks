let net = new Regression([4], 0.1, 1000);

const x_vals = 
    [0.02375,0.09375,0.09375,0.14625,0.18375,0.23875,0.33375,0.46875,0.51375,0.77375,0.82875,0.94625,0.95625,0.97125]
;

const y_vals = 
    [0.98,0.9025,0.9025,0.8325,0.76,0.6825,0.605,0.4625,0.405,0.265,0.1875,0.0975,0.0825,0.035]
;


net.setInputsX(x_vals);
net.setInputsY(y_vals);

function setup() {
    createCanvas(400, 400);
}

function draw() {

    tf.tidy(() => {
        net.optimize()
    });

    background(0);

    stroke(255);
    strokeWeight(8);
    for (let i = 0; i < x_vals.length; i++) {
        let px = map(x_vals[i], 0, 1, 0, width);
        let py = map(y_vals[i], 0, 1, height, 0);
        point(px, py);
    }

    const lineX = [0, 1];

    const ys = tf.tidy(() => net.predict(lineX));
    let lineY = ys.dataSync();
    ys.dispose();
  
    let x1 = map(lineX[0], 0, 1, 0, width);
    let x2 = map(lineX[1], 0, 1, 0, width);
  
    let y1 = map(lineY[0], 0, 1, height, 0);
    let y2 = map(lineY[1], 0, 1, height, 0);
  
    strokeWeight(2);
    line(x1, y1, x2, y2);

    console.log(tf.memory().numTensors);
    // noLoop();
}
