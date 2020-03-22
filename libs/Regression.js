class Regression{

    constructor(layers = [4], delta = 1, epochs = 500){

        this.inputX = null;
        this.inputY = null;

        this.delta = delta;

        this.optimizer = tf.train.sgd(this.delta); 

        this.b = tf.variable(tf.scalar(Math.random(1)));
        this.m = tf.variable(tf.scalar(Math.random(1)));


    }

    predict(x){
        const xs = tf.tensor1d(x);
        // y = mx + b;
        const ys = xs.mul(this.m).add(this.b);
        return ys;
    }

    loss(pred, labels) {
        return pred
          .sub(labels)
          .square()
          .mean();
      }

    optimize(){
        this.optimizer.minimize(() => this.loss(this.predict(this.inputX),this.tfys))
    }

    setInputsX(inputs){
        this.inputX = inputs;
    }
    
    setInputsY(inputs){
        this.inputY = inputs;
        this.tfys = tf.tensor1d(inputs);
    }

}