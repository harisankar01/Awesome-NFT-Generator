const { network } = require("hardhat")

module.exports= async function(hre){

    const {getAccounts,deployments}=hre
    const {deploy,log}=deployments
    const {deployer}=await getAccounts()
    const chainid=  network.config.chainId
    const { DECIMALS, INITIAL_PRICE } = require("../helper")
    if (chainid==31337){
        await deploy("MockV3Aggregator",{
            from: deployer,
            log: true,
            args: [DECIMALS, INITIAL_PRICE],
        })
    }
}
module.exports.tags=["all","mocks"]