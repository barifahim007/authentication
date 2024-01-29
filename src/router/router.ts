import express from 'express'
import { userRouter } from '../app/modules/users/user.route'
import { authRouter } from '../app/modules/authRoutes/auth.router'

const router = express.Router()

const routeGroup = [
  {
    path: '/user',
    routes: userRouter
  },
  {
    path: '/auth',
    routes: authRouter
  }
]

routeGroup.forEach(route => router.use(route.path, route.routes))

export default router
