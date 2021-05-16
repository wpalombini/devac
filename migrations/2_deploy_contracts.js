const DeVacContract = artifacts.require('DeVacContract');

module.exports = function (deployer) {
  deployer.deploy(DeVacContract);
};
