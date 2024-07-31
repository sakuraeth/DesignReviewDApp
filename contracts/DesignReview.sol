// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title DesignReviewDApp
 * @dev Allows users to upload designs, post reviews, and vote on designs.
 */
contract DesignReviewDApp {
    // Events declaration for logging actions
    event DesignUploaded(
        uint256 indexed designId, 
        address indexed uploader
    );
    event ReviewAdded(
        uint256 indexed designId, 
        address indexed reviewer, 
        string reviewText
    );
    event DesignVoted(
        uint256 indexed designId, 
        address indexed voter, 
        uint256 totalVotes
    );

    // Struct for holding design details
    struct Design {
        uint256 id;
        address uploader;
        string designDataURL;
        uint256 totalVotes;
    }

    // Struct for holding reviews
    struct Review {
        uint256 designId;
        address reviewer;
        string reviewText;
    }

    // State variables
    uint256 private totalDesigns = 0; // Counter for total number of designs
    mapping(uint256 => Design) private designs; // Mapping from design ID to Design struct
    mapping(uint256 => Review[]) private designReviews; // Mapping from design ID to list of Reviews
    mapping(uint256 => mapping(address => bool)) private hasVotedForDesign; // Mapping to track if a user has voted for a design

    /**
     * @dev Submit a new design.
     * @param designDataURL URL of the design data.
     */
    function submitDesign(string memory designDataURL) external {
        totalDesigns += 1;
        designs[totalDesigns] = Design(totalDesigns, msg.sender, designDataURL, 0);
        emit DesignUploaded(totalDesigns, msg.sender);
    }

    /**
     * @dev Post a review for a specific design.
     * @param designId ID of the design to review.
     * @param reviewText Text of the review.
     */
    function postReview(uint256 designId, string memory reviewText) external {
        require(designId > 0 && designId <= totalDesigns, "Design does not exist.");

        designReviews[designId].push(Review(designId, msg.sender, reviewText));
        emit ReviewAdded(designId, msg.sender, reviewText);
    }

    /**
     * @dev Cast a vote for a specific design.
     * @param designId ID of the design to vote for.
     */
    function castVoteForDesign(uint256 designId) external {
        require(designId > 0 && designId <= totalDesigns, "Design does not exist.");
        require(!hasVotedForDesign[designId][msg.sender], "You have already voted for this design.");
        
        designs[designId].totalVotes += 1;
        hasVotedForDesign[designId][msg.sender] = true;
        emit DesignVoted(designId, msg.sender, designs[designId].totalVotes);
    }

    /**
     * @dev Retrieve details for a design including its reviews.
     * @param designId ID of the design to retrieve.
     * @return design Details of the design.
     * @return reviews List of reviews for the design.
     */
    function getDesignDetails(uint256 designId) external view 
    returns (Design memory design, Review[] memory reviews) {
        require(designId > 0 && designId <= totalDesigns, "Design does not exist.");
        return (designs[designId], designReviews[designId]);
    }
}