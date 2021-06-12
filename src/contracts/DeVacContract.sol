// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract DeVacContract is ERC721 {
    uint256 private lastTokenIdGenerated = 0;
    address private owner;

    constructor() ERC721("DeVac", "DVac") { owner = msg.sender; }

    function isOwner() public view returns (bool) {
        return msg.sender == owner;
    }

    function mint(address _to) public returns (uint256) {
        uint256 newTokenId = lastTokenIdGenerated + 1;
        
        _mint(_to, newTokenId);

        return newTokenId;
    }
}