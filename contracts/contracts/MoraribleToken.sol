// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MoraribleToken is ERC721{
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor () ERC721('MoraribleToken', 'Mora') {}

    struct Item{
        uint id;
        address creater;
        string uri;
    }

    mapping(uint => Item) public Items;

    function createItem(string memory _uri) public returns (uint) {
        _tokenIds.increment();
        uint newItemId = _tokenIds.current();
        _safeMint(msg.sender, newItemId);

        Items[newItemId] = Item(newItemId, msg.sender, _uri);

        return newItemId;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        return Items[tokenId].uri;
    }

}