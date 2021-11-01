# eth-nft-verification
Verify NFT ownership of ERC-721 and ERC-1155 tokens on Ethereum blockchain


**Usage:**

```js
var ethNftAuth = require('eth-nft-verification')

/*NOTE: PLEASE EDIT THIS VALUES ACCORDING TO YOUR USE CASE*/

const ethProvider = "https://cloudflare-eth.com" //Your eth provider
const standard = 'ERC-721' //The token standard, inputs allowed are: '721', '1155', 'ERC-721', 'ERC-1155'
const contractAddress = '0xa3AEe8BcE55BEeA1951EF834b99f3Ac60d1ABeeB' //The contract address of the NFT

//Get the ownership verification function
const { isOwner } = ethNftAuth.nftAuth(ethProvider, standard, contractAddress)

const tokenId = '7005' //The id of the token to be verified
const ethAddress = '0x062146f4fabe3e136ef17d17b7d9cf9c0f8c0069' //The address of the eth account

var ownership = await isOwner(tokenId, ethAddress) //Returns a boolean value indicating ownership(true) or not(false)
```
