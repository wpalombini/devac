// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract DeVacContract is ERC721 {
    uint256 private lastGeneratedTokenId = 0;
    address private owner;
    
    struct DeVacToken {
        uint256 tokenId;
        string tokenURI;
        address owner;
    }

    event TokenMinted(
        uint256 tokenId,
        string tokenURI,
        address owner
    );

    mapping (address => uint256[]) private tokensSupplied;
    mapping(uint256 => DeVacToken) private tokenURIs;

    constructor() ERC721("DeVac", "DVac") { owner = msg.sender; }

    function isOwner() public view returns (bool) {
        return msg.sender == owner;
    }

    function mint(address _to, string memory _tokenURI) public {
        lastGeneratedTokenId++;

        require(tokenURIs[lastGeneratedTokenId].owner == address(0));

        _mint(_to, lastGeneratedTokenId);

        DeVacToken memory generatedToken = DeVacToken(lastGeneratedTokenId, _tokenURI, _to);

        tokensSupplied[_to].push(lastGeneratedTokenId);

        tokenURIs[lastGeneratedTokenId] = generatedToken;

        emit TokenMinted(lastGeneratedTokenId, _tokenURI, _to);
    }

    function getTokensForOwner(address _to) public view returns (uint256[] memory) {
        require(_to != address(0));

        return tokensSupplied[_to];
    }

    function getTokenDetailsForId(uint256 _tokenId) public view returns (DeVacToken memory) {
        require(tokenURIs[_tokenId].owner == msg.sender);

        return tokenURIs[_tokenId];
    }
}