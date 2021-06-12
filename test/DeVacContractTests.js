const { assert } = require('chai');
const truffleAssert = require('truffle-assertions');
const DeVacContract = artifacts.require('DeVacContract.sol');

contract('DeVacContract', (accounts) => {
  let deVacContract;

  const getRandomNumber = () => {
    return Math.floor(Math.random() * 10);
  };

  before(async () => {
    deVacContract = await DeVacContract.deployed();
  });

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = await deVacContract.address;

      assert.notEqual(address, 0x0);
      assert.notEqual(address, '');
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    });
  });

  describe('isOwner', async () => {
    it('true when msg.sender is the owner', async () => {
      const result = await deVacContract.isOwner();

      assert.equal(result, true);
    });

    it('false when msg.sender is not the owner', async () => {
      let randomAccount = accounts[getRandomNumber()];
      while (randomAccount === accounts[0]) {
        randomAccount = accounts[getRandomNumber()];
      }

      const result = await deVacContract.isOwner({ from: randomAccount });

      assert.equal(result, false);
    });
  });

  describe('mint', async () => {
    it('mints new a token successfully', async () => {
      const randomAccount = accounts[getRandomNumber()];
      const result = await deVacContract.mint(randomAccount);

      const event = result.logs[0].args;

      assert.equal(event.tokenId.toNumber(), 1);
      assert.equal(event.from, '0x0000000000000000000000000000000000000000');
      assert.equal(event.to, randomAccount);
    });
  });
});
