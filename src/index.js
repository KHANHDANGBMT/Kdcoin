const Block = require("./component/Block");
const Blockchain = require("./component/Blockchain");
let myChain = new Blockchain();
myChain.addBlock(new Block(1, new Date().getTime(), "block 2"));
myChain.addBlock(new Block(2, new Date().getTime(), "block 3"));
console.log(JSON.stringify(myChain.chain[1].hash));
