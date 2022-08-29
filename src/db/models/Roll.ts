import mongoose from 'mongoose'

const rollSchema = new mongoose.Schema({
  publisher: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Publisher'
  },
  game: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Game'
  },
  player: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Player'
  },
  bet: Number,
  result: String,
  wins: Number,
  bonus: String,
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
