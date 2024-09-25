const Identity = artifacts.require("Identity");

contract("IdentityContract", (accounts) => {
  let identityInstance;

  beforeEach(async () => {
    identityInstance = await Identity.new();
  });

  it("should allow a user to create a digital identity", async () => {
    const userAddress = accounts[0];
    await identityInstance.createIdentity(userAddress, "User Name", { from: userAddress });
    const identity = await identityInstance.identities(userAddress);
    assert.equal(identity.name, "User Name", "Identity name should match");
  });
});
