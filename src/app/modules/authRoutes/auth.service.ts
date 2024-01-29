import httpStatus from 'http-status'
import { User } from '../users/user.model'
import bcrypt from 'bcrypt'
import jwt, { Secret } from 'jsonwebtoken'
import config from '../../../config'

type ILogin = {
  email: string
  password: string
}
const logingService = async (payload: ILogin) => {
  const { email, password } = payload
  const isUserExist = await User.findOne({ email }, { email: 1, passsword: 1 })

  if (!isUserExist) {
    throw new Error((httpStatus.NOT_FOUND, 'user not found'))
  }
  const matchPassword =
    isUserExist.password &&
    (await bcrypt.compare(password, isUserExist?.password))

  if (!isUserExist?.password && matchPassword) {
    throw new Error((httpStatus.UNAUTHORIZED, 'invallid password'))
  }

  const accessToken = jwt.sign(
    {
      email: isUserExist?.email
    },
    config.jwt.jwt_access_token as Secret,
    {
      expiresIn: config.jwt.jwt_access_expired
    }
  )
  const refreshToken = jwt.sign(
    {
      email: isUserExist?.email
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
  logingService
}
