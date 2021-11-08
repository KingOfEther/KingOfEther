# KingOfEther

This repo contains the code of KingOfEther's contract.

### Rules

KingOfEther is an infinite game. The goal is: become the king.

- In order to become the king, you must send 30% more ether to the contract than the previous king by calling `becomeKing()` on the contract.
- The money of any new king will be transfered to the previous king.
- You can withdraw your money by calling `withdraw()` on the contract.

### Deployment

Create a `.env` file containing: `PROVIDER`, `PRIVATE_KEY` variables. Then,

```shell
make
npm install
node deploy.js
```