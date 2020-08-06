let net = new Classification([4], 10, 1000);

const trainingData = [
    [0.02375,0.98],
    [0.09375,0.9025],
    [0.09375,0.9025],
    [0.14625,0.8325],
    [0.18375,0.76],
    [0.23875,0.6825],
    [0.33375,0.605],
    [0.46875,0.4625],
    [0.51375,0.405],
    [0.77375,0.265],
    [0.82875,0.1875],
    [0.94625,0.0975],
    [0.95625,0.0825],
    [0.97125,0.035],
];

const expectedOutputs = [
    [0.98],
    [0.9025],
    [0.9025],
    [0.8325],
    [0.76],
    [0.6825],
    [0.605],
    [0.4625],
    [0.405],
    [0.265],
    [0.1875],
    [0.0975],
    [0.0825],
    [0.035],
];

//test data
let testArr = grid(50);

function grid(size){
    let arr = [];
    let a = 0;

    while(a<size * size){
        for(let i = 0; i < size; i++){
            for(let n = 0; n < size; n++){
                arr[a] = [n/size,i/size];
                a++;
            }
        }
    }

    return arr;
}



net.setInputs(tf.tensor(testArr));

net.setTrainingData(tf.tensor(trainingData));
net.setExpectedOutputs(tf.tensor(expectedOutputs));

$('#status').html(net.createNetwork());

const viewData = null; 

$('.train').click(() => {
    trainNet();
});

function trainNet(){
    // let interval = setInterval(() => {updateLoss();}, 100);
    net.train(updateLoss).then(() => {
        $('#status').html(net.getStatus());
        guess();
    });
}

function guess(){
    console.log('Predicting...');
    // clearInterval(interval);

    const prediction = net.guess();

    prediction.data().then(data => {
        data = Array.from(data);

        dv.setOutputs(data);
        dv.displayData();
    });
}


function updateLoss(loss){
    // let loss = net.getLoss();

    $('#loss').html(loss);
    if(myp5){ 
        myp5.drawLine(loss);
    }
        
}

let dvTraining = new DataViewer(600,600,400,100,100,true, 'learningView');

function show(){
    dvTraining.setInputs(trainingData);
    dvTraining.setOutputs(expectedOutputs);
    dvTraining.displayData();
}

setTimeout(show,300);

// visualize data
let dv = new DataViewer(600,600,400,100,100, null, 'classifiedView');
dv.setInputs(testArr);



// visualize error
let sketch = function(p){
    p.iter = 0;
    p.width = 600;
    p.height = 250;
    p.data = [];
    p.comp1 = 550;
    p.comp2 = 550;

    p.setup = function(){
        p.width = 600;
        p.height = 250;

        p.createCanvas(p.width, p.height);
        p.background(200);
    }

    p.draw = function() {
        // p.line(50, p.height, 50, 0);
    }

    p.drawDot = function(y){
        p.circle(50+p.iter*10, 200-y*500, 5);
        p.iter ++;
    }

    p.drawLine = function(y){
        if(!p.data.length) p.data.push(y);
        p.data.push(y); 
        p.background(200);
        p.line(0, 200, p.width, 200);

        // p.line(x1, y1, x2, y2);
        for(let i = 0; i< p.data.length;i++){

            let divider = (p.width-100)/(p.data.length-i);

            p.line(50+p.comp1, 200-p.data[i-1]*500, 50+divider, 200-p.data[i]*500);
            p.comp1 = divider;
            if(p.comp1 == 550){
                console.log(p.data.length-1,i);
            }
        }
        p.iter ++;
    }
}

let myp5 = new p5(sketch, 'errorView');


$('#learningView').click(function(){
    let data = $('#newData').html();
    let x = dvTraining.lastClick[0];
    let y = dvTraining.lastClick[1];

    if(!x || !y){
        return;
    }

    $('#newData').html(data + `[${x},${y}],` + '</br>');
    let vals = $('#dataVal').html();
    $('#dataVal').html(vals + `[${y}],` + '</br>');
});