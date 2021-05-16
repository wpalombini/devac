const { assert } = require('chai');
const truffleAssert = require('truffle-assertions');
const DeVacContract = artifacts.require('DeVacContract.sol');

contract('DeVacContract', (accounts) => {
  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = await DeVacContract.address;

      assert.notEqual(address, 0x0);
      assert.notEqual(address, '');
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    });
  });
});
