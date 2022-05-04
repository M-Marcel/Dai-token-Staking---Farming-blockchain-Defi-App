const { assert } = require('chai');
const _deploy_contract = require('../migrations/2_deploy_contract');

   const DaiToken = artifacts.require('DaiToken');
   const DappToken = artifacts.require('DappToken');
   const TokenFarm = artifacts.require('TokenFarm');

   require('chai')
    .use(require('chai-as-promised'))
    .should()

    function tokens(n){
       return web3.utils.toWei(n, 'ether');
    }

    contract('TokenFarm', ([owner, investor]) => {
        let daiToken, dappToken, tokenFarm

        before(async () => {
            // Load Contracts
            daiToken = await DaiToken.new()
            dappToken = await DappToken.new()
            tokenFarm = await TokenFarm.new(dappToken.address, daiToken.address)

            //Transfer all tokens to TokenFarm (1 million)
            await dappToken.transfer(tokenFarm.address, tokens('1000000'))

            //Send tokens to investor;
            await daiToken.transfer(investor, tokens('100'), { from: owner})
        })

        describe('Mock DAI depoyment', async () => {
            it('has a name', async () => {
                const name = await daiToken.name()
                assert.equal(name, 'Mock DAI Token')
            })
        })

        describe('Dapp Token depoyment', async () => {
            it('has a name', async () => {
                const name = await dappToken.name()
                assert.equal(name, 'DApp Token')
            })
        })

        describe('Token Farm depoyment', async () => {
            it('has a name', async () => {
                const name = await tokenFarm.name()
                assert.equal(name, 'Dapp Token Farm')
            })

            it('contract has tokens', async () => {
                let balance = await dappToken.balanceOf(tokenFarm.address)
                assert.equal(balance.toString(), tokens('1000000'))
            })

        })

        describe('Farming Token', async () => {
            let result

            //Check Investor balance before staking
            result = await daiToken.balanceOf(investor)
            assert.equal(result.toString(), token('100'), 'investor Mock DAI wallet balance correct before staking')

            // //Stake Mock Dai Tokens
            // await daiToken.approval(tokenFarm.address, token ('100'), { from: investor })
            // await tokenFarm.stakeTokens(tokens('100'), { from: investor} )

            // // Check Status result
            // result = await daiToken.balanceOf(investor)
            // assert.equal(result.toString(), tokens('0'), 'investor Mock DAI wallet balance is correct after staking')

            // result = await daiToken.balanceOf(tokenFarm.address)
            // assert.equal(result.toString(), tokens('100'), 'Token Farm Mock DAI wallet balance is correct after staking')
        
            // result = await tokenFarm.stakingBalance(investor)
            // assert.equal(result.toString(), tokens('100'), 'Investor staking balance is correct')

            // result = await tokenFarm.isStaking(investor)
            // assert.equal(result.toString(), 'true', 'Investor staking status is true after staking')
        })

    })
