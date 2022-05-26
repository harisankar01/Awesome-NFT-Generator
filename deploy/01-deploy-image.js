const { network, ethers } = require("hardhat")
const cherio=require('cherio');
const fs = require("fs");
const request = require('request');
module.exports= async function(hre){

    const {getNamedAccounts,deployments}=hre
    const {deploy,log}=deployments
    const {deployer}=await getNamedAccounts()
    const chainid=  network.config.chainId

    let ethUsdPriceFeedAddress
    const highv=ethers.utils.parseEther("2000").toString();
    if (chainid == 31337) {
        const EthUsdAggregator = await ethers.getContract("MockV3Aggregator")
        ethUsdPriceFeedAddress = EthUsdAggregator.address
    } else {
        ethUsdPriceFeedAddress = networkConfig[chainid].ethUsdPriceFeed
    }
var imglink;
request("https://www.pexels.com/",(er,res,html)=>{
    if(!er && res.statusCode==200){
        const $=cherio.load(html)
        $("img").each((index,image)=>{
            var img=$(image).attr("src");
            var baseurl="https://www.pexels.com/";
            imglink=baseurl+img;
            console.log(imglink);
        })
    }
})
let f1;
request("https://images.pexels.com/photos/11438396/pexels-photo-11438396.jpeg?auto=compress&cs=tinysrgb&h=650&w=940").pipe(fs.createWriteStream("trail.jpeg")).on('close', ()=>{console.log("done")});
f1=await fs.readFileSync("trr.jpg",{encoding:'utf-8'})
console.log(f1);
args=[ethUsdPriceFeedAddress,f1];
await deploy("svgGenerator",{
    from: deployer,
    log: true,
    args: args
});
const scrapperNft= await ethers.getContract("svgGenerator");
await scrapperNft.mintNft();
}
module.exports.tags=["all","scrapper svg"];