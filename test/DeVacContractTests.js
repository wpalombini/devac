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
    it('mints a new token successfully', async () => {
      const randomAccount = accounts[getRandomNumber()];
      const tokenURI1 = 'testURI1';
      const tokenURI2 = 'testURI2';
      let result = await deVacContract.mint(randomAccount, tokenURI1);

      let mintEvent = result.logs[0].args;
      assert.equal(mintEvent.tokenId.toNumber(), 1);
      assert.equal(mintEvent.from, '0x0000000000000000000000000000000000000000');
      assert.equal(mintEvent.to, randomAccount);

      let tokenMintedEvent = result.logs[1].args;
      assert.equal(tokenMintedEvent.tokenId.toNumber(), 1);
      assert.equal(tokenMintedEvent.tokenURI, tokenURI1);
      assert.equal(tokenMintedEvent.owner, randomAccount);

      result = await deVacContract.mint(randomAccount, tokenURI2);

      mintEvent = result.logs[0].args;
      assert.equal(mintEvent.tokenId.toNumber(), 2);
      assert.equal(mintEvent.from, '0x0000000000000000000000000000000000000000');
      assert.equal(mintEvent.to, randomAccount);

      tokenMintedEvent = result.logs[1].args;
      assert.equal(tokenMintedEvent.tokenId.toNumber(), 2);
      assert.equal(tokenMintedEvent.tokenURI, tokenURI2);
      assert.equal(tokenMintedEvent.owner, randomAccount);

      const ownedTokens = (await deVacContract.getTokensForOwner(randomAccount)).map((tokenId) => tokenId.toNumber());
      assert.equal(ownedTokens.length, 2);

      const tokenData1 = await deVacContract.getTokenDetailsForId(ownedTokens[0], { from: randomAccount });
      const tokenData2 = await deVacContract.getTokenDetailsForId(ownedTokens[1], { from: randomAccount });

      assert.equal(tokenData1.tokenId, 1);
      assert.equal(tokenData1.tokenURI, tokenURI1);
      assert.equal(tokenData1.owner, randomAccount);

      assert.equal(tokenData2.tokenId, 2);
      assert.equal(tokenData2.tokenURI, tokenURI2);
      assert.equal(tokenData2.owner, randomAccount);
    });
  });
});
