all:
	solc --bin --abi --overwrite -o ./ KingOfEther.sol

gas:
	solc --gas KingOfEther.sol
