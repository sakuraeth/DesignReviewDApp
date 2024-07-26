pragma solidity ^0.8.0;

contract DesignReviewDApp {

    event DesignUploaded(uint256 designId, address indexed uploader);
    event ReviewAdded(uint256 designId, address indexed reviewer, string review);
    event DesignVoted(uint256 designId, address indexed voter, uint256 votes);

    struct Design {
        uint256 id;
        address uploader;
        string dataURI;
        uint256 totalVotes;
    }

    struct Review {
        uint256 designId;
        address reviewer;
        string reviewText;
    }

    uint256 private designCounter;
    mapping(uint256 => Design) private designs;
    mapping(uint256 => Review[]) private designReviews;
    mapping(uint256 => mapping(address => bool)) private designVoted;

    function uploadDesign(string memory _dataURI) external {
        designCounter += 1;
        designs[designCounter] = Design(designCounter, msg.sender, _dataURI, 0);
        emit DesignUploaded(designCounter, msg.sender);
    }

    function leaveReview(uint256 _designId, string memory _reviewText) external {
        require(_designId > 0 && _designId <= designCounter, "Design does not exist.");
        designReviews[_designId].push(Review(_designId, msg.sender, _reviewText));
        emit ReviewAdded(_designId, msg.sender, _reviewText);
    }
    
    function voteForDesign(uint256 _designId) external {
        require(_designId > 0 && _designId <= designCounter, "Design does not exist.");
        require(!designVoted[_designId][msg.sender], "You have already voted for this design.");
        
        designs[_designId].totalVotes += 1;
        designVoted[_designId][msg.sender] = true;
        emit DesignVoted(_designId, msg.sender, designs[_designId].totalVotes);
    }

    function getDesignDetails(uint256 _designId) external view 
    returns (Design memory design, Review[] memory reviews) {
        require(_designId > 0 && _designId <= designCounter, "Design does not exist.");
        return (designs[_designId], designReviews[_designId]);
    }
}