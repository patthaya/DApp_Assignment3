# DApp_Assignment3
Class Project
เสนอและจัดทำโครงการขนาดเล็กที่มีการพัฒนา DApp ในประเด็นที่สนใจ  

# วัตถุประสงค์ของโครงการ
โครงการร่วมระดมทุนสนับสนุนสำหรับแบ่งปันของขวัญให้แก่เด็กๆ

# การวิเคราะห์และออกแบบ (Analysis & Design)

### การออกแบบ Smart Contract ที่ใช้งานในโครงการ
---
Smart Contract Name : Donation.sol  
    
    function donate(uint giftId) public returns (uint) {
        require(giftId >= 0 && giftId <=3);
        User[giftId] = msg.sender;
        return giftId;
    }
    
    function getUser() public view returns (address[4] memory) {
        return User;
    }
---
---
Deploy Contract Name : 2_deploy_contracts.js  

    var Donation = artifacts.require("Donation");
      module.exports = function(deployer) {
      deployer.deploy(Donation);
      };
---

### การวิเคราะห์และออกแบบ Front-End ที่เกี่ยวข้อง



### การวิเคราะห์และออกแบบ Back-End ที่เกี่ยวข้อง

- การจัดทำ (Implementation) ได้แก่ การอธิบายโค้ดเฉพาะส่วนที่สำคัญ
- ผลการทดสอบ (Testing) แสดงผลลัพธ์ที่ได้จากโครงการ
