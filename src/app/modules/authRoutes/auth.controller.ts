import { NextFunction, Request, Response } from 'express'
import { authService } from './auth.service'
import httpStatus from 'http-status'
import config from '../../../config'

const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { ...loginInfo } = req.body
    const userInfo = await authService.logingService(loginInfo)
    const { refreshToken, ...others } = userInfo

    // set refresh token into cookeis biscuto
    const options = {
      secure: config.env === 'production',
      httpOnly: true
    }
    res.cookie('refreshToken', refreshToken, options)

    res.status(200).json({
      stauts: httpStatus.OK,
      message: 'user login successfully',
      user: others
    })
  } catch (error) {
    next(error)
  }
}

export const authController = {
  loginController
}
