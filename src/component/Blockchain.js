const Block = require("./Block");
const Transaction = require("./Transactions");
module.exports = class Blockchain {
  constructor() {
    this.chain = [this.createFirstBlock()];
    this.difficulty = 2;
    this.pendingTransactions = [];
    this.miningReward = 100;
  }
  minePendingTransaction(miningRewardAddress) {
    let block = new Block(
      Date.now(),
      this.pendingTransactions,
      this.getLatestBlock().hash
    );
    block.mineBlock(this.difficulty);
    this.chain.push(block);
    this.pendingTransactions = [
      new Transaction(null, miningRewardAddress, this.miningReward),
    ];
  }
  getBalanceOfAddress(address) {
    let balance = 0;
    for (let block of this.chain) {
      for (let i = 0; i < block.transactions.length; i++) {
        if (block.transactions[i].fromAddress === address) {
          balance -= block.transactions[i].amount;
        }
        if (block.transactions[i].toAddress === address) {
          balance += block.transactions[i].amount;
        }
      }
    }
    return balance;
  }
  addTransaction(transaction) {
    // validate transaction
    if (!transaction.fromAddress || !transaction.toAddress) {
      throw new Error("Transaction must include from and to address");
    }
    if (!transaction.isValid()) {
      throw new Error("Cannot  add invalid transaction to Chain");
    }
    // push transaction into pendingTransaction
    this.pendingTransactions.push(transaction);
  }
  createFirstBlock() {
    return new Block(0, "2017-01-01", "first Block data", "0");
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
    const realGenesis = JSON.stringify(this.createFirstBlock());

    if (realGenesis !== JSON.stringify(this.chain[0])) {
      console.log("fail here");
      return false;
    }

    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];
      if (currentBlock.hash === currentBlock.calculateHash()) {
        return true;
      }
      if (currentBlock.previousBlock !== previousBlock.hash) {
        return false;
      }
      if (!currentBlock.hasValidTransactions()) {
        return false;
      }
    }
    return true;
  }
};
