const hre = require("hardhat");

async function main() {
  // Endereço do token YHR (já existe na BSC)
  const YHR_TOKEN = "0x6E0aA995ed003b6C3018C45B2D68dc397253C3C6";

  // Endereço do USDT BEP-20 oficial na BSC
  const USDT_TOKEN = "0x55d398326f99059fF775485246999027B3197955";

  // Preço fixo: 0.16 USDT por YHR
  const PRICE = hre.ethers.utils.parseUnits("16", 16); 
  // Explicação: como o contrato usa 18 casas, 0.16 USDT = 16 * 10^16

  const YHRDualPaySale = await hre.ethers.getContractFactory("YHRDualPaySale");

  const sale = await YHRDualPaySale.deploy(
    YHR_TOKEN,
    USDT_TOKEN,
    PRICE,
    10,      // minPurchase (10 USDT)
    1000     // maxPurchase (1000 USDT)
  );

  await sale.deployed();

  console.log("✅ Contrato de Venda deployado com sucesso!");
  console.log("📍 Endereço do Contrato de Venda:", sale.address);
  console.log("📍 Token YHR:", YHR_TOKEN);
  console.log("📍 USDT (BEP-20 oficial):", USDT_TOKEN);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
