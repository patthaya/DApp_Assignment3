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