const { network } = require("hardhat")

module.exports= async function(hre){

    const {getAccounts,deplyments}=hre
    const {deploy,log}=deplyments
    const {deployer}=await getAccounts()
    const chainid=  network.config.chainId

    let ethUsdPriceFeedAddress

    if (chainid == 31337) {
        // Find ETH/USD price feed
        const EthUsdAggregator = await deploy.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = EthUsdAggregator.address
    } else {
        ethUsdPriceFeedAddress = networkConfig[chainid].ethUsdPriceFeed
    }
}