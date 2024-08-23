const DesignReview = artifacts.require("DesignReview");
const truffleAssert = require('truffle-assertions');

contract("DesignReview", (accounts) => {
    let designReviewInstance;
    const owner = accounts[0];
    const user1 = accounts[1];
    const user2 = accounts[2];

    beforeEach(async () => {
        designReviewInstance = await DesignReview.new({ from: owner });
    });

    it('should allow a user to upload a design', async () => {
        const tx = await designReviewInstance.uploadDesign("Design 1", "URL1", { from: user1 });
        truffleAssert.eventEmitted(tx, 'DesignUploaded', (ev) => {
            return ev.designId.toString() === "0" && ev.uploader === user1 && ev.name === "Design 1";
        }, "DesignUploaded event should be emitted with correct parameters.");
    });

    it('should allow a user to leave a review for a design', async () => {
        await designReviewInstance.uploadDesign("Design 1", "URL1", { from: user1 });
        const tx = await designReviewInstance.leaveReview(0, 5, "Nice Design", { from: user2 });
        truffleAssert.eventEmitted(tx, 'ReviewLeft', (ev) => {
            return ev.designId.toString() === "0" && ev.reviewer === user2 && ev.rating.toNumber() === 5;
        }, "ReviewLeft event should be emitted with correct parameters.");
    });

    it('should allow a user to vote for a design', async () => {
        await designReviewInstance.uploadDesign("Design 1", "URL1", { from: user1 });
        const tx = await designReviewInstance.voteForDesign(0, { from: user2 });
        truffleAssert.eventEmitted(tx, 'DesignVoted', (ev) => {
            return ev.designId.toString() === "0" && ev.voter === user2;
        }, "DesignVoted event should be emitted with correct parameters.");
    });
});