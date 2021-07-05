const Block = require("./Block");

module.exports = class Blockchain {
  constructor() {
    this.chain = [this.createFirstBlock()];
    this.difficulty = 5;
  }
  createFirstBlock() {
    return new Block(0, new Date().getTime(), "first Block data", "0");
  }
  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }
  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
  }
  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];
      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }
      if (currentBlock.previousBlock !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }
};
