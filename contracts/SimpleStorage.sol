// SPDX-License-Identifier: MIT
pragma solidity ^0.4.17;

contract SimpleStorage {
    address public owner;
    uint256 public farmerCount;
    uint256 public farmerlotCount;
    uint256 public lotCount;

    // Constructor
    function SimpleStorage() public {
        owner = msg.sender;

        farmerCount = 0;
        lotCount = 0;
        farmerlotCount = 0;
    }

    struct Farmer {
        string fname;
        string loc;
        string crop;
        uint256 contact;
        uint256 quantity;
        uint256 exprice;
        uint256 farmerId;
    }

    mapping(uint256 => Farmer) public farmerDetails;

    // Only admin can add candidate
    function addFarmer(
        string _fname,
        string _loc,
        string _crop,
        uint256 _contact,
        uint256 _quantity,
        uint256 _exprice
    ) public {
        Farmer memory newFarmer = Farmer({
            fname: _fname,
            loc: _loc,
            crop: _crop,
            contact: _contact,
            quantity: _quantity,
            exprice: _exprice,
            farmerId: farmerCount
        });

        farmerDetails[farmerCount] = newFarmer;
        farmerCount += 1;
    }

    // get total number of candidates
    function getFarmerNumber() public view returns (uint256) {
        return farmerCount;
    }

    function getOwner() public view returns (address) {
        return owner;
    }

    // Only Admin can access
    modifier onlyAdmin() {
        require(msg.sender == owner);
        _;
    }

    struct Lot {
        uint256 famerId;
        uint256 lotno;
        string grade;
        uint256 mrp;
        string testdate;
        string expdate;
    }
    address public tester;

    mapping(uint256 => Lot) public lotDetails;

    function quality(
        uint256 _famerId,
        uint256 _ll,
        string _g,
        uint256 _p,
        string _tt,
        string _e
    ) public {
        Lot memory newLot = Lot({
            famerId: _famerId,
            lotno: _ll,
            grade: _g,
            mrp: _p,
            testdate: _tt,
            expdate: _e
        });

        lotDetails[lotCount] = newLot;
        lotCount += 1;
    }

    function getLotNumber() public view returns (uint256) {
        return lotCount;
    }

    struct FarmerLot {
        uint256 farmerlotId;
        uint256 farmerId;
        uint256 lotId;
        uint256 priceSup;
    }

    mapping(uint256 => FarmerLot) public farmerlotDetails;

    function addFarmerLot(
        uint256 _farmerId,
        uint256 _lotId,
        uint256 _priceSup
    ) public {
        FarmerLot memory newFarmer = FarmerLot({
            farmerlotId: farmerlotCount,
            farmerId: _farmerId,
            lotId: _lotId,
            priceSup: _priceSup
        });

        farmerlotDetails[farmerlotCount] = newFarmer;
        farmerlotCount += 1;
    }

    // get total number of candidates
    function getFarmerLotNumber() public view returns (uint256) {
        return farmerlotCount;
    }
}
