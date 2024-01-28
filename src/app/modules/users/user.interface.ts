export type IUser = {
  id: string
  name: {
    firstName: string
    middleName?: string
    lastName: string
  }
  email: string
  password: string
  contract: string
  gender: string
  dateOfBirth: string
  bloodGroup: string
  address: string
}
