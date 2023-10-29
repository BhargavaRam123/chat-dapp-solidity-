// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

contract Chat 
{
struct friend{
        string name;
        address add;
}
struct user{
    string name;
    friend[] friendlist;
}
struct message{
    address sender;
    uint256 timestamp;
    string msgcon;
}
message[] msgsbtw;
mapping(address => user) public accounts;
mapping(bytes32 => message[]) allmessages;
function checkuserexists(address _address)public view returns(bool)
{
    if(bytes(accounts[_address].name).length == 0)
    return false;
    else
    return true;
} 
function createuser(string memory _name)public  {
    require(checkuserexists(msg.sender)==false,"You already have an account");
    require(bytes(_name).length!=0,"Enter a valid name");
    accounts[msg.sender].name = _name;
}
function getusername() public view returns(string memory)
{
    return accounts[msg.sender].name;
}

function addFriend(address _faddress,string memory _name) public {
    string memory _copy = accounts[_faddress].name;
    require(checkalreadyfriends(_faddress)==false,"Hey common you both are already friends");
    require(_faddress!=msg.sender,"How can you friend yourself?");
    require(checkuserexists(_faddress),"Friend you are trying to access,doesnt created his account");
    require(keccak256(bytes(_copy))==keccak256(bytes(_name)),"please enter a valid name for the given address");
    accounts[msg.sender].friendlist.push(friend(_name,_faddress));
    accounts[_faddress].friendlist.push(friend(accounts[msg.sender].name,msg.sender));
}

function checkalreadyfriends(address _faddress)public view returns (bool) 
{
    for(uint i=0;i<accounts[_faddress].friendlist.length;i++)
    {
        if(accounts[_faddress].friendlist[i].add==msg.sender)
        return true;
    }
    return false;
}

function getmyfriend() public view returns(friend[] memory)
{
    return accounts[msg.sender].friendlist;
}

function _getchatcode(address _raddress) public view returns (bytes32 )
{
    if(msg.sender > _raddress )
    return bytes32(abi.encodePacked(msg.sender,_raddress));
    else
    return bytes32(abi.encodePacked(_raddress,msg.sender));
}

function sendmessage(address _raddress,string memory _message) public 
{
    require(checkuserexists(msg.sender)==true,"Create an account to send a message");
    require(checkuserexists(_raddress)==true,"person you are trying to send a message doesnt has an account");
    require(checkalreadyfriends(_raddress),"only friends can send the messages ");
    require(keccak256(bytes(_message))!=keccak256(bytes("")),"enter a valid message");
    bytes32  hash = _getchatcode(_raddress);
    allmessages[hash].push(message(msg.sender,block.timestamp,_message));
}

function readmessages(address _raddress) public view returns(message[] memory){
    bytes32  hash = _getchatcode(_raddress);
    return allmessages[hash];
}

}