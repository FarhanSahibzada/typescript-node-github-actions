import express from "express";
import dotenv from "dotenv";
import type { Express } from "express";
import type { Request, Response } from "express";

const app: Express = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/get", (req: Request, res: Response) => {
  res.json({ name: "farhan Sahibzada", message: "hello world" });
});
app.post("/get", (req: Request, res: Response) => {
  const data: unknown = req.body;
  console.log("what is under data => ", data);
  res.send("thank you");
});

export { app };
