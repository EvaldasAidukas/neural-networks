class Classification{

    constructor(layers = [4], delta, epochs){
        this.status = 'None';

        this.model = null;
        this.input = null;
        this.output = null;
        this.trainingData = null;
        
        this.layers = layers;
        this.delta = delta;
        this.epochs = epochs;

        this.trainingConfig = {
            shuffle: true,
            epochs: 1
        };
        this.loss = null;
    }

    createNetwork(){
        this.model = tf.sequential();

        for(let i =0; i<this.layers.length; i++){
            let config = {
                units: this.layers[i],
                activation: 'sigmoid',
                inputShape: i ? this.layers[i-1] : [2]
            }
            console.log(config);
            this.model.add(tf.layers.dense(config)); // add hidden layers 
        }

        // add output layer
        let output = tf.layers.dense({
            units: this.output.shape[1], 
            activation: 'sigmoid'
        });

        this.model.add(output);
        
        const optimizer = tf.train.sgd(this.delta); 

        this.model.compile({
            optimizer: optimizer,
            loss: tf.losses.meanSquaredError
        });

        this.status = 'Network created.';

        return this.status;
    }

    async train(callback){
        for(let i = 0; i< this.epochs; i++){
            const response = await this.model.fit(this.trainingData, this.output, this.trainingConfig);
            this.loss = response.history.loss[0];
            if(this.loss < 0.005){
                console.log('Stop at '+i);
                i = this.epochs;
            }
            callback(this.loss);
        }
        this.status = 'Network trained.';
    }

    guess(){
        const prediction = this.model.predict(this.input);
        return prediction;
    }

    setInputs(inputs){
        this.input = inputs;
    }

    setTrainingData(trainingData){
        this.trainingData = trainingData;
    }

    setExpectedOutputs(output){
        this.output = output;
    }

    getLoss(){
        return this.loss;
    }

    getStatus(){
        return this.status;
    }
}