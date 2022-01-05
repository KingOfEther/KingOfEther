const fs = require("fs")
const { ethers } = require("ethers")
require("dotenv").config()

const provider = new ethers.providers.WebSocketProvider(process.env.PROVIDER)
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)

const contract_abi = JSON.parse(fs.readFileSync("bin/KingOfEther.abi"))
const address = "0x42b01b9d786BEe65F0F8D3fBfFFBeeBDe1F1BA5b"
const contract = new ethers.Contract(address, contract_abi, wallet)

// READ
contract.functions.amountWithdrawable().then(data => {
    const amount = parseInt(data[0]._hex, 16)
    console.log("Amount withdrawable:", amount)
})

contract.functions.king().then(data => {
    console.log("Current king:", data[0])
})

contract.functions.treasure().then(data => {
    const amount = parseInt(data[0]._hex, 16)
    console.log("Current treasure:", amount)
})

contract.functions.increasePercentage().then(data => {
    const amount = parseInt(data[0]._hex, 16)
    console.log("Increase percentage:", amount)
})

// WRITE
contract.functions.becomeKing({
    value: 5
}).then(transaction => {
    console.log(transaction.hash)
}).catch(console.error)

contract.functions.withdraw().then(transaction => {
    console.log(transaction.hash)
}).catch(console.error)