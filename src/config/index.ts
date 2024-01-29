import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  saltRounds: process.env.SALTROUNDS,
  jwt: {
    jwt_access_token: process.env.JWT_SECRET_ACCESS,
    jwt_access_expired: process.env.JWT_SECRET_EXPIRED_DATE,
    jwt_refresh_token: process.env.JWT_REFRESH_SECRET,
    jwt_refresh_expired: process.env.JWT_REFRESH_EXPIRED
  }
}
