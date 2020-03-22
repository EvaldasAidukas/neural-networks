class DataViewer{
    constructor(width,height,scale,offsetX,offsetY,log = false, divId){
        this.bgSize = [width,height];
        this.scale = [scale,scale];
        this.offset = [offsetX,offsetY];
        this.divId = divId;

        // this.data = this.convertData(inputs,outputs);
        this.inputs = null;
        this.outputs = null;
        
        this.log = log;
        this.initialized = false;
        this.p5 = this.setup();

        this.lastClick = [];
    }

    convertData(inputs,outputs){
        return inputs.map((val, i) => {
            val.push(outputs[i][0]);
            return val;
        })
    }

    initialized(){
        return this.initialized;
    }



    setup() { 
        let that = this;
        let sketch = function(p){
            p.setup = function(){
                p.width = that.bgSize[0];
                p.height = that.bgSize[1];

                p.createCanvas(p.width, p.height);
                p.background(220);
                
                //reference point 0,0
                that.drawPoint(0,0,0);
            
                p.line(0, that.offset[1], p.width, that.offset[1]);
                p.line(that.bgSize[0] - that.offset[0] , 0, that.bgSize[0] - that.offset[0], p.height);

                p.line(0, p.height - that.offset[1], p.width, p.height - that.offset[1]);
                p.line(that.offset[0], 0, that.offset[0], p.height);

            }
            if(that.log){
                p.mousePressed = function(evt){
                    that.onMousePress();
                };
            }
        }
        this.initialized = true;
        // this.p5 = new p5(sketch);
        return new p5(sketch,this.divId);
    }

    onMousePress(){
        let x = (this.p5.mouseX - this.offset[0]) / this.scale[0];
        let y = (this.bgSize[1] - this.p5.mouseY - this.offset[1]) / this.scale[1];

        if((x > 0 && x < 1) && (y > 0 && y < 1)){
            this.lastClick = [x,y];
        }
    }

    displayData(){
        let set = this.mergeData();
        set.forEach((item,i) => {
            item[2]>0? this.drawPoint(item[0],item[1],item[2]) : this.drawPoint(item[0],item[1],item[2]);
        });
    }

    mergeData(){
        let data = this.inputs.map((val, i) => {
            val.push(this.outputs[i]);
            return val;
        })

        return data;
    }

    setInputs(inputs){
        this.inputs = inputs;
    }

    setOutputs(outputs){
        this.outputs = outputs;
    }

    drawPoint(x,y,col){
        this.p5.fill(this.p5.color(col*255,col*255,col*255));
        this.p5.circle(x*this.scale[0]+this.offset[0], -(y*this.scale[1]-this.bgSize[1]+this.offset[1]), 5);
    }
}

