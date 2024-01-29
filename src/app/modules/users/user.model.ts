import { Model, Schema, model } from 'mongoose'
import { IUser } from './user.interface'
import bcrypt from 'bcrypt'
import config from '../../../config'

type UserModel = Model<IUser, object>

export const userSchema = new Schema<IUser>({
  id: Schema.Types.UUID,
  name: {
    firstName: {
      type: String,
      required: true
    },
    middleName: {
      type: String
    },
    lastName: {
      type: String,
      required: true
    }
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    select: 0
  },
  contract: {
    type: String,
    required: true,
    unique: true
  },
  gender: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: String,
    required: true
  },
  bloodGroup: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  }
})

userSchema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, Number(config.saltRounds))
})

// userSchema.pre('save', async function (next) {
//   if (this.isModified('password')) {
//     this.password = await bcrypt.hash(this.password, Number(config.saltRounds))
//   }
//   next()
// })

// userSchema.pre('updateOne', async function (next) {
//   if (this._update.$set && this._update.$set.password) {
//     this._update.$set.password = await bcrypt.hash(this._update.$set.password, Number(config.saltRounds))
//   }
//   next()
// })

export const User = model<IUser, UserModel>('User', userSchema)
