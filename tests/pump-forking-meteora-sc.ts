import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Connection, PublicKey, Keypair, SystemProgram, Transaction, sendAndConfirmTransaction, ComputeBudgetProgram, SYSVAR_RENT_PUBKEY, TransactionInstruction } from "@solana/web3.js"
import { createMint, getOrCreateAssociatedTokenAccount, mintTo, getAssociatedTokenAddress, syncNative, syncNativeInstructionData, createApproveInstruction, createSyncNativeInstruction, NATIVE_MINT } from "@solana/spl-token"
import { expect } from "chai";
import { BN } from "bn.js";
import { ASSOCIATED_PROGRAM_ID, TOKEN_PROGRAM_ID } from "@coral-xyz/anchor/dist/cjs/utils/token";
import keys3 from "../keys/users3.json";
import { PumpForkingMeteoraSc } from "../target/types/pump_forking_meteora_sc";
import axios from "axios";
import { DLMM } from "../dlmm/index";
import { LBCLMM_PROGRAM_IDS, MAX_BIN_PER_POSITION } from "../dlmm/constants";
import { IDL } from "../dlmm/idl";
import { deriveBinArray, deriveLbPair2, derivePresetParameter2, deriveReserve } from "../dlmm/helpers/derive";
import { AnchorProvider } from "@coral-xyz/anchor";
import { Wallet } from "@coral-xyz/anchor";
import { binIdToBinArrayIndex, deriveBinArrayBitmapExtension } from "../dlmm/helpers";

const connection = new Connection("https://api.devnet.solana.com");

const curveSeed = "CurveConfiguration"
const POOL_SEED_PREFIX = "liquidity_pool"
const LIQUIDITY_SEED = "LiqudityProvider"
const SOL_VAULT_PREFIX = "liquidity_sol_vault"

// Meteora congfiguration
const DEFAULT_ACTIVE_ID = new BN(5630);
const DEFAULT_BIN_STEP = new BN(10);
const DEFAULT_BASE_FACTOR = new BN(10000);
const DEFAULT_BASE_FACTOR_2 = new BN(4000);

const lowerBinId = DEFAULT_ACTIVE_ID.sub(new BN(30));
const width = MAX_BIN_PER_POSITION;
const lower_bin_id = lowerBinId.toNumber();
const width_position = width.toNumber();
const upper_bin_id = lower_bin_id + width_position;
const upperBinId = new BN(upper_bin_id);

const lowerBinIdBytes = lowerBinId.isNeg()
  ? lowerBinId.toTwos(32).toArrayLike(Buffer, "le", 4)
  : lowerBinId.toArrayLike(Buffer, "le", 4);

const widthBytes = width.isNeg()
  ? width.toTwos(32).toArrayLike(Buffer, "le", 4)
  : width.toArrayLike(Buffer, "le", 4);



describe("pump-forking-meteora-sc", () => {

  anchor.setProvider(anchor.AnchorProvider.env());
  const program = anchor.workspace.PumpForkingMeteoraSc as Program<PumpForkingMeteoraSc>;
  const user = Keypair.fromSecretKey(new Uint8Array(keys3));
  console.log(user.publicKey.toBase58())
  const mint1 = new PublicKey("AB3L6A3LYHoW2ZTs5tiDmTFeHr7MkZCCChp7r66wN1fW");  ////  quant token
  const sol = new PublicKey("So11111111111111111111111111111111111111112");     ////  base token

  const provider = new AnchorProvider(
    connection,
    new Wallet(user),
    AnchorProvider.defaultOptions()
  );

  const dlmmProgram = new Program(IDL, LBCLMM_PROGRAM_IDS["devnet"], provider);   ///// Meteora Contract

  const [presetParamPda] = derivePresetParameter2(
    DEFAULT_BIN_STEP,
    DEFAULT_BASE_FACTOR,
    dlmmProgram.programId
  );

  const [eventAuthority] = PublicKey.findProgramAddressSync(
    [Buffer.from("__event_authority")],
    dlmmProgram.programId
  );

  const [lbPair] = deriveLbPair2(sol, mint1, DEFAULT_BIN_STEP, DEFAULT_BASE_FACTOR, dlmmProgram.programId);

  const [customFeeOwnerPosition] = PublicKey.findProgramAddressSync(
    [
      Buffer.from("position"),
      lbPair.toBuffer(),
      user.publicKey.toBuffer(),
      lowerBinIdBytes,
      widthBytes,
    ],
    dlmmProgram.programId
  );

  const [reserveX] = deriveReserve(
    sol,
    lbPair,
    dlmmProgram.programId
  );
  const [reserveY] = deriveReserve(
    mint1,
    lbPair,
    dlmmProgram.programId
  );

  const lowerBinArrayIndex = binIdToBinArrayIndex(lowerBinId);
  const upperBinArrayIndex = binIdToBinArrayIndex(upperBinId);

  const [lowerBinArrayPubKey] = deriveBinArray(
    lbPair,
    lowerBinArrayIndex,
    dlmmProgram.programId
  );
  const [upperBinArrayPubKey] = deriveBinArray(
    lbPair,
    upperBinArrayIndex,
    dlmmProgram.programId
  );

  const [binArrayBitMapExtension] = PublicKey.findProgramAddressSync(
    [Buffer.from("bitmap"), lbPair.toBuffer()],
    dlmmProgram.programId
  );

  const amountX = 10000000000;    //////  amount of base token
  const amountY = 1000000000000;  //////  amount of quant token
  const binId = DEFAULT_ACTIVE_ID;   //////   bin ID adding liquidity
  const disturbX = 10;   ////////    distribution of base token
  const disturbY = 10;   ////////    distribution of quant token

  ///////////////////////////////////////////////////////
  //                     Initialize                    //
  ///////////////////////////////////////////////////////

  // it("Initialize the contract", async () => {
  //   try {
  //     const [curveConfig] = PublicKey.findProgramAddressSync(
  //       [Buffer.from(curveSeed)],
  //       program.programId
  //     )
  //     const tx = new Transaction()
  //       .add(
  //         ComputeBudgetProgram.setComputeUnitLimit({ units: 20_000 }),
  //         ComputeBudgetProgram.setComputeUnitPrice({ microLamports: 1200_000 }),
  //         await program.methods
  //           .initialize(0.02)
  //           .accounts({
  //             dexConfigurationAccount: curveConfig,
  //             admin: user.publicKey,
  //             rent: SYSVAR_RENT_PUBKEY,
  //             systemProgram: SystemProgram.programId
  //           })
  //           .instruction()
  //       )
  //     tx.feePayer = user.publicKey
  //     tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash
  //     console.log(await connection.simulateTransaction(tx))
  //     const sig = await sendAndConfirmTransaction(connection, tx, [user], { skipPreflight: true })
  //     console.log("Successfully initialized : ", `https://solscan.io/tx/${sig}?cluster=devnet`)
  //   } catch (error) {
  //     console.log("Error in initialization :", error)
  //   }
  // });

  ////////////////////////////////////////////////////////////////
  //                          Create Pool                       //
  ////////////////////////////////////////////////////////////////

  // it("create pool", async () => {
  //   try {
  //     const [poolPda] = PublicKey.findProgramAddressSync(
  //       [Buffer.from(POOL_SEED_PREFIX), mint1.toBuffer()],
  //       program.programId
  //     )
  //     const poolToken = await getAssociatedTokenAddress(
  //       mint1, poolPda, true
  //     )
  //     const tx = new Transaction()
  //       .add(
  //         ComputeBudgetProgram.setComputeUnitLimit({ units: 200_000 }),
  //         ComputeBudgetProgram.setComputeUnitPrice({ microLamports: 200_000 }),
  //         await program.methods
  //           .createPool()
  //           .accounts({
  //             pool: poolPda,
  //             tokenMint: mint1,
  //             poolTokenMint: poolToken,
  //             payer: user.publicKey,
  //             tokenProgram: TOKEN_PROGRAM_ID,
  //             rent: SYSVAR_RENT_PUBKEY,
  //             associatedTokenProgram: ASSOCIATED_PROGRAM_ID,
  //             systemProgram: SystemProgram.programId
  //           })
  //           .instruction()
  //       )
  //     tx.feePayer = user.publicKey
  //     tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash
  //     console.log(await connection.simulateTransaction(tx))
  //     const sig = await sendAndConfirmTransaction(connection, tx, [user], { skipPreflight: true })
  //     console.log("Successfully created pool : ", `https://solscan.io/tx/${sig}?cluster=devnet`)
  //   } catch (error) {
  //     console.log("Error in creating pool", error)
  //   }
  // })

  //////////////////////////////////////////////////////////////
  //                        Add liquidity                     //
  //////////////////////////////////////////////////////////////

  // it("add liquidity", async () => {
  //   try {
  //     const [poolPda] = PublicKey.findProgramAddressSync(
  //       [Buffer.from(POOL_SEED_PREFIX), mint1.toBuffer()],
  //       program.programId
  //     )
  //     const [liquidityProviderAccount] = PublicKey.findProgramAddressSync(
  //       [Buffer.from(LIQUIDITY_SEED), poolPda.toBuffer(), user.publicKey.toBuffer()],
  //       program.programId
  //     )

  //     const [poolSolVault] = PublicKey.findProgramAddressSync(
  //       [Buffer.from(SOL_VAULT_PREFIX), mint1.toBuffer()],
  //       program.programId
  //     )
  //     const poolToken = await getAssociatedTokenAddress(
  //       mint1, poolPda, true
  //     )

  //     const userAta1 = await getAssociatedTokenAddress(
  //       mint1, user.publicKey
  //     )
  //     const tx = new Transaction()
  //       .add(
  //         ComputeBudgetProgram.setComputeUnitLimit({ units: 200_000 }),
  //         ComputeBudgetProgram.setComputeUnitPrice({ microLamports: 200_000 }),
  //         await program.methods
  //           .addLiquidity()
  //           .accounts({
  //             pool: poolPda,
  //             tokenMint: mint1,
  //             poolTokenAccount: poolToken,
  //             poolSolVault: poolSolVault,
  //             userTokenAccount: userAta1,
  //             user: user.publicKey,
  //             tokenProgram: TOKEN_PROGRAM_ID,
  //             associatedTokenProgram: ASSOCIATED_PROGRAM_ID,
  //             rent: SYSVAR_RENT_PUBKEY,
  //             systemProgram: SystemProgram.programId
  //           })
  //           .instruction()
  //       )
  //     tx.feePayer = user.publicKey
  //     tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash
  //     console.log(await connection.simulateTransaction(tx))
  //     const sig = await sendAndConfirmTransaction(connection, tx, [user], { skipPreflight: true })
  //     console.log("Successfully added liquidity : ", `https://solscan.io/tx/${sig}?cluster=devnet`)
  //   } catch (error) {
  //     console.log("Error in adding liquidity", error)
  //   }
  // })

  ////////////////////////////////////////////////////////////////
  //                           Buy token                        //
  ////////////////////////////////////////////////////////////////

  // it("User2 Buy token", async () => {
  //   try {
  //     const [curveConfig] = PublicKey.findProgramAddressSync(
  //       [Buffer.from(curveSeed)],
  //       program.programId
  //     )
  //     const [poolPda] = PublicKey.findProgramAddressSync(
  //       [Buffer.from(POOL_SEED_PREFIX), mint1.toBuffer()],
  //       program.programId
  //     )
  //     const poolToken = await getAssociatedTokenAddress(
  //       mint1, poolPda, true
  //     )
  //     const userAta2 = await getAssociatedTokenAddress(
  //       mint1, user2.publicKey
  //     )
  //     const [poolSolVault] = PublicKey.findProgramAddressSync(
  //       [Buffer.from(SOL_VAULT_PREFIX), mint1.toBuffer()],
  //       program.programId
  //     )
  //     const response = await axios.get(
  //       'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd'
  //     );
  //     const solPrice = response.data.solana.usd;
  //     const tx = new Transaction()
  //       .add(
  //         ComputeBudgetProgram.setComputeUnitLimit({ units: 200_000 }),
  //         ComputeBudgetProgram.setComputeUnitPrice({ microLamports: 200_000 }),
  //         await program.methods
  //           .buy(new BN(100), solPrice)
  //           .accounts({
  //             pool: poolPda,
  //             tokenMint: mint1,
  //             poolSolVault: poolSolVault,
  //             poolTokenAccount: poolToken,
  //             userTokenAccount: userAta2,
  //             dexConfigurationAccount: curveConfig,
  //             user: user2.publicKey,
  //             tokenProgram: TOKEN_PROGRAM_ID,
  //             associatedTokenProgram: ASSOCIATED_PROGRAM_ID,
  //             rent: SYSVAR_RENT_PUBKEY,
  //             systemProgram: SystemProgram.programId
  //           })
  //           .instruction()
  //       )
  //     tx.feePayer = user2.publicKey
  //     tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash
  //     console.log(await connection.simulateTransaction(tx))
  //     const sig = await sendAndConfirmTransaction(connection, tx, [user2], { skipPreflight: true })
  //     console.log("Successfully bought : ", `https://solscan.io/tx/${sig}?cluster=devnet`)
  //   } catch (error) {
  //     console.log("Error in buy transaction", error)
  //   }
  // })

  //////////////////////////////////////////////////////////////////
  //                            Sell token                        //
  //////////////////////////////////////////////////////////////////

  // it("User Sell token", async () => {
  //   try {
  //     const [curveConfig] = PublicKey.findProgramAddressSync(
  //       [Buffer.from(curveSeed)],
  //       program.programId
  //     )
  //     const [poolPda] = PublicKey.findProgramAddressSync(
  //       [Buffer.from(POOL_SEED_PREFIX), mint1.toBuffer()],
  //       program.programId
  //     )
  //     const poolToken = await getAssociatedTokenAddress(
  //       mint1, poolPda, true
  //     )
  //     const userAta1 = await getAssociatedTokenAddress(
  //       mint1, user.publicKey
  //     )
  //     const [poolSolVault, bump] = PublicKey.findProgramAddressSync(
  //       [Buffer.from(SOL_VAULT_PREFIX), mint1.toBuffer()],
  //       program.programId
  //     )
  //     const tx = new Transaction()
  //       .add(
  //         ComputeBudgetProgram.setComputeUnitLimit({ units: 200_000 }),
  //         ComputeBudgetProgram.setComputeUnitPrice({ microLamports: 200_000 }),
  //         await program.methods
  //           .sell(new BN(5000000), bump)
  //           .accounts({
  //             pool: poolPda,
  //             tokenMint: mint1,
  //             poolSolVault,
  //             poolTokenAccount: poolToken,
  //             userTokenAccount: userAta1,
  //             dexConfigurationAccount: curveConfig,
  //             user: user.publicKey,
  //             tokenProgram: TOKEN_PROGRAM_ID,
  //             associatedTokenProgram: ASSOCIATED_PROGRAM_ID,
  //             rent: SYSVAR_RENT_PUBKEY,
  //             systemProgram: SystemProgram.programId
  //           })
  //           .instruction()
  //       )
  //     tx.feePayer = user.publicKey
  //     tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash
  //     console.log(await connection.simulateTransaction(tx))
  //     const sig = await sendAndConfirmTransaction(connection, tx, [user], { skipPreflight: true })
  //     console.log("Successfully Sold : ", `https://solscan.io/tx/${sig}?cluster=devnet`)
  //   } catch (error) {
  //     console.log("Error in sell transaction", error)
  //   }
  // })

  /////////////////////////////////////////////////////////////////////
  //                         Remove liquidity                        //
  /////////////////////////////////////////////////////////////////////

  // it("Remove liquidity", async () => {
  //   try {
  //     const [poolPda] = PublicKey.findProgramAddressSync(
  //       [Buffer.from(POOL_SEED_PREFIX), mint1.toBuffer()],
  //       program.programId
  //     )
  //     const poolToken = await getAssociatedTokenAddress(
  //       mint1, poolPda, true
  //     )
  //     const userAta1 = await getAssociatedTokenAddress(
  //       mint1, user.publicKey
  //     )
  //     const [poolSolVault, bump] = PublicKey.findProgramAddressSync(
  //       [Buffer.from(SOL_VAULT_PREFIX), mint1.toBuffer()],
  //       program.programId
  //     )
  //     const tx = new Transaction()
  //       .add(
  //         ComputeBudgetProgram.setComputeUnitLimit({ units: 200_000 }),
  //         ComputeBudgetProgram.setComputeUnitPrice({ microLamports: 200_000 }),
  //         await program.methods
  //           .removeLiquidity(bump)
  //           .accounts({
  //             pool: poolPda,
  //             tokenMint: mint1,
  //             poolTokenAccount: poolToken,
  //             userTokenAccount: userAta1,
  //             poolSolVault,
  //             user: user.publicKey,
  //             tokenProgram: TOKEN_PROGRAM_ID,
  //             associatedTokenProgram: ASSOCIATED_PROGRAM_ID,
  //             rent: SYSVAR_RENT_PUBKEY,
  //             systemProgram: SystemProgram.programId
  //           })
  //           .instruction()
  //       )
  //     tx.feePayer = user.publicKey
  //     tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash
  //     console.log(await connection.simulateTransaction(tx))
  //     const sig = await sendAndConfirmTransaction(connection, tx, [user], { skipPreflight: true })
  //     console.log("Successfully added liquidity : ", `https://solscan.io/tx/${sig}?cluster=devnet`)
  //   } catch (error) {
  //     console.log("Error in removing liquidity", error)
  //   }
  // })

  ///////////////////////////////////////////////////////////////////////////
  //                        Initialize presetParamPda                      //
  ///////////////////////////////////////////////////////////////////////////

  // it("initialize presetParamPda", async () => {
  //   //  Contact to wiz
  // })

  //////////////////////////////////////////////////////////////////////
  //                            create LB Pair                        //
  //////////////////////////////////////////////////////////////////////

  // it("create LB pair", async () => {
  //   //  Contact to wiz
  // });

  /////////////////////////////////////////////////////////////////////////
  ////                        Initialize Position                      ////
  /////////////////////////////////////////////////////////////////////////


  // it("initialize position", async () => {
  //   //  Contact to wiz
  // });

  //////////////////////////////////////////////////////////////////////////
  ////                    Add Liquidity into DLMM Pool                  ////
  //////////////////////////////////////////////////////////////////////////
  /*------------------- Initialize BinArrayBitmapExtensioin --------------*/

  // it("initialize binArrayBitmapExtension", async () => {
  //   //  Contact to wiz
  // })

  /* ------------------ Initialize LowerBinArray ----------------- */

  it("initialize lowerbinArray", async () => {
    //  Contact to wiz
  })

  /* ------------------ Initialize UpperBinArray ----------------- */

  it("initialize upperbinArray", async () => {
    //  Contact to wiz
  })

  /*-------------------- convert to Wrap sol from sol in user wallet ------------------*/

  it("convert Wrap sol", async () => {
   //  Contact to wiz
  });

  /*  ---------------------------  Add Liquidity  ----------------------------  */

  it("Add Meteora Liquidity into pool", async () => {
    const mint1Ata = await getAssociatedTokenAddress(mint1, user.publicKey);
    const solAta = await getAssociatedTokenAddress(sol, user.publicKey);
   //  Contact to wiz
  })
})
