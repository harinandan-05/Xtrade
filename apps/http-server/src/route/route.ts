import express, { Router } from 'express'
import bcrypt from 'bcrypt'
import {prismaClient} from '@repo/database/client' 
import jwt from 'jsonwebtoken'
import {JWT_SECRET} from '@repo/common/common'
import { Middleware } from '../middleware/middle'
import { tokenToString } from 'typescript'


const router:Router = express.Router();

router.post('/signup', async (req, res) => {
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

    const isMatch = await bcrypt.compare(password,checkUser.password);
    if (!isMatch) {
      res.status(401).json({ msg: "invalid password" });
    }

    const token = jwt.sign(
      { id: checkUser.id, email: checkUser.email },
      JWT_SECRET
    );

    res.status(200).json({msg:"logged in",token})
    return;

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "sever error" });
  }
});

router.get("/dashboard", Middleware,async  (req, res) => {
    const userid = req.user
    try{
      
    const Finduser = await prismaClient.user.findUnique({
      where:{
        id:userid
      }
    })
    if(!Finduser){
      res.status(400).json({msg:"no user found"})
    }
    const details = await prismaClient.user.findMany({
      where:{
        id:Finduser?.id
      },
      select:{
        username:true,
        balance:true,
        trade:true,
        positions:true
      }
    })
    return res.status(200).json({msg:"dashboard details",details})
    }catch(err){
      console.log(err)
    }
  });

router.get("/portfolio/:id", (req, res) => {});

router.post("/trade", (req, res) => {});

router.get("/balance", (req, res) => {});

export default router;
