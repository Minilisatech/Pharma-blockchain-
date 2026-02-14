// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title PharmaSupplyChain
 * @dev Immutable on-chain ledger for pharmaceutical supply chain events.
 *      Every call to recordLog writes a permanent, timestamped entry.
 */
contract PharmaSupplyChain {

    // ── Data Structures ───────────────────────────────────────────────────────

    struct DrugLog {
        string  batchId;
        string  actor;
        string  action;
        uint256 timestamp;
    }

    // ── State Variables ───────────────────────────────────────────────────────

    DrugLog[] public logs;
    address   public owner;

    // ── Events ────────────────────────────────────────────────────────────────

    event LogRecorded(
        uint256 indexed index,
        string  batchId,
        string  actor,
        string  action,
        uint256 timestamp
    );

    // ── Modifiers ─────────────────────────────────────────────────────────────

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorised");
        _;
    }

    // ── Constructor ───────────────────────────────────────────────────────────

    constructor() {
        owner = msg.sender;
    }

    // ── Functions ─────────────────────────────────────────────────────────────

    /**
     * @notice Record a new supply-chain event on-chain.
     * @param _batchId  Unique identifier for the drug batch.
     * @param _actor    Entity performing the action (manufacturer, distributor, pharmacy…).
     * @param _action   Description of the action performed.
     */
    function recordLog(
        string memory _batchId,
        string memory _actor,
        string memory _action
    ) public {
        DrugLog memory entry = DrugLog(_batchId, _actor, _action, block.timestamp);
        logs.push(entry);
        emit LogRecorded(logs.length - 1, _batchId, _actor, _action, block.timestamp);
    }

    /**
     * @notice Retrieve a single log entry by index.
     * @param index  Position in the logs array.
     * @return       The DrugLog struct at that index.
     */
    function getLog(uint256 index) public view returns (DrugLog memory) {
        require(index < logs.length, "Index out of bounds");
        return logs[index];
    }

    /**
     * @notice Returns the total number of log entries recorded.
     */
    function totalLogs() public view returns (uint256) {
        return logs.length;
    }
}
