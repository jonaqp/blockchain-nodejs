const SHA256 = require("crypto-js/sha256");

class Block {
  constructor(index, timestamp, data, previousHash = '') {
    this.index = index;
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.data = data;
    this.hash = this.createHash();
    this.counter = 0;
  }

  createHash() {
      return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.counter).toString();
  }

  mineBlock(difficulty) {
    while (this.hash.substring(0, difficulty) !== new Array(difficulty + 1).join("0")) {
        this.counter++;
        this.hash = this.createHash();
    }

    console.log("BLOCK MINED: " + this.hash);
  }
}


class Blockchain{
    constructor() {
        this.chain = [Blockchain.createBlock()];
        this.difficulty = 1;
    }

    static createBlock() {
        return new Block(0, "01/01/2017", {"amount":40, "pj":"jonathan"}, "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    isBlockChain() {
        for (let i = 1; i < this.chain.length - 1; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];
            console.log("adsadasdasd", currentBlock.hash, previousBlock.hash)

            if (currentBlock.hash !== currentBlock.createHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }

        }

        return true;
    }
}

let _Coin = new Blockchain();
console.log('Mining block 0...');
_Coin.addBlock(new Block(1, "20/07/2017", { amount: 4 }));

console.log('Mining block 1...');
_Coin.addBlock(new Block(2, "05/07/2017", { amount: 10 }));
_Coin.addBlock(new Block(3, "06/07/2017", { amount: 11 }));


console.log('Mining block 2...');
_Coin.addBlock(new Block(4, "15/07/2017", { amount: 8 }));
_Coin.addBlock(new Block(5, "16/07/2017", { amount: 9 }));



console.log("VALID1 =>", _Coin.isBlockChain())

_Coin.chain[2].data = {amount:100};

console.log("VALID2 =>", _Coin.isBlockChain())
console.log(_Coin)