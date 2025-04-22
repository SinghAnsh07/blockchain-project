// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

error CandidateAlreadyExists();
error AlreadyVoted();
error CandidateCannotVoteForSelf();

contract BlockchainVoting {
    address public manager;
    uint256 public totalCandidates;
    uint256 public totalVoters;

    constructor() {
        manager = msg.sender;
    }

    struct Voter {
        uint256 id;
        string name;
        address voterAddress;
        address candidateAddress;
    }

    struct Candidate {
        string name;
        address candidateAddress;
        uint256 voteCount;
    }

    struct Proposal {
        string name;
        address candidateAddress;
    }

    Voter[] private voters;
    Candidate[] private candidates;
    Proposal[] private proposals;

    modifier onlyManager() {
        require(msg.sender == manager, "Only manager can call this function");
        _;
    }

    function setCandidate(address _address, string memory _name) external onlyManager {
        for (uint256 i = 0; i < candidates.length; i++) {
            if (candidates[i].candidateAddress == _address) {
                revert CandidateAlreadyExists();
            }
        }
        candidates.push(Candidate(_name, _address, 0));
        totalCandidates++;
    }

    function setVote(
        uint256 _id,
        string memory _name,
        address _voterAddress,
        address _candidateAddress
    ) external {
        require(candidates.length >= 2, "At least 2 candidates required");

        for (uint256 i = 0; i < voters.length; i++) {
            if (voters[i].id == _id && voters[i].voterAddress == _voterAddress) {
                revert AlreadyVoted();
            }
        }

        for (uint256 i = 0; i < candidates.length; i++) {
            if (candidates[i].candidateAddress == _voterAddress) {
                revert CandidateCannotVoteForSelf();
            }
        }

        bool voteCounted = false;
        for (uint256 i = 0; i < candidates.length; i++) {
            if (candidates[i].candidateAddress == _candidateAddress) {
                candidates[i].voteCount++;
                voteCounted = true;
                break;
            }
        }

        require(voteCounted, "Candidate not found");

        voters.push(Voter(_id, _name, _voterAddress, _candidateAddress));
        totalVoters++;
    }

    function requestForNextVoting(address _requestAddress, string memory _name) external {
        proposals.push(Proposal(_name, _requestAddress));
    }

    function getProposals() external view returns (Proposal[] memory) {
        return proposals;
    }

    function getCandidates() external view returns (Candidate[] memory) {
        return candidates;
    }

    function getVoters() external view returns (Voter[] memory) {
        return voters;
    }
}
