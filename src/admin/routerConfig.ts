import User from '../db/models/User'
import bcrypt from 'bcrypt'

export const routerConfig = {
  authenticate: async (email: string, password: string) => {
    const user: any = await User.findOne({ email: email })
    if (user !== null) {
      const matched = await bcrypt.compare(password, user.encryptedPassword)
      if (matched) {
        return user
      }
    }
    return false
  },
  cookiePassword: 'some-secret-password-used-to-secure-cookie'
}
