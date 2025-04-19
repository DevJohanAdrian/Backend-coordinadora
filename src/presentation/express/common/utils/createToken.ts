import env from '@/presentation/express/config/envs';
import jwt from 'jsonwebtoken'

export const createToken = (userId = ''): Promise<string> => {
  return new Promise((resolve, reject) => {
    jwt.sign({ id: userId }, env.SECRETKEY, {
      expiresIn: '1d'
    }, (err, token) => {
      if (err) {
        reject('token not generated.')
      } else {
        console.log('token generated', token)
        resolve(token as string)
      }
    })
  })
}

export const createRefreshToken = (userId: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    jwt.sign({ id: userId }, env.REFRESHSECRETKEY, {
      expiresIn: '1d'
    }, (err, token) => {
      if (err) {
        reject('refresh token not generated.')
      } else {
        resolve(token as string)
      }
    })
  })
}
