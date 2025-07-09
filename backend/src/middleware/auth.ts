import {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET 未设置，请检查 .env 配置')
}

export interface AuthRequest extends Request {
  userId?: String
}

export const auth = (req: AuthRequest, res:Response, next: NextFunction) =>{
  const token = req.cookies.token

  if(!token) {
    return res.status(401).json({
      error:'未登录'
    })
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {id: string}
    req.userId = decoded.id
  } catch (error) {
    console.error('token 无效', error)
    res.status(401).json({
      error:'token 无效'
    })
  }
}


