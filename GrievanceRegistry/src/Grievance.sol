// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GrievanceRegistry {
    struct Grievance {
        string title;
        string description;
        string category;
        string location;
        uint256 mediaCount;
        string priorityLevel;
        uint256 estimatedDays;
        uint256 fundAmount;
        string currency;
        string aiJustification;
        string trackingId;
        uint256 timestamp;
        address submitter;
        bool resolved;
    }

    Grievance[] public grievances;
    mapping(string => uint256) public trackingIdToIndex;

    event GrievanceLogged(
        string indexed trackingId,
        address indexed submitter,
        uint256 timestamp
    );
    event GrievanceResolved(string indexed trackingId, uint256 timestamp);

    function submitGrievance(
        string memory _title,
        string memory _description,
        string memory _category,
        string memory _location,
        uint256 _mediaCount,
        string memory _priorityLevel,
        uint256 _estimatedDays,
        uint256 _fundAmount,
        string memory _currency,
        string memory _aiJustification,
        string memory _trackingId
    ) external {
        require(bytes(_trackingId).length > 0, "Tracking ID required");
        
        Grievance memory newGrievance = Grievance({
            title: _title,
            description: _description,
            category: _category,
            location: _location,
            mediaCount: _mediaCount,
            priorityLevel: _priorityLevel,
            estimatedDays: _estimatedDays,
            fundAmount: _fundAmount,
            currency: _currency,
            aiJustification: _aiJustification,
            trackingId: _trackingId,
            timestamp: block.timestamp,
            submitter: msg.sender,
            resolved: false
        });

        grievances.push(newGrievance);
        trackingIdToIndex[_trackingId] = grievances.length - 1;
        
        emit GrievanceLogged(_trackingId, msg.sender, block.timestamp);
    }

    function markResolved(string memory _trackingId) external {
        uint256 index = trackingIdToIndex[_trackingId];
        require(grievances[index].submitter == msg.sender, "Not submitter");
        grievances[index].resolved = true;
        emit GrievanceResolved(_trackingId, block.timestamp);
    }

    function getGrievance(string memory _trackingId) external view returns (Grievance memory) {
        return grievances[trackingIdToIndex[_trackingId]];
    }

    function getAllGrievances() external view returns (Grievance[] memory) {
        return grievances;
    }
}