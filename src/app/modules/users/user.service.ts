import { IUser } from './user.interface'
import { User } from './user.model'
// user created
export const createUser = async (user: IUser): Promise<IUser | null> => {
  const result = await User.create(user)

  return result
}
// get single user
export const getSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findById(id)
  return result
}

// get all user from db

export const getAllUser = async () => {
  const result = await User.find()
  return result
}

export const userService = {
  createUser,
  getSingleUser,
  getAllUser
}
