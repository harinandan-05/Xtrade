import express, { Router } from "express";
import bcrypt from "bcrypt";
import { prismaClient } from "@repo/database/client";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/common/common";
import { Middleware } from "../middleware/middle";
import { tokenToString } from "typescript";
import { BuyStock } from "../service/Buy";
import { SellStock } from "../service/Sell";
import { GetHistory } from "../service/Summary";

const router: Router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      res.status(400).json({ msg: "fill all inputs" });
      return;
    }
    const existing = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });

    if (existing) {
      res.status(400).json({ msg: "user already exist,try another email" });
      return;
    }

    const hashedpass = await bcrypt.hash(password, 10);

    const newUser = await prismaClient.user.create({
      data: {
        email: email,
        password: hashedpass,
        username: username,
      },
    });
    res.status(200).json({ msg: "user created" });
    return;
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ msg: "fill all inputs" });
      return;
    }
    const checkUser = await prismaClient.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!checkUser) {
      res.status(400).json({ msg: "no users found" });
      return;
    }

    const isMatch = await bcrypt.compare(password, checkUser.password);
    if (!isMatch) {
      res.status(401).json({ msg: "invalid password" });
    }

    const token = jwt.sign(
      { id: checkUser.id, email: checkUser.email },
      JWT_SECRET
    );

    res.status(200).json({ msg: "logged in", token });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "sever error" });
  }
});

router.get("/dashboard", Middleware, async (req, res) => {
  const userid = req.user;
  try {
    const Finduser = await prismaClient.user.findUnique({
      where: {
        id: userid,
      },
    });
    if (!Finduser) {
      res.status(400).json({ msg: "no user found" });
    }
    const details = await prismaClient.user.findMany({
      where: {
        id: Finduser?.id,
      },
      select: {
        username: true,
        balance: true,
        trade: true,
        positions: true,
      },
    });
    return res.status(200).json({ msg: "dashboard details", details });
  } catch (err) {
    console.log(err);
  }
});

router.get("/portfolio", Middleware, async (req, res) => {
  const userid = req.user;
  if (!userid) {
    return res.status(400).json({ msg: "user id present" });
  }
  try {
    const Finduser = await prismaClient.position.findFirst({
      where: {
        userId: userid,
      },
      select: {
        userId: true,
        symbol: true,
        quantity: true,
      },
    });
    if (!Finduser) {
      return res.status(400).json({ msg: "no user found" });
    }
    return res.status(200).json({ msg: "portfolio:", Finduser });
  } catch (err) {
    console.log(err);
  }
});

router.post("/sell", Middleware, async (req, res) => {
  const userid = req.user;
  try {
    if (!userid) res.status(401).json({ msg: "unauthorized" });

    const { symbol, quantity } = req.body;
    if(!userid){
      return
    }
    const response = await SellStock(symbol, quantity, userid);
    if (!response) return res.status(400).json({ msg: "trade failed" });
    res.json(response);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "something went wrong" });
  }
});

router.post("/buy", Middleware, async (req, res) => {
  try {
    const userid = req.user;
    if (!userid) return res.status(401).json({ msg: "Unauthorized" });

    const { symbol, quantity } = req.body;
    const result = await BuyStock(symbol, quantity, userid);

    if (!result) return res.status(400).json({ msg: "Trade failed" });
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Something went wrong" });
  }
});

router.get('/market/:symbol', Middleware, async(req,res) =>{

})

router.post('/market/summary/symbol', Middleware, async (req, res) => {
  try {
    const userid = req.user; 
    console.log("control at first user check");

    if (!userid) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { symbol } = req.body; 
    console.log("symbol received:", symbol);

    const summary = await GetHistory(symbol, userid);
    console.log("got the output");

    return res.json({ summary });
  } catch (err) {
    console.error("Error in /market/summary:", err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});




router.get('/market-feed/history', Middleware, async(req,res) =>{
  
})


export default router;
