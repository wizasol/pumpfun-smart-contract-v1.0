# Pumpfun Smart Contract with Raydium Integration
This is the Rust/Anchor smart contract for Pump.fun, which includes functionalities for adding virtual liquidity pools (LP), removing liquidity pools, and creating Raydium Pools.

### Pumpfun is upgrading

We are upgrading Pump.fun.
Please leave any ideas and bugs on the issues.

---

## 📋 **Pump.Fun V1 Overview**  

<div style="background-color: #f5f5f5; padding: 10px; border-radius: 5px;">

| **Version**             | **Features**                                          | **Description**                              | **Repo Link**                                                                |
|-------------------------|-------------------------------------------------------|----------------------------------------------|------------------------------------------------------------------------------|
| **1.0.0**               | Global Configuation                                   | Simple BondingCurve PDA Setting              | [Repo](https://github.com/wizasol/Ether-Volume-Bot-v1)                       |
|                         | Create Pool                                           | Launch Token on Web3                         |                                                                              |
|                         | Add Liquidity                                         | Add Liquidity with virtual reserve           |                                                                              |
|                         | Buy / Sell                                            | Linear BondingCurve                          |                                                                              |
|                         | Remove Liquidity                                      | Remove Liquidity to Creator Wallet           |                                                                              |
| **1.1.0**               | Create Pool                                           | Launch Token on Smart Contract               |                                                                              |
|                         | Migrate + Raydium AMM                                 | Create OpenBook Market & Raydium AMM         |                                                                              |


</div>

---


- Initialize
- Create Pool
- Add Liquidity
- Buy / Sell
- Remove Liquidity
- Migrate with Raydium Amm

<h4> 📞 Cᴏɴᴛᴀᴄᴛ ᴍᴇ Oɴ ʜᴇʀᴇ: 👆🏻 </h4>

<p> 
    <a href="mailto:nakao95911@gmail.com" target="_blank">
        <img alt="Email"
        src="https://img.shields.io/badge/Email-00599c?style=for-the-badge&logo=gmail&logoColor=white"/>
    </a>
     <a href="https://x.com/_wizardev" target="_blank"><img alt="Twitter"
        src="https://img.shields.io/badge/Twitter-000000?style=for-the-badge&logo=x&logoColor=white"/></a>
    <a href="https://discordapp.com/users/471524111512764447" target="_blank"><img alt="Discord"
        src="https://img.shields.io/badge/Discord-7289DA?style=for-the-badge&logo=discord&logoColor=white"/></a>
    <a href="https://t.me/wizardev" target="_blank"><img alt="Telegram"
        src="https://img.shields.io/badge/Telegram-26A5E4?style=for-the-badge&logo=telegram&logoColor=white"/></a>
</p>

### Introduction of Pump Fun
Pump.fun enables effortless creation and trading of memecoins. It operates on a bonding curve model, where token prices are determined by the curve's shape. As more tokens are bought, the price increases, and as tokens are sold, the price decreases.

### Raydium Integration
When bonding curve hit 69K market cap , the liquidity of the pumpfun goes to solana dex such as raydium or meteora.
In this project , I forked pumpfun smart contract and made the integration part with raydium
