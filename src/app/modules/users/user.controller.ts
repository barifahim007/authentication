import { NextFunction, Request, Response } from 'express'
import { userService } from './user.service'
import httpStatus from 'http-status'

// create user
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
      user: result
    })
  } catch (error) {
    next(error)
  }
}

// get singel user

export const getSingleUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _id = req.params.id

    const result = await userService.getSingleUser(_id)

    res.status(200).json({
      status: httpStatus.OK,
      message: 'get single user successfully',
      user: result
    })
  } catch (error) {
    next(error)
  }
}

// get all user
export const getAllUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await userService.getAllUser()
    res.status(200).json({
      status: httpStatus.OK,
      message: 'get all user successfully',
      user: result
    })
  } catch (error) {
    next(error)
  }
}

export const userController = {
  createUser,
  getSingleUser,
  getAllUser
}
