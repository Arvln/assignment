import express from "express";
import { v4 as uuidv4 } from "uuid";

export const app = express();
const port = 3000;

app.use(express.json());

const createAccount = (name: string, balance: number) => {
  let locked = false;

  const lock = async () => {
    while (locked) new Promise((resolve) => setTimeout(resolve, 300));
    locked = true;
  }
  const deposit = async (amount: number) => {
    await lock();
    balance += amount;
    locked = false;
  }
  const withdraw = async (amount: number) => {
    if (balance < amount) {
      throw new Error("提款帳戶餘額不足");
    }

    await lock();
    balance -= amount;
    locked = false;
  }

  return {
    name,
    balance: () => balance,
    deposit,
    withdraw
  };
}

type Account = ReturnType<typeof createAccount>;

let accounts: {
  [key in string]: Account
} = {};

app.post<unknown, unknown, { name: string, balance: string }>('/accounts', (req, res) => {
  const { name } = req.body;
  const balance = Number(req.body.balance);

  if (isNaN(balance) || balance < 0) {
    res.status(400).json({ error: "帳戶初始餘額必須是非負的數字" });
    return;
  } else {
    const id = uuidv4();

    accounts[id] = createAccount(name, balance);
    res.status(201).json({ id, name, balance });
  }
});

app.post<{ id: string }, unknown, { amount: string }>('/accounts/:id/deposit', (req, res) => {
  const { id } = req.params;
  const amount = Number(req.body.amount);

  if (accounts[id] === undefined) {
    res.status(404).json({ error: "存款帳戶不存在" });
    return;
  } else if (isNaN(amount) || amount <= 0) {
    res.status(400).json({ error: "存款金額必須是正數" });
    return;
  } else {
    accounts[id]
      .deposit(amount)
      .then(() => res.json({ id, balance: accounts[id].balance() }));
  }
});

app.post<{ id: string }, unknown, { amount: string }>('/accounts/:id/withdraw', (req, res) => {
  const { id } = req.params;
  const amount = Number(req.body.amount);

  if (accounts[id] === undefined) {
    res.status(404).json({ error: "提款帳戶不存在" });
    return;
  } else if (isNaN(amount) || amount <= 0) {
    res.status(400).json({ error: "提款金額必須是正數" });
    return;
  } else {
    accounts[id]
      .withdraw(amount)
      .then(() => res.json({ id, balance: accounts[id].balance() }))
      .catch((error) => res.status(400).json({ error: error?.message }));
  }
});

let transactionLogs: ({
  id: string,
  status: "success",
  timestamp: string,
  amount: number,
  balance: number,
  depositedAccount: {
    id: string,
    balance: number
  }
} | {
  id: string,
  status: "error",
  timestamp: string,
  message: string
})[] = [];

export const clearStore = async () => {
  accounts = {};
  transactionLogs = [];
}

app.post<{ id: string }, unknown, { depositedAccountId: string, amount: string }>('/accounts/:id/transfer', (req, res) => {
  const { id } = req.params;
  const { depositedAccountId } = req.body;
  const amount = Number(req.body.amount);

  if (accounts[id] === undefined) {
    res.status(404).json({ error: "提款帳戶不存在" });
    return;
  } else if (accounts[depositedAccountId] === undefined) {
    res.status(404).json({ error: "存款帳戶不存在" });
    return;
  } else if (isNaN(amount) || amount <= 0) {
    res.status(400).json({ error: "轉帳金額必須是正數" });
    return;
  } else {
    let withdrawRollback: () => Promise<void> | undefined;
    const actions = [
      async () => {
        await accounts[id].withdraw(amount);
        withdrawRollback = async () => accounts[id].deposit(amount)
      },
      async () => accounts[depositedAccountId].deposit(amount)
    ]
    
    const commit = async () => {
      for (const action of actions) await action();
    }

    commit()
      .then(() => {
        const transactionLog = {
          id: uuidv4(),
          status: "success" as const,
          timestamp: new Date().toISOString(),
          amount,
          balance: accounts[id].balance(),
          depositedAccount: {
            id: depositedAccountId,
            balance: accounts[depositedAccountId].balance()
          }
        }
        transactionLogs.push(transactionLog);
        res.json(transactionLog);
      }).catch((error) => {
        withdrawRollback?.()
        const transactionLog = {
          id: uuidv4(),
          status: "error" as const,
          timestamp: new Date().toISOString(),
          message: (error.message as string)
        }
        transactionLogs.push(transactionLog);
        res.status(400).json(transactionLog);
      })
  }
});

app.get('/transactions', (_, res) => {
    res.json(transactionLogs);
});

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Example app url: http://localhost:${port}`);
  });
}
