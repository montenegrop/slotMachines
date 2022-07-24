import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  email: String,
  encryptedPassword: String,
  provider: mongoose.SchemaTypes.ObjectId

})

export default mongoose.model('User', userSchema)
