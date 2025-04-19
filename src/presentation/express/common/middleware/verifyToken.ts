import jwt from 'jsonwebtoken'
import dotenv from '../../config/envs'

import { NextFunction, Request, Response } from 'express'

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get the token from the headers
    const authHeader = req.headers.authorization || req.headers.Authorization
    console.log('auth', authHeader)
    if (!authHeader) {
      return res.status(401).json({ message: 'Unauthorized' })
    }
    const token = authHeader.split(' ')[1]

    // if does not exists a token
    if (!token) {
      return res
        .status(401)
        .json({ message: 'Lo sentimos debes iniciar sesión.' })
    }

    // decode the token and verify the time
    const decoded = await jwt.verify(token, dotenv.SECRETKEY)

 
    // save the token on request object to using on routes
    req.userId = decoded.id
    // continue with the next function
    next()
  } catch (error) {
    return res.status(401).json({ error: error.message })
  }
}




