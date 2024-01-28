import { NextFunction, Request, Response } from 'express'
import { userService } from './user.service'
import httpStatus from 'http-status'

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { ...user } = req.body
    const result = await userService.createUser(user)
    res.status(200).json({
      status: httpStatus.OK,
      message: 'user created successfully',
      data: result
    })
  } catch (error) {
    next(error)
  }
}

export const userController = {
  createUser
}
