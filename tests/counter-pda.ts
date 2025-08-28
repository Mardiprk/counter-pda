import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { CounterPda } from "../target/types/counter_pda";
import { PublicKey } from "@solana/web3.js";

describe("counter-pda", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.counterPda as Program<CounterPda>;
  const wallet = provider.wallet;
  console.log("Using wallet:", wallet.publicKey.toBase58());

  //PDA
  const [counterPda, bump] = PublicKey.findProgramAddressSync(
    [Buffer.from("counter"), wallet.publicKey.toBuffer()],
    program.programId
  );

  console.log("Counter PDA: ", counterPda.toBase58());



  it("✔️ Initialialize Counter", async () => {
    try{
      const tx = await program.methods.initialize().accounts({
        counter: counterPda,
        user: wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId
      }).rpc();

      console.log("✔️ Initialize Tx:", tx);
      
      const account = program.account.counter.fetch(counterPda);
      console.log("Counter Value:", (await account).value);
    }catch(err){
      console.log("Already Initialized or Error:", err);
    }
  })

  //second increment - val: 1
  it("✔️ Increment Counter", async () => {
    try{
      const tx = await program.methods.increment().accounts({
        counter: counterPda,
        user: wallet.publicKey
      }).rpc();

      console.log("✔️ Increment Tx:", tx);

      const account = program.account.counter.fetch(counterPda);
      console.log("Counter Value:", (await account).value);
    }catch(err){
      console.log("Already Initialized or Error:", err);
    }
  });

  //second increment - val: 2
  it("✔️ Increment Counter", async () => {
    try{
      const tx = await program.methods.increment().accounts({
        counter: counterPda,
        user: wallet.publicKey
      }).rpc();

      console.log("✔️ Increment Tx:", tx);

      const account = program.account.counter.fetch(counterPda);
      console.log("Counter Value:", (await account).value);
    }catch(err){
      console.log("Already Initialized or Error:", err);
    }
  });

  //sthird increment - val: 3
  it("✔️ Increment Counter", async () => {
    try{
      const tx = await program.methods.increment().accounts({
        counter: counterPda,
        user: wallet.publicKey
      }).rpc();

      console.log("✔️ Increment Tx:", tx);

      const account = program.account.counter.fetch(counterPda);
      console.log("Counter Value:", (await account).value);
    }catch(err){
      console.log("Already Initialized or Error:", err);
    }
  });

  //decrement - val: 2
  it("✔️ Decrement Counter", async () => {
    try{
      const tx = await program.methods.decrement().accounts({
        counter: counterPda,
        user: wallet.publicKey
      }).rpc();
      console.log("✔️ Decrement Tx:", tx);

      const account = program.account.counter.fetch(counterPda);
      console.log("Counter Value:", (await account).value);
    }catch(err){
      console.log("Already Initialized or Error:", err);
    }

  });

  //reset counter - val: 0
  it("✔️ Reset Counter", async () => {
    try{
      const tx = await program.methods.reset().accounts({
        counter: counterPda,
        user: wallet.publicKey
      }).rpc();
      console.log("✔️ Reset Tx:", tx);

      const account = program.account.counter.fetch(counterPda);
      console.log("Counter Value:", (await account).value);
    }catch(err){
      console.log("Already Initialized or Error:", err);
    }

  });
});
