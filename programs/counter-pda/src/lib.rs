use anchor_lang::prelude::*;

declare_id!("FZvcmfjG5CJS1h3CKc9Ro3fBSbNCSnnZWK5EEG6vfbY1");

#[program]
pub mod counter_pda {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
