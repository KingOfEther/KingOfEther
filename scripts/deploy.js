const fs = require("fs")
const { ethers } = require("ethers")
require("dotenv").config()

const provider = new ethers.providers.WebSocketProvider(process.env.PROVIDER)
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)

const contract_abi = JSON.parse(fs.readFileSync("bin/KingOfEther.abi"))
const contract_bin = "0x" + fs.readFileSync("bin/KingOfEther.bin").toString()
const contract = new ethers.ContractFactory(contract_abi, contract_bin, wallet)

contract.deploy(30).then(contract => {
    console.log("tx hash:", contract.deployTransaction.hash)
    contract.deployed().then(deployed_contract => {
        console.log("contract address:", deployed_contract.address)
    })
}).catch(console.error)