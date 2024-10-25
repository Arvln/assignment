const request = require("supertest");
import { app, clearStore } from "./index";

describe("Unit Tests", () => {
  let accountId = "";
  let depositedAccountId = "";

  beforeAll(clearStore);
  afterAll(clearStore);

  it("應創建新帳戶", async () => {
    const res = await request(app)
      .post("/accounts")
      .send({ name: "Alice", balance: "1000" });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("name", "Alice");
    expect(res.body).toHaveProperty("balance", 1000);
    accountId = res.body.id;
  });

  it("應回傳錯誤當帳戶初始餘額非數字或負數", async () => {
    const res = await request(app)
      .post("/accounts")
      .send({ name: "Bob", balance: "-100" });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error", "帳戶初始餘額必須是非負的數字");
  });

  it("應存入金額到帳戶", async () => {
    const res = await request(app)
      .post(`/accounts/${accountId}/deposit`)
      .send({ amount: "500" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id", accountId);
    expect(res.body.balance).toBeGreaterThan(1000);
  });

  it("應回傳錯誤當存款金額非正數", async () => {
    const res = await request(app)
      .post(`/accounts/${accountId}/deposit`)
      .send({ amount: "-100" });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error", "存款金額必須是正數");
  });

  it("應從帳戶提款", async () => {
    const res = await request(app)
      .post(`/accounts/${accountId}/withdraw`)
      .send({ amount: "300" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id", accountId);
    expect(res.body.balance).toBeLessThan(1500);
  });

  it("應回傳錯誤當提款餘額不足", async () => {
    const res = await request(app)
      .post(`/accounts/${accountId}/withdraw`)
      .send({ amount: "5000" });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error", "提款帳戶餘額不足");
  });

  it("應進行帳戶間轉帳", async () => {
    const createDepositAccount = await request(app)
      .post("/accounts")
      .send({ name: "Bob", balance: "500" });
    
    depositedAccountId = createDepositAccount.body.id;

    const res = await request(app)
      .post(`/accounts/${accountId}/transfer`)
      .send({ depositedAccountId, amount: "100" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("status", "success");
    expect(res.body).toHaveProperty("amount", 100);
    expect(res.body.depositedAccount).toHaveProperty("id", depositedAccountId);
  });

  it("應回傳錯誤當轉帳餘額不足", async () => {
    const res = await request(app)
      .post(`/accounts/${accountId}/transfer`)
      .send({ depositedAccountId, amount: "5000" });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("message", "提款帳戶餘額不足");
  });

  it("應取得所有交易記錄", async () => {
    const res = await request(app).get("/transactions");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });
});

describe("Integration Tests", () => {
  let accountId = "";
  let depositedAccountId = "";

  beforeAll(clearStore);
  afterAll(clearStore);

  it("應創建新帳戶並進行存款和提款", async () => {
    const createRes = await request(app)
      .post("/accounts")
      .set("Content-Type", "application/json")
      .send({ name: "Alice", balance: "1000" });

    expect(createRes.statusCode).toBe(201);
    accountId = createRes.body.id;

    const depositRes = await request(app)
      .post(`/accounts/${accountId}/deposit`)
      .set("Content-Type", "application/json")
      .send({ amount: "500" });

    expect(depositRes.statusCode).toBe(200);
    expect(depositRes.body.balance).toBe(1500);

    const withdrawRes = await request(app)
      .post(`/accounts/${accountId}/withdraw`)
      .set("Content-Type", "application/json")
      .send({ amount: "300" });

    expect(withdrawRes.statusCode).toBe(200);
    expect(withdrawRes.body.balance).toBe(1200);
  });

  it("應進行帳戶間轉帳並確認餘額變化", async () => {
    const createDepositAccount = await request(app)
      .post("/accounts")
      .set("Content-Type", "application/json")
      .send({ name: "Bob", balance: "500" });

    depositedAccountId = createDepositAccount.body.id;

    const transferRes = await request(app)
      .post(`/accounts/${accountId}/transfer`)
      .set("Content-Type", "application/json")
      .send({ depositedAccountId, amount: "100" });

    expect(transferRes.statusCode).toBe(200);
    expect(transferRes.body.status).toBe("success");
    expect(transferRes.body.balance).toBe(1100);
    expect(transferRes.body.depositedAccount.balance).toBe(600);
  });

  it("應取得所有交易記錄", async () => {
    const res = await request(app).get("/transactions");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.length).toBeGreaterThan(0);
  });
});
