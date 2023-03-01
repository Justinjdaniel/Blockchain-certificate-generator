// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract Certificates {
    address admin;
    event GeneratedAt (uint, string);

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Unauthorized");
        _;
    }

    struct CertificateDetails {
        uint certId;
        string name;
        string certFor;
        string date;
    }

    mapping(uint => CertificateDetails) public certificateId;

    function generateCertificate(
        uint _id,
        string memory _name,
        string memory _certFor,
        string memory _date
    ) public onlyAdmin {
        certificateId[_id] = CertificateDetails(_id, _name, _certFor, _date);
        emit GeneratedAt(_id, _date);
    }
}