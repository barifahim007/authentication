import express from 'express'
import { userRouter } from '../app/modules/users/user.route'

const router = express.Router()

const routeGroup = [
  {
    path: '/user',
    routes: userRouter
  }
]

routeGroup.forEach(route => router.use(route.path, route.routes))

export default router
