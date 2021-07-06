const EC = require("elliptic").ec;
const ec = new EC("secp256k1");
const Blockchain = require("./component/Blockchain");
const Transaction = require("./component/Transactions");
let publicKey =
  "043b75f40dd5dd9eb5c426f8aff6a34fc3366c5740013bb6224114deb1a71da830c28f50fa2f6340317981a2c0fc0fb76d2b36d134ddea1787f0cef706d77c0c43";

let privateKey = "DangQuocKhanh123123123123";

const myKey = ec.keyFromPrivate(privateKey);
const myWalletAddress = myKey.getPublic("hex");

// Create new instance of Blockchain class
let kdCoin = new Blockchain();

// Mine first block
kdCoin.minePendingTransaction(myWalletAddress);

// Create a transaction & sign it with your key
const tx1 = new Transaction(myWalletAddress, "address1", 100);
tx1.signTransaction(myKey);
kdCoin.addTransaction(tx1);
console.log("Balance: ", kdCoin.getBalanceOfAddress(myWalletAddress));

// Mine block
kdCoin.minePendingTransaction(myWalletAddress);

// Create second transaction
const tx2 = new Transaction(myWalletAddress, "address2", 50);
tx1.signTransaction(myKey);
kdCoin.addTransaction(tx2);

// Mine block
kdCoin.minePendingTransaction(myWalletAddress);

console.log();
console.log("Balance: ", kdCoin.getBalanceOfAddress(myWalletAddress));
console.log();
console.log("Blockchain valid? ", kdCoin.isChainValid() ? "Yes" : "NO");
