let a  = tf.tensor2d([4,2,2,1,4,0],[3,2]);
let b  = tf.tensor2d([4,2,2,1,1,1],[2,3]);

console.log( a.print() );
console.log( b.print() );

// console.log( a.add(b).print() );
// console.log( a.sub(b).print() );
console.log( a.matMul(b).print() );
