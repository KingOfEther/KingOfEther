all:
	solc --bin --abi --overwrite -o ./bin contract/KingOfEther.sol

gas:
	solc --gas contract/KingOfEther.sol
