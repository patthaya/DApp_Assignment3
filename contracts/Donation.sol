pragma solidity ^0.5.0;

contract Donation {
    address[4] public User;

    function donate(uint giftId) public returns (uint) {
        require(giftId >= 0 && giftId <=3);
        User[giftId] = msg.sender;
        return giftId;
    }

    function getUser() public view returns (address[4] memory) {
        return User;
    }
}
