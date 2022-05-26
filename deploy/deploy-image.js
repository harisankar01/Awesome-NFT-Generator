const { network, ethers } = require("hardhat")
const puppeteer = require("puppeteer");
const fs = require("fs");
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
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.pexels.com/");
  const issueSrcs = await page.evaluate(() => {
      const srcs = Array.from(
        document.querySelectorAll("img")
      ).map((image) => image.getAttribute("src"));
      return srcs;
});
await browser.close();
 let uri=issueSrcs[0];
request(uri).pipe(fs.createWriteStream("trail.jpg")).on('close', ()=>{console.log("done")});
//fs.writeFileSync("./data.json", JSON.stringify(issueSrcs));
let f1=await fs.readFileSync("trail.jpg",{encoding:'utf-8'})
args=[ethUsdPriceFeedAddress,f1,highv];
const scrapperNFT=await deploy("svgGenerator",{
    from: deployer,
    arguments :args,
    log:true
})
}
module.exports.tags=["all","scrapper svg"];