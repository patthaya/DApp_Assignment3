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
![image(5)](https://user-images.githubusercontent.com/74086000/104813760-c10c7300-583d-11eb-9796-1f267e56f5fb.png)

![image(6)](https://user-images.githubusercontent.com/74086000/104813856-63c4f180-583e-11eb-8192-7cd67596f9b0.png)

### การออกแบบ Smart Contract ที่ใช้งานในโครงการ
---
File Smart Contract Name : Donation.sol  
    
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
File Deploy Contract Name : 2_deploy_contracts.js  

    var Donation = artifacts.require("Donation");
      module.exports = function(deployer) {
      deployer.deploy(Donation);
      };
---

ใช้คำสั่ง migrate
---
truffle migrate

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

---
File : gift.json 

    [
    {
    "id": 0,
    "name": "Dumbledore",
    "picture:": "images/pic1.jpeg",
    "about": "Officially licensed",
    "desc": "this POP! Albus Dumbledore Vinyl Figure is an experienced wizard"
    },
    {
    "id": 1,
    "name": "Harry Potter",
    "picture": "images/pic2.jpeg",
    "about": "Officially licensed",
    "desc": "Wingardium Leviosa! Start practicing that incantation because it makes objects levitate toward you."
     },
     {
    "id": 2,
    "name": "Draco Malfoy",
    "picture": "images/pic3.jpeg",
    "about": "Officially licensed",
    "desc": "Stylized collectable stands 3 3/4 inches tall, perfect for any Harry Potter fan!"
    },
    {
    "id": 3,
    "name": "Hermione Granger",
    "picture": "images/pic4.jpeg",
    "about": "Officially licensed",
    "desc": "Check out the other Harry Potter figures from Funko! Stands 3 3/4 inches"
    }
    ]
---
---
File : Donation.json     
    
---
---
File : app.js
        
    App = {
        web3Provider: null,
        contracts: {},
    
     init: async function() {
       // Load
    $.getJSON('../gift.json', function(data) {
      var giftRow = $('#giftRow');
      var giftTemplate = $('#giftTemplate');

      for (i = 0; i < data.length; i ++) {
        giftTemplate.find('.panel-title').text(data[i].name);
        giftTemplate.find('img').attr('src', data[i].picture);
        giftTemplate.find('.Product-Highlights').text(data[i].about);
        giftTemplate.find('.Product-Description').text(data[i].desc);
        giftTemplate.find('.btn-donate').attr('data-id', data[i].id);

        giftRow.append(giftTemplate.html());
      }
    });

    return await App.initWeb3();
      },

      initWeb3: async function() {
          // Modern dapp browsers...
         if (window.ethereum) {
            App.web3Provider = window.ethereum;
             try {
                // Request account access
             await window.ethereum.enable();
            } catch (error) {
              // User denied account access...
              console.error("User denied account access")
             }
            }
            // Legacy dapp browsers...
         else if (window.web3) {
           App.web3Provider = window.web3.currentProvider;
         }
            // If no injected web3 instance is detected, fall back to Ganache
            else {
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
            }
            web3 = new Web3(App.web3Provider);

            return App.initContract();
        },

        initContract: function() {
         $.getJSON('Donation.json', function (data) {
              // Get the necessary contract artifact file and instantiate it with @truffle/contract
             var DonationArtifact = data;
             App.contracts.Donation = TruffleContract(DonationArtifact);

            // Set the provider for our contract
            App.contracts.Donation.setProvider(App.web3Provider);

             return App.markAdopted();
         });
         return App.bindEvents();
        },

        bindEvents: function() {
          $(document).on('click', '.btn-donate', App.handleAdopt);
         },

          markAdopted: function() {
         var donationtionInstance;

         App.contracts.Donation.deployed().then(function (instance) {
           donationtionInstance = instance;

             return donationtionInstance.getUser.call();
         }).then(function (user) {
           for (i = 0; i < user.length; i++) {
                if (user[i] !== '0x0000000000000000000000000000000000000000') {
                  $('.panel-gift').eq(i).find('button').text('Success').attr('disabled', true);
                }
              }
          }).catch(function (err) {
           console.log(err.message);
         });
         },

          handleAdopt: function(event) {
         event.preventDefault();

         var giftId = parseInt($(event.target).data('id'));

         var donationtionInstance;

         web3.eth.getAccounts(function (error, accounts) {
           if (error) {
                console.log(error);
              }

             var account = accounts[0];

             App.contracts.Donation.deployed().then(function (instance) {
               donationtionInstance = instance;

              // Execute adopt as a transaction by sending account
                return donationtionInstance.donate(giftId, { from: account });
             }).then(function (result) {
               return App.markAdopted();
             }).catch(function (err) {
               console.log(err.message);
             });
         });
         }

        };

        $(function() {
         $(window).load(function() {
           App.init();
              });
           });

---


ติดตั้ง MetaMask
   - ติดตั้ง MetaMask ที่บราวเซอร์ Firefox  
   - Conect MetaMask
   
Run Backend โดยใช้คำสั่ง

    npm run dev


### ผลการทดสอบ (Testing) แสดงผลลัพธ์ที่ได้
![image](https://user-images.githubusercontent.com/74086000/104814394-34fc4a80-5841-11eb-8c66-4719b3381b46.png)

![image(1)](https://user-images.githubusercontent.com/74086000/104814415-4cd3ce80-5841-11eb-8e36-10fff1fcf648.png)

![image(4)](https://user-images.githubusercontent.com/74086000/104814423-5c531780-5841-11eb-8869-1066a666e2bb.png)

![image(2)](https://user-images.githubusercontent.com/74086000/104814430-65dc7f80-5841-11eb-8898-e10a25c69e2b.png)

![image(3)](https://user-images.githubusercontent.com/74086000/104814442-712fab00-5841-11eb-90fe-b1061de2b25e.png)

![image(7)](https://user-images.githubusercontent.com/74086000/104814539-19457400-5842-11eb-9b08-66d9c8e6b5d9.png)
