import { Router, Request, Response } from "express";
import dotenv from 'dotenv';
import { UserModel } from "../models/User";
import jwt from 'jsonwebtoken';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET 未定义，请检查 .env 文件');
}

export const userRoute = Router();

// 用户注册
userRoute.post('/register', async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  try {
    const existingUser = await UserModel.findOne({ username });

    if (existingUser) {
      res.status(400).json({
        error: '该用户已存在！'
      });
      return
    }

    await UserModel.create({ username, password });

    res.status(201).json({
      message: '新用户注册成功'
    });
  } catch (error) {
    console.error('用户注册失败', error);
    res.status(500).json({
      error: '用户注册失败'
    });
  }
});

// 用户登录
userRoute.post('/login', async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body

  try {
    const user = await UserModel.findOne({ username })
    const userPasswordMatch = await user.comparePassword(password)

    if (!user || !userPasswordMatch) {
      res.status(401).json({
        error: '用户名或密码错误'
      })
      return
    }


    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' })

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 1 * 60 * 60 * 1000,
    })

    res.status(201).json({
      message: '登录成功'
    })
  } catch (error) {
    console.error('登录失败', error)
    res.status(500).json({
      error: '登录失败'
    })
  }
})