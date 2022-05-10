// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "base64-sol/base64.sol";
import "hardhat/console.sol";

contract DynamicSvgNft is ERC721, Ownable {
    uint256 private Counter;
    string private Img;

    mapping(uint256 => int256) private s_tokenIdToHighValues;
    AggregatorV3Interface internal immutable priceFeed;
    event CreatedNFT(uint256 indexed tokenId, int256 highValue);

    constructor(
        address priceFeedAddress,
        string memory first_Img,
    ) ERC721("Dynamic SVG NFT", "DSN") {
        Counter = 0;
        priceFeed = AggregatorV3Interface(priceFeedAddress);
        Img = svgToImageURI(first_Img);
    }

    function mintNft(int256 highValue) public {
        s_tokenIdToHighValues[Counter] = highValue;
        emit CreatedNFT(Counter, highValue);
        _safeMint(msg.sender, Counter);
        Counter = Counter + 1;
    }
    function svgToImageURI(string memory svg) public pure returns (string memory) {
        string memory baseURL = "data:image/jpg;base64,";
        string memory svgBase64Encoded = Base64.encode(bytes(string(abi.encodePacked(svg))));
        return string(abi.encodePacked(baseURL, svgBase64Encoded));
    }

    function _baseURI() internal pure override returns (string memory) {
        return "data:application/json;base64,";
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        (, int256 price, , , ) = priceFeed.latestRoundData();
        string memory imageURI = Img;
        return
            string(
                abi.encodePacked(
                    _baseURI(),
                    Base64.encode(
                        bytes(
                            abi.encodePacked(
                                '{"name":"',
                                "lucrative nft", 
                                '", "description":"An NFT that is automatically generated from website images", ',
                                '"attributes": [{"trait_type": "coolness", "value": 100}], "image":"',
                                imageURI,
                                '"}'
                            )
                        )
                    )
                )
            );
    }

    function get_Img() public view returns (string memory) {
        return Img;
    }

    function getPriceFeed() public view returns (AggregatorV3Interface) {
        return priceFeed;
    }

    function getTokenCounter() public view returns (uint256) {
        return Counter;
    }
}