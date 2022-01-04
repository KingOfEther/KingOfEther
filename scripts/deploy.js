const fs = require("fs")
const Web3 = require("web3")
require("dotenv").config()

const w3 = new Web3(process.env.PROVIDER)
const account = w3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY)

const contract_abi = JSON.parse(fs.readFileSync("bin/KingOfEther.abi"))
const contract_bin = "0x" + fs.readFileSync("bin/KingOfEther.bin").toString()

const KingOfEther = new w3.eth.Contract(contract_abi)

const tx = {
    data: KingOfEther.deploy({
        data: contract_bin,
        arguments: [30]
    }).encodeABI(),
    from: account.address,
    gasLimit: 8000000,
    baseFeePerGas: w3.utils.toWei("1", "gwei"),
    maxPriorityFeePerGas: w3.utils.toWei("10", "gwei")
}

account.signTransaction(tx).then(signed => {
    w3.eth.sendSignedTransaction(signed.rawTransaction)
    .on("transactionHash", console.log)
    .on("receipt", data => {
        if (data.status) {
            console.log("Contract address:", data.contractAddress)
        } else {
            console.log("Failed")
        }
    })
})