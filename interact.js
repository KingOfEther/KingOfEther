const fs = require("fs")
const Web3 = require("web3")
require("dotenv").config()

const w3 = new Web3(process.env.PROVIDER)
const account = w3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY)

const contract_abi = JSON.parse(fs.readFileSync("KingOfEther.abi"))
const contract_address = "0x2Bb4412ae1dB6f12f032c0c371c22aAEEE4df75f"

const Storage = new w3.eth.Contract(contract_abi, contract_address)

// READ
Storage.methods.amountWithdrawable().call({from: account.address}).then(data => {
    console.log("Amount withdrawable:", data)
})

Storage.methods.king().call().then(data => {
    console.log("Current king:", data)
})

Storage.methods.treasure().call().then(data => {
    console.log("Current treasure:", data)
})

Storage.methods.increasePercentage().call().then(data => {
    console.log("Increase percentage:", data)
})

// WRITE
const tx = {
    data: Storage.methods.becomeKing().encodeABI(),
    from: account.address,
    to: contract_address,
    gas: 8000000,
    gasPrice: w3.utils.toWei("5", "gwei"),
    value: w3.utils.toWei("7", "gwei")
}

account.signTransaction(tx).then(signed => {
    w3.eth.sendSignedTransaction(signed.rawTransaction)
    .on("transactionHash", console.log)
    .on("receipt", console.log)
})

