const erc721ABI = [
    {

        'inputs': [{ 'internalType': 'uint256', 'name': 'tokenId', 'type': 'uint256' }],

        'name': 'ownerOf',

        'outputs': [{ 'internalType': 'address', 'name': '', 'type': 'address' }],

        'payable': false, 'stateMutability': 'view', 'type': 'function', 'constant': true

    }]
const erc1155ABI = [{

    'inputs': [{ 'internalType': 'address', 'name': 'account', 'type': 'address' }, { 'internalType': 'uint256', 'name': 'id', 'type': 'uint256' }],

    'name': 'balanceOf',

    'outputs': [{ 'internalType': 'uint256', 'name': '', 'type': 'uint256' }],

    'payable': false, 'stateMutability': 'view', 'type': 'function', 'constant': true

}]
const ABIs = {
    '721': erc721ABI,
    '1155': erc1155ABI,
    'ERC-721': erc721ABI,
    'ERC-1155': erc1155ABI
}

const supportedStandards = ['721', '1155', 'ERC-721', 'ERC-1155']

module.exports = {
    nftAuth: function nftAuth(ethProvider, standard, contractAddress) {
        var Web3 = require('web3');
        try {
            var web3 = new Web3(ethProvider);
        } catch (err) {
            throw (err)
        }

        if (!supportedStandards.includes(standard)) {
            const errorMessage = 'Standard not supported. \nSupported standards are ERC-721 and ERC-1155\n' 
            throw new Error(errorMessage)
        }

        const loadContract = (address, standard, web3) => {
            var myContract = new web3.eth.Contract(ABIs[standard], address)
            return myContract
        }

        const nftContract = loadContract(contractAddress, standard, web3)

        const nftOwner = async (tokenId) => {
            var owner = await nftContract.methods.ownerOf(tokenId).call()
            return owner
        }

        const getOwner = async (tokenId) => {
            var owner = await nftOwner(tokenId)
            return owner
        }

        this.isOwner = async (tokenId, address) => {
            if (standard == '721' || standard == 'ERC-721') {
                const owner = await getOwner(tokenId)
                return (owner.toLowerCase() == address)
            } else if (standard == '1155' || standard == 'ERC-1155') {
                const ownerBalance = await nftContract.methods.balanceOf(address, tokenId).call()
                return ownerBalance != 0
            } else {
                throw new Error("ERC standard not supported")
            }
        }

        return this
    }
}