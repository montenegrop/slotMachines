import mongoose from 'mongoose'

const rollSchema = new mongoose.Schema({
  provider: mongoose.SchemaTypes.ObjectId,
  game: mongoose.SchemaTypes.ObjectId,
  user: String,
  bet: Number,
  result: String,
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now()
  },
  updatedAt: {
    type: Date,
    default: () => Date.now()
  }
})

export default mongoose.model('Roll', rollSchema)
