# DApp_Assignment3
Class Project
เสนอและจัดทำโครงการขนาดเล็กที่มีการพัฒนา DApp ในประเด็นที่สนใจ  

# วัตถุประสงค์ของโครงการ
โครงการร่วมระดมทุนสนับสนุนสำหรับแบ่งปันของขวัญให้แก่เด็กๆ

# การวิเคราะห์และออกแบบ (Analysis & Design)

### การจัดทำ (Implementation)  
---
สร้าง Directory สำหรับบันทึก Project ชื่อ Assignment3

    mkdir Assignment3
    cd Assignment3
---
---
ดาวน์โหลดโครงสร้างของโปรเจ็ค pet-shop ซึ่งมีอยู่ใน Truffle Framework โดยใช้คำสั่งต่อไปนี้

    truffle unbox pet-shop
---

เปิดโปรแกรม Ganache


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
File : index.html

![image](https://user-images.githubusercontent.com/74086000/104813033-12663380-5839-11eb-8fcb-bf6d73c7c128.png)

---

    <!DOCTYPE html>
    <html lang="en">
     <head>
        <meta charset="utf-8">
         <meta http-equiv="X-UA-Compatible" content="IE=edge">
         <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
        <title>Project Sharing Gift</title>

    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet">

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  
    </head>
     <body>
    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-sm-8 col-sm-push-2">
          <h1 style="color:yellow">Project Sharing Gift & Happiness</h1>
          <style>
            body {
              background-image: url('https://images4.alphacoders.com/843/84314.jpg');
              background-repeat: no-repeat;
              background-attachment: fixed; 
              background-size: 100% 100%;
            }
            </style>
          <hr/>
          <br/>
        </div>
      </div>

      <div id="giftRow" class="row">
        <!-- GIFT LOAD HERE -->
      </div>
    </div>

    <div id="giftTemplate" style="display: none;">
      <div class="col-sm-5 col-md-3 col-lg-2">
        <div class="panel panel-default panel-gift">
          <div class="panel-heading">
            <h3 class="panel-title"></h3>
          </div>
          <div class="panel-body">
            <img alt="90x90" data-src="holder.js/90x90" class="img-rounded img-center" style="width: 100%;" src="images/pic1.jpeg" data-holder-rendered="true">
            <br/><br/>
            <strong>Highlights</strong>: <span class="Product-Highlights"></span><br/>
            <strong>Description</strong>: <span class="Product-Description"></span><br/>
            <button class="btn btn-default btn-donate" type="button" data-id="0">Donate</button>
            <br/><br/>
          </div>
        </div>
      </div>
    </div>

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="js/bootstrap.min.js"></script>
    <script src="js/web3.min.js"></script>
    <script src="js/truffle-contract.js"></script>
    <script src="js/app.js"></script>
    </body>
    </html>
---


### การวิเคราะห์และออกแบบ Back-End ที่เกี่ยวข้อง  
File : gift.json  
File : Donation.json  
File : app.js




### ผลการทดสอบ (Testing) แสดงผลลัพธ์ที่ได้จากโครงการ
