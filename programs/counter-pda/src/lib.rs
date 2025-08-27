use anchor_lang::prelude::*;

declare_id!("FZvcmfjG5CJS1h3CKc9Ro3fBSbNCSnnZWK5EEG6vfbY1");

#[program]
pub mod counter_pda {
    use super::*;

    pub fn initialize(_ctx: Context<Initialize>) -> Result<()> {
        let counter = &mut _ctx.accounts.counter;
        counter.value = 0;
        msg!("Counter initialized to 0");
        Ok(())
    }

    pub fn increment(_ctx: Context<Update>) -> Result<()> {
        let counter = &mut _ctx.accounts.counter;
        counter.value += 1;
        msg!("Counter incremented, New Value: {}", counter.value);
        Ok(())
    }

    pub fn decrement(_ctx: Context<Update>) -> Result<()> {
        let counter = &mut _ctx.accounts.counter;
        counter.value -= 1;
        msg!("Counter decremented, New Value: {}", counter.value);
        Ok(())
    }

    pub fn reset(_ctx: Context<Update>) -> Result<()> {
        let counter = &mut _ctx.accounts.counter;
        counter.value = 0;
        msg!("Counter reset to 0");
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init,
        payer = user,
        space = 8 + 8,
        seeds = [b"counter".as_ref(), user.key().as_ref()],
        bump
    )]
    pub counter: Account<'info, Counter>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Update<'info> {
    #[account(
        mut,
        seeds = [b"counter".as_ref(), user.key().as_ref()],
        bump
    )]
    pub counter: Account<'info, Counter>,
    pub user: Signer<'info>,
}
#[account]
pub struct Counter {
    pub value: i64,
}
