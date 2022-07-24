import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  provider: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Provider'
  },
  email: { type: String, required: true },
  encryptedPassword: { type: String, required: true },
  role: { type: String, enum: ['admin', 'restricted'], required: true, default: 'restricted' }

})

export default mongoose.model('User', userSchema)
