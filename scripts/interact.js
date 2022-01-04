const fs = require("fs")
const Web3 = require("web3")
require("dotenv").config()

const w3 = new Web3(process.env.PROVIDER)
const account = w3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY)

const contract_abi = JSON.parse(fs.readFileSync("bin/KingOfEther.abi"))
const contract_address = "0x0043b0B73CfbfFF715c9aB9D3D61d4cf677586Ab"

const Storage = new w3.eth.Contract(contract_abi, contract_address)

console.log("Current address:", account.address)

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
// const tx = {
//     data: Storage.methods.withdraw().encodeABI(),
//     from: account.address,
//     to: contract_address,
//     gasLimit: 8000000,
//     baseFeePerGas: w3.utils.toWei("1", "gwei"),
//     maxPriorityFeePerGas: w3.utils.toWei("1", "gwei"),
//     // value: w3.utils.toWei("10", "wei")
// }

// account.signTransaction(tx).then(signed => {
//     w3.eth.sendSignedTransaction(signed.rawTransaction)
//     .on("transactionHash", console.log)
//     .on("receipt", data => {
//         if (data.status) {
//             console.log("Success.")
//         } else {
//             console.log("Failed.")
//         }
//     })
// })
