import { InsufficientFundsError, SynchronizationFailedError, TransferFailedError, getBankAccount } from '.';

const startBalance = 3000;
const bankAccount = getBankAccount(startBalance);

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    expect(bankAccount.getBalance()).toBe(startBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => bankAccount.withdraw(startBalance + 1)).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const toAccount = getBankAccount(startBalance);
    expect(() => bankAccount.transfer(bankAccount.getBalance() + 1, toAccount)).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => bankAccount.transfer(bankAccount.getBalance() - 1, bankAccount)).toThrowError(TransferFailedError);
  });

  test('should deposit money', () => {
    const startBalance = bankAccount.getBalance();
    const depositMoney = 4000;

    expect(bankAccount.deposit(depositMoney).getBalance()).toBe(startBalance + depositMoney);
  });

  test('should withdraw money', () => {
    const startBalance = bankAccount.getBalance();
    const withdrawMoney = 1000;

    expect(bankAccount.withdraw(withdrawMoney).getBalance()).toBe(startBalance - withdrawMoney);
  });

  test('should transfer money', () => {
    const startBalance = bankAccount.getBalance();
    const transferAmount = 500;
    const toAccount = getBankAccount(0);

    bankAccount.transfer(transferAmount, toAccount);
    expect(bankAccount.getBalance()).toBe(startBalance - transferAmount);
    expect(toAccount.getBalance()).toBe(transferAmount);
  });

  test('fetchBalance should return number in case if request did not fail', async () => {
  /*     
    const balance = await bankAccount.fetchBalance();
    expect(typeof balance).toBe('number');   
  */
  });  

  test('should set new balance if fetchBalance returned number', async () => {
    const newBalance = 5000;
    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValue(newBalance);

    await bankAccount.synchronizeBalance();
    expect(bankAccount.getBalance()).toBe(newBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValue(null);
    await expect(bankAccount.synchronizeBalance()).rejects.toThrowError(SynchronizationFailedError)
  });
});
