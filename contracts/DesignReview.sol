// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DesignReviewDApp {

    event DesignUploaded(uint256 designId, address indexed uploader);
    event ReviewAdded(uint256 designId, address indexed reviewer, string reviewText);
    event DesignVoted(uint256 designId, address indexed voter, uint256 totalVotes);

    struct Design {
        uint256 id;
        address uploader;
        string designDataURL;
        uint256 totalVotes;
    }

    struct Review {
        uint256 designId;
        address reviewer;
        string reviewText;
    }

    uint256 private totalDesigns;
    mapping(uint256 => Design) private designs;
    mapping(uint256 => Review[]) private designReviews;
    mapping(uint256 => mapping(address => bool)) private hasVotedForDesign;

    function submitDesign(string memory designDataURL) external {
        totalDesigns += 1;
        designs[totalDesigns] = Design(totalDesigns, msg.sender, designDataURL, 0);
        emit DesignUploaded(totalDesigns, msg.sender);
    }

    function postReview(uint256 designId, string memory reviewText) external {
        require(designId > 0 && designId <= totalDesigns, "Design does not exist.");

        designReviews[designId].push(Review(designId, msg.sender, reviewText));
        emit ReviewAdded(designId, msg.sender, reviewText);
    }
    
    function castVoteForDesign(uint256 designId) external {
        require(designId > 0 && designId <= totalDesigns, "Design does not exist.");
        require(!hasVotedForDesign[designId][msg.sender], "You have already voted for this design.");
        
        designs[designId].totalVotes += 1;
        hasVotedForDesign[designId][msg.sender] = true;
        emit DesignVoted(designId, msg.sender, designs[designId].totalVotes);
    }

    function getDesignDetails(uint256 designId) external view 
    returns (Design memory design, Review[] memory reviews) {
        require(designId > 0 && designId <= totalDesigns, "Design does not exist.");
        return (designs[designId], designReviews[designId]);
    }
}