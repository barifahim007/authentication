import httpStatus from 'http-status'
import bcrypt from 'bcrypt'
import jwt, { Secret } from 'jsonwebtoken'
import { User } from '../users/user.model'
import config from '../../../config'

type loginInfo = {
  email: string
  password: string
}

const loginService = async (payload: loginInfo) => {
  const { email, password } = payload

  const isUserExist = await User.findOne({ email }, { email: 1, password: 1 })

  if (!isUserExist) {
    throw new Error((httpStatus.NOT_FOUND, 'user not found '))
  }

  // match password
  const matchPassword = await bcrypt.compare(password, isUserExist?.password)
  if (!matchPassword) {
    throw new Error((httpStatus.UNAUTHORIZED, 'password invalied'))
  }

  //   jwt web token

  //   jwt secret token expired in short time
  const accessToken = jwt.sign(
    {
      email: isUserExist?.email,
      password: isUserExist?.password
    },
    config.jwt.jwt_access_token as Secret,
    {
      expiresIn: config.jwt.jwt_access_expired
    }
  )

  //    jtw refresh token expired in long time
  const refreshToken = jwt.sign(
    {
      email: isUserExist?.email,
      password: isUserExist?.password
    },
    config.jwt.jwt_refresh_token as Secret,
    {
      expiresIn: config.jwt.jwt_refresh_expired
    }
  )
  return {
    accessToken,
    refreshToken
  }
}

export const authService = {
  loginService
}
